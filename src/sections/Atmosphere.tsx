import React, { useState, useEffect } from "react"
import FadeIn from "../components/FadeIn"
import { ChevronLeft, ChevronRight } from "lucide-react"

const atmosphereImages = [
  "/assets/atmosphere/atmosphere_bg.png",
  "/assets/atmosphere/adiyogi.jpg",
  "/assets/atmosphere/shinde_chhatri.jpg",
]

export default function Atmosphere() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % atmosphereImages.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => setIsAutoPlaying(true), 10000)
      return () => clearTimeout(timeout)
    }
  }, [isAutoPlaying, currentImage])

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setCurrentImage((prev) => (prev - 1 + atmosphereImages.length) % atmosphereImages.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentImage((prev) => (prev + 1) % atmosphereImages.length)
  }

  return (
    <section id="atmosphere" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-title text-ocean-900 mb-6 tracking-tight">The Atmosphere</h2>
          <p className="text-xl md:text-2xl font-title text-azure-700 italic">The Aura</p>
          <div className="w-20 h-1 bg-gradient-to-r from-aqua-500 to-azure-600 mx-auto rounded-full mt-6" />
        </FadeIn>

        <div className="relative rounded-2xl shadow-xl overflow-hidden border border-aqua-200/60 group">
          {/* Carousel Background */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${atmosphereImages[currentImage]}')`,
            }}
          />
          <div className="absolute inset-0 z-0 bg-black/[0.25]" />

          {/* Carousel Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-ocean-700 hover:bg-white hover:text-ocean-900 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-ocean-700 hover:bg-white hover:text-ocean-900 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {atmosphereImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentImage(idx)
                  setIsAutoPlaying(false)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentImage
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Foreground content wrapper */}
          <div className="relative z-10 p-8 md:p-12">
            <div className="mb-20"></div>

            <div className="space-y-6 text-center">
              <p className="text-lg md:text-xl text-white leading-relaxed font-bold" style={{ textShadow: "0px 0px 8px rgba(0,0,0,1), 0px 0px 15px rgba(0,0,0,0.8)" }}>
                Located under the shelter of the <span className="font-extrabold text-white underline">Adi Yogi Mahadev temple</span>, our Shālā is blessed with a divine energy.
              </p>

              <div className="flex items-center justify-center gap-4 py-6">
                <p className="text-base md:text-lg text-white leading-relaxed max-w-2xl font-bold" style={{ textShadow: "0px 0px 8px rgba(0,0,0,1), 0px 0px 15px rgba(0,0,0,0.8)" }}>
                  We begin and end every session with prayers and mantra recitation to establish a deep connection with the discipline of Yoga.
                </p>
              </div>

              <div className="pt-6 border-t border-white/30">
                <p className="text-lg md:text-xl text-white leading-relaxed font-bold" style={{ textShadow: "0px 0px 8px rgba(0,0,0,1), 0px 0px 15px rgba(0,0,0,0.8)" }}>
                  We invite you to join us—not as a client, but as a follower of the Adi Yogi, in a healthy, ego-free, and supportive environment.
                </p>
              </div>
            </div>

            <div className="mt-12"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
