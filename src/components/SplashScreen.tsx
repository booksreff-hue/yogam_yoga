import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type Props = {
  show: boolean
  onRequestDismiss: (scrollDeltaY?: number) => void
  onExited?: () => void
}

export default function SplashScreen({ show, onRequestDismiss, onExited }: Props) {
  const [exitY, setExitY] = useState(-120)
  const touchStartY = useRef<number | null>(null)

  useEffect(() => {
    if (!show) return

    const clamp = (n: number, max = 900) => Math.max(-max, Math.min(max, n))

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const dy = clamp(e.deltaY)
      if (dy > 0) setExitY(-220)
      onRequestDismiss(dy)
    }

    const onKey = (e: KeyboardEvent) => {
      const keysDown = ["ArrowDown", "PageDown", " ", "Enter"]
      const keysUp = ["ArrowUp", "PageUp"]
      if (keysDown.includes(e.key)) {
        e.preventDefault()
        setExitY(-220)
        onRequestDismiss(420)
      } else if (keysUp.includes(e.key)) {
        e.preventDefault()
        onRequestDismiss(0)
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches?.[0]?.clientY ?? null
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
    }

    const onTouchEnd = (e: TouchEvent) => {
      const start = touchStartY.current
      const end = e.changedTouches?.[0]?.clientY
      touchStartY.current = null
      if (start == null || end == null) {
        onRequestDismiss(0)
        return
      }
      const dy = clamp(start - end) // swipe up => positive
      if (dy > 0) setExitY(-220)
      onRequestDismiss(dy)
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("keydown", onKey, { passive: false } as any)
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKey as any)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [show, onRequestDismiss])

  return (
    <AnimatePresence onExitComplete={onExited}>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-gradient-to-br from-white via-azure-50 to-aqua-50"
          style={{ height: "100dvh" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: exitY * 0.75, transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] } }}
          onClick={() => onRequestDismiss(0)}
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Always start dead-center */}
            <motion.img
              layoutId="yogam-logo"
              src="/assets/logo/logo.png"
              alt="Yogam Yoga Shālā"
              className="w-44 h-44 md:w-60 md:h-60 object-contain drop-shadow-2xl"
              style={{ transformOrigin: "50% 50%" }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.85, ease: "easeOut" } }}
            />

            <motion.div
              className="mt-6 text-ocean-900 font-title tracking-tight text-xl md:text-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.6, ease: "easeOut" } }}
            >
              Yogam Yoga Shālā
            </motion.div>

            <motion.div
              className="mt-3 text-sm text-ocean-700/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.65, duration: 0.55 } }}
            >

            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
