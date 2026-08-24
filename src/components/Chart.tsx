import * as React from "react"
import {
  Pie,
  PieChart,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

/* Chart — Recharts under the hood, following the shadcn/ui chart pattern:
 * a ChartConfig maps series keys -> {label, color}; colors come from
 * --kn-chart-N tokens so charts re-theme with the slide deck.
 * This mirrors https://ui.shadcn.com/docs/components/chart (donut-with-text).
 */

export interface ChartConfigEntry {
  label: string
  color?: string
}
export type ChartConfig = Record<string, ChartConfigEntry>

export interface DonutSlice {
  /** key into chartConfig */
  key: string
  value: number
}

export interface DonutChartProps {
  slices: DonutSlice[]
  config: ChartConfig
  /** square size in px (default 250, shadcn max-h) */
  size?: number
  /** big center value (e.g. "~1/3"); omit for none */
  centerValue?: string
  /** small center label under the value (e.g. "of ideas win") */
  centerLabel?: string
  /** donut hole ratio 0..1 (default 0.6, shadcn innerRadius=60) */
  innerRadius?: number
}

export function DonutChart({
  slices,
  config,
  size = 250,
  centerValue,
  centerLabel,
  innerRadius = 0.6,
}: DonutChartProps) {
  const data = slices.map((s) => ({
    name: config[s.key]?.label ?? s.key,
    value: s.value,
    fill: config[s.key]?.color ?? "var(--kn-chart-1)",
  }))
  return (
    <div className="kn-chart" style={{ width: "100%", maxWidth: size }}>
      <ResponsiveContainer width="100%" height={size}>
        <PieChart>
          <Tooltip
            cursor={false}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              const p = payload[0]
              const total = slices.reduce((a, s) => a + s.value, 0)
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
                  <div style={{ color: "var(--kn-foreground)", fontWeight: 600 }}>{p.name}</div>
                  <div style={{ color: "var(--kn-muted)" }}>
                    {p.value} ({(((p.value as number) / total) * 100).toFixed(0)}%)
                  </div>
                </div>
              )
            }}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={`${innerRadius * 100}%`}
            outerRadius="92%"
            stroke="var(--kn-background)"
            strokeWidth={5}
          >
            {(centerValue || centerLabel) && (
              <Label
                content={({ viewBox }: { viewBox?: unknown }) => {
                  if (viewBox && typeof viewBox === "object" && "cx" in viewBox && "cy" in viewBox) {
                    const { cx, cy } = viewBox as { cx: number; cy: number }
                    return (
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                        {centerValue && (
                          <tspan
                            x={cx}
                            y={cy}
                            style={{
                              fontSize: "2rem",
                              fontWeight: 800,
                              fill: "var(--kn-foreground)",
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {centerValue}
                          </tspan>
                        )}
                        {centerLabel && (
                          <tspan
                            x={cx}
                            y={cy + (centerValue ? 26 : 0)}
                            style={{ fontSize: "0.9rem", fill: "var(--kn-muted)" }}
                          >
                            {centerLabel}
                          </tspan>
                        )}
                      </text>
                    )
                  }
                  return null
                }}
              />
            )}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* shadcn-style legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.75rem" }}>
        {slices.map((s) => (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem" }}>
            <span
              style={{
                width: "0.8em",
                height: "0.8em",
                borderRadius: 3,
                background: config[s.key]?.color ?? "var(--kn-chart-1)",
                flex: "0 0 auto",
              }}
            />
            <span style={{ color: "var(--kn-foreground)" }}>{config[s.key]?.label ?? s.key}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
