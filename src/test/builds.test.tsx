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
    fireEvent.keyDown(window, { key: "ArrowRight" }) // reveal b1
    expect(screen.getByText("slide1")).toBeInTheDocument()
    fireEvent.keyDown(window, { key: "ArrowRight" }) // reveal b2
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
    fireEvent.keyDown(window, { key: "ArrowLeft" }) // back to slide1, all builds now shown
    expect(screen.getByText("slide1")).toBeInTheDocument()
  })

  it("prev undoes ONE build at a time; at cursor 0 goes to prior slide", () => {
    render(<DeckWith />)
    // 3 x -> advances to slide2 (reveal b1, reveal b2, advance)
    fireEvent.keyDown(window, { key: "ArrowRight" })
    fireEvent.keyDown(window, { key: "ArrowRight" })
    fireEvent.keyDown(window, { key: "ArrowRight" })
    expect(screen.getByText("slide2")).toBeInTheDocument()
    // <- at cursor 0 goes back to slide1
    fireEvent.keyDown(window, { key: "ArrowLeft" })
    expect(screen.getByText("slide1")).toBeInTheDocument()
  })
})
