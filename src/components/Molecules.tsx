import * as React from "react"
import { Slide } from "./Slide"
import { Kicker, Title, Subtitle, Body, Caption, Pop } from "./Text"
import { Stat } from "./Keynote"
import { MaskedImage, MaskShape } from "./MaskedImage"

/* Slide-template molecules — pre-composed layouts from the reference decks
 * (startup pitch-deck, corporate profile, portfolio). Each composes the
 * existing primitives + MaskedImage so a deck author drops in content. */

/* TitleSlide — opening cover: kicker + big title + presenter + optional masked image. */
export function TitleSlide({
  kicker,
  title,
  subtitle,
  presenter,
  image,
  imageShape = "arch",
}: {
  kicker?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  presenter?: React.ReactNode
  image?: string
  imageShape?: MaskShape
}) {
  return (
    <Slide hero={!!image} image={image} style={image ? undefined : {}}>
      {kicker != null && <Kicker>{kicker}</Kicker>}
      <Title style={{ maxWidth: "14ch" }}>{title}</Title>
      {subtitle != null && (
        <Body style={{ maxWidth: "44ch", marginTop: "1rem", color: "var(--kn-muted)" }}>{subtitle}</Body>
      )}
      {presenter != null && (
        <Caption style={{ marginTop: "2rem", textTransform: "uppercase", letterSpacing: "0.14em", fontStyle: "normal" }}>
          {presenter}
        </Caption>
      )}
    </Slide>
  )
}

/* AgendaSlide — numbered contents list with optional masked thumbnail. */
export function AgendaSlide({
  kicker = "Agenda",
  title = "Agenda",
  items,
  image,
  imageShape = "rounded",
}: {
  kicker?: React.ReactNode
  title?: React.ReactNode
  items: React.ReactNode[]
  image?: string
  imageShape?: MaskShape
}) {
  return (
    <Slide>
      {kicker != null && <Kicker>{kicker}</Kicker>}
      <Subtitle style={{ marginBottom: "1.5rem" }}>{title}</Subtitle>
      <div style={{ display: "grid", gridTemplateColumns: image ? "1fr 320px" : "1fr", gap: "2.5rem", alignItems: "start" }}>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
          {items.map((item, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "1.25rem",
                padding: "0.85rem 0",
                borderTop: i === 0 ? "none" : "1px solid var(--kn-border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--kn-font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "var(--kn-accent)",
                  fontVariantNumeric: "tabular-nums",
                  minWidth: "2ch",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: "var(--kn-text-body)", color: "var(--kn-foreground)" }}>{item}</span>
            </li>
          ))}
        </ol>
        {image && <MaskedImage src={image} shape={imageShape} alt="" aspectRatio="3 / 4" />}
      </div>
    </Slide>
  )
}

/* StatSlide — a row/grid of big stats. */
export function StatSlide({
  kicker,
  title,
  stats,
}: {
  kicker?: React.ReactNode
  title?: React.ReactNode
  stats: { value: React.ReactNode; label?: React.ReactNode; tone?: "accent" | "success" | "warning" | "danger" | "default" }[]
}) {
  return (
    <Slide>
      {kicker != null && <Kicker>{kicker}</Kicker>}
      {title != null && <Subtitle style={{ marginBottom: "2rem" }}>{title}</Subtitle>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(${Math.max(160, 480 / stats.length)}px, 1fr))`,
          gap: "2.5rem",
        }}
      >
        {stats.map((s, i) => (
          <Stat key={i} value={s.value} label={s.label} tone={s.tone} />
        ))}
      </div>
    </Slide>
  )
}

/* QuoteSlide — a centered large pull-quote with attribution. */
export function QuoteSlide({
  kicker,
  quote,
  cite,
}: {
  kicker?: React.ReactNode
  quote: React.ReactNode
  cite?: React.ReactNode
}) {
  return (
    <Slide hero style={{ alignItems: "center", textAlign: "center" }}>
      {kicker != null && <Kicker>{kicker}</Kicker>}
      <blockquote
        style={{
          margin: 0,
          maxWidth: "26ch",
          fontFamily: "var(--kn-font-display)",
          fontSize: "clamp(1.8rem,3.4vw,3rem)",
          lineHeight: 1.15,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--kn-foreground)",
          fontStyle: "normal",
        }}
      >
        {quote}
      </blockquote>
      {cite != null && (
        <Caption style={{ marginTop: "1.5rem", fontStyle: "normal", letterSpacing: "0.06em" }}>— {cite}</Caption>
      )}
    </Slide>
  )
}

/* TwoColumnSlide — masked image one side, kicker+title+body+bullets other. */
export function TwoColumnSlide({
  kicker,
  title,
  body,
  bullets,
  image,
  imageShape = "arch",
  imageSide = "right",
}: {
  kicker?: React.ReactNode
  title: React.ReactNode
  body?: React.ReactNode
  bullets?: React.ReactNode[]
  image: string
  imageShape?: MaskShape
  imageSide?: "left" | "right"
}) {
  const text = (
    <div key="t">
      {kicker != null && <Kicker>{kicker}</Kicker>}
      <Subtitle style={{ marginBottom: "1rem" }}>{title}</Subtitle>
      {body != null && <Body style={{ color: "var(--kn-muted)", marginBottom: bullets ? "1.25rem" : 0 }}>{body}</Body>}
      {bullets && (
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", fontSize: "var(--kn-text-body)", color: "var(--kn-foreground)" }}>
              <span aria-hidden style={{ color: "var(--kn-accent)", fontWeight: 700, flex: "0 0 auto" }}>▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
  const img = <MaskedImage key="i" src={image} shape={imageShape} alt="" aspectRatio="4 / 5" width={400} />
  return (
    <Slide>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }}>
        {imageSide === "right" ? [text, img] : [img, text]}
      </div>
    </Slide>
  )
}

/* TeamSlide — a row of masked portraits with name + role. */
export function TeamSlide({
  kicker,
  title,
  members,
  imageShape = "arch",
}: {
  kicker?: React.ReactNode
  title?: React.ReactNode
  members: { name: string; role?: string; image: string }[]
  imageShape?: MaskShape
}) {
  return (
    <Slide>
      {kicker != null && <Kicker>{kicker}</Kicker>}
      {title != null && <Subtitle style={{ marginBottom: "2rem" }}>{title}</Subtitle>}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${members.length}, 1fr)`, gap: "1.5rem" }}>
        {members.map((m, i) => (
          <figure key={i} style={{ margin: 0 }}>
            <MaskedImage src={m.image} shape={imageShape} alt={m.name} aspectRatio="3 / 4" />
            <figcaption style={{ marginTop: "0.75rem" }}>
              <div style={{ fontFamily: "var(--kn-font-display)", fontWeight: 700, color: "var(--kn-foreground)" }}>{m.name}</div>
              {m.role && <div style={{ fontSize: "0.9rem", color: "var(--kn-muted)" }}>{m.role}</div>}
            </figcaption>
          </figure>
        ))}
      </div>
    </Slide>
  )
}

/* ClosingSlide — thank-you / CTA closer. */
export function ClosingSlide({
  kicker,
  title = "Thank you",
  subtitle,
  presenter,
}: {
  kicker?: React.ReactNode
  title?: React.ReactNode
  subtitle?: React.ReactNode
  presenter?: React.ReactNode
}) {
  return (
    <Slide hero style={{ alignItems: "center", textAlign: "center" }}>
      {kicker != null && <Kicker>{kicker}</Kicker>}
      <Title>{title}</Title>
      {subtitle != null && (
        <Body style={{ maxWidth: "44ch", marginTop: "1rem", color: "var(--kn-muted)" }}>{subtitle}</Body>
      )}
      {presenter != null && (
        <Caption style={{ marginTop: "2.5rem", textTransform: "uppercase", letterSpacing: "0.14em", fontStyle: "normal" }}>
          {presenter}
        </Caption>
      )}
    </Slide>
  )
}
