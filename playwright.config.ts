import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./vrt",
  outputDir: "./vrt/results",
  snapshotDir: "./vrt/snapshots",
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: "http://localhost:6006",
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  },
  webServer: {
    command: "npx storybook dev -p 6006 --no-open --ci",
    url: "http://localhost:6006",
    reuseExistingServer: true,
    timeout: 120000,
  },
})
