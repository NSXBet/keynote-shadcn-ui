/// <reference types="vitest/config" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { resolve } from "path"

/* ESM library build — the npm-package flavor. React/ReactDOM/Recharts are
 * peer deps and stay external; the consumer (build-step deck, or a CDN deck
 * via import-map/esm.sh) provides them. */
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  define: command === "build" ? { "process.env.NODE_ENV": JSON.stringify("production") } : {},
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "KeynoteShadcnUI",
      formats: ["es"],
      fileName: () => "keynote-shadcn-ui.esm.js",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "recharts"],
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
}))
