import * as React from "react"

/* Part — a logical block inside a slide (title, diagram, quote…). When a slide
 * has 2+ Part children it defaults to "spread" so parts distribute over the frame. */
export function Part({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`kn-part ${className}`}>{children}</div>
}

export interface SlideProps extends React.HTMLAttributes<HTMLElement> {
  /** render as a centered full-bleed hero slide */
  hero?: boolean
  /** layout intent for non-hero slides (default "top"; auto = spread when ≥2 Parts) */
  layout?: "top" | "center" | "spread"
  /** hero background image (png/jpg/svg/base64 data-uri) */
  image?: string
  /** hero image object-position (default center) */
  imagePosition?: string
  /** scrim opacity 0..1 (default 0.72) */
  scrimOpacity?: number
  children?: React.ReactNode
}

/**
 * Slide — the base container for every keynote slide.
 * Hero variant: full-bleed cover image + dark scrim + centered content.
 */
export function Slide({
  hero = false,
  layout = "top",
  image,
  imagePosition = "center",
  scrimOpacity = 0.55,
  className = "",
  style,
  children,
  ...props
}: SlideProps) {
  // auto-spread when ≥2 Parts; explicit layout overrides.
  const resolvedLayout = React.useMemo(() => {
    if (layout !== "top" || hero) return layout
    const kids = React.Children.toArray(children)
    const partCount = kids.filter((c) => React.isValidElement(c) && c.type === Part).length
    return partCount >= 2 ? "spread" : layout
  }, [layout, hero, children])
  // every slide requires a title: dev-time guard. Counts as titled when any descendant
  // is an h1-h3 or carries .kn-title/.kn-subtitle. Heroes are exempt.
  const ref = React.useRef<HTMLElement>(null)
  React.useEffect(() => {
    if (hero) return
    const container = ref.current
    if (!container) return
    const hasTitle = !!container.querySelector("h1, h2, h3, .kn-title, .kn-subtitle, [data-kn-title]")
    const isProd = import.meta.env?.MODE === "production"
    if (!hasTitle && !isProd) {
      console.error(
        "[keynote] Slide is missing a title. Every slide must include <Title>, <Subtitle>, or an h1-h3 heading.",
        container
      )
    }
  })

  const base: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: hero ? "center" : resolvedLayout === "spread" ? "space-between" : resolvedLayout === "center" ? "center" : "flex-start",
    alignItems: hero ? "flex-start" : "stretch",
    textAlign: hero ? "left" : "left",
    padding: hero ? "6rem 7rem" : "4.5rem 5rem",
    minHeight: hero ? "100vh" : "100%",
    background: "var(--kn-background)",
    color: "var(--kn-foreground)",
    fontFamily: "var(--kn-font-sans)",
    overflow: "hidden",
    boxSizing: "border-box",
    ...style,
  }
  const domProps = { ...props } as Record<string, unknown>
  delete domProps.layout
  delete domProps.hero

  return (
    <section ref={ref} className={`kn-slide ${hero ? "kn-slide-hero" : ""} ${className}`} style={base} {...domProps}>
      {hero && image && (
        <>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${image}")`,
              backgroundSize: "cover",
              backgroundPosition: imagePosition,
              zIndex: 0,
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(90deg, rgba(10,14,22,${scrimOpacity}) 0%, rgba(10,14,22,${scrimOpacity * 0.55}) 45%, rgba(10,14,22,${scrimOpacity * 0.1}) 80%), radial-gradient(ellipse 70% 60% at 40% 55%, rgba(10,14,22,${scrimOpacity * 0.4}), transparent 75%)`,
              zIndex: 1,
            }}
          />
        </>
      )}
      {hero ? <div style={{ position: "relative", zIndex: 2, width: "100%" }}>{children}</div> : children}
    </section>
  )
}
