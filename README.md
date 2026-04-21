# Yogam Yoga Shālā — React + Framer Motion (single page)

This project is a **single-page** website with:
- A **centered splash screen** that keeps the logo on-screen longer, then **shrinks/transitions into the header** (Framer Motion shared layout).
- Smooth scroll + section reveal animations.
- **Coral “topographic map” contour lines** as subtle background design.
- A **Google Reviews** section that loads real reviews via a server endpoint (filtered to high ratings).
- A contact form that:
  - Sends **copies by email** via EmailJS (client-side).
  - Hits a **WhatsApp Cloud API** endpoint (server-side) for owner notifications.

## 1) Install & run

```bash
npm install
npm run dev:all
```

- Frontend: http://localhost:5173  
- API server: http://localhost:8787

## 2) Environment variables

Create a `.env` file (copy from `.env.example`) and fill your keys.

### Google Reviews (server)
This uses Places **Place Details** to return rating + a limited set of public review snippets. (Google does **not** return every review.)  
Docs: Places Details returns ratings and reviews.  
You must set:

- `GOOGLE_API_KEY=...`
- `GOOGLE_PLACE_ID=...`

### WhatsApp Cloud API (server)
WhatsApp Cloud API messages endpoint:
`POST https://graph.facebook.com/{Version}/{Phone-Number-ID}/messages`

Set:

- `WHATSAPP_TOKEN=...`
- `WHATSAPP_PHONE_NUMBER_ID=...`
- `WHATSAPP_OWNER_TO=...`  (the number to notify)

> Note: WhatsApp Business Platform is designed for sending messages **from** your business number, not “into” the WhatsApp Business App inbox. This implementation sends a notification to a target WhatsApp number (owner/admin). For customer copies, WhatsApp typically requires opt-in + templates if you are outside the 24h messaging window.

### EmailJS (client)
This uses `emailjs.send(serviceID, templateID, params, { publicKey })`.

Set:

- `VITE_EMAILJS_PUBLIC_KEY=...`
- `VITE_EMAILJS_SERVICE_ID=...`
- `VITE_EMAILJS_TEMPLATE_ID_OWNER=...`
- `VITE_EMAILJS_TEMPLATE_ID_CUSTOMER=...`

Template params sent:
- `name`, `email`, `phone`, `message`, `timestamp`, `page`
- plus for customer template: `to_email`, `to_name`

## 3) Replace images

- Logo / founder images: `public/assets/*`
- Gallery images: `public/images/gallery-*.jpg`

## 4) Build

```bash
npm run build
npm run preview
```

## 5) Deployment notes (important)

- If you deploy the frontend as static files, you still need an API for:
  - `/api/reviews`
  - `/api/whatsapp`

You can deploy the server as:
- A small Node service (Express), or
- Serverless functions (Vercel/Netlify/Cloudflare Workers)

In dev, Vite proxies `/api/*` to `http://localhost:8787`.
