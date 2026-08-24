import * as React from "react"

/* MaskedImage — an image auto-masked into a shape via clip-path / SVG mask.
 * shape: circle | arch | diagonal | blob | rounded | pill | none
 * The photocentric / corporate / diagonal references use these crops. */

export type MaskShape = "circle" | "arch" | "diagonal" | "blob" | "rounded" | "pill" | "none"

export interface MaskedImageProps {
  src: string
  alt?: string
  shape?: MaskShape
  /** width of the masked frame (px or css length); defaults to 100% */
  width?: number | string
  /** aspect ratio of the frame, e.g. "1 / 1", "4 / 5", "16 / 9". Defaults per shape. */
  aspectRatio?: string
  style?: React.CSSProperties
}

const defaultAspect: Record<MaskShape, string> = {
  circle: "1 / 1",
  arch: "4 / 5",
  diagonal: "16 / 10",
  blob: "1 / 1",
  rounded: "16 / 10",
  pill: "3 / 4",
  none: "16 / 9",
}

function clipFor(shape: MaskShape, blobId: string): React.CSSProperties {
  switch (shape) {
    case "circle":
      return { clipPath: "circle(50% at 50% 50%)" }
    case "pill":
      return { clipPath: "inset(0 round 999px)" }
    case "arch":
      return { clipPath: "inset(0 round 50% 50% 12% 12%)" }
    case "rounded":
      return { clipPath: "inset(0 round var(--kn-radius-lg))" }
    case "diagonal":
      return { clipPath: "polygon(0 0, 100% 0, 78% 100%, 0% 100%)" }
    case "blob":
      // organic mask defined inline via the SVG below
      return { clipPath: `url(#${blobId})`, WebkitClipPath: `url(#${blobId})` }
    default:
      return {}
  }
}

let blobCounter = 0

export function MaskedImage({
  src,
  alt = "",
  shape = "rounded",
  width = "100%",
  aspectRatio,
  style,
}: MaskedImageProps) {
  const [blobId] = React.useState(() => `kn-blob-${++blobCounter}`)
  const ratio = aspectRatio ?? defaultAspect[shape]
  const frame: React.CSSProperties = {
    width,
    aspectRatio: ratio,
    overflow: "hidden",
    background: "var(--kn-card)",
    ...clipFor(shape, blobId),
    ...style,
  }
  return (
    <div className={`kn-masked-image kn-mask-${shape}`} style={frame}>
      {shape === "blob" && (
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
          <defs>
            <clipPath id={blobId} clipPathUnits="objectBoundingBox">
              <path d="M0.79,0.62 C0.86,0.47,0.73,0.32,0.62,0.22 C0.52,0.12,0.41,0.05,0.3,0.11 C0.19,0.17,0.14,0.32,0.09,0.45 C0.04,0.58,0.02,0.74,0.12,0.85 C0.22,0.96,0.39,0.97,0.52,0.93 C0.65,0.89,0.72,0.77,0.79,0.62 Z" />
            </clipPath>
          </defs>
        </svg>
      )}
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  )
}
