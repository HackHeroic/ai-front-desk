import type { CSSProperties } from "react";

const cache = new Map<string, CSSProperties>();

/**
 * Turns a CSS declaration string into a React style object, so inline styles
 * can be carried over verbatim from the Claude Design source.
 * Example: sx("display:flex;gap:12px") -> { display: "flex", gap: "12px" }
 */
export function sx(css: string): CSSProperties {
  const hit = cache.get(css);
  if (hit) return hit;

  const out: Record<string, string> = {};
  let depth = 0;
  let start = 0;
  const decls: string[] = [];
  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    else if (ch === ";" && depth === 0) {
      decls.push(css.slice(start, i));
      start = i + 1;
    }
  }
  decls.push(css.slice(start));

  for (const decl of decls) {
    const idx = decl.indexOf(":");
    if (idx === -1) continue;
    const prop = decl.slice(0, idx).trim();
    const value = decl.slice(idx + 1).trim();
    if (!prop) continue;
    if (prop.startsWith("--")) {
      out[prop] = value;
      continue;
    }
    // -webkit-backdrop-filter -> WebkitBackdropFilter
    const key = prop
      .replace(/^-(webkit|moz|ms)-/, (_, v: string) => v.charAt(0).toUpperCase() + v.slice(1) + "-")
      .replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    out[key] = value;
  }

  const style = out as CSSProperties;
  cache.set(css, style);
  return style;
}
