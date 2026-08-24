import * as React from "react"

/* Text primitives — Title, Subtitle, Body, Caption, Kicker, Tag.
 * All color goes through role tokens, never raw hex. */

export function Kicker({ children, style, ...p }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      style={{
        display: "block",
        fontSize: "0.85rem",
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        color: "var(--kn-accent)",
        fontWeight: 700,
        marginBottom: "1rem",
        ...style,
      }}
      {...p}
    >
      {children}
    </span>
  )
}

export function Title({ children, style, ...p }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      style={{
        fontSize: "clamp(3rem,6vw,5.5rem)",
        lineHeight: 0.98,
        fontWeight: 850,
        letterSpacing: "-0.045em",
        color: "var(--kn-foreground)",
        fontStyle: "normal",
        margin: 0,
        ...style,
      }}
      {...p}
    >
      {children}
    </h1>
  )
}

export function Subtitle({ children, style, ...p }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      style={{
        fontSize: "clamp(2rem,3.4vw,3.2rem)",
        lineHeight: 1.05,
        fontWeight: 780,
        letterSpacing: "-0.035em",
        color: "var(--kn-foreground)",
        fontStyle: "normal",
        margin: 0,
        ...style,
      }}
      {...p}
    >
      {children}
    </h2>
  )
}

export function Body({ children, style, ...p }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      style={{
        fontSize: "clamp(1.15rem,1.7vw,1.5rem)",
        lineHeight: 1.45,
        color: "var(--kn-foreground)",
        ...style,
      }}
      {...p}
    >
      {children}
    </p>
  )
}

export function Caption({ children, style, ...p }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      style={{
        fontSize: "0.95rem",
        fontStyle: "italic",
        color: "var(--kn-muted)",
        ...style,
      }}
      {...p}
    >
      {children}
    </p>
  )
}

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "goal" | "guard" | "default"
}

export function Tag({ variant = "default", children, style, ...p }: TagProps) {
  const colors: Record<string, React.CSSProperties> = {
    goal: { background: "color-mix(in srgb, var(--kn-success) 18%, transparent)", color: "var(--kn-success)" },
    guard: { background: "color-mix(in srgb, var(--kn-warning) 20%, transparent)", color: "var(--kn-warning)" },
    default: { background: "var(--kn-card)", color: "var(--kn-muted)" },
  }
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        padding: "0.2em 0.6em",
        borderRadius: "999px",
        verticalAlign: "middle",
        ...colors[variant],
        ...style,
      }}
      {...p}
    >
      {children}
    </span>
  )
}

/* inline emphasis roles */
export const Pop = (p: React.HTMLAttributes<HTMLSpanElement>) => (
  <span style={{ color: "var(--kn-success)", fontWeight: 700, ...p.style }} {...p} />
)
export const Dim = (p: React.HTMLAttributes<HTMLSpanElement>) => (
  <span style={{ color: "var(--kn-muted)", ...p.style }} {...p} />
)
export const Warn = (p: React.HTMLAttributes<HTMLSpanElement>) => (
  <span style={{ color: "var(--kn-warning)", ...p.style }} {...p} />
)
export const Bad = (p: React.HTMLAttributes<HTMLSpanElement>) => (
  <span style={{ color: "var(--kn-danger)", ...p.style }} {...p} />
)
