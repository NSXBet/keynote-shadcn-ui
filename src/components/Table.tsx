import * as React from "react"

/* Table — shadcn-styled data table for keynote metrics/benchmarks. */

export function Table({ children, style, ...p }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <table
      className="kn-table"
      style={{
        fontFamily: "var(--kn-font-sans)",
        fontVariantNumeric: "tabular-nums",
        borderCollapse: "collapse",
        width: "100%",
        fontSize: "1rem",
        background: "var(--kn-card)",
        borderRadius: "var(--kn-radius)",
        overflow: "hidden",
        border: `1px solid var(--kn-border)`,
        ...style,
      }}
      {...p}
    >
      {children}
    </table>
  )
}

export function THead({ children, ...p }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...p}>{children}</thead>
}

export function TBody({ children, ...p }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...p}>{children}</tbody>
}

export function Tr({ children, style, ...p }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr style={style} {...p}>{children}</tr>
}

export function Th({ children, style, ...p }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      style={{
        background: "color-mix(in srgb, var(--kn-border) 40%, var(--kn-card))",
        textAlign: "left",
        padding: "0.6em 0.9em",
        fontWeight: 700,
        color: "var(--kn-foreground)",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...p}
    >
      {children}
    </th>
  )
}

export function Td({
  children,
  highlight = false,
  style,
  ...p
}: React.TdHTMLAttributes<HTMLTableCellElement> & { highlight?: boolean }) {
  return (
    <td
      style={{
        padding: "0.6em 0.9em",
        borderTop: `1px solid var(--kn-border)`,
        color: highlight ? "var(--kn-foreground)" : "var(--kn-muted)",
        fontWeight: highlight ? 600 : 400,
        verticalAlign: "top",
        ...style,
      }}
      {...p}
    >
      {children}
    </td>
  )
}
