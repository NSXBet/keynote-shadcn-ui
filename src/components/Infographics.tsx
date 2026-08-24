import * as React from "react"

/* ConeFunnel — an inverted 3D-style cone funnel (A→F tiers) like the reference.
 * Each tier is a horizontal band that narrows toward the bottom, with a label. */
export interface ConeTier {
  label: React.ReactNode
  sub?: React.ReactNode
  tone?: "default" | "accent"
}
export function ConeFunnel({ tiers, size = 360 }: { tiers: ConeTier[]; size?: number }) {
  const n = tiers.length
  return (
    <div
      className="kn-cone-funnel"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        width: size,
        margin: "0 auto",
      }}
    >
      {tiers.map((t, i) => {
        const w = 100 - (i / Math.max(n - 1, 1)) * 68 // 100% → ~32%
        const tone = t.tone ?? (i === 0 || i === n - 1 ? "accent" : "default")
        return (
          <div
            key={i}
            style={{
              width: `${w}%`,
              background: tone === "accent" ? "var(--kn-accent)" : "var(--kn-card)",
              color: tone === "accent" ? "var(--kn-primary-foreground)" : "var(--kn-foreground)",
              border: `1px solid ${tone === "accent" ? "var(--kn-accent)" : "var(--kn-border-strong)"}`,
              borderRadius: 6,
              padding: "0.55rem 0.9rem",
              textAlign: "center",
              boxShadow: "var(--kn-shadow-sm)",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: "0.95rem", fontVariantNumeric: "tabular-nums" }}>{t.label}</div>
            {t.sub != null && (
              <div style={{ fontSize: "0.78rem", opacity: 0.85, color: tone === "accent" ? "inherit" : "var(--kn-muted)" }}>{t.sub}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* Honeycomb — a central hexagon hub with satellite hexagons + callout cards. */
export interface HoneycombCell {
  label: React.ReactNode
  value?: React.ReactNode
  tone?: "default" | "accent"
}
export function Honeycomb({
  center,
  cells,
  size = 380,
}: {
  center: { label: React.ReactNode; value?: React.ReactNode }
  cells: HoneycombCell[]
  size?: number
}) {
  const n = cells.length
  const r = size / 2
  const hub = size * 0.2
  const sat = size * 0.16
  const hexPath = (cx: number, cy: number, s: number) => {
    const pts = Array.from({ length: 6 }, (_, k) => {
      const a = (Math.PI / 3) * k - Math.PI / 6
      return `${cx + s * Math.cos(a)},${cy + s * Math.sin(a)}`
    })
    return `M${pts.join(" L")} Z`
  }
  return (
    <div className="kn-honeycomb" style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        {cells.map((_, i) => {
          const a = (i / n) * 2 * Math.PI - Math.PI / 2
          const cx = r + (r - sat) * Math.cos(a)
          const cy = r + (r - sat) * Math.sin(a)
          return <line key={i} x1={r} y1={r} x2={cx} y2={cy} stroke="var(--kn-border-strong)" strokeWidth="1.5" />
        })}
      </svg>
      {/* center hub */}
      <div
        style={{
          position: "absolute",
          left: r - hub / 2,
          top: r - hub / 2,
          width: hub,
          height: hub,
          clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
          background: "var(--kn-accent)",
          color: "var(--kn-primary-foreground)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0.5rem",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: "1rem", lineHeight: 1.1 }}>{center.label}</div>
        {center.value != null && <div style={{ fontSize: "0.8rem", opacity: 0.9 }}>{center.value}</div>}
      </div>
      {/* satellites */}
      {cells.map((c, i) => {
        const a = (i / n) * 2 * Math.PI - Math.PI / 2
        const cx = r + (r - sat) * Math.cos(a)
        const cy = r + (r - sat) * Math.sin(a)
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx - sat / 2,
              top: cy - sat / 2,
              width: sat,
              height: sat,
              clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              background: "var(--kn-card)",
              border: "1px solid var(--kn-border-strong)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0.35rem",
            }}
          >
            {c.value != null && (
              <div style={{ fontFamily: "var(--kn-font-display)", fontWeight: 800, fontSize: "1.1rem", color: "var(--kn-accent)", fontVariantNumeric: "tabular-nums" }}>
                {c.value}
              </div>
            )}
            <div style={{ fontSize: "0.72rem", color: "var(--kn-muted)", lineHeight: 1.1 }}>{c.label}</div>
          </div>
        )
      })}
    </div>
  )
}

/* PricingCards — a row of tier/pricing cards with a highlighted plan. */
export interface PricingTier {
  name: React.ReactNode
  price: React.ReactNode
  period?: React.ReactNode
  features?: React.ReactNode[]
  highlight?: boolean
  cta?: React.ReactNode
}
export function PricingCards({ tiers }: { tiers: PricingTier[] }) {
  return (
    <div
      className="kn-pricing"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${tiers.length}, 1fr)`,
        gap: "1.25rem",
        alignItems: "stretch",
      }}
    >
      {tiers.map((t, i) => (
        <div
          key={i}
          style={{
            background: "var(--kn-card)",
            border: `1px solid ${t.highlight ? "var(--kn-accent)" : "var(--kn-border)"}`,
            borderRadius: "var(--kn-radius-lg)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            boxShadow: t.highlight ? "var(--kn-shadow-md)" : "var(--kn-shadow-sm)",
          }}
        >
          <div style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--kn-muted)" }}>{t.name}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem" }}>
            <span style={{ fontFamily: "var(--kn-font-display)", fontSize: "2.4rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--kn-foreground)", fontVariantNumeric: "tabular-nums" }}>
              {t.price}
            </span>
            {t.period != null && <span style={{ color: "var(--kn-muted)" }}>{t.period}</span>}
          </div>
          {t.features && (
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem", flex: 1 }}>
              {t.features.map((f, j) => (
                <li key={j} style={{ display: "flex", gap: "0.5rem", fontSize: "0.9rem", color: "var(--kn-muted)" }}>
                  <span aria-hidden style={{ color: "var(--kn-accent)" }}>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}
          {t.cta != null && (
            <div
              style={{
                marginTop: "0.5rem",
                textAlign: "center",
                background: t.highlight ? "var(--kn-accent)" : "var(--kn-card)",
                color: t.highlight ? "var(--kn-primary-foreground)" : "var(--kn-accent)",
                border: `1px solid var(--kn-accent)`,
                borderRadius: "var(--kn-radius)",
                padding: "0.55rem 1rem",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              {t.cta}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
