import type { CSSProperties } from "react";

/*
 * Port of the design's <image-slot> placeholder. Slots that were filled in the
 * design ship as files under /assets (madhav-photo -> /assets/madhav-photo.webp);
 * empty slots show their placeholder text.
 */
const FILLED: Record<string, string> = {
  "madhav-photo": "/assets/madhav-photo.webp",
};

type Props = { id: string; shape?: "rect" | "circle"; placeholder?: string; style?: CSSProperties };

export default function ImageSlot({ id, shape = "rect", placeholder, style }: Props) {
  const src = FILLED[id];
  const radius = shape === "circle" ? "50%" : undefined;
  if (!src) {
    return (
      <div role="img" aria-label={placeholder} style={{ ...style, borderRadius: radius, overflow: "hidden" }} />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={placeholder ?? ""}
      style={{ ...style, objectFit: "cover", borderRadius: radius }}
    />
  );
}
