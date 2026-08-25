import * as React from "react"

/* Shared chart infrastructure — the shadcn chart pattern:
 * ChartConfig maps series keys -> {label, color}; colors come from
 * --kn-chart-N tokens so charts re-theme with the deck.
 * Every chart type reuses tooltip, legend, and the config contract. */

export interface ChartConfigEntry {
  label: string
  color?: string
}
export type ChartConfig = Record<string, ChartConfigEntry>

const varCache = new Map<string, string>()

/* Recharts writes fill/stroke as SVG *attributes*, which do NOT resolve CSS
 * var() (only CSS properties do). Resolve a `var(--kn-*)` token to its
 * computed value so SVG attributes get a real color. Non-var colors pass
 * through unchanged. */
export function resolveColor(color: string): string {
  if (!color.startsWith("var(")) return color
  const cached = varCache.get(color)
  if (cached) return cached
  const name = color.slice(4, -1).trim()
  let resolved = color
  if (typeof window !== "undefined") {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    if (v) resolved = v
  }
  varCache.set(color, resolved)
  return resolved
}

export function seriesColor(config: ChartConfig, key: string, index: number): string {
  return resolveColor(config[key]?.color ?? `var(--kn-chart-${(index % 8) + 1})`)
}

export function ChartTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: ReadonlyArray<{ name?: string; value?: number | string; color?: string }>
  label?: string | number
}) {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        background: "var(--kn-background)",
        border: "1px solid var(--kn-border)",
        borderRadius: "var(--kn-radius)",
        padding: "0.5rem 0.75rem",
        fontSize: "0.9rem",
        boxShadow: "0 8px 30px rgba(0,0,0,.18)",
      }}
    >
      {label != null && (
        <div style={{ color: "var(--kn-muted)", marginBottom: "0.25rem" }}>{label}</div>
      )}
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              width: "0.7em",
              height: "0.7em",
              borderRadius: 2,
              background: p.color ?? "var(--kn-chart-1)",
              flex: "0 0 auto",
            }}
          />
          <span style={{ color: "var(--kn-foreground)", fontWeight: 600 }}>{p.name}</span>
          <span style={{ color: "var(--kn-muted)", marginLeft: "auto" }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export function ChartLegend({ config, keys }: { config: ChartConfig; keys: string[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.9rem",
        marginTop: "0.75rem",
        fontSize: "0.9rem",
      }}
    >
      {keys.map((key, i) => (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              width: "0.8em",
              height: "0.8em",
              borderRadius: 3,
              background: seriesColor(config, key, i),
              flex: "0 0 auto",
            }}
          />
          <span style={{ color: "var(--kn-foreground)" }}>{config[key]?.label ?? key}</span>
        </div>
      ))}
    </div>
  )
}

export const axisStyle = {
  stroke: resolveColor("var(--kn-muted)"),
  fontSize: 12,
  fontWeight: 500,
} as const
export const gridStyle = {
  stroke: resolveColor("var(--kn-chart-grid)"),
  strokeDasharray: "3 3",
} as const
