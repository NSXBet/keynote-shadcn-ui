import * as React from "react"

/* Code — themed code block for keynotes. */

const codeStyle: React.CSSProperties = {
  fontFamily: "var(--kn-font-mono)",
  background: "var(--kn-card)",
  border: "1px solid var(--kn-border-strong)",
  color: "var(--kn-foreground)",
}

export function Code({ children, style, ...p }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      style={{
        ...codeStyle,
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
        ...codeStyle,
        borderRadius: "var(--kn-radius)",
        padding: "0.9em 1.1em",
        fontSize: "0.95rem",
        lineHeight: 1.55,
        overflow: "auto",
        ...style,
      }}
      {...p}
    >
      <code>{children}</code>
    </pre>
  )
}
