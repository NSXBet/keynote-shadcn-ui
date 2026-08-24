import type { Meta, StoryObj } from "@storybook/react-vite"
import { DonutChart, type ChartConfig } from "../index"

const meta: Meta<typeof DonutChart> = {
  title: "Keynote/Chart",
  component: DonutChart,
}
export default meta

const shipConfig = {
  shipped: { label: "Shipped", color: "var(--kn-success)" },
  flat: { label: "Flat / inconclusive", color: "var(--kn-muted)" },
  harmful: { label: "Harmful", color: "var(--kn-danger)" },
} satisfies ChartConfig

export const DonutWithText: StoryObj<typeof DonutChart> = {
  render: () => (
    <div style={{ padding: "2rem", background: "var(--kn-background)" }}>
      <DonutChart
        size={300}
        config={shipConfig}
        slices={[
          { key: "shipped", value: 1 },
          { key: "flat", value: 1 },
          { key: "harmful", value: 1 },
        ]}
        centerValue="~1/3"
        centerLabel="ship rate"
      />
    </div>
  ),
}

export const DonutNoCenter: StoryObj<typeof DonutChart> = {
  render: () => (
    <div style={{ padding: "2rem", background: "var(--kn-background)" }}>
      <DonutChart
        size={280}
        config={shipConfig}
        slices={[
          { key: "shipped", value: 2 },
          { key: "flat", value: 3 },
          { key: "harmful", value: 1 },
        ]}
      />
    </div>
  ),
}
