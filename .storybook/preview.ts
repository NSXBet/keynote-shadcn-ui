import type { Preview } from "@storybook/react-vite"
import "../src/themes/tokens.css"
import "../src/themes/corporate-blue.css"
import "../src/themes/minimalist-dark.css"
import "../src/themes/photocentric.css"
import "../src/themes/finance-diagonal.css"
import "../src/themes/sunrise.css"

const THEMES: Record<string, { title: string; cls: string; bg: string }> = {
  brand: { title: "Brand (white/blue)", cls: "", bg: "#fbfcfe" },
  cinematic: { title: "Cinematic (dark)", cls: "kn-cinematic", bg: "#0a0e16" },
  "corporate-blue": { title: "Corporate Blue", cls: "kn-corporate-blue", bg: "#ffffff" },
  "minimalist-dark": { title: "Minimalist Dark", cls: "kn-minimalist-dark", bg: "#0a0a0a" },
  photocentric: { title: "Photocentric", cls: "kn-photocentric", bg: "#0d0e0f" },
  "finance-diagonal": { title: "Finance Diagonal", cls: "kn-finance-diagonal", bg: "#14161a" },
  sunrise: { title: "Sunrise (orange)", cls: "kn-sunrise", bg: "#f5f5f7" },
}
const THEME_CLASSES = Object.values(THEMES).map((t) => t.cls).filter(Boolean)

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
  },
  globalTypes: {
    theme: {
      description: "Keynote theme",
      defaultValue: "brand",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: Object.entries(THEMES).map(([value, t]) => ({ value, title: t.title })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = THEMES[context.globals.theme] ?? THEMES.brand
      // swap the active theme class so --kn-* tokens flip
      document.documentElement.classList.remove(...THEME_CLASSES)
      if (theme.cls) document.documentElement.classList.add(theme.cls)
      document.documentElement.style.background = theme.bg
      return Story()
    },
  ],
}
export default preview
