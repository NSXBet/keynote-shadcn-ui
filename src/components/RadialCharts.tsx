import * as React from "react"
import {
  Radar,
  RadarChart as RRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart as RRadialBarChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  ChartConfig,
  ChartTooltipContent,
  ChartLegend,
  seriesColor,
  axisStyle,
} from "./ChartCore"

/* RadarChart — metric/skill polygons.
 *   data = [{ metric: "Design", a: 80, b: 60 }, ...]
 *   series = config keys to plot. */

export interface RadarChartProps {
  data: Array<Record<string, string | number>>
  config: ChartConfig
  series: string[]
  angleKey?: string
  height?: number
  showLegend?: boolean
}

export function RadarChart({
  data,
  config,
  series,
  angleKey = "metric",
  height = 300,
  showLegend = true,
}: RadarChartProps) {
  const colors = series.map((k, i) => seriesColor(config, k, i))
  return (
    <div className="kn-chart" style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={height}>
        <RRadarChart data={data} margin={{ top: 12, right: 24, bottom: 12, left: 24 }}>
          <PolarGrid stroke="var(--kn-chart-grid)" />
          <PolarAngleAxis dataKey={angleKey} tick={axisStyle} />
          <PolarRadiusAxis tick={false} axisLine={false} />
          <Tooltip content={<ChartTooltipContent />} />
          {series.map((key, i) => (
            <Radar
              key={key}
              dataKey={key}
              name={config[key]?.label ?? key}
              stroke={colors[i]}
              fill={colors[i]}
              fillOpacity={0.3}
            />
          ))}
        </RRadarChart>
      </ResponsiveContainer>
      {showLegend && <ChartLegend config={config} keys={series} />}
    </div>
  )
}

/* RadialChart — progress / gauge (radial-bar).
 *   data = [{ name: "Progress", value: 72, fill: token } per slice, or use config] */

export interface RadialSlice {
  key: string
  value: number
}
export interface RadialChartProps {
  slices: RadialSlice[]
  config: ChartConfig
  height?: number
  /** 0..100 max for the gauge track (default 100) */
  max?: number
  centerValue?: string
  centerLabel?: string
  showLegend?: boolean
}

export function RadialChart({
  slices,
  config,
  height = 280,
  max = 100,
  centerValue,
  centerLabel,
  showLegend = true,
}: RadialChartProps) {
  const data = slices.map((s, i) => ({
    name: config[s.key]?.label ?? s.key,
    value: s.value,
    fill: seriesColor(config, s.key, i),
  }))
  return (
    <div className="kn-chart" style={{ width: "100%", position: "relative" }}>
      <ResponsiveContainer width="100%" height={height}>
        <RRadialBarChart
          data={data}
          innerRadius="55%"
          outerRadius="95%"
          startAngle={90}
          endAngle={-270}
        >
          <PolarRadiusAxis domain={[0, max]} tick={false} axisLine={false} />
          <RadialBar dataKey="value" cornerRadius={6} background={{ fill: "var(--kn-card)" }} />
          <Tooltip content={<ChartTooltipContent />} />
        </RRadialBarChart>
      </ResponsiveContainer>
      {(centerValue || centerLabel) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {centerValue && (
            <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--kn-foreground)", letterSpacing: "-0.02em" }}>
              {centerValue}
            </span>
          )}
          {centerLabel && <span style={{ fontSize: "0.9rem", color: "var(--kn-muted)" }}>{centerLabel}</span>}
        </div>
      )}
      {showLegend && <ChartLegend config={config} keys={slices.map((s) => s.key)} />}
    </div>
  )
}
