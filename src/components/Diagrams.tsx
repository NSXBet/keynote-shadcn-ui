import * as React from "react"

/* Presentation diagrams — custom, token-driven. No shadcn analogs.
 * All share the same box/arrow language as Flow. */

function box(tone: "default" | "accent" | "success" | "warning" | "danger" = "default"): React.CSSProperties {
  const c =
    tone === "accent"
      ? "var(--kn-accent)"
      : tone === "success"
        ? "var(--kn-success)"
        : tone === "warning"
          ? "var(--kn-warning)"
          : tone === "danger"
            ? "var(--kn-danger)"
            : undefined
  return {
    background: "var(--kn-card)",
    border: `1px solid ${c ?? "var(--kn-border)"}`,
    color: c ?? "var(--kn-foreground)",
    borderRadius: "var(--kn-radius)",
    padding: "0.6em 1em",
    fontWeight: 600,
    textAlign: "center",
  }
}

/* ---------- DecisionTree: root -> branches (yes/no) -> outcomes ---------- */
export interface DecisionBranch {
  label: React.ReactNode
  tone?: "success" | "danger" | "accent" | "warning"
  outcome?: React.ReactNode
}
export function DecisionTree({
  root,
  branches,
  branchArrowLabels,
}: {
  root: React.ReactNode
  branches: DecisionBranch[]
  branchArrowLabels?: string[]
}) {
  return (
    <div className="kn-decision" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
      <div style={box("accent")}>{root}</div>
      <div style={{ display: "flex", gap: "2.5rem", justifyContent: "center", flexWrap: "wrap" }}>
        {branches.map((b, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--kn-muted)", fontSize: "0.85rem" }}>
              ↓ {branchArrowLabels?.[i] ?? ""}
            </span>
            <div style={box(b.tone)}>{b.label}</div>
            {b.outcome != null && (
              <>
                <span style={{ color: "var(--kn-muted)", fontSize: "0.85rem" }}>↓</span>
                <div style={{ ...box(), fontWeight: 400, color: "var(--kn-muted)", fontSize: "0.9rem" }}>{b.outcome}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Process/Steps: numbered stages with optional state ---------- */
export interface ProcessStep {
  title: React.ReactNode
  description?: React.ReactNode
  state?: "done" | "current" | "todo"
}
export function Process({ steps, vertical = false }: { steps: ProcessStep[]; vertical?: boolean }) {
  return (
    <ol
      className="kn-process"
      style={{
        display: "flex",
        flexDirection: vertical ? "column" : "row",
        gap: "1rem",
        padding: 0,
        margin: 0,
        listStyle: "none",
        flexWrap: vertical ? "nowrap" : "wrap",
      }}
    >
      {steps.map((s, i) => {
        const tone = s.state === "done" ? "success" : s.state === "current" ? "accent" : "default"
        return (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", flex: vertical ? undefined : "1 1 0" }}>
            <span
              style={{
                ...box(tone),
                borderRadius: "999px",
                width: "1.9em",
                height: "1.9em",
                padding: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "0 0 auto",
              }}
            >
              {s.state === "done" ? "✓" : i + 1}
            </span>
            <div>
              <div style={{ color: "var(--kn-foreground)", fontWeight: 600 }}>{s.title}</div>
              {s.description != null && (
                <div style={{ color: "var(--kn-muted)", fontSize: "0.9rem" }}>{s.description}</div>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/* ---------- Timeline: events on a spine ---------- */
export interface TimelineItem {
  title: React.ReactNode
  description?: React.ReactNode
  marker?: React.ReactNode
}
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol
      className="kn-timeline"
      style={{
        listStyle: "none",
        margin: 0,
        padding: "0 0 0 1rem",
        borderLeft: "2px solid var(--kn-border)",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      {items.map((it, i) => (
        <li key={i} style={{ position: "relative", paddingLeft: "1rem" }}>
          <span
            style={{
              position: "absolute",
              left: "-1.44rem",
              top: "0.2em",
              width: "0.8rem",
              height: "0.8rem",
              borderRadius: "999px",
              background: "var(--kn-accent)",
              border: "2px solid var(--kn-background)",
            }}
          />
          <div style={{ color: "var(--kn-foreground)", fontWeight: 600 }}>{it.title}</div>
          {it.description != null && <div style={{ color: "var(--kn-muted)", fontSize: "0.9rem" }}>{it.description}</div>}
        </li>
      ))}
    </ol>
  )
}

/* ---------- Cycle: circular loop (n stages around a ring) ---------- */
export function Cycle({ steps, centerLabel }: { steps: React.ReactNode[]; centerLabel?: React.ReactNode }) {
  const n = steps.length
  const size = 340
  const r = size / 2
  const ring = r - 46
  return (
    <div className="kn-cycle" style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        <circle
          cx={r}
          cy={r}
          r={ring}
          fill="none"
          stroke="var(--kn-border-strong)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        {steps.map((_, i) => {
          // chevron at the boundary between step i and step i+1 (clockwise)
          const a = ((i + 0.5) / n) * 2 * Math.PI - Math.PI / 2
          const px = r + ring * Math.cos(a)
          const py = r + ring * Math.sin(a)
          const deg = (a * 180) / Math.PI + 90 // tangent direction (clockwise)
          return (
            <path
              key={i}
              d="M -5 -4 L 2 0 L -5 4"
              fill="none"
              stroke="var(--kn-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(${px} ${py}) rotate(${deg})`}
            />
          )
        })}
      </svg>
      {centerLabel != null && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "var(--kn-muted)",
            fontWeight: 600,
          }}
        >
          {centerLabel}
        </div>
      )}
      {steps.map((s, i) => {
        const a = (i / n) * 2 * Math.PI - Math.PI / 2
        const x = r + ring * Math.cos(a)
        const y = r + ring * Math.sin(a)
        return (
          <div
            key={i}
            style={{
              ...box(i === 0 ? "accent" : "default"),
              position: "absolute",
              left: x,
              top: y,
              transform: "translate(-50%,-50%)",
              whiteSpace: "nowrap",
              fontSize: "0.9rem",
            }}
          >
            {s}
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Comparison: A vs B / before-after ---------- */
export function Comparison({
  left,
  right,
  leftTitle = "Before",
  rightTitle = "After",
}: {
  left: React.ReactNode
  right: React.ReactNode
  leftTitle?: React.ReactNode
  rightTitle?: React.ReactNode
}) {
  const col = (title: React.ReactNode, body: React.ReactNode, tone: "danger" | "success") => (
    <div
      style={{
        ...box(),
        textAlign: "left",
        border: "1px solid var(--kn-border)",
        flex: "1 1 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--kn-muted)",
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "0.5rem",
        }}
      >
        <span
          aria-hidden
          style={{
            width: "0.6em",
            height: "0.6em",
            borderRadius: 2,
            background: tone === "danger" ? "var(--kn-danger)" : "var(--kn-success)",
            flex: "0 0 auto",
          }}
        />
        {title}
      </div>
      <div style={{ color: "var(--kn-foreground)", fontWeight: 400 }}>{body}</div>
    </div>
  )
  return (
    <div className="kn-comparison" style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
      {col(leftTitle, left, "danger")}
      {col(rightTitle, right, "success")}
    </div>
  )
}

/* ---------- Funnel: conversion stages, narrowing ---------- */
export interface FunnelStage {
  label: React.ReactNode
  /** 0..1 width of this stage relative to the first */
  ratio?: number
  tone?: "default" | "accent" | "success"
}
export function Funnel({ stages }: { stages: FunnelStage[] }) {
  return (
    <div className="kn-funnel" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
      {stages.map((s, i) => {
        const ratio = s.ratio ?? 1 - i / stages.length
        return (
          <div
            key={i}
            style={{
              ...box(s.tone ?? "default"),
              width: `${Math.max(ratio, 0.15) * 100}%`,
              fontSize: "0.95rem",
            }}
          >
            {s.label}
          </div>
        )
      })}
    </div>
  )
}
