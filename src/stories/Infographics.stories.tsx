import type { Meta, StoryObj } from "@storybook/react-vite"
import { ConeFunnel, Honeycomb, PricingCards } from "../index"

const meta: Meta = { title: "Keynote/Infographics" }
export default meta

const wrap = (n: React.ReactNode) => (
  <div style={{ padding: "2rem", background: "var(--kn-background)", minHeight: "70vh" }}>{n}</div>
)

export const Cone: StoryObj = {
  render: () =>
    wrap(
      <ConeFunnel
        tiers={[
          { label: "A", sub: "Advanced Infrastructure" },
          { label: "B", sub: "Real-Time Data" },
          { label: "C", sub: "Seamless Scaling" },
          { label: "D", sub: "Unified Security" },
          { label: "E", sub: "Smart Automation" },
          { label: "F", sub: "Protected Resources" },
        ]}
      />
    ),
}

export const Comb: StoryObj = {
  render: () =>
    wrap(
      <Honeycomb
        center={{ label: "Market", value: "Potential" }}
        cells={[
          { label: "Enterprise", value: "32%" },
          { label: "SMB", value: "28%" },
          { label: "Consumer", value: "24%" },
          { label: "Gov", value: "9%" },
          { label: "Other", value: "7%" },
        ]}
      />
    ),
}

export const Pricing: StoryObj = {
  render: () =>
    wrap(
      <PricingCards
        tiers={[
          { name: "Starter", price: "$5", period: "/mo", features: ["1 project", "Basic analytics", "Community support"] },
          { name: "Pro", price: "$55", period: "/mo", highlight: true, features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom domains"], cta: "Choose Pro" },
          { name: "Scale", price: "$70", period: "/mo", features: ["Everything in Pro", "SSO + audit log", "Dedicated manager"] },
        ]}
      />
    ),
}
