import * as React from "react"

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
    return (
      <svg width={30} height={18} viewBox="0 0 30 18" aria-hidden style={{ display: "block", flex: "0 0 auto" }}>
        {/* gentle curve with a soft pointer */}
        <path d="M 1 12 C 8 12, 16 9, 24 6" fill="none" stroke="var(--kn-muted)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M 19.5 3.2 L 25 6.2 L 18.2 8.6" fill="none" stroke="var(--kn-muted)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
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
