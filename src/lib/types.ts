export type GoogleReview = {
  author_name: string
  profile_photo_url?: string
  rating: number
  relative_time_description?: string
  text?: string
}

export type ReviewsPayload = {
  placeName?: string
  rating?: number
  user_ratings_total?: number
  url?: string
  reviews: GoogleReview[]
  fetchedAt: string
}
