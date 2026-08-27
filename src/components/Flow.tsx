import * as React from "react"
import { Connector } from "./Connector"
import { Fragment, registerFragmentCounter } from "./Fragment"

/* Flow — a horizontal chain of boxed steps joined by arrows.
 * Full-width by default: steps stretch to fill the container (flex 1 each).
 * Default animation: each step (with its incoming arrow) appears box-by-box
 * via Fragment builds. Pass animate=false for a static flow. */

export interface FlowStep {
  label: React.ReactNode
  tone?: "default" | "accent" | "success" | "warning" | "danger"
}

const toneColor: Record<NonNullable<FlowStep["tone"]>, string | undefined> = {
  default: undefined,
  accent: "var(--kn-accent)",
  success: "var(--kn-success)",
  warning: "var(--kn-warning)",
  danger: "var(--kn-danger)",
}

function FlowArrow({ arrow }: { arrow: React.ReactNode }) {
  if (typeof arrow === "string" && arrow === "→") {
    return <Connector direction="right" thickness={2.6} />
  }
  return (
    <span aria-hidden style={{ color: "var(--kn-muted)", fontSize: "1.3rem", fontWeight: 300, userSelect: "none" }}>
      {arrow}
    </span>
  )
}

export function Flow({
  steps,
  arrow = "→",
  animate = true,
  style,
}: {
  steps: FlowStep[]
  arrow?: React.ReactNode
  /** reveal steps one build each, arrow with its destination box (default true) */
  animate?: boolean
  style?: React.CSSProperties
}) {
  return (
    <div
      className="kn-flow"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        marginTop: "1.5rem",
        width: "100%",
        ...style,
      }}
    >
      {steps.map((step, i) => {
        const c = toneColor[step.tone ?? "default"]
        // arrow INTO this box travels with it (one build = arrow + destination box);
        // box 0 arrives with the slide, so no arrow before it
        const arrowEl = i > 0 ? <FlowArrow arrow={arrow ?? "→"} /> : null
        const pair = (
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            {i > 0 && arrowEl}
            <div
              className="kn-flow-step"
              style={{
                flex: 1,
                minWidth: 0,
                background: "var(--kn-card)",
                border: `1px solid ${c ?? "var(--kn-border)"}`,
                color: c ?? "var(--kn-foreground)",
                borderRadius: "var(--kn-radius)",
                padding: "0.7em 1em",
                fontSize: "1rem",
                fontWeight: 600,
                textAlign: "center",
                whiteSpace: "normal",
                overflowWrap: "anywhere",
              }}
            >
              {step.label}
            </div>
          </div>
        )
        const cellStyle: React.CSSProperties = { flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: "0.6rem" }
        if (i === 0 || !animate)
          return (
            <div key={i} style={cellStyle}>
              {pair}
            </div>
          )
        return (
          <Fragment key={i} animation="fade" style={{ flex: 1, minWidth: 0 }}>
            {pair}
          </Fragment>
        )
      })}
    </div>
  )
}

// Flow animates (steps-1) boxes + (steps-1) arrows as internal Fragments.
// Registered so Deck's countFragments derives the build count from props alone.
registerFragmentCounter(Flow, (el) => {
  const { steps, animate = true } = el.props as { steps: unknown[]; animate?: boolean }
  return animate ? steps.length - 1 : 0
})
