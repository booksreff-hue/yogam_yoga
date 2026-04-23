import React from "react"

/**
 * Yoga backdrop for the main content area.
 * - Background: #FFFFE6 (pale yellow)
 * - yog1–yog9 repeated across both gutters at staggered vertical positions.
 * - mix-blend-mode: multiply removes white backgrounds seamlessly.
 * - Poses are carefully spaced so none overlap each other.
 */

type Pose = {
    src: string
    side: "left" | "right"
    top: string       // CSS top value (percentage)
    offsetX: string   // how far into/out of the gutter
    size: string      // CSS width
    rotate: string    // CSS rotate value
    opacity: number
    flip?: boolean    // horizontally mirror
}

// Pixel tops are fixed values (no % recalculation on parent resize).
// Assumes ~6000px page height. Left column starts at 0px, steps ~840px.
// Right column is offset by ~420px so they interleave vertically.
const poses: Pose[] = [
    // ── LEFT GUTTER ──────────────────────────────────────────────────
    { src: "/assets/site-background/yog3.png", side: "left", top: "0px",    offsetX: "-30px", size: "480px", rotate: "-6deg",  opacity: 0.72 },
    { src: "/assets/site-background/yog7.png", side: "left", top: "630px",  offsetX: "-40px", size: "450px", rotate: "7deg",   opacity: 0.70 },
    { src: "/assets/site-background/yog5.png", side: "left", top: "1260px",  offsetX: "-50px", size: "440px", rotate: "9deg",   opacity: 0.68, flip: true },
    { src: "/assets/site-background/yog8.png", side: "left", top: "1890px", offsetX: "-35px", size: "460px", rotate: "-10deg", opacity: 0.72 },
    { src: "/assets/site-background/yog1.png", side: "left", top: "2520px", offsetX: "-40px", size: "460px", rotate: "-12deg", opacity: 0.74 },
    { src: "/assets/site-background/yog9.png", side: "left", top: "3150px", offsetX: "-45px", size: "440px", rotate: "5deg",   opacity: 0.66 },
    { src: "/assets/site-background/yog6.png", side: "left", top: "3780px", offsetX: "-20px", size: "450px", rotate: "5deg",   opacity: 0.70 },
    { src: "/assets/site-background/yog2.png", side: "left", top: "4410px", offsetX: "-50px", size: "480px", rotate: "-8deg",  opacity: 0.66, flip: true },
    { src: "/assets/site-background/yog4.png", side: "left", top: "5040px", offsetX: "-30px", size: "440px", rotate: "11deg",  opacity: 0.72 },

    // ── RIGHT GUTTER ─────────────────────────────────────────────────
    { src: "/assets/site-background/yog2.png", side: "right", top: "315px",  offsetX: "-35px", size: "480px", rotate: "8deg",   opacity: 0.72 },
    { src: "/assets/site-background/yog8.png", side: "right", top: "945px", offsetX: "-50px", size: "450px", rotate: "-10deg", opacity: 0.70 },
    { src: "/assets/site-background/yog4.png", side: "right", top: "1575px", offsetX: "-50px", size: "450px", rotate: "-10deg", opacity: 0.70 },
    { src: "/assets/site-background/yog9.png", side: "right", top: "2205px", offsetX: "-30px", size: "470px", rotate: "8deg",   opacity: 0.74 },
    { src: "/assets/site-background/yog1.png", side: "right", top: "2835px", offsetX: "-45px", size: "440px", rotate: "-14deg", opacity: 0.68, flip: true },
    { src: "/assets/site-background/yog7.png", side: "right", top: "3465px", offsetX: "-40px", size: "460px", rotate: "4deg",   opacity: 0.70 },
    { src: "/assets/site-background/yog3.png", side: "right", top: "4095px", offsetX: "-55px", size: "480px", rotate: "-7deg",  opacity: 0.66 },
    { src: "/assets/site-background/yog5.png", side: "right", top: "4725px", offsetX: "-30px", size: "470px", rotate: "4deg",   opacity: 0.70, flip: true },
    { src: "/assets/site-background/yog6.png", side: "right", top: "5355px", offsetX: "-25px", size: "490px", rotate: "6deg",   opacity: 0.74 },
]

export default function YogaBackdrop() {
    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden yoga-backdrop-images" aria-hidden="true">
            <div className="absolute inset-0" style={{ backgroundColor: "#FFF78A" }} />

            {poses.map((pose, i) => {
                const sideStyle: React.CSSProperties =
                    pose.side === "left"
                        ? { left: pose.offsetX }
                        : { right: pose.offsetX }

                return (
                    <img
                        key={i}
                        src={pose.src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="absolute select-none hidden lg:block"
                        style={{
                            ...sideStyle,
                            top: pose.top,
                            width: pose.size,
                            opacity: pose.opacity,
                            mixBlendMode: "multiply" as React.CSSProperties["mixBlendMode"],
                            transform: `rotate(${pose.rotate})${pose.flip ? " scaleX(-1)" : ""}`,
                            willChange: "transform",
                        }}
                    />
                )
            })}
        </div>
    )
}
