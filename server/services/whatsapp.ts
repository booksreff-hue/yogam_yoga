export type WhatsAppSendResult = {
  ok: boolean
  id?: string
  warning?: string
}

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

/**
 * Sends a WhatsApp message using the WhatsApp Cloud API (Meta).
 * Endpoint format: POST https://graph.facebook.com/{Version}/{Phone-Number-ID}/messages
 */
export async function sendOwnerWhatsApp(opts: {
  token: string
  phoneNumberId: string
  apiVersion: string
  ownerTo: string
  input: { name: string; email: string; phone: string; message: string }
}): Promise<WhatsAppSendResult> {
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

  const json = await res.json().catch(() => ({} as any))

  if (!res.ok) {
    return {
      ok: false,
      warning: `WhatsApp API error ${res.status}${json?.error?.message ? `: ${json.error.message}` : ""}`,
    }
  }

  return { ok: true, id: json?.messages?.[0]?.id }
}
