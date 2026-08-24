import * as React from "react"
import { Slide } from "./Slide"
import { Kicker, Title } from "./Text"

/* Presentation-specific components with no generic-shadcn analog. */

/* Section — a content group: kicker + subtitle heading + body. The
 * non-hero counterpart to SectionSlide; groups one idea's content. */
export function Section({
  kicker,
  heading,
  children,
}: {
  kicker?: React.ReactNode
  heading?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className="kn-section" style={{ marginBottom: "1.5rem" }}>
      {kicker != null && <Kicker>{kicker}</Kicker>}
      {heading != null && (
        <h2
          style={{
            fontSize: "clamp(2rem,3.4vw,3.2rem)",
            lineHeight: 1.05,
            fontWeight: 780,
            letterSpacing: "-0.035em",
            color: "var(--kn-foreground)",
            fontStyle: "normal",
            margin: 0,
          }}
        >
          {heading}
        </h2>
      )}
      {children}
    </section>
  )
}

/* SectionDivider — a full-slide section break (kicker + big title). */
export function SectionDivider({
  kicker,
  title,
  subtitle,
  image,
}: {
  kicker?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  image?: string
}) {
  return (
    <Slide hero image={image}>
      {kicker != null && <Kicker>{kicker}</Kicker>}
      <Title style={{ maxWidth: "16ch", marginLeft: "auto", marginRight: "auto" }}>{title}</Title>
      {subtitle != null && (
        <p style={{ fontSize: "clamp(1.2rem,2vw,1.7rem)", color: "var(--kn-muted)", maxWidth: "44ch", margin: "1rem auto 0" }}>
          {subtitle}
        </p>
      )}
    </Slide>
  )
}

/* SectionSlide — the hero slide that opens a section. Same as SectionDivider;
 * the clearer name. */
export const SectionSlide = SectionDivider

/* Stat — a big hero number (the "25,000 tests/year" treatment). */
export function Stat({
  value,
  label,
  tone = "accent",
}: {
  value: React.ReactNode
  label?: React.ReactNode
  tone?: "accent" | "success" | "warning" | "danger" | "default"
}) {
  const color =
    tone === "accent"
      ? "var(--kn-accent)"
      : tone === "success"
        ? "var(--kn-success)"
        : tone === "warning"
          ? "var(--kn-warning)"
          : tone === "danger"
            ? "var(--kn-danger)"
            : "var(--kn-foreground)"
  return (
    <div className="kn-stat" style={{ textAlign: "center" }}>
      <div style={{ fontSize: "clamp(2.6rem,6vw,4.5rem)", fontWeight: 800, letterSpacing: "-0.03em", color }}>{value}</div>
      {label != null && <div style={{ color: "var(--kn-muted)", fontSize: "1rem", marginTop: "0.25rem" }}>{label}</div>}
    </div>
  )
}

/* Quote — blockquote with attribution. */
export function Quote({ children, cite }: { children: React.ReactNode; cite?: React.ReactNode }) {
  return (
    <blockquote
      className="kn-quote"
      style={{
        margin: 0,
        paddingLeft: "1.25rem",
        borderLeft: "3px solid var(--kn-accent)",
        fontStyle: "italic",
        fontSize: "clamp(1.2rem,2vw,1.6rem)",
        color: "var(--kn-foreground)",
      }}
    >
      {children}
      {cite != null && (
        <footer style={{ fontStyle: "normal", fontSize: "0.95rem", color: "var(--kn-muted)", marginTop: "0.5rem" }}>
          — {cite}
        </footer>
      )}
    </blockquote>
  )
}

/* SpeakerNotes — presenter-visible notes, hidden from the deck. */
export function SpeakerNotes({ children }: { children: React.ReactNode }) {
  return (
    <aside className="kn-speaker-notes" style={{ display: "none" }} aria-hidden>
      {children}
    </aside>
  )
}
