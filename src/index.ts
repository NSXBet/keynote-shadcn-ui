/* keynote-shadcn-ui — public API */
import * as React from "react"
import * as ReactDOM from "react-dom"
export { React, ReactDOM }
export { Slide } from "./components/Slide"
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

export { DonutChart } from "./components/Chart"
export type { DonutChartProps, DonutSlice } from "./components/Chart"
export { BarChart, LineChart, AreaChart } from "./components/CategoricalChart"
export type { CategoricalChartProps } from "./components/CategoricalChart"
export { RadarChart, RadialChart } from "./components/RadialCharts"
export type { RadarChartProps, RadialChartProps, RadialSlice } from "./components/RadialCharts"
export type { ChartConfig, ChartConfigEntry } from "./components/ChartCore"

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
