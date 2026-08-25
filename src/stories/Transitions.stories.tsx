import type { Meta, StoryObj } from "@storybook/react-vite"
import { Deck, Slide, Subtitle, Body, Fragment, SlideTransitionView, Connector } from "../index"

const meta: Meta = { title: "Keynote/Transitions & Builds" }
export default meta

export const BuildsStepwise: StoryObj = {
  render: () => (
    <div style={{ height: "70vh", position: "relative" }}>
      <Deck>
        <Slide>
          <Subtitle>Staged builds — press →</Subtitle>
          <Fragment animation="fade">
            <Body>First: form a falsifiable hypothesis.</Body>
          </Fragment>
          <Fragment animation="slide-left">
            <Body>Second: design goal + guardrails.</Body>
          </Fragment>
          <Fragment animation="slide-up">
            <Body>Third: run with coordinated traffic.</Body>
          </Fragment>
        </Slide>
        <Slide>
          <Subtitle>Slide left/right + zoom</Subtitle>
          <Fragment animation="slide-right">
            <Body>Slide from right variant.</Body>
          </Fragment>
          <Fragment animation="zoom">
            <Body>Zoom variant.</Body>
          </Fragment>
        </Slide>
        <Slide>
          <Subtitle>No builds here</Subtitle>
          <Body>Advances straight.</Body>
        </Slide>
      </Deck>
    </div>
  ),
}

export const Connectors: StoryObj = {
  render: () => (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", background: "var(--kn-background)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Connector direction="right" />
        <Connector direction="right" curve="curve" />
        <Connector direction="down" />
        <Connector direction="left" />
        <Connector direction="up" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Connector direction="right" color="var(--kn-accent)" />
        <Connector direction="right" color="var(--kn-success)" thickness={3} />
        <Connector direction="right" color="var(--kn-danger)" length={50} />
      </div>
    </div>
  ),
}

export const SlideTransitions: StoryObj = {
  render: () => (
    <div style={{ height: "70vh", position: "relative" }}>
      <Deck>
        <SlideTransitionView transition="fade">
          <Slide>
            <Subtitle>Fade entrance</Subtitle>
          </Slide>
        </SlideTransitionView>
        <SlideTransitionView transition="slide-left">
          <Slide>
            <Subtitle>Slide from left</Subtitle>
          </Slide>
        </SlideTransitionView>
        <SlideTransitionView transition="zoom">
          <Slide>
            <Subtitle>Zoom entrance</Subtitle>
          </Slide>
        </SlideTransitionView>
      </Deck>
    </div>
  ),
}
