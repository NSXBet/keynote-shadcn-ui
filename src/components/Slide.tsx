import * as React from "react"

export interface SlideProps extends React.HTMLAttributes<HTMLElement> {
  /** render as a centered full-bleed hero slide */
  hero?: boolean
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
  image,
  imagePosition = "center",
  scrimOpacity = 0.72,
  className = "",
  style,
  children,
  ...props
}: SlideProps) {
  const base: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: hero ? "center" : "flex-start",
    alignItems: hero ? "center" : "stretch",
    textAlign: hero ? "center" : "left",
    padding: hero ? "6rem" : "4.5rem 5rem",
    minHeight: "100%",
    background: "var(--kn-background)",
    color: "var(--kn-foreground)",
    fontFamily: "var(--kn-font-sans)",
    overflow: "hidden",
    boxSizing: "border-box",
    ...style,
  }
  return (
    <section className={`kn-slide ${hero ? "kn-slide-hero" : ""} ${className}`} style={base} {...props}>
      {hero && image && (
        <>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${image})`,
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
              background: `radial-gradient(ellipse 55% 45% at 50% 50%, rgba(13,17,23,${scrimOpacity}), rgba(13,17,23,${scrimOpacity * 0.25}) 78%)`,
              zIndex: 1,
            }}
          />
        </>
      )}
      <div style={{ position: "relative", zIndex: 2, width: "100%" }}>{children}</div>
    </section>
  )
}
