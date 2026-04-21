import React from "react"

type Props = {
  className?: string
  /**
   * Choose blending that works on light sections vs the dark hero.
   * - light: subtle, paper-cut texture + faint azure/aqua wash
   * - dark: slightly stronger so it shows clearly under the hero overlay
   */
  tone?: "light" | "dark"
  /**
   * Multiplies the internal opacity values.
   * Use >1 for the hero, and ~1 for the rest of the site.
   */
  intensity?: number
}

/**
 * "Paper-cut" topographic backdrop inspired by the provided reference image.
 * Uses the reference texture + a very subtle azure/aqua wash.
 */
export default function HeroBackdrop({ className, tone = "light", intensity = 1 }: Props) {
  // The provided reference image already contains the "paper-cut" contour look.
  // We keep it subtle and add only a faint azure/aqua wash.
  const mult = Math.max(0, Math.min(2, intensity))
  const imgOpacity = (tone === "dark" ? 0.22 : 0.16) * mult
  const imgBlend = "multiply" as const


  return (
    <div className={className} aria-hidden="true">
      {/* Paper-cut reference texture */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/assets/site-background/topo_ref.png)",
          opacity: imgOpacity,
          mixBlendMode: imgBlend,
        }}
      />


    </div>
  )
}
