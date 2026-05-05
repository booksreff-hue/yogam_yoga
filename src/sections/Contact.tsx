import React, { useMemo, useState } from "react"
import { Send } from "lucide-react"
import emailjs from "@emailjs/browser"
import { content } from "../content"

type FormState = {
  name: string
  email: string
  phone: string
  message: string
}

const getEnv = (key: string) => (import.meta as any).env?.[key] as string | undefined

function buildWhatsAppFallbackText(s: FormState) {
  return `New enquiry from Yogam Yoga Shālā website:%0A%0AName: ${encodeURIComponent(s.name)}%0AEmail: ${encodeURIComponent(
    s.email,
  )}%0APhone: ${encodeURIComponent(s.phone)}%0A%0AMessage:%0A${encodeURIComponent(s.message)}`
}

export default function Contact() {
  const [state, setState] = useState<FormState>({ name: "", email: "", phone: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const ownerPhoneForWa = useMemo(() => {
    // WhatsApp wa.me expects E.164 digits without '+'.
    const raw = content.founder.contact.phoneDisplay
    const digits = raw.replace(/\D/g, "")
    return digits.startsWith("91") ? digits : digits
  }, [])

  const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setState((s) => ({ ...s, [k]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setStatus("sending")

    const payload = {
      name: state.name.trim(),
      email: state.email.trim(),
      phone: state.phone.trim(),
      message: state.message.trim(),
      page: "Yogam Yoga Shālā",
      timestamp: new Date().toISOString(),
    }

    try {
      // 1) WhatsApp Business API (server-side) — sends to owner.
      const waRes = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      // Don't hard-fail if WhatsApp isn't configured yet.
      const waOk = waRes.ok

      // 2) EmailJS (client-side) — sends copies to owner + customer.
      const publicKey = getEnv("VITE_EMAILJS_PUBLIC_KEY")
      const serviceId = getEnv("VITE_EMAILJS_SERVICE_ID")
      const tmplOwner = getEnv("VITE_EMAILJS_TEMPLATE_ID_OWNER")
      const tmplCustomer = getEnv("VITE_EMAILJS_TEMPLATE_ID_CUSTOMER")

      const canEmail = publicKey && serviceId && tmplOwner && tmplCustomer

      if (canEmail) {
        // Owner copy
        await emailjs.send(serviceId!, tmplOwner!, payload, { publicKey: publicKey! })
        // Customer copy
        await emailjs.send(
          serviceId!,
          tmplCustomer!,
          { ...payload, to_email: payload.email, to_name: payload.name },
          { publicKey: publicKey! },
        )
      }

      if (!waOk && !canEmail) {
        // Nothing configured; fall back to opening WhatsApp chat.
        const text = buildWhatsAppFallbackText(state)
        window.open(`https://wa.me/${ownerPhoneForWa}?text=${text}`, "_blank", "noopener,noreferrer")
      }

      setStatus("sent")
      setState({ name: "", email: "", phone: "", message: "" })
    } catch (err: any) {
      setStatus("error")
      setError(err?.message ?? "Something went wrong")
    }
  }

  return (
    <section id="contact" className="relative py-16 md:py-24 lg:py-32 px-4 md:px-12 lg:px-16 overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-title text-ocean-900 mb-4 md:mb-6 tracking-tight">Get In Touch</h2>
          <p className="text-xl md:text-2xl font-title text-azure-700 italic">Have questions or ready to start your yoga journey? We'd love to hear from you.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-aqua-500 to-azure-600 mx-auto rounded-full mt-6" />
        </div>

        <div className="flex flex-col gap-6 rounded-xl py-6 border border-aqua-200/60 shadow-xl bg-[#b8f9ff] backdrop-blur-sm">
          <div className="px-6 pb-2">
            <div className="font-semibold text-2xl text-ocean-900 font-title">Contact Us</div>
            <div className="text-ocean-700 text-base">
              Drop your details and message. We’ll respond as soon as possible.
              <span className="block mt-3 text-sm italic text-ocean-600 font-medium">
                Enabled: EmailJS for copies • WhatsApp Business API endpoint ready for deployment
              </span>
            </div>
          </div>

          <div className="px-6">
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label className="block text-sm text-ocean-900 font-medium" htmlFor="name">Name *</label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="flex w-full rounded-md border border-aqua-300 h-12 bg-white px-3 text-base md:text-sm shadow-sm outline-none focus:border-azure-600 focus:ring-2 focus:ring-azure-600/40"
                  type="text"
                  value={state.name}
                  onChange={onChange("name")}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm text-ocean-900 font-medium" htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    required
                    placeholder="your.email@example.com"
                    className="flex w-full rounded-md border border-aqua-300 h-12 bg-white px-3 text-base md:text-sm shadow-sm outline-none focus:border-azure-600 focus:ring-2 focus:ring-azure-600/40"
                    type="email"
                    value={state.email}
                    onChange={onChange("email")}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-ocean-900 font-medium" htmlFor="phone">Phone *</label>
                  <input
                    id="phone"
                    name="phone"
                    required
                    placeholder="e.g. +91 9XXXX XXXXX"
                    className="flex w-full rounded-md border border-aqua-300 h-12 bg-white px-3 text-base md:text-sm shadow-sm outline-none focus:border-azure-600 focus:ring-2 focus:ring-azure-600/40"
                    type="tel"
                    value={state.phone}
                    onChange={onChange("phone")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-ocean-900 font-medium" htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell us about your interest in yoga or any questions you have..."
                  rows={6}
                  className="flex w-full rounded-md border border-aqua-300 bg-white px-3 py-2 text-base md:text-sm shadow-sm outline-none focus:border-azure-600 focus:ring-2 focus:ring-azure-600/40 resize-none"
                  value={state.message}
                  onChange={onChange("message")}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center w-full rounded-md h-12 text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-aqua-600 to-azure-600 hover:from-aqua-700 hover:to-azure-700 text-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="mr-2 h-5 w-5" />
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✅" : "Send Message"}
              </button>

              {status === "error" && error ? (
                <div className="text-center text-sm text-red-600">Error: {error}</div>
              ) : null}

              <div className="text-center text-sm text-ocean-600">
                Tip: If WhatsApp API is not configured yet, the form can fall back to opening WhatsApp with a prefilled message.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
