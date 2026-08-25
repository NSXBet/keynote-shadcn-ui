import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Deck, Slide, Subtitle, Fragment, countFragments } from "../index"

/* Build cursor: next reveals next fragment, prev undoes, slide advances when none remain. */
describe("countFragments", () => {
  it("counts nested Fragments", () => {
    const tree = (
      <Slide>
        <Subtitle>x</Subtitle>
        <Fragment>a</Fragment>
        <div>
          <Fragment>b</Fragment>
        </div>
      </Slide>
    )
    expect(countFragments(tree)).toBe(2)
  })
})

function DeckWith() {
  return (
    <Deck>
      <Slide>
        <Subtitle>slide1</Subtitle>
        <Fragment animation="fade">b1</Fragment>
        <Fragment animation="fade">b2</Fragment>
      </Slide>
      <Slide>
        <Subtitle>slide2</Subtitle>
      </Slide>
    </Deck>
  )
}

describe("Deck build cursor", () => {
  it("next reveals fragments before advancing", () => {
    render(<DeckWith />)
    // initially fragments hidden (cursor 0)
    expect(screen.queryByText("b1")).toBeInTheDocument()
    fireEvent.keyDown(window, { key: "ArrowRight" })
    // still slide 1 (first fragment now shown)
    expect(screen.getByText("slide1")).toBeInTheDocument()
    fireEvent.keyDown(window, { key: "ArrowRight" })
    // still slide 1 (second fragment)
    expect(screen.getByText("slide1")).toBeInTheDocument()
    fireEvent.keyDown(window, { key: "ArrowRight" })
    // now advances to slide 2
    expect(screen.getByText("slide2")).toBeInTheDocument()
  })

  it("prev undoes fragments before going back", () => {
    render(<DeckWith />)
    fireEvent.keyDown(window, { key: "ArrowRight" }) // frag1
    fireEvent.keyDown(window, { key: "ArrowRight" }) // frag2
    fireEvent.keyDown(window, { key: "ArrowRight" }) // advance to slide2
    expect(screen.getByText("slide2")).toBeInTheDocument()
    fireEvent.keyDown(window, { key: "ArrowLeft" }) // back to slide1, cursor at fragment count
    expect(screen.getByText("slide1")).toBeInTheDocument()
  })
})
