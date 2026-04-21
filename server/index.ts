import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { fetchGoogleReviews } from "./services/googleReviews"
import { sendOwnerWhatsApp } from "./services/whatsapp"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: "64kb" }))

app.get("/api/health", (_req, res) => res.json({ ok: true }))

app.get("/api/reviews", async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY
    const placeId = process.env.GOOGLE_PLACE_ID
    const minRating = req.query.minRating ? Number(req.query.minRating) : 4.5

    if (!apiKey || !placeId) {
      return res.status(501).json({
        reviews: [],
        fetchedAt: new Date().toISOString(),
        error: "Missing GOOGLE_API_KEY or GOOGLE_PLACE_ID on the server.",
      })
    }

    const payload = await fetchGoogleReviews({ apiKey, placeId, minRating })
    res.json(payload)
  } catch (e: any) {
    res.status(500).json({ reviews: [], fetchedAt: new Date().toISOString(), error: e?.message ?? "reviews error" })
  }
})

app.post("/api/whatsapp", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body ?? {}

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ ok: false, error: "Missing fields" })
    }

    // WhatsApp Cloud API configuration
    const token = process.env.WHATSAPP_TOKEN
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
    const ownerTo = process.env.WHATSAPP_OWNER_TO
    const apiVersion = process.env.WHATSAPP_API_VERSION || "v21.0"

    if (!token || !phoneNumberId || !ownerTo) {
      // Not configured yet — return a soft failure so the frontend can fall back.
      return res.status(501).json({
        ok: false,
        error: "WhatsApp API not configured (WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID / WHATSAPP_OWNER_TO).",
      })
    }

    const result = await sendOwnerWhatsApp({
      token,
      phoneNumberId,
      apiVersion,
      ownerTo,
      input: { name, email, phone, message },
    })

    if (!result.ok) return res.status(502).json(result)
    return res.json(result)
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "whatsapp error" })
  }
})

const port = Number(process.env.PORT || 8787)
app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`)
})
