import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { DecisionTree, Process, Timeline, Cycle, Comparison, Funnel } from "../index"

describe("DecisionTree", () => {
  it("renders root, branches, outcomes", () => {
    render(
      <DecisionTree
        root="Goal?"
        branchArrowLabels={["yes", "no"]}
        branches={[
          { label: "Ship", tone: "success", outcome: "win" },
          { label: "Kill", tone: "danger", outcome: "learn" },
        ]}
      />
    )
    expect(screen.getByText("Goal?")).toBeInTheDocument()
    expect(screen.getByText("Ship")).toBeInTheDocument()
    expect(screen.getByText("learn")).toBeInTheDocument()
    expect(screen.getByText(/yes/)).toBeInTheDocument()
  })
})

describe("Process", () => {
  it("renders numbered stages, done shows check", () => {
    render(
      <Process
        steps={[
          { title: "Hypothesis", state: "done" },
          { title: "Run", state: "current" },
          { title: "Decide", state: "todo" },
        ]}
      />
    )
    expect(screen.getByText("Hypothesis")).toBeInTheDocument()
    expect(screen.getByText("✓")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument() // third step number
  })
})

describe("Timeline", () => {
  it("renders items", () => {
    render(<Timeline items={[{ title: "Signup" }, { title: "FTD" }]} />)
    expect(screen.getByText("Signup")).toBeInTheDocument()
    expect(screen.getByText("FTD")).toBeInTheDocument()
  })
})

describe("Cycle", () => {
  it("renders all steps + center label", () => {
    render(<Cycle centerLabel="loop" steps={["A", "B", "C"]} />)
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("C")).toBeInTheDocument()
    expect(screen.getByText("loop")).toBeInTheDocument()
  })
})

describe("Comparison", () => {
  it("renders both columns with titles", () => {
    render(<Comparison leftTitle="Before" rightTitle="After" left="old" right="new" />)
    expect(screen.getByText("Before")).toBeInTheDocument()
    expect(screen.getByText("new")).toBeInTheDocument()
  })
})

describe("Funnel", () => {
  it("renders stages with narrowing widths", () => {
    const { container } = render(
      <Funnel stages={[{ label: "Top", ratio: 1 }, { label: "Bottom", ratio: 0.5 }]} />
    )
    expect(screen.getByText("Top")).toBeInTheDocument()
    const stages = container.querySelectorAll(".kn-funnel > div")
    expect(stages[0]).toHaveStyle({ width: "100%" })
    expect(stages[1]).toHaveStyle({ width: "50%" })
  })
})
