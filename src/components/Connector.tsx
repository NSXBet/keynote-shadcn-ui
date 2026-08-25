import * as React from "react"

/* Connector — the single arrow primitive for the design system.
 * Decks and diagram components use this; arrows are never hand-drawn per slide.
 * Geometry is defined ONCE here; color via a token. */

export type ConnectorDirection = "right" | "down" | "left" | "up"
export type ConnectorCurve = "straight" | "curve"

export interface ConnectorProps {
  /** arrow direction (default "right") */
  direction?: ConnectorDirection
  /** "straight" shaft, or "curve" (gentle arc) — default straight */
  curve?: ConnectorCurve
  /** stroke width px (default 2.2) */
  thickness?: number
  /** color token (default --kn-muted) */
  color?: string
  /** length px (horizontal: shaft + head; vertical: shaft + head) */
  length?: number
  /** aria label; omit for purely decorative arrows */
  title?: string
  style?: React.CSSProperties
}

const dirAngle: Record<ConnectorDirection, number> = { right: 0, down: 90, left: 180, up: -90 }

/* ArrowHead — the filled triangular pointer, shared by Connector and any
 * custom connector shape (e.g. DecisionTree's fan-out). Define once. */
export function ArrowHead({ x, y, size = 10, color = "var(--kn-muted)" }: { x: number; y: number; size?: number; color?: string }) {
  const s = size / 2
  return <path d={`M ${x - s} ${y - s * 0.9} L ${x} ${y + s} L ${x + s} ${y - s * 0.9} Z`} fill={color} />
}

export function Connector({
  direction = "right",
  curve = "straight",
  thickness = 2.2,
  color = "var(--kn-muted)",
  length,
  title,
  style,
}: ConnectorProps) {
  const horizontal = direction === "right" || direction === "left"
  const len = length ?? (horizontal ? 30 : 26)
  const w = horizontal ? len : 20
  const h = horizontal ? 20 : len
  const shaftEnd = len - 9
  const mid = h / 2

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      style={{ display: "block", flex: "0 0 auto", ...style }}
    >
      {title ? <title>{title}</title> : null}
      <g transform={dirAngle[direction] ? `rotate(${dirAngle[direction]} ${w / 2} ${mid})` : undefined}>
        {curve === "curve" ? (
          <path
            d={`M 1 ${mid + 2} C ${len * 0.35} ${mid + 2}, ${len * 0.6} ${mid - 1}, ${shaftEnd} ${mid - 1}`}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
          />
        ) : (
          <line
            x1={2}
            y1={mid}
            x2={shaftEnd}
            y2={mid}
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
          />
        )}
        {/* filled triangular arrowhead */}
        <path d={`M ${len - 11} ${mid - 5} L ${len - 1} ${mid} L ${len - 11} ${mid + 5} Z`} fill={color} />
      </g>
    </svg>
  )
}
