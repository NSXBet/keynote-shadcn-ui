/* keynote-shadcn-ui — public API */
import * as React from "react"
import * as ReactDOM from "react-dom"
export { React, ReactDOM }
export { Slide, Part } from "./components/Slide"
export type { SlideProps } from "./components/Slide"

export {
  Kicker,
  Title,
  Subtitle,
  Body,
  Caption,
  Tag,
  Pop,
  Dim,
  Warn,
  Bad,
} from "./components/Text"
export type { TagProps } from "./components/Text"

export { Table, THead, TBody, Tr, Th, Td } from "./components/Table"

/* Charts — everything chart-related under components/Charts */
export {
  DonutChart,
  BarChart,
  LineChart,
  AreaChart,
  RadarChart,
  RadialChart,
  ChartTooltipContent,
  ChartLegend,
  seriesColor,
  resolveColor,
} from "./components/Charts"
export type {
  DonutChartProps,
  DonutSlice,
  CategoricalChartProps,
  RadarChartProps,
  RadialChartProps,
  RadialSlice,
  ChartConfig,
  ChartConfigEntry,
} from "./components/Charts"

export { Flow } from "./components/Flow"
export type { FlowStep } from "./components/Flow"
export { DecisionTree, Process, Timeline, Cycle, Comparison, Funnel } from "./components/Diagrams"
export type {
  DecisionBranch,
  ProcessStep,
  TimelineItem,
  FunnelStage,
} from "./components/Diagrams"

export { Image, YouTube } from "./components/Media"
export type { ImageProps, YouTubeProps } from "./components/Media"

export { Code, CodeBlock } from "./components/Code"

export { Section, SectionDivider, SectionSlide, Stat, Quote, SpeakerNotes } from "./components/Keynote"
export { Deck } from "./components/Deck"
export type { DeckProps } from "./components/Deck"
export { Fragment, BuildScope, countFragments } from "./components/Fragment"
export type { FragmentProps, FragmentAnimation, BuildState } from "./components/Fragment"
export { SlideTransitionView } from "./components/SlideTransition"
export type { SlideTransitionProps, SlideTransition } from "./components/SlideTransition"
export { Connector, ArrowHead } from "./components/Connector"
export type { ConnectorProps, ConnectorDirection, ConnectorCurve } from "./components/Connector"
export { Columns, TwoColumns, ThreeColumns, ColumnAndImage, ImageAndColumn } from "./components/Layout"
export { MaskedImage } from "./components/MaskedImage"
export type { MaskedImageProps, MaskShape } from "./components/MaskedImage"
export {
  TitleSlide,
  AgendaSlide,
  StatSlide,
  QuoteSlide,
  TwoColumnSlide,
  TeamSlide,
  ClosingSlide,
} from "./components/Molecules"
export { ConeFunnel, Honeycomb, PricingCards } from "./components/Infographics"
export type { ConeTier, HoneycombCell, PricingTier } from "./components/Infographics"
