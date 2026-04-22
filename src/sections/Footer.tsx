import React from "react"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"
import { content } from "../content"

export default function Footer() {
  const c = content.founder.contact
  const si = content.studioInstagram
  return (
    <footer className="bg-ocean-900 text-white py-16 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex flex-col items-center mb-4">
              <img alt="Yogam Yoga Shālā Logo" className="w-[160px] h-auto object-contain" src="/assets/footer/Yogam Yoga Shala_LOGO White.png" />
              <h3 className="text-xl font-title mt-2">Yogam Yoga Shālā</h3>
              <p className="text-white/70 text-sm leading-relaxed text-center mt-1">
                A sanctuary for mindful movement, breath, and inner peace. Join us on the journey to wellness.
              </p>
            </div>
          </div>

          <div className="text-center md:text-left mt-8 md:mt-0">
            <h4 className="text-lg font-title mb-4">Contact Info</h4>
            <div className="space-y-3 text-white/70 text-center md:text-left">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-aqua-400" />
                <a href={c.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  View on Google Maps
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-aqua-400" />
                <span>{c.phoneDisplay}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-aqua-400" />
                <a href={`mailto:${c.email}`} className="hover:text-white transition-colors">
                  {c.email}
                </a>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left mt-8 md:mt-0">
            <h4 className="text-lg font-title mb-4">Follow Us</h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-azure-600 flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href={si}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-azure-600 flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-azure-600 flex items-center justify-center transition-all duration-300"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/60">
          <p>© {new Date().getFullYear()}. Yogam Yoga Shālā. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
