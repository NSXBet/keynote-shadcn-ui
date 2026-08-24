import type { Meta, StoryObj } from "@storybook/react-vite"
import { BarChart, LineChart, AreaChart, RadarChart, RadialChart, type ChartConfig } from "../index"

const meta: Meta = {
  title: "Keynote/Charts",
}
export default meta

const trafficConfig = {
  desktop: { label: "Desktop", color: "var(--kn-chart-1)" },
  mobile: { label: "Mobile", color: "var(--kn-chart-2)" },
} satisfies ChartConfig

const traffic = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const wrap = (node: React.ReactNode) => (
  <div style={{ padding: "2rem", background: "var(--kn-background)", maxWidth: 640 }}>{node}</div>
)

export const Bar: StoryObj = {
  render: () => wrap(<BarChart data={traffic} config={trafficConfig} series={["desktop", "mobile"]} xKey="month" />),
}
export const BarStacked: StoryObj = {
  render: () => wrap(<BarChart data={traffic} config={trafficConfig} series={["desktop", "mobile"]} xKey="month" stacked />),
}
export const Line: StoryObj = {
  render: () => wrap(<LineChart data={traffic} config={trafficConfig} series={["desktop", "mobile"]} xKey="month" />),
}
export const Area: StoryObj = {
  render: () => wrap(<AreaChart data={traffic} config={trafficConfig} series={["desktop", "mobile"]} xKey="month" />),
}
export const AreaStacked: StoryObj = {
  render: () => wrap(<AreaChart data={traffic} config={trafficConfig} series={["desktop", "mobile"]} xKey="month" stacked />),
}

const skillsConfig = {
  current: { label: "Current", color: "var(--kn-chart-1)" },
  target: { label: "Target", color: "var(--kn-chart-2)" },
} satisfies ChartConfig
const skills = [
  { metric: "Design", current: 70, target: 90 },
  { metric: "Build", current: 85, target: 90 },
  { metric: "Run", current: 60, target: 80 },
  { metric: "Analyze", current: 75, target: 95 },
  { metric: "Decide", current: 65, target: 85 },
]
export const Radar: StoryObj = {
  render: () => wrap(<RadarChart data={skills} config={skillsConfig} series={["current", "target"]} angleKey="metric" />),
}

const progressConfig = {
  done: { label: "Complete", color: "var(--kn-chart-2)" },
} satisfies ChartConfig
export const Radial: StoryObj = {
  render: () =>
    wrap(
      <RadialChart
        slices={[{ key: "done", value: 72 }]}
        config={progressConfig}
        centerValue="72%"
        centerLabel="complete"
      />
    ),
}
