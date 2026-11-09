"use client";

import { useCallback, useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

/*
 * Port of the design's <fit-box w h max> element (fit-box.js): scales fixed-size
 * content (w x h px) down to the box's width, never above `max`, and centres it.
 */
type Props = { w?: number; h?: number; max?: number; style?: CSSProperties; children?: ReactNode };

export default function FitBox({ w = 1000, h = 600, max = 1, style, children }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const fit = useCallback(() => {
    const host = hostRef.current;
    const inner = innerRef.current;
    if (!host || !inner) return;
    let cw = host.getBoundingClientRect().width;
    if (!cw && host.parentElement) cw = host.parentElement.getBoundingClientRect().width;
    if (!cw) return;
    cw = Math.round(cw);
    const s = Math.min(max, cw / w);
    inner.style.width = `${w}px`;
    inner.style.height = `${h}px`;
    inner.style.transform = `scale(${s})`;
    inner.style.left = `${Math.max(0, (cw - w * s) / 2)}px`;
    host.style.height = `${Math.round(h * s)}px`;
  }, [w, h, max]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const ro = new ResizeObserver(() => fit());
    ro.observe(host);
    if (host.parentElement) ro.observe(host.parentElement);
    window.addEventListener("resize", fit);
    window.addEventListener("load", fit);
    document.fonts?.ready.then(fit);
    fit();
    const raf = requestAnimationFrame(fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
      window.removeEventListener("load", fit);
      cancelAnimationFrame(raf);
    };
  }, [fit]);

  return (
    <div
      ref={hostRef}
      style={{
        display: "block",
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        overflow: "visible",
        contain: "inline-size",
        ...style,
      }}
    >
      <div ref={innerRef} style={{ position: "absolute", left: 0, top: 0, transformOrigin: "0 0" }}>
        {children}
      </div>
    </div>
  );
}
