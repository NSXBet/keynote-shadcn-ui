import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Slide,
  Kicker,
  Title,
  Subtitle,
  Body,
  Caption,
  Tag,
  Table,
  THead,
  TBody,
  Tr,
  Th,
  Td,
  DonutChart,
  Flow,
  Image,
  YouTube,
  Code,
  CodeBlock,
} from "../index"

describe("Slide", () => {
  it("renders children", () => {
    render(<Slide>hello</Slide>)
    expect(screen.getByText("hello")).toBeInTheDocument()
  })
  it("hero renders background image layer + scrim", () => {
    const { container } = render(
      <Slide hero image="https://x/img.png">
        <Title>H</Title>
      </Slide>
    )
    const bg = container.querySelector('[aria-hidden]')
    expect(bg).toBeInTheDocument()
    expect(bg).toHaveStyle({ backgroundImage: "url(https://x/img.png)" })
  })
  it("non-hero does not render image layer", () => {
    const { container } = render(<Slide>plain</Slide>)
    expect(container.querySelector('[aria-hidden]')).not.toBeInTheDocument()
  })
})

describe("Text", () => {
  it("renders kicker/title/subtitle/body/caption", () => {
    render(
      <>
        <Kicker>K</Kicker>
        <Title>T</Title>
        <Subtitle>S</Subtitle>
        <Body>B</Body>
        <Caption>C</Caption>
      </>
    )
    expect(screen.getByText("K")).toBeInTheDocument()
    expect(screen.getByText("T")).toBeInTheDocument()
    expect(screen.getByText("S")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
    expect(screen.getByText("C")).toBeInTheDocument()
  })
  it("Tag renders variant", () => {
    render(<Tag variant="goal">GOAL</Tag>)
    expect(screen.getByText("GOAL")).toBeInTheDocument()
  })
})

describe("Table", () => {
  it("renders header + rows with highlight", () => {
    render(
      <Table>
        <THead>
          <Tr>
            <Th>Result</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td highlight>Shipped</Td>
          </Tr>
        </TBody>
      </Table>
    )
    expect(screen.getByText("Result")).toBeInTheDocument()
    expect(screen.getByText("Shipped")).toBeInTheDocument()
  })
})

describe("Flow", () => {
  it("renders all steps and arrows between (not after last)", () => {
    const { container } = render(
      <Flow steps={[{ label: "A" }, { label: "B" }, { label: "C" }]} />
    )
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("C")).toBeInTheDocument()
    const arrows = container.querySelectorAll('[aria-hidden]')
    expect(arrows.length).toBe(2) // n-1 arrows, no trailing
  })
})

// jsdom gives ResponsiveContainer a 0×0 box, so the Pie (and its center
// Label) never mount there; center text is verified visually in Storybook.
describe("DonutChart", () => {
  it("renders legend for all configured slices", () => {
    render(
      <DonutChart
        config={{
          a: { label: "Alpha", color: "#2fd6a3" },
          b: { label: "Beta", color: "#9aa7bd" },
        }}
        slices={[
          { key: "a", value: 1 },
          { key: "b", value: 1 },
        ]}
        centerValue="~1/3"
        centerLabel="ship rate"
      />
    )
    expect(screen.getByText("Alpha")).toBeInTheDocument()
    expect(screen.getByText("Beta")).toBeInTheDocument()
  })
})

describe("Media", () => {
  it("Image renders base64 src", () => {
    render(<Image src="data:image/svg+xml;utf8,x" alt="a" />)
    expect(screen.getByAltText("a")).toHaveAttribute("src", "data:image/svg+xml;utf8,x")
  })
  it("YouTube converts watch url to embed", () => {
    const { container } = render(<YouTube video="https://www.youtube.com/watch?v=abc123" />)
    const iframe = container.querySelector("iframe")
    expect(iframe).toHaveAttribute("src", "https://www.youtube.com/embed/abc123")
  })
  it("YouTube converts youtu.be short url", () => {
    const { container } = render(<YouTube video="https://youtu.be/xyz789" />)
    expect(container.querySelector("iframe")).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/xyz789"
    )
  })
})

describe("Code", () => {
  it("renders inline + block", () => {
    render(
      <>
        <Code>inline</Code>
        <CodeBlock>block</CodeBlock>
      </>
    )
    expect(screen.getByText("inline")).toBeInTheDocument()
    expect(screen.getByText("block")).toBeInTheDocument()
  })
})
