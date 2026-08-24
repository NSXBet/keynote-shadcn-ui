# Component Reference — for agents and humans

Every component: typed API, one-line purpose, the Storybook story that demos it.

**Hosted Storybook:** `https://upgraded-adventure-8gvj2vz.pages.github.io/?path=/story/<story-id>` (deployed from `main` via GitHub Pages). Locally: `npm run dev` then `http://localhost:6006/?path=/story/<story-id>`. Toggle brand ↔ cinematic with the toolbar paintbrush.

## Core

| Component | Purpose | Key props | Story |
|---|---|---|---|
| `Deck` | Navigable keynote: keyboard nav, N/M pager, progress hairline, **ESC → slide outline grid** | `children`, `initial`, `pager`, `progress`, `overview`, `onSlide` | `keynote-keynote--full-deck`, `keynote-keynote--deck-overview` |
| `Slide` | Base slide container; `hero` = full-bleed image + scrim | `hero`, `image`, `imagePosition`, `scrimOpacity` | `keynote-slide--content`, `keynote-slide--hero` |
| `Section` | Content group: kicker + heading + body | `kicker`, `heading`, `children` | `keynote-keynote--section-group` |
| `SectionSlide` | Hero section-break slide | `kicker`, `title`, `subtitle`, `image` | `keynote-keynote--section-break` |
| `SectionDivider` | Alias of `SectionSlide` | same | `keynote-keynote--divider` |

## Text

| Component | Purpose | Story |
|---|---|---|
| `Kicker` | Uppercase eyebrow label | `keynote-text--hierarchy` |
| `Title` | Display h1 | `keynote-text--hierarchy` |
| `Subtitle` | h2 heading | `keynote-text--hierarchy` |
| `Body` | body copy | `keynote-text--hierarchy` |
| `Caption` | small italic muted note | `keynote-text--hierarchy` |
| `Tag` | pill badge; `variant: goal/guard/default` | `keynote-text--tags` |
| `Pop`/`Dim`/`Warn`/`Bad` | inline color roles | `keynote-text--hierarchy` |

## Charts (Recharts, shadcn `ChartConfig` pattern)

All take `config: ChartConfig` (`{key:{label,color}}`) and render a themed tooltip + legend. Colors default to `var(--kn-chart-1..8)`.

| Component | Data shape | Key props | Story |
|---|---|---|---|
| `DonutChart` | `slices:[{key,value}]` | `size`, `centerValue`, `centerLabel`, `innerRadius` | `keynote-chart--donut-with-text` |
| `BarChart` | `data:[{x,a,b}]`, `series:["a","b"]` | `xKey`, `stacked`, `showLegend`, `height` | `keynote-charts--bar`, `keynote-charts--bar-stacked` |
| `LineChart` | same | `xKey`, `showLegend`, `height` | `keynote-charts--line` |
| `AreaChart` | same | `xKey`, `stacked`, `height` | `keynote-charts--area`, `keynote-charts--area-stacked` |
| `RadarChart` | `data:[{metric,a,b}]` | `angleKey`, `series`, `height` | `keynote-charts--radar` |
| `RadialChart` | `slices:[{key,value}]` | `max`, `centerValue`, `centerLabel` | `keynote-charts--radial` |

## Diagrams (token-driven, no shadcn analog)

| Component | Purpose | Key props | Story |
|---|---|---|---|
| `Flow` | box-arrow chains (journey, equations) | `steps:[{label,tone}]`, `arrow` | `keynote-flow--journey`, `keynote-flow--equation` |
| `DecisionTree` | root → yes/no branches → outcomes | `root`, `branches`, `branchArrowLabels` | `keynote-diagrams--decision` |
| `Process` | numbered steps w/ state | `steps:[{title,description,state}]`, `vertical` | `keynote-diagrams--process-steps` |
| `Timeline` | events on a spine | `items:[{title,description}]` | `keynote-diagrams--timeline-events` |
| `Cycle` | circular loop of stages | `steps`, `centerLabel` | `keynote-diagrams--cycle-loop` |
| `Comparison` | A vs B / before-after | `left`, `right`, `leftTitle`, `rightTitle` | `keynote-diagrams--vs` |
| `Funnel` | narrowing conversion stages | `stages:[{label,ratio,tone}]` | `keynote-diagrams--funnel-chart` |

## Keynote extras

| Component | Purpose | Key props | Story |
|---|---|---|---|
| `Stat` | big hero number + label | `value`, `label`, `tone` | `keynote-keynote--big-stat` |
| `Quote` | blockquote + cite | `cite` | `keynote-keynote--blockquote` |
| `SpeakerNotes` | presenter-only notes (hidden) | `children` | `keynote-keynote--notes` |
| `Table`/`THead`/`TBody`/`Tr`/`Th`/`Td` | themed data table | `Td.highlight` | `keynote-table--benchmark` |
| `Image` | png/jpg/svg/base64, framed | `src`, `alt`, `maxWidth`, `framed` | `keynote-media-code--image-base-64` |
| `YouTube` | YouTube embed (watch/share/embed URLs) | `video`, `title`, `aspectRatio` | `keynote-media-code--you-tube-embed` |
| `Code`/`CodeBlock` | inline + block code | — | `keynote-media-code--code-blocks` |

## Theming contract

- Colors only via `--kn-*` tokens; charts via `--kn-chart-1..8`, `--kn-chart-grid`, `--kn-chart-axis`, `--kn-chart-label`.
- Themes: `keynote-shadcn-ui/themes/brand.css` (white/blue), `keynote-shadcn-ui/themes/cinematic.css` (dark, `.kn-cinematic`/`.dark`).
- `tone` props accept: `default | accent | success | warning | danger`.

## Agent quick-start

1. `npm install keynote-shadcn-ui react react-dom recharts`
2. `import "keynote-shadcn-ui/themes/cinematic.css"`
3. Wrap slides in `<Deck>`, use components above. Run `npm run dev` here and open Storybook to see every component live in both themes.
