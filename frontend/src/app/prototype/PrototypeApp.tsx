"use client";

import { useEffect, useRef } from "react";
import { loadPrototype } from "@/prototype/load";

/* Full-page product prototype, ported from the design page "Wynsley Product Prototype". */
export default function PrototypeApp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let live = true;
    loadPrototype().then((W) => {
      const el = ref.current as (HTMLDivElement & { __wy?: number }) | null;
      if (!live || !el || el.__wy) return;
      el.__wy = 1;
      W.mount(el);
    });
    return () => {
      live = false;
    };
  }, []);
  return <div ref={ref} style={{ minHeight: "100vh", background: "#E9E4DA" }} />;
}
