import type { Preview } from "@storybook/react-vite"
import "../src/themes/tokens.css"

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
        items: [
          { value: "brand", title: "Brand (white/blue)" },
          { value: "cinematic", title: "Cinematic (dark)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme
      // apply the theme class to the preview root so --kn-* tokens flip
      if (theme === "cinematic") {
        document.documentElement.classList.add("kn-cinematic")
        document.documentElement.style.background = "#0d1117"
      } else {
        document.documentElement.classList.remove("kn-cinematic")
        document.documentElement.style.background = "#ffffff"
      }
      return Story()
    },
  ],
}
export default preview
