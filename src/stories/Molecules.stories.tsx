import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  MaskedImage,
  TitleSlide,
  AgendaSlide,
  StatSlide,
  QuoteSlide,
  TwoColumnSlide,
  TeamSlide,
  ClosingSlide,
} from "../index"

const meta: Meta = { title: "Keynote/Molecules" }
export default meta

const photo = (seed: string, w = 800, h = 1000) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2563eb"/><stop offset="1" stop-color="#0ea5e9"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/><circle cx="${w * 0.5}" cy="${h * 0.42}" r="${w * 0.18}" fill="#fff" opacity="0.25"/><circle cx="${w * 0.5}" cy="${h * 0.42}" r="${w * 0.12}" fill="#fff" opacity="0.3"/><rect x="${w * 0.32}" y="${h * 0.62}" width="${w * 0.36}" height="${h * 0.2}" rx="${w * 0.06}" fill="#fff" opacity="0.2"/><text x="50%" y="90%" fill="#fff" font-size="${w * 0.04}" text-anchor="middle" opacity="0.7">${seed}</text></svg>`
  )

/* MaskedImage shapes */
export const MaskShapes: StoryObj = {
  render: () => (
    <div style={{ padding: "2rem", display: "grid", gridTemplateColumns: "repeat(3, 220px)", gap: "1.5rem", background: "var(--kn-background)" }}>
      {(["circle", "arch", "diagonal", "blob", "rounded", "pill"] as const).map((shape) => (
        <div key={shape}>
          <MaskedImage src={photo(shape)} shape={shape} alt={shape} width={220} />
          <div style={{ marginTop: "0.5rem", color: "var(--kn-muted)", fontSize: "0.85rem", textTransform: "capitalize" }}>{shape}</div>
        </div>
      ))}
    </div>
  ),
}

export const Title: StoryObj = {
  render: () => (
    <div style={{ height: "80vh" }}>
      <TitleSlide kicker="Series A" title="Startup Pitch Deck" subtitle="From idea to evidence-driven growth." presenter="Neil Tran · 2026" />
    </div>
  ),
}

export const Agenda: StoryObj = {
  render: () => (
    <div style={{ height: "80vh" }}>
      <AgendaSlide
        title="Today's Agenda"
        items={["Why we exist", "The problem", "Our solution", "Market size", "Traction", "The ask"]}
        image={photo("agenda", 600, 800)}
        imageShape="arch"
      />
    </div>
  ),
}

export const Stats: StoryObj = {
  render: () => (
    <div style={{ height: "80vh" }}>
      <StatSlide
        kicker="Traction"
        title="By the numbers"
        stats={[
          { value: "25,000", label: "tests / year", tone: "accent" },
          { value: "1,000+", label: "concurrent experiments" },
          { value: "~1/3", label: "ship rate" },
          { value: "4×", label: "faster learning" },
        ]}
      />
    </div>
  ),
}

export const Quote: StoryObj = {
  render: () => (
    <div style={{ height: "80vh" }}>
      <QuoteSlide quote="If you have to choose between shipping and learning, you designed the experiment wrong." cite="Ron Kohavi" />
    </div>
  ),
}

export const TwoColumn: StoryObj = {
  render: () => (
    <div style={{ height: "80vh" }}>
      <TwoColumnSlide
        kicker="Solution"
        title="Our innovative solutions"
        body="Three moves that turn opinion into a repeatable learning system."
        bullets={["Find the unique selling point", "Brand messaging guidelines", "Agile marketing approach"]}
        image={photo("solution", 700, 900)}
        imageShape="arch"
      />
    </div>
  ),
}

export const Team: StoryObj = {
  render: () => (
    <div style={{ height: "80vh" }}>
      <TeamSlide
        kicker="People"
        title="Meet the team"
        members={[
          { name: "Maya Okonkwo", role: "CEO", image: photo("maya", 400, 533) },
          { name: "Sam Tan", role: "CTO", image: photo("sam", 400, 533) },
          { name: "Elena Ruiz", role: "Design", image: photo("elena", 400, 533) },
          { name: "João Silva", role: "Data", image: photo("joao", 400, 533) },
        ]}
        imageShape="arch"
      />
    </div>
  ),
}

export const Closing: StoryObj = {
  render: () => (
    <div style={{ height: "80vh" }}>
      <ClosingSlide kicker="Fin" title="Thank you" subtitle="Questions welcome — let's build the learning loop together." presenter="Neil Tran · 2026" />
    </div>
  ),
}
