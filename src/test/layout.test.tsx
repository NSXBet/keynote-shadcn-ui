import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Slide, Part, TwoColumns, ThreeColumns, ColumnAndImage, ImageAndColumn, Subtitle, Body } from "../index"

describe("Layout containers", () => {
  it("TwoColumns renders 2-col grid", () => {
    render(
      <TwoColumns>
        <div>a</div>
        <div>b</div>
      </TwoColumns>
    )
    const el = document.querySelector(".kn-columns") as HTMLElement
    expect(el.style.gridTemplateColumns).toBe("repeat(2, minmax(0, 1fr))")
    expect(screen.getByText("a")).toBeInTheDocument()
  })
  it("ThreeColumns renders 3-col grid", () => {
    render(
      <ThreeColumns>
        <div>a</div>
        <div>b</div>
        <div>c</div>
      </ThreeColumns>
    )
    const el = document.querySelector(".kn-columns") as HTMLElement
    expect(el.style.gridTemplateColumns).toBe("repeat(3, minmax(0, 1fr))")
  })
  it("ColumnAndImage puts image right by default", () => {
    render(
      <ColumnAndImage image="x.png">
        <Body>text</Body>
      </ColumnAndImage>
    )
    const el = document.querySelector(".kn-image-column") as HTMLElement
    expect(el.style.gridTemplateColumns).toBe("minmax(0, 1fr) auto")
    expect(el.querySelector("img")).toBeTruthy()
  })
  it("ImageAndColumn mirrors image left", () => {
    render(
      <ImageAndColumn image="x.png">
        <Body>text</Body>
      </ImageAndColumn>
    )
    const el = document.querySelector(".kn-image-column") as HTMLElement
    expect(el.style.gridTemplateColumns).toBe("auto minmax(0, 1fr)")
  })
  it("Parts inside Slide auto-spread alongside layout containers", () => {
    render(
      <Slide>
        <Part>
          <Subtitle>t</Subtitle>
        </Part>
        <Part>
          <TwoColumns>
            <div>a</div>
            <div>b</div>
          </TwoColumns>
        </Part>
      </Slide>
    )
    const s = document.querySelector(".kn-slide") as HTMLElement
    expect(s.style.justifyContent).toBe("space-between")
  })
})
