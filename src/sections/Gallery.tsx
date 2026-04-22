import React, { useRef } from "react"
import FadeIn from "../components/FadeIn"
import { ArrowLeft, ArrowRight } from "lucide-react"

const items = [
  { src: "/images/images/gallery-1.jpeg", alt: "Outdoor yoga session in the temple courtyard" },
  { src: "/images/images/gallery-2.jpeg", alt: "Shālā courtyard at sunrise" },
  { src: "/images/images/gallery-3.jpeg", alt: "Adi Yogi Mahadev temple view" },
  { src: "/images/images/gallery-4.jpeg", alt: "Temple courtyard in evening light" },
  { src: "/images/images/gallery-5.jpeg", alt: "Outdoor yoga session (alternate view)" },
  { src: "/images/images/gallery-6.jpeg", alt: "Shālā courtyard (alternate view)" },
]

export default function Gallery() {
  const scroller = useRef<HTMLDivElement | null>(null)

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current
    if (!el) return
    const amount = Math.round(el.clientWidth * 0.9) * dir
    el.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <section id="space" className="relative py-16 md:py-24 lg:py-32 px-4 md:px-12 lg:px-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-title text-ocean-900 mb-4 md:mb-6 tracking-tight">Our Space</h2>
          <p className="text-xl md:text-2xl font-title text-azure-700 italic">Experience the serene environment where transformation happens</p>
          <div className="w-20 h-1 bg-gradient-to-r from-aqua-500 to-azure-600 mx-auto rounded-full mt-6" />
        </FadeIn>

        <div className="relative w-full max-w-6xl mx-auto" role="region" aria-roledescription="carousel" aria-label="Gallery">
          <div
            ref={scroller}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((it) => (
              <div key={it.src} role="group" aria-roledescription="slide" className="snap-start min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <div className="border border-aqua-200/60 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group rounded-xl bg-white/85 backdrop-blur-sm">
                    <div className="relative aspect-[4/3] overflow-hidden bg-aqua-100">
                      <img
                        alt={it.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        src={it.src}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="hidden md:inline-flex items-center justify-center absolute top-1/2 -left-12 -translate-y-1/2 size-8 rounded-full border border-aqua-300 bg-white/90 hover:bg-aqua-100 hover:text-ocean-900 transition-all shadow-md"
            aria-label="Previous slide"
            onClick={() => scrollBy(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="hidden md:inline-flex items-center justify-center absolute top-1/2 -right-12 -translate-y-1/2 size-8 rounded-full border border-aqua-300 bg-white/90 hover:bg-aqua-100 hover:text-ocean-900 transition-all shadow-md"
            aria-label="Next slide"
            onClick={() => scrollBy(1)}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <FadeIn className="mt-8 text-center">
          <a href="https://www.instagram.com/yogamyogashala?igsh=ZjMwY256bTRybjM5" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-medium border-b-4 border-purple-700 hover:from-pink-600 hover:to-purple-700 transition-all duration-200 active:border-b-2 active:translate-y-0.5">
            Follow us here to see more!
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
