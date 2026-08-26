import * as React from "react"
import { BuildScope, countFragments } from "./Fragment"

/* Deck — the chrome that turns a list of slides into a navigable keynote.
 * Keyboard nav (←/→, Home/End), N/M pager, top progress hairline, and an
 * ESC-triggered outline grid of all slides for quick navigation. */

export interface DeckProps {
  children: React.ReactNode[]
  /** start index (default 0) */
  initial?: number
  /** show the N/M pager (default true) */
  pager?: boolean
  /** show the top progress hairline (default true) */
  progress?: boolean
  /** ESC opens an outline grid of all slides (default true) */
  overview?: boolean
  /** called when the active slide changes */
  onSlide?: (index: number) => void
}

export function Deck({ children, initial = 0, pager = true, progress = true, overview = true, onSlide }: DeckProps) {
  const slides = React.Children.toArray(children)
  const count = slides.length
  // read initial index from URL hash (#3 = slide 3), so reload restores position
  const [index, setIndex] = React.useState(() => {
    if (typeof window === "undefined") return initial
    const m = window.location.hash.match(/^#\/?(\d+)$/)
    if (!m) return initial
    return Math.min(Math.max(parseInt(m[1], 10) - 1, 0), count - 1)
  })
  const interacted = React.useRef(false)

  // persist position to URL hash so reload/bookmark retains it (browser-only)
  React.useEffect(() => {
    if (!interacted.current) return
    // skip in test environments (vitest sets NODE_ENV=test)
    if (import.meta.env?.MODE === "test") return
    if (typeof window === "undefined") return
    try {
      window.history?.replaceState?.(null, "", `#/${index + 1}`)
    } catch {
      /* ignore */
    }
  }, [index])

  const [outline, setOutline] = React.useState(false)
  const [cursor, setCursor] = React.useState(0)
  const [pendingCursor, setPendingCursor] = React.useState<number | null>(null)
  const fragCounts = React.useMemo(() => slides.map((s) => countFragments(s)), [slides])

  // apply a pending cursor set after an index change, so back-navigation
  // restoring builds isn't overridden by go()'s own reset.
  React.useEffect(() => {
    if (pendingCursor !== null) {
      setCursor(pendingCursor)
      setPendingCursor(null)
    }
  }, [index, pendingCursor])

  const go = React.useCallback(
    (next: number, cursorOverride?: number) => {
      interacted.current = true
      setIndex((cur) => {
        const clamped = Math.min(Math.max(next, 0), count - 1)
        if (clamped !== cur) {
          onSlide?.(clamped)
          // start with the first build visible so the slide isn't blank on arrival
          if (cursorOverride === undefined) {
            const frags = fragCounts[clamped] ?? 0
            setCursor(frags > 0 ? 1 : 0)
          }
        }
        return clamped
      })
      if (cursorOverride !== undefined) setPendingCursor(cursorOverride)
    },
    [count, onSlide, fragCounts]
  )

  // next/prev honor in-slide builds: reveal next build, advance when none remain
  const next = React.useCallback(() => {
    const remaining = fragCounts[index] ?? 0
    if (cursor < remaining) setCursor((c) => c + 1)
    else go(index + 1)
  }, [cursor, index, fragCounts, go])

  const prev = React.useCallback(() => {
    // ← undoes ONE build (exits with inverse animation); at cursor 0, goes to prior slide
    if (cursor > 0) setCursor((c) => c - 1)
    else go(index - 1)
  }, [cursor, index, go, fragCounts])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && overview) {
        setOutline((o) => !o)
        return
      }
      if (outline) return
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") next()
      else if (e.key === "ArrowLeft" || e.key === "PageUp") prev()
      else if (e.key === "Home") go(0)
      else if (e.key === "End") go(count - 1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [index, count, go, next, prev, outline, overview])

  const jump = (i: number) => {
    go(i)
    setOutline(false)
  }

  return (
    <div className="kn-deck" style={{ position: "relative", width: "100%", height: "100vh" }}>
      {progress && (
        <div
          aria-hidden
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "color-mix(in srgb, var(--kn-foreground) 10%, transparent)",
            zIndex: 30,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${((index + 1) / count) * 100}%`,
              background: "var(--kn-success)",
              transition: "width .25s ease-out",
            }}
          />
        </div>
      )}
      <div style={{ width: "100%", height: "100%", minHeight: "100vh" }}>
        <BuildScope shown={cursor}>{slides[index]}</BuildScope>
      </div>
      {overview && outline && (
        <div
          role="dialog"
          aria-label="Slide outline"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "var(--kn-background)",
            overflow: "auto",
            padding: "4vh 4vw",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 14,
            alignContent: "center",
          }}
        >
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => jump(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              style={{
                textAlign: "left",
                cursor: "pointer",
                background: "var(--kn-card)",
                border: `1px solid ${i === index ? "var(--kn-accent)" : "var(--kn-border-strong)"}`,
                borderRadius: "var(--kn-radius)",
                padding: "0.6rem",
                overflow: "hidden",
                position: "relative",
                fontFamily: "var(--kn-font-sans)",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "0.4rem",
                  right: "0.5rem",
                  fontSize: "0.7rem",
                  color: "var(--kn-muted)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {i + 1}
              </span>
              <div
                aria-hidden
                style={{
                  pointerEvents: "none",
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  overflow: "hidden",
                  borderRadius: "var(--kn-radius-sm)",
                  background: "var(--kn-background)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "1280px",
                    height: "800px",
                    transform: "scale(0.16)",
                    transformOrigin: "top left",
                  }}
                >
                  {slide}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      {pager && (
        <button
          onClick={next}
          aria-label={`Slide ${index + 1} of ${count}. Next slide.`}
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1.25rem",
            zIndex: 30,
            color: "var(--kn-muted)",
            fontSize: "0.8rem",
            fontVariantNumeric: "tabular-nums",
            background: "transparent",
            border: "1px solid var(--kn-border)",
            borderRadius: 8,
            padding: "0.35rem 0.6rem",
            cursor: "pointer",
            fontFamily: "var(--kn-font-sans)",
          }}
        >
          {index + 1} / {count}
          {index < count - 1 ? " →" : ""}
        </button>
      )}
    </div>
  )
}
