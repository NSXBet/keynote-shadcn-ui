import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Section, SectionDivider, SectionSlide, Stat, Quote, SpeakerNotes, Deck, Slide, Subtitle } from "../index"

describe("Section", () => {
  it("renders kicker + heading + children", () => {
    render(
      <Section kicker="Goals" heading="What to move">
        <p>body</p>
      </Section>
    )
    expect(screen.getByText("Goals")).toBeInTheDocument()
    expect(screen.getByText("What to move")).toBeInTheDocument()
    expect(screen.getByText("body")).toBeInTheDocument()
  })
})

describe("SectionSlide", () => {
  it("is the hero section-break (alias of SectionDivider)", () => {
    render(<SectionSlide kicker="Act 1" title="Why" />)
    expect(screen.getByText("Why")).toBeInTheDocument()
  })
})

describe("SectionDivider", () => {
  it("renders kicker + title + subtitle", () => {
    render(<SectionDivider kicker="Act 4" title="Run it" subtitle="Mechanics" />)
    expect(screen.getByText("Act 4")).toBeInTheDocument()
    expect(screen.getByText("Run it")).toBeInTheDocument()
    expect(screen.getByText("Mechanics")).toBeInTheDocument()
  })
})

describe("Stat", () => {
  it("renders value + label", () => {
    render(<Stat value="25,000" label="tests / year" />)
    expect(screen.getByText("25,000")).toBeInTheDocument()
    expect(screen.getByText("tests / year")).toBeInTheDocument()
  })
})

describe("Quote", () => {
  it("renders quote + cite", () => {
    render(<Quote cite="Kohavi">ship or learn</Quote>)
    expect(screen.getByText("ship or learn")).toBeInTheDocument()
    expect(screen.getByText(/Kohavi/)).toBeInTheDocument()
  })
})

describe("SpeakerNotes", () => {
  it("is hidden from the deck", () => {
    render(<SpeakerNotes>secret</SpeakerNotes>)
    const el = screen.getByText("secret")
    expect(el).toHaveStyle({ display: "none" })
  })
})

describe("Deck", () => {
  const mk = () =>
    render(
      <Deck>
        <Slide>
          <Subtitle>one</Subtitle>
        </Slide>
        <Slide>
          <Subtitle>two</Subtitle>
        </Slide>
        <Slide>
          <Subtitle>three</Subtitle>
        </Slide>
      </Deck>
    )

  it("shows first slide + pager 1/3", () => {
    mk()
    expect(screen.getByText("one")).toBeInTheDocument()
    expect(screen.queryByText("two")).not.toBeInTheDocument()
    expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument()
  })

  it("advances on ArrowRight, back on ArrowLeft", () => {
    mk()
    fireEvent.keyDown(window, { key: "ArrowRight" })
    expect(screen.getByText("two")).toBeInTheDocument()
    fireEvent.keyDown(window, { key: "ArrowLeft" })
    expect(screen.getByText("one")).toBeInTheDocument()
  })

  it("End jumps to last, Home to first", () => {
    mk()
    fireEvent.keyDown(window, { key: "End" })
    expect(screen.getByText("three")).toBeInTheDocument()
    fireEvent.keyDown(window, { key: "Home" })
    expect(screen.getByText("one")).toBeInTheDocument()
  })

  it("pager click advances", () => {
    mk()
    fireEvent.click(screen.getByRole("button", { name: /next slide/i }))
    expect(screen.getByText("two")).toBeInTheDocument()
  })

  it("ESC opens outline grid, click jumps to slide", () => {
    mk()
    fireEvent.keyDown(window, { key: "Escape" })
    expect(screen.getByRole("dialog", { name: /slide outline/i })).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: /go to slide 3/i }))
    expect(screen.getByText("three")).toBeInTheDocument()
    // outline closed after jump
    expect(screen.queryByRole("dialog", { name: /slide outline/i })).not.toBeInTheDocument()
  })

  it("ESC toggles outline off", () => {
    mk()
    fireEvent.keyDown(window, { key: "Escape" })
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    fireEvent.keyDown(window, { key: "Escape" })
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("calls onSlide", () => {
    const onSlide = vi.fn()
    render(
      <Deck onSlide={onSlide}>
        <Slide>
          <Subtitle>a</Subtitle>
        </Slide>
        <Slide>
          <Subtitle>b</Subtitle>
        </Slide>
      </Deck>
    )
    fireEvent.keyDown(window, { key: "ArrowRight" })
    expect(onSlide).toHaveBeenCalledWith(1)
  })
})
