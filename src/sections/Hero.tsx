import React, { useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { content } from "../content"

type Props = {
  ready: boolean
}

export default function Hero({ ready }: Props) {
  const mantraBlocks = useMemo(() => {
    const [om, line1, a1, a2, p1, p2] = content.mantras
    return { om, line1, a1, a2, p1, p2 }
  }, [])

  const scrollToHash = useCallback((hash: string) => {
    const el = document.querySelector(hash)
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      history.pushState(null, "", hash)
    }
  }, [])

  return (
    <header id="home" className="relative flex flex-col min-h-[70dvh] md:min-h-[90dvh] overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: "#FFFFB8" }}>
        <img 
          src="/assets/hero/kailash.png" 
          alt="Mount Kailash" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFB8]/60 via-[#FFFFB8]/40 to-[#FFFFB8]/60" />
        <div className="absolute -left-2 md:left-[-2%] bottom-8 md:bottom-12 z-10 flex flex-col items-center">
          <img 
            src="/assets/hero/patanjali.png" 
            alt="Patanjali" 
            className="w-32 md:w-60 lg:w-72 h-auto object-contain opacity-90"
          />
          <span className="font-title text-black/80 text-sm md:text-lg lg:text-xl font-bold mt-1">
            Maharishi Patanjali
          </span>
        </div>
        <img 
          src="/assets/hero/om_hero.png" 
          alt="Om" 
          className="absolute -right-2 md:right-0 bottom-0 w-36 md:w-80 lg:w-[28rem] h-auto object-contain z-10"
        />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start text-center px-4 pt-8">
        <motion.div
          className="w-full max-w-6xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 40, scale: 0.985 }}
          animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.985 }}
          transition={{
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1], // Custom slow-out expo curve
            opacity: { duration: 1.8 }
          }}
        >
          {/* Logo and mantras */}
          <div className="mt-20 mx-auto max-w-4xl flex flex-col items-center">
            {/* Logo now placed inside the mantra box */}
            <div className="mb-6 h-30 md:h-36 flex items-center justify-center">
              {ready ? (
                <motion.img
                  layoutId="yogam-logo"
                  src="/assets/logo/logo.png"
                  alt="Yogam Yoga Shālā Logo"
                  className="h-full w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)]"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                />
              ) : (
                <div className="h-28 md:h-32 w-52" aria-hidden="true" />
              )}
            </div>

            <div className="font-sanskrit text-base md:text-lg text-black drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] space-y-2 font-bold px-4">
              <p>{mantraBlocks.om}</p>
              <p>{mantraBlocks.line1}</p>
            </div>

            <div className="mt-6 font-sanskrit text-base md:text-lg text-black drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] leading-relaxed max-w-3xl mx-auto font-bold px-4">
              <p>{mantraBlocks.a1}</p>
              <p>{mantraBlocks.a2}</p>
            </div>

            <div className="mt-6 font-sanskrit text-base md:text-lg text-black/80 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] leading-relaxed max-w-3xl mx-auto font-bold px-4">
              <p>{mantraBlocks.p1}</p>
              <p>{mantraBlocks.p2}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
