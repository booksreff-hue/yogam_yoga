import React, { useCallback, useEffect, useRef, useState } from "react"
import { LayoutGroup, motion } from "framer-motion"
import SplashScreen from "./components/SplashScreen"
import HeroBackdrop from "./components/HeroBackdrop"
import YogaBackdrop from "./components/YogaBackdrop"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Atmosphere from "./sections/Atmosphere"
import Founder from "./sections/Founder"
import Gallery from "./sections/Gallery"
import ClassTimings from "./sections/ClassTimings"
import Reviews from "./sections/Reviews"
import Contact from "./sections/Contact"
import Footer from "./sections/Footer"

export default function App() {
  // Goal: quick by default, but user can dismiss instantly by scrolling/clicking.
  const MIN_VISIBLE_MS = 450
  const AUTO_DISMISS_MS = 1000

  const startRef = useRef<number>(typeof performance !== "undefined" ? performance.now() : Date.now())
  const pendingScrollRef = useRef(0)
  const dismissTimerRef = useRef<number | null>(null)
  const [showSplash, setShowSplash] = useState(true)
  const [ready, setReady] = useState(false)

  const requestDismiss = useCallback(
    (scrollDeltaY = 0) => {
      if (!showSplash) return

      pendingScrollRef.current += scrollDeltaY

      const elapsed = (typeof performance !== "undefined" ? performance.now() : Date.now()) - startRef.current
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed)

      if (dismissTimerRef.current) window.clearTimeout(dismissTimerRef.current)
      dismissTimerRef.current = window.setTimeout(() => {
        setReady(true)
        setShowSplash(false)
      }, wait)
    },
    [showSplash]
  )

  useEffect(() => {
    // Prevent background scroll while splash is visible.
    if (showSplash) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [showSplash])

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      // Wait for fonts, but never block for too long.
      try {
        // @ts-ignore
        const fontsReady = document.fonts?.ready
        if (fontsReady) {
          await Promise.race([fontsReady, new Promise((r) => setTimeout(r, 500))])
        }
      } catch {
        // ignore
      }

      if (cancelled) return

      // Auto-dismiss after a short moment if the user doesn't interact.
      const elapsed = (typeof performance !== "undefined" ? performance.now() : Date.now()) - startRef.current
      const remaining = Math.max(0, AUTO_DISMISS_MS - elapsed)
      window.setTimeout(() => {
        if (!cancelled) requestDismiss(0)
      }, remaining)
    }

    init()
    return () => {
      cancelled = true
      if (dismissTimerRef.current) window.clearTimeout(dismissTimerRef.current)
    }
  }, [requestDismiss])

  const handleSplashExited = useCallback(() => {
    // After the logo transitions into the hero, apply the user's initial scroll intent.
    const delta = pendingScrollRef.current
    pendingScrollRef.current = 0
    if (delta) {
      window.requestAnimationFrame(() => {
        window.scrollBy({ top: delta, left: 0, behavior: "auto" })
      })
    }
  }, [])

  return (
    <>
      {/*
        Topo backdrop — always mounted, never inside LayoutGroup.
        Opacity is driven by a CSS transition so no Framer transform is ever
        applied to this fixed element (a transform would break its fixed stacking
        context and cause scroll-jitter).
      */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          opacity: showSplash ? 0 : 0.12,
          transition: showSplash ? "none" : "opacity 1.2s ease 0.1s",
          willChange: "opacity",
        }}
        aria-hidden="true"
      >
        <HeroBackdrop tone="light" intensity={1} />
      </div>

      <LayoutGroup>
        <div className="min-h-screen bg-white text-ocean-900 font-inter relative">
          <SplashScreen show={showSplash} onRequestDismiss={requestDismiss} onExited={handleSplashExited} />

          {/* Structure requested */}
          <Hero ready={ready} />

          {/* Main site content (yoga pose backdrop applies here only). */}
          <main className="relative isolate">
            <YogaBackdrop />
            {/* Ensure all content sits ABOVE the backdrop */}
            <div className="relative z-10">
              <About />
              <Founder />
              <Atmosphere />
              <Gallery />
              <ClassTimings />
              <Reviews />
              <Contact />
            </div>
          </main>
          <Footer />
        </div>
      </LayoutGroup>
    </>
  )
}
