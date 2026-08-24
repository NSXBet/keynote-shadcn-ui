import * as React from "react"

/* Text primitives — Title, Subtitle, Body, Caption, Kicker, Tag.
 * All color goes through role tokens, never raw hex. */

export function Kicker({ children, style, ...p }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      style={{
        fontFamily: "var(--kn-font-sans)",
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
        fontFamily: "var(--kn-font-display)",
        fontSize: "var(--kn-text-display)",
        lineHeight: 0.96,
        fontWeight: 800,
        letterSpacing: "-0.03em",
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
        fontFamily: "var(--kn-font-display)",
        fontSize: "var(--kn-text-title)",
        lineHeight: 1.04,
        fontWeight: 760,
        letterSpacing: "-0.025em",
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
        fontFamily: "var(--kn-font-sans)",
        fontSize: "var(--kn-text-body)",
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
        fontFamily: "var(--kn-font-sans)",
        fontSize: "var(--kn-text-caption)",
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
    default: { background: "var(--kn-card)", color: "var(--kn-muted)", border: "1px solid var(--kn-border-strong)" },
  }
  return (
    <span
      style={{
        fontFamily: "var(--kn-font-sans)",
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
const role = (color: string, extra?: React.CSSProperties) => (p: React.HTMLAttributes<HTMLSpanElement>) => (
  <span style={{ fontFamily: "var(--kn-font-sans)", color, ...extra, ...p.style }} {...p} />
)
export const Pop = role("var(--kn-success)", { fontWeight: 700 })
export const Dim = role("var(--kn-muted)")
export const Warn = role("var(--kn-warning)")
export const Bad = role("var(--kn-danger)")
