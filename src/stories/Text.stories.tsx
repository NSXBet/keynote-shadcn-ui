import type { Meta, StoryObj } from "@storybook/react-vite"
import { Title, Subtitle, Body, Caption, Kicker, Tag, Pop, Dim, Warn, Bad } from "../index"

const meta: Meta = {
  title: "Keynote/Text",
}
export default meta

export const Hierarchy: StoryObj = {
  render: () => (
    <div style={{ padding: "2rem", background: "var(--kn-background)" }}>
      <Kicker>Kicker · eyebrow</Kicker>
      <Title>Title display</Title>
      <Subtitle style={{ marginTop: "1rem" }}>Subtitle heading</Subtitle>
      <Body style={{ marginTop: "1rem" }}>
        Body copy with <Pop>pop</Pop>, <Dim>dim</Dim>, <Warn>warn</Warn>, <Bad>bad</Bad> roles.
      </Body>
      <Caption style={{ marginTop: "1rem" }}>Caption — small italic muted note.</Caption>
    </div>
  ),
}

export const Tags: StoryObj = {
  render: () => (
    <div style={{ padding: "2rem", display: "flex", gap: "0.5rem", background: "var(--kn-background)" }}>
      <Tag variant="goal">GOAL</Tag>
      <Tag variant="guard">GUARDRAIL</Tag>
      <Tag>DEFAULT</Tag>
    </div>
  ),
}
