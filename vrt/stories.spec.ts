import { test, expect } from "@playwright/test"
import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

/* Visual-regression: snapshot every Storybook story in both themes.
 * Catches the "text behind donut" / missing-ring class of bug that unit
 * tests (jsdom, 0×0 ResponsiveContainer) cannot. */

interface StoryEntry {
  id: string
  title: string
  name: string
  type?: string
}

function storyIds(): string[] {
  const idx = JSON.parse(
    readFileSync(join(__dirname, "../storybook-static/index.json"), "utf8")
  )
  const entries: Record<string, StoryEntry> = idx.entries ?? idx.stories ?? {}
  return Object.values(entries)
    .filter((e) => (e.type ?? "story") === "story")
    .map((e) => e.id)
    .sort()
}

const themes = ["brand", "cinematic"] as const
const ids = storyIds()

for (const theme of themes) {
  for (const id of ids) {
    test(`${theme} · ${id}`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`)
      // wait for charts (Recharts) + images to settle
      await page.waitForTimeout(900)
      await expect(page).toHaveScreenshot(`${theme}--${id}.png`, {
        fullPage: false,
        maxDiffPixelRatio: 0.02,
      })
    })
  }
}
