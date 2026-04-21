type CacheEntry<T> = { value: T; expiresAt: number }

export type GoogleReview = {
  author_name: string
  profile_photo_url?: string
  rating: number
  relative_time_description?: string
  text?: string
  time?: number
}

export type ReviewsPayload = {
  placeName?: string
  rating?: number
  user_ratings_total?: number
  url?: string
  reviews: GoogleReview[]
  fetchedAt: string
}

const cache = new Map<string, CacheEntry<ReviewsPayload>>()

function getFromCache(key: string): ReviewsPayload | null {
  const hit = cache.get(key)
  if (!hit) return null
  if (Date.now() > hit.expiresAt) {
    cache.delete(key)
    return null
  }
  return hit.value
}

function setCache(key: string, value: ReviewsPayload, ttlMs: number) {
  cache.set(key, { value, expiresAt: Date.now() + ttlMs })
}

/**
 * Uses Place Details (New) to fetch rating + limited reviews.
 * Docs: https://developers.google.com/maps/documentation/places/web-service/place-details
 */
export async function fetchGoogleReviews(opts: {
  apiKey: string
  placeId: string
  minRating?: number
}): Promise<ReviewsPayload> {
  const minRating = typeof opts.minRating === "number" ? opts.minRating : 4.5
  const threshold = Math.ceil(minRating) // reviews are integers (1–5)

  const cacheKey = `${opts.placeId}:${threshold}`
  const cached = getFromCache(cacheKey)
  if (cached) return cached

  // Place Details (New) requires an explicit field mask.
  // Note: Reviews are returned in limited quantity (typically up to 5).
  const fieldMask = ["displayName", "rating", "userRatingCount", "googleMapsUri", "reviews"].join(",")
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(opts.placeId)}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": opts.apiKey,
      "X-Goog-FieldMask": fieldMask,
    },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Places API (New) failed: ${res.status}${text ? ` (${text.slice(0, 180)})` : ""}`)
  }

  const result = await res.json()

  const rawReviews = Array.isArray(result?.reviews) ? result.reviews : []
  const reviews: GoogleReview[] = rawReviews.map((r: any) => {
    const author = r?.authorAttribution?.displayName
    const photo = r?.authorAttribution?.photoUri
    const rating = typeof r?.rating === "number" ? r.rating : undefined
    const relative = r?.relativePublishTimeDescription
    const text = r?.text?.text ?? r?.originalText?.text
    const time = r?.publishTime ? Date.parse(r.publishTime) / 1000 : undefined

    return {
      author_name: author || "Anonymous",
      profile_photo_url: photo,
      rating: rating ?? 0,
      relative_time_description: relative,
      text,
      time,
    }
  })
  const filtered = reviews
    .filter((r) => typeof r?.rating === "number" && r.rating >= threshold)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.time ?? 0) - (a.time ?? 0))
    .slice(0, 6)

  const payload: ReviewsPayload = {
    placeName: result?.displayName?.text,
    rating: result?.rating,
    user_ratings_total: result?.userRatingCount,
    url: result?.googleMapsUri,
    reviews: filtered.map((r) => ({
      author_name: r.author_name,
      profile_photo_url: r.profile_photo_url,
      rating: r.rating,
      relative_time_description: r.relative_time_description,
      text: r.text,
      time: r.time,
    })),
    fetchedAt: new Date().toISOString(),
  }

  // cache for 15 minutes
  setCache(cacheKey, payload, 15 * 60 * 1000)

  return payload
}
