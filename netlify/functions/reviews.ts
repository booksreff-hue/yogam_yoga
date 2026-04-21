import type { Handler, HandlerResponse } from "@netlify/functions"

const cache = new Map<string, { value: any; expiresAt: number }>()

interface GoogleReview {
  author_name: string
  profile_photo_url?: string
  rating: number
  relative_time_description?: string
  text?: string
  time?: number
}

interface ReviewsPayload {
  placeName?: string
  rating?: number
  user_ratings_total?: number
  url?: string
  reviews: GoogleReview[]
  fetchedAt: string
}

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

async function fetchGoogleReviews(opts: {
  apiKey: string
  placeId: string
  minRating: number
}): Promise<ReviewsPayload> {
  const threshold = Math.ceil(opts.minRating)
  const cacheKey = `${opts.placeId}:${threshold}`
  const cached = getFromCache(cacheKey)
  if (cached) return cached

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
    throw new Error(`Places API failed: ${res.status}${text ? ` (${text.slice(0, 180)})` : ""}`)
  }

  const result = await res.json()

  const rawReviews = Array.isArray(result?.reviews) ? result.reviews : []
  const reviews: GoogleReview[] = rawReviews.map((r: any) => ({
    author_name: r?.authorAttribution?.displayName || "Anonymous",
    profile_photo_url: r?.authorAttribution?.photoUri,
    rating: typeof r?.rating === "number" ? r.rating : 0,
    relative_time_description: r?.relativePublishTimeDescription,
    text: r?.text?.text ?? r?.originalText?.text,
    time: r?.publishTime ? Date.parse(r.publishTime) / 1000 : undefined,
  }))

  const filtered = reviews
    .filter((r) => typeof r?.rating === "number" && r.rating >= threshold)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.time ?? 0) - (a.time ?? 0))
    .slice(0, 6)

  const payload: ReviewsPayload = {
    placeName: result?.displayName?.text,
    rating: result?.rating,
    user_ratings_total: result?.userRatingCount,
    url: result?.googleMapsUri,
    reviews: filtered,
    fetchedAt: new Date().toISOString(),
  }

  setCache(cacheKey, payload, 15 * 60 * 1000)
  return payload
}

const handler: Handler = async function (event): Promise<HandlerResponse> {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method not allowed" }
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY
    const placeId = process.env.GOOGLE_PLACE_ID
    const urlParams = new URLSearchParams(event.queryStringParameters?. ?? "")
    const minRating = urlParams.get("minRating") ? Number(urlParams.get("minRating")) : 4.5

    if (!apiKey || !placeId) {
      return {
        statusCode: 501,
        body: JSON.stringify({
          reviews: [],
          fetchedAt: new Date().toISOString(),
          error: "Missing GOOGLE_API_KEY or GOOGLE_PLACE_ID",
        }),
      }
    }

    const payload = await fetchGoogleReviews({ apiKey, placeId, minRating })
    return { statusCode: 200, body: JSON.stringify(payload) }
  } catch (e: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reviews: [], fetchedAt: new Date().toISOString(), error: e?.message ?? "error" }),
    }
  }
}

export { handler }