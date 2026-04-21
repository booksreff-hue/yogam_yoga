import type { Handler, HandlerResponse } from "@netlify/functions"

function buildOwnerMessage(input: { name: string; email: string; phone: string; message: string }) {
  const lines = [
    "New website enquiry (Yogam Yoga Shālā):",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    "",
    "Message:",
    input.message,
  ]
  return lines.join("\n")
}

async function sendOwnerWhatsApp(opts: {
  token: string
  phoneNumberId: string
  apiVersion: string
  ownerTo: string
  input: { name: string; email: string; phone: string; message: string }
}): Promise<{ ok: boolean; id?: string; warning?: string }> {
  const url = `https://graph.facebook.com/${opts.apiVersion}/${opts.phoneNumberId}/messages`
  const body = {
    messaging_product: "whatsapp",
    to: opts.ownerTo,
    type: "text",
    text: { body: buildOwnerMessage(opts.input) },
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const json = await res.json().catch(() => ({}))

  if (!res.ok) {
    return {
      ok: false,
      warning: `WhatsApp API error ${res.status}${json?.error?.message ? `: ${json.error.message}` : ""}`,
    }
  }

  return { ok: true, id: json?.messages?.[0]?.id }
}

const handler: Handler = async function (event): Promise<HandlerResponse> {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" }
  }

  try {
    const body = JSON.parse(event.body ?? "{}")
    const { name, email, phone, message } = body ?? {}

    if (!name || !email || !phone || !message) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Missing fields" }) }
    }

    const token = process.env.WHATSAPP_TOKEN
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
    const ownerTo = process.env.WHATSAPP_OWNER_TO
    const apiVersion = process.env.WHATSAPP_API_VERSION || "v21.0"

    if (!token || !phoneNumberId || !ownerTo) {
      return {
        statusCode: 501,
        body: JSON.stringify({
          ok: false,
          error: "WhatsApp API not configured",
        }),
      }
    }

    const result = await sendOwnerWhatsApp({
      token,
      phoneNumberId,
      apiVersion,
      ownerTo,
      input: { name, email, phone, message },
    })

    if (!result.ok) {
      return { statusCode: 502, body: JSON.stringify(result) }
    }
    return { statusCode: 200, body: JSON.stringify(result) }
  } catch (e: any) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: e?.message ?? "error" }) }
  }
}

export { handler }