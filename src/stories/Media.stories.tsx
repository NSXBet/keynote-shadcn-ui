import type { Meta, StoryObj } from "@storybook/react-vite"
import { Image, YouTube, Code, CodeBlock } from "../index"

const meta: Meta = {
  title: "Keynote/Media & Code",
}
export default meta

const tinyPng =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="#2563eb"/><text x="50%" y="50%" fill="#fff" font-size="24" text-anchor="middle" dy=".35em">base64 svg</text></svg>`
  )

export const ImageBase64: StoryObj = {
  render: () => (
    <div style={{ padding: "2rem", background: "var(--kn-background)" }}>
      <Image src={tinyPng} alt="inline svg" maxWidth={320} />
    </div>
  ),
}

export const ImageUrl: StoryObj = {
  render: () => (
    <div style={{ padding: "2rem", background: "var(--kn-background)" }}>
      <Image src={"data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#2563eb"/><text x="50%" y="50%" fill="#fff" font-size="28" text-anchor="middle" dy=".35em">sample image</text></svg>`)} alt="sample" maxWidth={480} />
    </div>
  ),
}

export const YouTubeEmbed: StoryObj = {
  render: () => (
    <div style={{ padding: "2rem", background: "var(--kn-background)" }}>
      <YouTube video="dQw4w9WgXcQ" title="Sample" maxWidth={560} />
    </div>
  ),
}

export const CodeBlocks: StoryObj = {
  render: () => (
    <div style={{ padding: "2rem", background: "var(--kn-background)" }}>
      <p style={{ color: "var(--kn-foreground)" }}>
        Inline <Code>confidence level</Code> code.
      </p>
      <CodeBlock>{`SELECT goal, guardrail\nFROM experiment\nWHERE id = $1;`}</CodeBlock>
    </div>
  ),
}
