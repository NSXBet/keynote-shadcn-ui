import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { resolve } from "path"

/* UMD build — the no-build CDN flavor. Fully self-contained (React, ReactDOM
 * and Recharts bundled) so a deck can use it from a plain <script> tag with no
 * import map. Also serves as the package's `require()`/main entry. */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "KeynoteShadcnUI",
      formats: ["umd"],
      fileName: () => "keynote-shadcn-ui.umd.js",
    },
    rollupOptions: {
      external: [],
      output: { globals: {} },
    },
  },
})
