import * as React from "react"

/* Image — keynote image supporting png/jpg/svg and base64 data-URIs.
 * Video — YouTube embed. */

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt?: string
  /** constrain width; defaults to natural/contained */
  maxWidth?: number | string
  /** rounded + bordered card treatment (default true) */
  framed?: boolean
}

export function Image({ src, alt = "", maxWidth = "100%", framed = true, style, ...p }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        maxWidth,
        height: "auto",
        display: "block",
        ...(framed
          ? {
              borderRadius: "var(--kn-radius)",
              border: "1px solid var(--kn-border)",
              boxShadow: "0 18px 60px rgba(0,0,0,.18)",
            }
          : null),
        ...style,
      }}
      {...p}
    />
  )
}

export interface YouTubeProps {
  /** video id or full watch/share URL */
  video: string
  title?: string
  /** 16/9 default */
  aspectRatio?: string
  maxWidth?: number | string
}

function toEmbedUrl(video: string): string {
  if (video.includes("youtube.com/embed/")) return video
  const watch = video.match(/[?&]v=([^&]+)/)
  const short = video.match(/youtu\.be\/([^?&]+)/)
  const id = watch?.[1] ?? short?.[1] ?? video
  return `https://www.youtube.com/embed/${id}`
}

export function YouTube({ video, title = "Video", aspectRatio = "16 / 9", maxWidth = "100%" }: YouTubeProps) {
  return (
    <div
      className="kn-youtube"
      style={{
        maxWidth,
        aspectRatio,
        borderRadius: "var(--kn-radius)",
        overflow: "hidden",
        border: "1px solid var(--kn-border)",
        boxShadow: "0 18px 60px rgba(0,0,0,.18)",
      }}
    >
      <iframe
        src={toEmbedUrl(video)}
        title={title}
        style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
