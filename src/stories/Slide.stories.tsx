import type { Meta, StoryObj } from "@storybook/react-vite"
import { Slide, Kicker, Title, Subtitle, Body, Caption } from "../index"

const meta: Meta<typeof Slide> = {
  title: "Keynote/Slide",
  component: Slide,
}
export default meta
type Story = StoryObj<typeof Slide>

export const Content: Story = {
  render: () => (
    <div style={{ height: "80vh" }}>
      <Slide>
        <Kicker>Section 4</Kicker>
        <Subtitle>What makes an experiment reliable?</Subtitle>
        <Body style={{ marginTop: "1rem" }}>
          Three ingredients: valid design, sufficient information, coordinated traffic.
        </Body>
        <Caption style={{ marginTop: "2rem" }}>4 / 80</Caption>
      </Slide>
    </div>
  ),
}

export const Hero: Story = {
  render: () => (
    <div style={{ height: "80vh" }}>
      <Slide hero image={"data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e3a8a"/><stop offset="1" stop-color="#0d1117"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/><circle cx="1200" cy="300" r="180" fill="#2fd6a3" opacity="0.35"/><circle cx="400" cy="650" r="120" fill="#5b8cff" opacity="0.3"/></svg>`)}>
        <Kicker>Section 1</Kicker>
        <Title>Experimentation at Flutter Brazil</Title>
        <Body style={{ color: "#dbe4f5", maxWidth: "42ch", marginTop: "1rem" }}>
          From Opinion to Evidence: A System for Learning Safely
        </Body>
      </Slide>
    </div>
  ),
}

export const HeroNoImage: Story = {
  render: () => (
    <div style={{ height: "80vh" }}>
      <Slide hero>
        <Kicker>Keynote</Kicker>
        <Title>A typography-only hero</Title>
      </Slide>
    </div>
  ),
}
