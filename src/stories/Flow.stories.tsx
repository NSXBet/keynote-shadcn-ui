import type { Meta, StoryObj } from "@storybook/react-vite"
import { Flow } from "../index"

const meta: Meta<typeof Flow> = {
  title: "Keynote/Flow",
  component: Flow,
}
export default meta

export const Journey: StoryObj<typeof Flow> = {
  render: () => (
    <div style={{ padding: "2rem", background: "var(--kn-background)" }}>
      <Flow
        steps={[
          { label: "Why?" },
          { label: "Reliable?" },
          { label: "What to Move?", tone: "accent" },
          { label: "What to Protect?", tone: "warning" },
          { label: "How to Run It?" },
          { label: "Ship?", tone: "success" },
          { label: "How to Repeat It?" },
        ]}
      />
    </div>
  ),
}

export const Equation: StoryObj<typeof Flow> = {
  render: () => (
    <div style={{ padding: "2rem", background: "var(--kn-background)" }}>
      <Flow
        steps={[
          { label: "1/3 ship rate" },
          { label: "3 experiments" },
          { label: "2 weeks" },
          { label: "~6 weeks per ship", tone: "success" },
        ]}
        arrow="→"
      />
    </div>
  ),
}
