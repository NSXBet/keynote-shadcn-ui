import * as React from "react"
import {
  Bar,
  BarChart as RBarChart,
  Line,
  LineChart as RLineChart,
  Area,
  AreaChart as RAreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  ChartConfig,
  ChartTooltipContent,
  ChartLegend,
  seriesColor,
  axisStyle,
  gridStyle,
  resolveColor,
} from "./ChartCore"

/* Categorical charts (Bar / Line / Area) — one data shape:
 *   data = [{ month: "Jan", desktop: 186, mobile: 80 }, ...]
 *   config = { desktop: {label, color}, mobile: {label, color} }
 * series = which config keys to plot. Mirrors shadcn bar/line/area charts. */

export interface CategoricalChartProps {
  data: Array<Record<string, string | number>>
  config: ChartConfig
  /** config keys to plot, in order */
  series: string[]
  /** the x-axis dataKey (default "name") */
  xKey?: string
  height?: number
  stacked?: boolean
  showLegend?: boolean
  showGrid?: boolean
}

function useSeries(config: ChartConfig, series: string[]) {
  return { keys: series, colors: series.map((k, i) => seriesColor(config, k, i)) }
}

export function BarChart({
  data,
  config,
  series,
  xKey = "name",
  height = 260,
  stacked = false,
  showLegend = true,
  showGrid = true,
}: CategoricalChartProps) {
  const { keys, colors } = useSeries(config, series)
  return (
    <div className="kn-chart" style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={height}>
        <RBarChart data={data} margin={{ left: 8, right: 8, top: 8 }}>
          {showGrid && <CartesianGrid vertical={false} {...gridStyle} />}
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} tick={axisStyle} />
          <YAxis tickLine={false} axisLine={false} tick={axisStyle} width={36} />
          <Tooltip cursor={{ fill: resolveColor("var(--kn-border)") }} content={<ChartTooltipContent />} />
          {keys.map((key, i) => (
            <Bar
              key={key}
              dataKey={key}
              name={config[key]?.label ?? key}
              fill={colors[i]}
              stackId={stacked ? "a" : undefined}
              radius={stacked ? 0 : [4, 4, 0, 0]}
            />
          ))}
        </RBarChart>
      </ResponsiveContainer>
      {showLegend && <ChartLegend config={config} keys={keys} />}
    </div>
  )
}

export function LineChart({
  data,
  config,
  series,
  xKey = "name",
  height = 260,
  showLegend = true,
  showGrid = true,
}: CategoricalChartProps) {
  const { keys, colors } = useSeries(config, series)
  return (
    <div className="kn-chart" style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={height}>
        <RLineChart data={data} margin={{ left: 8, right: 8, top: 8 }}>
          {showGrid && <CartesianGrid vertical={false} {...gridStyle} />}
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} tick={axisStyle} />
          <YAxis tickLine={false} axisLine={false} tick={axisStyle} width={36} />
          <Tooltip content={<ChartTooltipContent />} />
          {keys.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={config[key]?.label ?? key}
              stroke={colors[i]}
              strokeWidth={2}
              dot={{ r: 3, fill: colors[i] }}
              activeDot={{ r: 5 }}
            />
          ))}
        </RLineChart>
      </ResponsiveContainer>
      {showLegend && <ChartLegend config={config} keys={keys} />}
    </div>
  )
}

export function AreaChart({
  data,
  config,
  series,
  xKey = "name",
  height = 260,
  stacked = false,
  showLegend = true,
  showGrid = true,
}: CategoricalChartProps) {
  const { keys, colors } = useSeries(config, series)
  return (
    <div className="kn-chart" style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={height}>
        <RAreaChart data={data} margin={{ left: 8, right: 8, top: 8 }}>
          {showGrid && <CartesianGrid vertical={false} {...gridStyle} />}
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} tick={axisStyle} />
          <YAxis tickLine={false} axisLine={false} tick={axisStyle} width={36} />
          <Tooltip content={<ChartTooltipContent />} />
          {keys.map((key, i) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              name={config[key]?.label ?? key}
              stroke={colors[i]}
              fill={colors[i]}
              fillOpacity={0.25}
              stackId={stacked ? "a" : undefined}
            />
          ))}
        </RAreaChart>
      </ResponsiveContainer>
      {showLegend && <ChartLegend config={config} keys={keys} />}
    </div>
  )
}
