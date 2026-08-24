import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { BarChart, LineChart, AreaChart, RadarChart, RadialChart } from "../index"

const config = {
  a: { label: "Alpha", color: "#2fd6a3" },
  b: { label: "Beta", color: "#9aa7bd" },
}
const data = [
  { x: "one", a: 10, b: 20 },
  { x: "two", a: 30, b: 40 },
]

// jsdom gives ResponsiveContainer 0×0, so chart bodies don't mount; the
// legend is the size-independent part and asserts config wiring.
describe("Categorical charts", () => {
  it("BarChart renders legend from config", () => {
    render(<BarChart data={data} config={config} series={["a", "b"]} xKey="x" />)
    expect(screen.getByText("Alpha")).toBeInTheDocument()
    expect(screen.getByText("Beta")).toBeInTheDocument()
  })
  it("LineChart renders legend", () => {
    render(<LineChart data={data} config={config} series={["a"]} xKey="x" />)
    expect(screen.getByText("Alpha")).toBeInTheDocument()
  })
  it("AreaChart renders legend", () => {
    render(<AreaChart data={data} config={config} series={["a", "b"]} xKey="x" />)
    expect(screen.getByText("Beta")).toBeInTheDocument()
  })
  it("charts can hide legend", () => {
    render(<BarChart data={data} config={config} series={["a"]} xKey="x" showLegend={false} />)
    expect(screen.queryByText("Alpha")).not.toBeInTheDocument()
  })
})

describe("RadarChart", () => {
  it("renders legend for series", () => {
    render(<RadarChart data={data} config={config} series={["a", "b"]} angleKey="x" />)
    expect(screen.getByText("Alpha")).toBeInTheDocument()
    expect(screen.getByText("Beta")).toBeInTheDocument()
  })
})

describe("RadialChart", () => {
  it("renders center value + label + legend", () => {
    render(
      <RadialChart
        slices={[{ key: "a", value: 72 }]}
        config={config}
        centerValue="72%"
        centerLabel="complete"
      />
    )
    expect(screen.getByText("72%")).toBeInTheDocument()
    expect(screen.getByText("complete")).toBeInTheDocument()
    expect(screen.getByText("Alpha")).toBeInTheDocument()
  })
})
