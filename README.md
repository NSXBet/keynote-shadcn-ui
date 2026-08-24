# keynote-shadcn-ui

A themable design system for **keynote presentations** — React components for slides, heroes, charts, tables, diagrams, and deck chrome. Charts use [Recharts](https://recharts.org/) with the [shadcn/ui chart pattern](https://ui.shadcn.com/docs/components/chart) (a `ChartConfig` maps series → label + color; colors come from CSS tokens, so charts re-theme with the deck).

**[Live Storybook (component docs + both themes)](https://nsxbet.github.io/keynote-shadcn-ui/)** · [Component reference](COMPONENTS.md)

## Install

From GitHub (current):

```bash
npm install NSXBet/keynote-shadcn-ui react react-dom recharts
```

(From npm, once published: `npm install keynote-shadcn-ui react react-dom recharts`.)

`react`, `react-dom`, and `recharts` are **peer dependencies** — your app provides them (any modern React, `^18 || ^19`).

Import a theme stylesheet once:

```js
import "keynote-shadcn-ui/themes/brand.css"      // white + blue (default)
// or
import "keynote-shadcn-ui/themes/cinematic.css"  // dark editorial
```

## Usage (build-step app)

```jsx
import {
  Deck, Slide, SectionSlide, Kicker, Title, Subtitle, Body, Caption,
  DonutChart, BarChart, Flow, Table, THead, TBody, Tr, Th, Td,
} from "keynote-shadcn-ui"

export default function Presentation() {
  return (
    <Deck>
      <SectionSlide kicker="Section 1" title="Why experiment?" subtitle="Opinion can't tell a good idea from a dangerous one." />

      <Slide>
        <Kicker>Benchmark</Kicker>
        <Subtitle>~1 in 3 experiments ships</Subtitle>
        <DonutChart
          size={320}
          config={{
            shipped: { label: "Shipped — ~1/3", color: "var(--kn-success)" },
            flat:    { label: "Flat — ~1/3",    color: "var(--kn-muted)" },
            harmful: { label: "Harmful — ~1/3", color: "var(--kn-danger)" },
          }}
          slices={[{ key: "shipped", value: 1 }, { key: "flat", value: 1 }, { key: "harmful", value: 1 }]}
          centerValue="~1/3"
          centerLabel="ship rate"
        />
      </Slide>

      <Slide>
        <Subtitle>The journey</Subtitle>
        <Flow steps={[
          { label: "Why?" },
          { label: "Reliable?" },
          { label: "What to Move?", tone: "accent" },
          { label: "Ship?", tone: "success" },
        ]} />
      </Slide>
    </Deck>
  )
}
```

`<Deck>` gives you keyboard nav (←/→, Home/End), an `N / M` pager, a top progress hairline, and an **ESC-triggered outline grid** of all slides for quick navigation.

## Usage (no-build, vendored UMD)

We don't publish to a CDN yet. For a no-build deck, copy the self-contained UMD bundle and theme tokens (built by `npm run build`) into your deck folder — e.g. `vendor/` — and load them with relative paths. The bundle includes React + Recharts, so a plain `<script>` tag is all you need:

```html
<link rel="stylesheet" href="vendor/tokens.css">
<script src="vendor/keynote-shadcn-ui.umd.js"></script>
<script>
  const K = window.KeynoteShadcnUI
  const h = K.React.createElement
  K.ReactDOM.createRoot(document.getElementById("root")).render(
    h(K.Slide, null, h(K.Title, null, "Hello keynote"))
  )
</script>
```

Get the two files from `dist/keynote-shadcn-ui.umd.js` and `src/themes/tokens.css` (or `vendor/` in an existing deck). A real CDN path (unpkg/jsDelivr) will exist once we publish to npm — it's not available today.

## Components

**Core** — `Deck`, `Slide` (+ hero bg-cover image & scrim), `Section`, `SectionSlide`/`SectionDivider`, `Kicker`, `Title`, `Subtitle`, `Body`, `Caption`, `Tag`, `Pop`/`Dim`/`Warn`/`Bad`, `Code`, `CodeBlock`

**Charts** (Recharts, shadcn pattern, `ChartConfig` + tooltip + legend) — `DonutChart`, `BarChart`, `LineChart`, `AreaChart`, `RadarChart`, `RadialChart`

**Diagrams** — `Flow` (box-arrow chains), `DecisionTree`, `Process` (numbered steps), `Timeline`, `Cycle` (loop), `Comparison` (A vs B), `Funnel`

**Keynote** — `Stat` (big number), `Quote`, `SpeakerNotes`, `Image` (png/jpg/svg/base64), `YouTube`

## Theming

All color/spacing/type flows through `--kn-*` CSS custom properties. Switch themes by importing a different theme stylesheet, or define your own by overriding the tokens:

```css
:root {
  --kn-background: #ffffff;
  --kn-foreground: #0f172a;
  --kn-primary: #2563eb;
  --kn-accent: #2563eb;
  --kn-success: #16a34a;
  --kn-warning: #d97706;
  --kn-danger: #dc2626;
  --kn-chart-1: /* ... */ oklch(0.646 0.222 41.116);
  /* --kn-chart-1..8, --kn-chart-grid, --kn-chart-axis, --kn-chart-label */
}
```

Two themes ship: **brand** (white/blue) and **cinematic** (dark, via the `.kn-cinematic` / `.dark` class).

## Develop

```bash
npm install
npm run dev        # Storybook (theme switcher: brand ↔ cinematic)
npm test           # Vitest
npm run build      # ESM + UMD + type declarations
```

## License

MIT
