import React from "react"
import FadeIn from "../components/FadeIn"
import { content } from "../content"

export default function About() {
  const scrollToHash = (hash: string) => {
    const el = document.querySelector(hash)
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      history.pushState(null, "", hash)
    }
  }

  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <nav className="mb-12 flex flex-wrap justify-center gap-3 text-sm">
          {[
            ["About", "#about"],
            ["Teachers", "#teachers"],
            ["Atmosphere", "#atmosphere"],
            ["Space", "#space"],
            ["Reviews", "#reviews"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={(e) => {
                e.preventDefault()
                scrollToHash(href)
              }}
              className="rounded-full bg-[#B8F9FF] px-4 py-2 md:px-6 md:py-2.5 text-black font-semibold border border-azure-300/50 hover:bg-[#A8E4F2] transition shadow-sm"
            >
              {label}
            </a>
          ))}
        </nav>
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-title text-ocean-900 mb-6 tracking-tight">
            {content.purposeTitle}
          </h2>
          <p className="text-xl md:text-2xl font-title text-azure-700 italic">A Path, Not a Business</p>
          <div className="w-20 h-1 bg-gradient-to-r from-aqua-500 to-azure-600 mx-auto rounded-full mt-6" />
        </FadeIn>

        <FadeIn className="relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 border border-aqua-200/60 overflow-hidden">
          <img
            src="/assets/purpose/grp_yoga.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          />
          <div className="relative space-y-12">
            <FadeIn>
              <p className="text-lg md:text-xl text-ocean-800 leading-relaxed text-center">{content.purposeBody}</p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8">
              <FadeIn className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-8 border border-azure-200/60">
                <h3 className="text-2xl md:text-3xl font-title text-ocean-900 mb-4">{content.approachTitle}</h3>
                <p className="text-base md:text-lg text-ocean-700 leading-relaxed">{content.approachBody}</p>
              </FadeIn>

              <FadeIn delay={0.1} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-8 border border-azure-200/60">
                <h3 className="text-2xl md:text-3xl font-title text-ocean-900 mb-4">{content.philosophyTitle}</h3>
                <p className="text-base md:text-lg text-ocean-700 leading-relaxed">{content.philosophyBody}</p>
              </FadeIn>
            </div>

            <FadeIn className="bg-[#B8F9FF] rounded-2xl shadow-lg p-8 md:p-10 border border-aqua-200/60">
              <h3 className="text-2xl md:text-3xl font-title text-ocean-900 mb-4 text-center">Holistic Panchakosha Approach</h3>
              <p className="text-base md:text-lg text-black leading-relaxed text-center">
                {content.panchakoshaBody}
              </p>
            </FadeIn>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
