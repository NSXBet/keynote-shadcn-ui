import * as React from "react"

/* SlideTransition — animate a slide in when it becomes active.
 * Wraps slide content; the active slide animates on mount. Use inside <Deck>. */

export type SlideTransition = "fade" | "slide-left" | "slide-right" | "zoom" | "none"

export interface SlideTransitionProps {
  children: React.ReactNode
  /** entrance animation (default "fade") */
  transition?: SlideTransition
  /** duration ms (default 300) */
  durationMs?: number
  className?: string
  style?: React.CSSProperties
}

const enterFrom: Record<SlideTransition, React.CSSProperties> = {
  none: {},
  fade: { opacity: 0 },
  "slide-left": { opacity: 0, transform: "translateX(48px)" },
  "slide-right": { opacity: 0, transform: "translateX(-48px)" },
  zoom: { opacity: 0, transform: "scale(1.04)" },
}
const entered: React.CSSProperties = { opacity: 1, transform: "none" }

export function SlideTransitionView({
  children,
  transition = "fade",
  durationMs = 300,
  className = "",
  style,
}: SlideTransitionProps) {
  const [in_, setIn] = React.useState(false)
  React.useEffect(() => {
    const t = requestAnimationFrame(() => setIn(true))
    return () => cancelAnimationFrame(t)
  }, [])
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

  const base: React.CSSProperties =
    reduced || transition === "none"
      ? {}
      : {
          transition: `opacity ${durationMs}ms var(--kn-ease-out), transform ${durationMs}ms var(--kn-ease-out)`,
          ...(in_ ? entered : enterFrom[transition]),
        }

  return (
    <div className={`kn-slide-transition ${className}`} style={{ width: "100%", height: "100%", ...base, ...style }}>
      {children}
    </div>
  )
}
