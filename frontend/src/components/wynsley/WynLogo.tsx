"use client";

import { useCallback, useRef } from "react";
import type { CSSProperties } from "react";

/*
 * The Wynsley wordmark, ported from the design's <wyn-logo> element (wyn-logo.js).
 * Inlines the official animated logo (assets/wynsley-logo-light-animated.svg):
 * the wave "w" draws itself, then the letters fade in. tone="paper" recolours the
 * letters to the brand's dark-background text colour (#F3EFE6).
 * size is the visible wordmark width in px; the file's built-in clear space is
 * kept but cropped out of the layout box. Hovering replays the animation.
 */

const VB = { w: 1040, h: 409, x0: 104, x1: 930, y0: 110, y1: 299 };

const LETTERS =
  "M298 298.8V275H318.4Q324.2 275 328.1 273.5Q332 272 334.6 268.7Q337.2 265.4 338.6 259.6L367.8 147.4H394.4L362.2 265.6Q359 277.8 353.2 285.1Q347.4 292.4 338.3 295.6Q329.2 298.8 315.8 298.8ZM331.8 253.6V231.6H355V253.6ZM322.4 253.6 287.2 147.4H315.2L348.6 253.6ZM413.6 256V147.4H435.6V194H433.6Q433.6 177.4 438 166.3Q442.4 155.2 451.1 149.6Q459.8 144 472.8 144H474Q493.4 144 503.4 156.5Q513.4 169 513.4 193.8V256H485.6V191.4Q485.6 181.4 479.9 175.2Q474.2 169 464.2 169Q454 169 447.7 175.3Q441.4 181.6 441.4 192.2V256ZM582.6 259.4Q560.2 259.4 547.5 249.9Q534.8 240.4 534.2 223.6H559.2Q559.8 229.2 565.4 233.8Q571 238.4 583 238.4Q593 238.4 598.9 234.8Q604.8 231.2 604.8 225Q604.8 219.6 600.3 216.4Q595.8 213.2 585 212.2L575.4 211.2Q557.2 209.2 547.4 200.8Q537.6 192.4 537.6 178.4Q537.6 167.2 543.2 159.6Q548.8 152 558.7 148.1Q568.6 144.2 581.4 144.2Q601.4 144.2 613.8 153Q626.2 161.8 626.8 178.8H601.8Q601.4 173.2 596.2 169.2Q591 165.2 581.2 165.2Q572.4 165.2 567.6 168.6Q562.8 172 562.8 177.4Q562.8 182.6 566.7 185.4Q570.6 188.2 579.4 189.2L589 190.2Q608.2 192.2 619.1 200.8Q630 209.4 630 224Q630 234.8 624.1 242.7Q618.2 250.6 607.6 255Q597 259.4 582.6 259.4ZM654.4 256V110H682.2V256ZM640.8 130.8V110H682.2V130.8ZM762.6 259.8Q748.6 259.8 738.1 255Q727.6 250.2 720.7 242.1Q713.8 234 710.3 224Q706.8 214 706.8 203.6V199.8Q706.8 189 710.3 178.9Q713.8 168.8 720.7 160.9Q727.6 153 737.8 148.3Q748 143.6 761.4 143.6Q779 143.6 790.9 151.3Q802.8 159 808.8 171.5Q814.8 184 814.8 198.4V208.4H718.6V191.4H797.4L788.8 199.8Q788.8 189.4 785.8 182Q782.8 174.6 776.7 170.6Q770.6 166.6 761.4 166.6Q752.2 166.6 745.8 170.8Q739.4 175 736.1 182.9Q732.8 190.8 732.8 201.8Q732.8 212 736 219.9Q739.2 227.8 745.8 232.3Q752.4 236.8 762.6 236.8Q772.8 236.8 779.2 232.7Q785.6 228.6 787.4 222.6H813Q810.6 233.8 803.8 242.2Q797 250.6 786.5 255.2Q776 259.8 762.6 259.8ZM833.8 298.8V275H854.2Q860 275 863.9 273.5Q867.8 272 870.4 268.7Q873 265.4 874.4 259.6L903.6 147.4H930.2L898 265.6Q894.8 277.8 889 285.1Q883.2 292.4 874.1 295.6Q865 298.8 851.6 298.8ZM867.6 253.6V231.6H890.8V253.6ZM858.2 253.6 823 147.4H851L884.4 253.6Z";

const WAVE =
  "M110 160.6C125.71 160.6 129.84 246.6 151.33 246.6C170.85 246.6 175.19 181.24 194.7 181.24C214.21 181.24 218.55 246.6 238.07 246.6C259.56 246.6 263.69 160.6 279.4 160.6";

type Props = {
  tone?: "ink" | "paper";
  size?: number;
  animate?: boolean;
  delay?: number;
};

let gradientSeq = 0;

export default function WynLogo({ tone = "ink", size = 132, animate = true, delay = 0.25 }: Props) {
  const waveRef = useRef<SVGPathElement>(null);
  const gid = useRef<string>("");
  if (!gid.current) gid.current = `wyn-g-${++gradientSeq}`;
  const s = size / (VB.x1 - VB.x0);

  const replay = useCallback(() => {
    const w = waveRef.current;
    if (!w || !animate) return;
    w.classList.remove("wyn-draw");
    void w.getBoundingClientRect();
    w.classList.add("wyn-draw");
  }, [animate]);

  const host: CSSProperties = {
    display: "inline-block",
    position: "relative",
    width: `${size}px`,
    height: `${(VB.y1 - VB.y0) * s}px`,
    lineHeight: 0,
    flex: "none",
  };
  const box: CSSProperties = {
    position: "absolute",
    left: `${-VB.x0 * s}px`,
    top: `${-VB.y0 * s}px`,
    width: `${VB.w * s}px`,
    height: `${VB.h * s}px`,
  };
  const letters: CSSProperties = animate
    ? { opacity: 0, animation: `wyn-fade .9s cubic-bezier(.22,1,.36,1) ${delay + 0.45}s forwards` }
    : {};
  const wave: CSSProperties = animate
    ? { strokeDasharray: "1 1", strokeDashoffset: 1, animationDelay: `${delay}s` }
    : { strokeDasharray: "1 1", strokeDashoffset: 0 };

  return (
    <span style={host} onPointerEnter={replay}>
      <span style={box} role="img" aria-label="Wynsley">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1040 409"
          width="1040"
          height="409"
          style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
        >
          <defs>
            <linearGradient id={gid.current} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#FF6B5B" />
              <stop offset="1" stopColor="#FF9F1C" />
            </linearGradient>
          </defs>
          <path d={LETTERS} fill={tone === "paper" ? "#F3EFE6" : "#1D1B19"} style={letters} />
          <path
            ref={waveRef}
            d={WAVE}
            pathLength={1}
            className={animate ? "wyn-w wyn-draw" : "wyn-w"}
            fill="none"
            stroke={`url(#${gid.current})`}
            strokeWidth="26.4"
            strokeLinecap="butt"
            style={wave}
          />
        </svg>
      </span>
    </span>
  );
}
