import * as React from "react"
import { MaskedImage, type MaskShape } from "./MaskedImage"

/* Columns — grid container for arbitrary slide content.
 * <TwoColumns>/<ThreeColumns> are thin aliases. Children flow into grid columns
 * left→right; pass style for gap/alignment overrides. */
export function Columns({
  count = 2,
  gap = "3rem",
  align = "start",
  className = "",
  style,
  children,
}: {
  count?: 2 | 3
  gap?: string
  align?: "start" | "center" | "stretch"
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  return (
    <div
      className={`kn-columns ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
        gap,
        alignItems: align,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function TwoColumns(props: Omit<Parameters<typeof Columns>[0], "count">) {
  return <Columns {...props} count={2} />
}

export function ThreeColumns(props: Omit<Parameters<typeof Columns>[0], "count">) {
  return <Columns {...props} count={3} />
}

/* ColumnAndImage — text column (arbitrary children) + masked image.
 * imageSide "right" (default): text left, image right; "left" mirrors.
 * Image renders to the RIGHT named export ImageAndColumn alias with side flipped. */
export function ColumnAndImage({
  image,
  imageShape = "rounded",
  imageSide = "right",
  imageWidth = 400,
  imageAspectRatio = "4 / 5",
  gap = "3rem",
  className = "",
  style,
  children,
}: {
  image: string
  imageShape?: MaskShape
  imageSide?: "left" | "right"
  imageWidth?: number
  imageAspectRatio?: string
  gap?: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const text = (
    <div key="t" className="kn-columns-text" style={{ minWidth: 0 }}>
      {children}
    </div>
  )
  const img = (
    <MaskedImage
      key="i"
      src={image}
      shape={imageShape}
      alt=""
      aspectRatio={imageAspectRatio}
      width={imageWidth}
    />
  )
  return (
    <div
      className={`kn-columns kn-image-column ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: imageSide === "right" ? "minmax(0, 1fr) auto" : "auto minmax(0, 1fr)",
        gap,
        alignItems: "center",
        ...style,
      }}
    >
      {imageSide === "right" ? [text, img] : [img, text]}
    </div>
  )
}

export function ImageAndColumn(props: Omit<Parameters<typeof ColumnAndImage>[0], "imageSide">) {
  return <ColumnAndImage {...props} imageSide="left" />
}
