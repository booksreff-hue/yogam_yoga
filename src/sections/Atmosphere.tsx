import React from "react"
import FadeIn from "../components/FadeIn"

export default function Atmosphere() {
  return (
    <section id="atmosphere" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto">
        <FadeIn className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-title text-ocean-900 mb-6 tracking-tight">The Atmosphere</h2>
          <p className="text-xl md:text-2xl font-title text-azure-700 italic">The Aura</p>
          <div className="w-20 h-1 bg-gradient-to-r from-aqua-500 to-azure-600 mx-auto rounded-full mt-6" />
        </FadeIn>

        <FadeIn>
          <div className="relative rounded-2xl shadow-xl overflow-hidden border border-aqua-200/60">
            <video
              className="w-full h-auto"
              controls
              preload="metadata"
            >
              <source src="/assets/atmosphere/yogam shala final.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </FadeIn>

        <FadeIn className="mt-12">
          <div 
            className="relative rounded-2xl shadow-xl overflow-hidden border border-aqua-200/60"
            style={{
              backgroundImage: "url('/assets/atmosphere/atmosphere_bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-ocean-900/70" />
            <div className="relative z-10 p-8 md:p-12">
              <div className="space-y-6 text-center">
                <p className="text-lg md:text-xl text-white leading-relaxed font-semibold">
                  Located under the shelter of the <span className="font-bold text-aqua-300 underline underline-offset-4">Adi Yogi Mahadev temple</span>, our Shālā is blessed with a divine energy.
                </p>

                <div className="flex items-center justify-center gap-4 py-4">
                  <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-2xl">
                    We begin and end every session with prayers and mantra recitation to establish a deep connection with the discipline of Yoga.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/30">
                  <p className="text-lg md:text-xl text-white leading-relaxed font-semibold">
                    We invite you to join us—not as a client, but as a follower of the Adi Yogi, in a healthy, ego-free, and supportive environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}