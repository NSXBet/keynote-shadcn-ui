import type { Meta, StoryObj } from "@storybook/react-vite"
import { Section, SectionSlide, SectionDivider, Stat, Quote, SpeakerNotes, Deck, Slide, Subtitle, Body, Kicker } from "../index"

const meta: Meta = { title: "Keynote/Keynote" }
export default meta

const wrap = (n: React.ReactNode) => (
  <div style={{ padding: "2rem", background: "var(--kn-background)" }}>{n}</div>
)

export const SectionGroup: StoryObj = {
  render: () =>
    wrap(
      <Section kicker="Goals" heading="What do we want to move?">
        <Body>An experiment evaluates one hypothesized change. Guardrails bound the blast radius.</Body>
      </Section>
    ),
}

export const SectionBreak: StoryObj = {
  render: () => (
    <div style={{ height: "70vh" }}>
      <SectionSlide kicker="Act 4" title="How do we run it?" subtitle="Mechanics: platform, rollout, universes." />
    </div>
  ),
}

export const DeckOverview: StoryObj = {
  render: () => (
    <div style={{ height: "70vh", position: "relative" }}>
      <p style={{ position: "absolute", top: 8, left: 8, color: "var(--kn-muted)", fontSize: "0.85rem", zIndex: 5 }}>
        Press ESC to open the slide outline.
      </p>
      <Deck>
        {["Why", "What", "How", "Ship"].map((t, i) => (
          <Slide key={t} hero={i === 0}>
            <Subtitle>{t}</Subtitle>
          </Slide>
        ))}
      </Deck>
    </div>
  ),
}

export const Divider: StoryObj = {
  render: () => (
    <div style={{ height: "70vh" }}>
      <SectionDivider kicker="Act 4" title="How do we run it?" subtitle="Mechanics: platform, rollout, universes, holdouts." />
    </div>
  ),
}

export const BigStat: StoryObj = {
  render: () =>
    wrap(
      <div style={{ display: "flex", gap: "3rem" }}>
        <Stat value="25,000" label="Booking.com tests / year" tone="success" />
        <Stat value="1,000+" label="Uber simultaneous" tone="accent" />
        <Stat value="~1/3" label="ship rate" tone="warning" />
      </div>
    ),
}

export const Blockquote: StoryObj = {
  render: () =>
    wrap(
      <Quote cite="Ron Kohavi">
        If you have to choose between shipping and learning, you designed the experiment wrong.
      </Quote>
    ),
}

export const Notes: StoryObj = {
  render: () =>
    wrap(
      <div>
        <Body>Visible slide content.</Body>
        <SpeakerNotes>This note is hidden from the deck; the presenter sees it.</SpeakerNotes>
      </div>
    ),
}

export const FullDeck: StoryObj = {
  render: () => (
    <div style={{ height: "70vh", position: "relative" }}>
      <Deck>
        <Slide hero>
          <Subtitle>Slide one</Subtitle>
        </Slide>
        <Slide>
          <Subtitle>Slide two</Subtitle>
          <Body>Use arrow keys or the pager.</Body>
        </Slide>
        <Slide>
          <Subtitle>Slide three</Subtitle>
        </Slide>
      </Deck>
    </div>
  ),
}
