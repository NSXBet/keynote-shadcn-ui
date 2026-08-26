import * as React from "react"

/* Fragment — an in-slide "build": content hidden until its step is active.
 * The Deck manages a fragment cursor per slide: next reveals the next
 * fragment, prev undoes the last, advancing slides only when none remain.
 * Animations are transform+opacity only; reduced-motion collapses to instant. */

export type FragmentAnimation =
  | "appear"
  | "fade"
  | "slide-left"
  | "slide-right"
  | "slide-up"
  | "slide-down"
  | "zoom"

export interface FragmentProps {
  children: React.ReactNode
  /** reveal animation (default "fade") */
  animation?: FragmentAnimation
  /** custom duration in ms (default 240) */
  durationMs?: number
  /** when true, fragment is shown immediately without waiting for its step */
  always?: boolean
  className?: string
  style?: React.CSSProperties
}

/* For each animation, the hidden state reads as the INVERSE exit when
 * cursor moves backward: forward reveals (from hidden→shown), backward
 * exits (from shown→hidden). hiddenBy[*] is both the enter-from and
 * exit-to state — so backward actually reverses the animation. */
const hiddenBy: Record<FragmentAnimation, React.CSSProperties> = {
  appear: { opacity: 0 },
  fade: { opacity: 0 },
  "slide-left": { opacity: 0, transform: "translateX(24px)" },  // enter from (or exit to) left
  "slide-right": { opacity: 0, transform: "translateX(-24px)" }, // enter from (or exit to) right
  "slide-up": { opacity: 0, transform: "translateY(24px)" },     // from below / exit below
  "slide-down": { opacity: 0, transform: "translateY(-24px)" },  // from above / exit above
  zoom: { opacity: 0, transform: "scale(0.92)" },
}
const shownState: React.CSSProperties = { opacity: 1, transform: "none" }

/* BuildContext: provided per-slide. `shown` = how many fragments of this slide
 * are revealed; `register(i)` reports a fragment exists at order i. */
export interface BuildState {
  shown: number
}
export const BuildContext = React.createContext<BuildState>({ shown: Infinity })

/* FragmentOrderContext: a mutable counter so each Fragment learns its index
 * within the current slide. */
const OrderContext = React.createContext<{ next: () => number }>({ next: () => 0 })

export function Fragment({
  children,
  animation = "fade",
  durationMs = 240,
  always = false,
  className = "",
  style,
}: FragmentProps) {
  const order = React.useContext(OrderContext)
  const { shown } = React.useContext(BuildContext)
  const indexRef = React.useRef<number | null>(null)
  if (indexRef.current === null) indexRef.current = order.next()
  const index = indexRef.current
  const visible = always || index < shown

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

  const base: React.CSSProperties = reduced
    ? { opacity: visible ? 1 : 0, transition: "none" }
    : {
        transition: `opacity ${durationMs}ms var(--kn-ease-out), transform ${durationMs}ms var(--kn-ease-out)`,
        ...(visible ? shownState : hiddenBy[animation]),
      }

  return (
    <div className={`kn-fragment ${className}`} data-fragment-index={index} style={{ ...base, ...style }}>
      {children}
    </div>
  )
}

/* BuildScope — wraps one slide's content: gives Fragments their order and
 * tells them how many are shown. Deck controls `shown`. */
export function BuildScope({ shown, children }: { shown: number; children: React.ReactNode }) {
  const counter = React.useRef(0)
  const order = React.useMemo(() => ({ next: () => counter.current++ }), [])
  return (
    <OrderContext.Provider value={order}>
      <BuildContext.Provider value={{ shown }}>{children}</BuildContext.Provider>
    </OrderContext.Provider>
  )
}

/* countFragments — count Fragment descendants in a React tree. */
export function countFragments(node: React.ReactNode): number {
  let n = 0
  React.Children.forEach(node, (child) => {
    if (!React.isValidElement(child)) return
    if (child.type === Fragment) n += 1
    if (child.props?.children) n += countFragments(child.props.children)
  })
  return n
}
