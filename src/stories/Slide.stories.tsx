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
      <Slide hero image="https://picsum.photos/seed/stadium/1600/900">
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
