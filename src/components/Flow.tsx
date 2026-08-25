import * as React from "react"
import { Connector } from "./Connector"

/* Flow — a horizontal chain of boxed steps joined by arrows.
 * Built for keynote journey / decision-tree / equation diagrams.
 * Steps size to content and wrap cleanly; no orphaned arrows. */

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
  style,
}: {
  steps: FlowStep[]
  arrow?: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      className="kn-flow"
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.6rem",
        marginTop: "1.5rem",
        ...style,
      }}
    >
      {steps.map((step, i) => {
        const c = toneColor[step.tone ?? "default"]
        const last = i === steps.length - 1
        return (
          <React.Fragment key={i}>
            <div
              className="kn-flow-step"
              style={{
                background: "var(--kn-card)",
                border: `1px solid ${c ?? "var(--kn-border)"}`,
                color: c ?? "var(--kn-foreground)",
                borderRadius: "var(--kn-radius)",
                padding: "0.7em 1em",
                fontSize: "1rem",
                fontWeight: 600,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {step.label}
            </div>
            {!last && (
              <FlowArrow arrow={arrow} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
