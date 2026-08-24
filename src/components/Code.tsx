import * as React from "react"

/* Code — themed code block for keynotes. */

export function Code({ children, style, ...p }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      style={{
        fontFamily: "var(--kn-font-mono)",
        background: "var(--kn-card)",
        border: "1px solid var(--kn-border)",
        borderRadius: 6,
        padding: "0.1em 0.35em",
        fontSize: "0.9em",
        ...style,
      }}
      {...p}
    >
      {children}
    </code>
  )
}

export function CodeBlock({ children, style, ...p }: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      style={{
        fontFamily: "var(--kn-font-mono)",
        background: "var(--kn-card)",
        border: "1px solid var(--kn-border)",
        borderRadius: "var(--kn-radius)",
        padding: "0.9em 1.1em",
        fontSize: "0.9rem",
        lineHeight: 1.5,
        overflow: "auto",
        ...style,
      }}
      {...p}
    >
      <code>{children}</code>
    </pre>
  )
}
