import type { Meta, StoryObj } from "@storybook/react-vite"
import { DecisionTree, Process, Timeline, Cycle, Comparison, Funnel } from "../index"

const meta: Meta = { title: "Keynote/Diagrams" }
export default meta

const wrap = (n: React.ReactNode) => (
  <div style={{ padding: "2rem", background: "var(--kn-background)", maxWidth: 720 }}>{n}</div>
)

export const Decision: StoryObj = {
  render: () =>
    wrap(
      <DecisionTree
        root="Goal significant?"
        branchArrowLabels={["yes", "no"]}
        branches={[
          { label: "Guardrails green?", tone: "accent", outcome: "Ship it" },
          { label: "Iterate / kill", tone: "danger", outcome: "Document learning" },
        ]}
      />
    ),
}

export const ProcessSteps: StoryObj = {
  render: () =>
    wrap(
      <Process
        steps={[
          { title: "Hypothesis", description: "Falsifiable, pre-registered", state: "done" },
          { title: "Design", description: "Goal + guardrails + MDE", state: "current" },
          { title: "Run", description: "Coordinated traffic", state: "todo" },
          { title: "Decide", description: "Ship / iterate / kill", state: "todo" },
        ]}
      />
    ),
}

export const TimelineEvents: StoryObj = {
  render: () =>
    wrap(
      <Timeline
        items={[
          { title: "Signup", description: "User creates account" },
          { title: "Onboard", description: "KYC passed" },
          { title: "First deposit", description: "FTD" },
          { title: "First bet", description: "FTB" },
        ]}
      />
    ),
}

export const CycleLoop: StoryObj = {
  render: () =>
    wrap(
      <Cycle
        centerLabel="Experiment loop"
        steps={["Hypothesis", "Test", "Measure", "Decide", "Learn"]}
      />
    ),
}

export const Vs: StoryObj = {
  render: () =>
    wrap(
      <Comparison
        leftTitle="Opinion"
        rightTitle="Evidence"
        left="The HiPPO decides; we ship and hope."
        right="A controlled comparison decides; we ship or learn."
      />
    ),
}

export const FunnelChart: StoryObj = {
  render: () =>
    wrap(
      <Funnel
        stages={[
          { label: "Signup — 100%", tone: "accent" },
          { label: "Onboarded — 62%" },
          { label: "First deposit — 31%" },
          { label: "First bet — 18%", tone: "success" },
        ]}
      />
    ),
}
