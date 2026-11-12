"use client";

import React from "react";
import { sx } from "@/lib/sx";
import WynLogo from "@/components/wynsley/WynLogo";
import "./Product.css";

/*
 * Ported from the Claude Design component V8Product.dc.html.
 * Markup and inline styles are carried over verbatim; logic is ported from its DCLogic class.
 * Design props: none
 */
export default class Product extends React.Component<any, any> {
  state: any = { on: false, outs: false, user: false };
  root: HTMLElement | null = null;
  io: IntersectionObserver | null = null;
  started = false;
  inView = false;
  hover = false;
  tm: any = undefined;
  tm2: any = undefined;
  cr: any = undefined;
  rootRef = (el: HTMLElement | null) => { this.root = el; };
  hov = { on: () => { this.hover = true; }, off: () => { this.hover = false; } };

  componentDidMount() {
    const rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm || !("IntersectionObserver" in window)) { this.setState({ on: true, outs: true, cnt: 1 }); return; }
    this.io = new IntersectionObserver((es) => es.forEach((e) => {
      this.inView = e.isIntersecting;
      if (e.isIntersecting && !this.started) {
        this.started = true;
        this.loop(900);
        this.tm2 = setTimeout(() => {
          this.setState({ outs: true });
          const t0 = performance.now();
          const st = (n: number) => {
            const p = Math.min(1, (n - t0) / 1300);
            this.setState({ cnt: 1 - Math.pow(1 - p, 3) });
            if (p < 1) this.cr = requestAnimationFrame(st);
          };
          this.cr = requestAnimationFrame(st);
        }, 2200);
      }
    }), { threshold: 0.25 });
    if (this.root) this.io.observe(this.root);
  }

  loop(wait: number) {
    clearTimeout(this.tm);
    this.tm = setTimeout(() => {
      if (this.state.user) return;
      if (!this.inView || this.hover || document.hidden) { this.loop(800); return; }
      const next = !this.state.on;
      this.setState({ on: next });
      this.loop(next ? 6500 : 2600);
    }, wait);
  }

  componentWillUnmount() {
    clearTimeout(this.tm);
    clearTimeout(this.tm2);
    if (this.cr) cancelAnimationFrame(this.cr);
    if (this.io) this.io.disconnect();
    // React StrictMode remounts class components in dev: allow a fresh start.
    this.started = false;
    this.io = null;
  }

  renderVals() {
    const on = this.state.on;
    // [title, tags, before, after, who, icon, scattered [x,y,rot], placed [x,y]]
    const C: any[] = [
      ["Website care", "IDX listing search · hosting · uptime · backups", "Tour form broken", "Tested every morning", "Vendor 1", "M3 5h18v14H3zM3 9h18M7 13h5", [3, 4, -5], [0, 1]],
      ["Local SEO", "Google Business Profile · reviews · citations", "Hours out of date", "Profile kept current", "Nobody", "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z", [36, 0, 4], [0, 35.5]],
      ["Compliance checks", "Fair housing · MLS display · accessibility", "Never checked", "Checked every night", "Nobody", "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z", [5, 66, 5], [0, 70]],
      ["CRM and lead automation", "Pipeline · routing · drip email and text", "Same client, two systems", "One record per person", "Vendor 2", "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0", [70, 6, -3], [72, 1]],
      ["AI assistants", "Chat · text · email · English and Spanish", "3 waiting since last night", "Answered on a promised clock", "Agents, when free", "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z", [38, 70, -4], [72, 35.5]],
      ["Property management (PMS)", "AppFolio · Buildium · Rentvine · DoorLoop", "Cut off from sales", "Connected, never replaced", "Vendor 3", "M4 21V8l8-5 8 5v13M9 21v-6h6v6", [69, 60, 6], [72, 70]],
    ];
    const cards = C.map((c, i) => {
      const p = on ? [c[7][0], c[7][1], 0] : c[6];
      return {
        key: i, t: c[0], tags: c[1], s0: c[2], s1: c[3], who: c[4], ic: c[5], x: p[0], y: p[1], r: p[2],
        ob: on ? 0 : 1, oa: on ? 1 : 0, ya: on ? 0 : 5, bd: on ? "#BFE0DA" : "#E6DFD3", ib: on ? "#E3F5F2" : "#F0EAE0", ic2: on ? "#0B6F69" : "#3A342E", d: (i * 70) + "ms", d2: (900 + i * 110) + "ms",
      };
    });
    // card vertical centres in the 1180x600 box: rows at 1%, 35.5%, 70% of 600, card ~ 150px tall
    const cy = [6 + 75, 213 + 75, 420 + 75];
    const paths = [0, 1, 2, 3, 4, 5].map((i) => {
      const left = i < 3, y = cy[i % 3];
      const d = left ? "M430 300 C385 300 380 " + y + " 330 " + y : "M750 300 C795 300 800 " + y + " 850 " + y;
      return { key: i, d, off: on ? 0 : 1, dl: (650 + i * 80) + "ms", fo: on ? 1 : 0, dl2: (1300 + i * 80) + "ms", ad: (i * 0.4) + "s" };
    });
    const tg = {
      pa: on ? "true" : "false", pb: on ? "false" : "true",
      ab: on ? "#1D1B19" : "rgba(29,27,25,0)", af: on ? "#F3EFE6" : "#3A342E",
      bb: on ? "rgba(29,27,25,0)" : "#1D1B19", bf: on ? "#3A342E" : "#F3EFE6",
      toA: () => { clearTimeout(this.tm); this.setState({ on: true, user: true }); },
      toB: () => { clearTimeout(this.tm); this.setState({ on: false, user: true }); },
    } as const;
    const O: [string, number, string, string][] = [
      ["Win the first ask", 75, "of buyers interviewed just one agent", "NAR 2026"],
      ["Keep past clients", 13, "of repeat buyers rehired on past experience (79% would consider it)", "Zillow"],
      ["Stop buying them back", 40, "of commission, paid for a Zillow seller lead", "Zillow Preferred"],
      ["Keep top agents", 63, "of brokerage leaders: their top challenge", "Delta Media survey, 2026"],
    ];
    const v = this.state.outs, k = this.state.cnt || 0;
    const outs = O.map((o, i) => ({
      key: i, t: o[0], n: Math.round(o[1] * k) + "%", s: o[2], src: o[3], o: v ? 1 : 0, y: v ? 0 : 14, d: (i * 120) + "ms",
      v0: i === 0, v1: i === 1, v2: i === 2, ring: i === 3, dash: (63 * k).toFixed(1) + " 100",
      agents: ["Answered first", "Never called", "Never called", "Never called"].map((l, j) => ({ key: j, l: j === 0 ? "Hired" : "Skipped", bg: v ? (j === 0 ? "#0B6F69" : "#E6DFD3") : "#E6DFD3", c: v ? (j === 0 ? "#0B6F69" : "#B5AC9E") : "#B5AC9E", d: (400 + j * 120) + "ms" })),
      wa: v ? "79%" : "0%", wb: v ? "13%" : "0%", wf: v ? "40%" : "0%",
    }));
    return { rootRef: this.rootRef, hov: this.hov, cards, paths, hub: { o: on ? 1 : 0, s: on ? 1 : 0.85, e: on ? 0 : 1, logo: on }, tg, outs };
  }

  render() {
    const { cards, hov, hub, outs, paths, rootRef, tg } = this.renderVals();
    return (
      <>
      <section id="product" ref={rootRef} style={sx("background:#F3EFE6;color:#1D1B19;padding:clamp(72px,10vh,120px) clamp(20px,5vw,80px);font-family:'Instrument Sans',system-ui,sans-serif")}>
        <div style={sx("max-width:1180px;margin:0 auto")}>
          {" "}
          <span id="product-answer" style={sx("position:relative;top:-90px;display:block")} />
          <span id="product-found" style={sx("position:relative;top:-90px;display:block")} />
          <span id="product-owners" style={sx("position:relative;top:-90px;display:block")} />
          {" "}
          <div style={sx("display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:16px 48px")}>
            {" "}
            <div style={sx("flex:1 1 560px;max-width:760px")}>
              {" "}
              <div style={sx("display:flex;align-items:center;gap:10px;font-size:15px;font-weight:600;color:#0B6F69;line-height:1")}>
                <span>
                  {"With"}
                </span>
                <WynLogo tone="ink" size={92} animate={false} />
              </div>
              {" "}
              <h2 style={sx("margin:14px 0 0;font:600 clamp(34px,4.2vw,56px)/1.05 'Sora',sans-serif;letter-spacing:-0.045em;text-wrap:balance")}>
                {"One partner runs all six, around one record."}
              </h2>
              {" "}
            </div>
            {" "}
            <div style={sx("flex:0 1 380px")}>
              {" "}
              <p style={sx("margin:0;font-size:16.5px;line-height:1.55;color:#3A342E;text-wrap:pretty")}>
                {"Our team runs it and our software does most of the work. One flat price, never per lead or per deal."}
              </p>
              {" "}
              <div role="group" aria-label="Compare" style={sx("display:inline-flex;margin-top:16px;padding:3px;border-radius:999px;background:#E9E2D6")}>
                {" "}
                <button type="button" onClick={tg.toB} aria-pressed={tg.pb} style={sx(`height:38px;padding:0 16px;border:0;border-radius:999px;background:${tg.bb};color:${tg.bf};font:600 13px 'Instrument Sans',sans-serif;cursor:pointer;transition:background .1s cubic-bezier(.22,1,.36,1),color .1s cubic-bezier(.22,1,.36,1)`)}>
                  {"Today"}
                </button>
                {" "}
                <button type="button" onClick={tg.toA} aria-pressed={tg.pa} style={sx(`height:38px;padding:0 16px;border:0;border-radius:999px;background:${tg.ab};color:${tg.af};font:600 13px 'Instrument Sans',sans-serif;cursor:pointer;transition:background .1s cubic-bezier(.22,1,.36,1),color .1s cubic-bezier(.22,1,.36,1)`)}>
                  {"With Wynsley"}
                </button>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {/* THE SYSTEM: six modules, one record, run by Wynsley */}
          {" "}
          <div className="hx" onMouseEnter={hov.on} onMouseLeave={hov.off} style={sx("margin-top:clamp(36px,5vw,56px)")}>
            {" "}
            <svg className="hx-svg" aria-hidden="true" viewBox="0 0 1180 600" style={sx("position:absolute;inset:0;width:100%;height:100%;overflow:visible")}>
              {(paths || []).map((p: any, $index: number) => (
                <React.Fragment key={p?.key ?? $index}>
                  <path d={p.d} fill="none" stroke="#0B6F69" strokeOpacity=".22" strokeWidth="2" pathLength="1" strokeDasharray="1 1" strokeDashoffset={p.off} style={sx(`transition:stroke-dashoffset .8s cubic-bezier(.22,1,.36,1) ${p.dl}`)} />
                  <path className="hx-flow" d={p.d} fill="none" stroke="#14A89E" strokeWidth="3" strokeLinecap="round" pathLength="1" strokeDasharray="0.07 0.93" style={sx(`opacity:${p.fo};transition:opacity .4s ease ${p.dl2};animation-delay:${p.ad}`)} />
                </React.Fragment>
              ))}
            </svg>
            {" "}
            <div className="hx-hub" style={sx("text-align:center")}>
              {" "}
              <div style={sx("position:relative;display:grid")}>
                {" "}
                <div style={sx(`grid-area:1/1;padding:22px 20px;border-radius:22px;border:1.5px dashed #C9BFAF;color:#8C8478;font-size:14px;line-height:1.4;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:${hub.e};transition:opacity .4s ease`)}>
                  {" "}
                  <span style={sx("font:600 15px 'Sora',sans-serif;color:#6E665C")}>
                    {"Nothing in the middle"}
                  </span>
                  {" "}
                  <span style={sx("margin-top:4px")}>
                    {"Six tools that never talk to each other."}
                  </span>
                  {" "}
                </div>
                {" "}
                <div style={sx(`grid-area:1/1;position:relative;opacity:${hub.o};transform:scale(${hub.s});transition:opacity .6s cubic-bezier(.22,1,.36,1) 450ms,transform .7s cubic-bezier(.34,1.56,.64,1) 450ms`)}>
                  {" "}
                  <div style={sx("position:relative;padding:22px 20px 18px;border-radius:22px;background:#1D1B19;color:#F3EFE6;box-shadow:0 30px 60px -28px rgba(29,27,25,.65)")}>
                    {" "}
                    <div style={sx("display:flex;justify-content:center;min-height:36px")}>
                      {hub.logo ? (
                        <>
                          <WynLogo tone="paper" size={150} delay={0.5} />
                        </>
                      ) : null}
                    </div>
                    {" "}
                    <div style={sx("margin-top:14px;font:600 19px/1.2 'Sora',sans-serif;letter-spacing:-0.025em;text-wrap:balance")}>
                      {"Your whole firm, "}
                      <span style={sx("color:#FF9F6B")}>
                        {"run as one."}
                      </span>
                    </div>
                    {" "}
                    <div style={sx("display:flex;justify-content:center;flex-wrap:wrap;gap:6px;margin-top:14px")}>
                      {" "}
                      <span style={sx("padding:5px 10px;border-radius:999px;background:rgba(243,239,230,.08);font-size:12px;font-weight:600;color:#E9E1D4")}>
                        {"One team"}
                      </span>
                      {" "}
                      <span style={sx("padding:5px 10px;border-radius:999px;background:rgba(243,239,230,.08);font-size:12px;font-weight:600;color:#E9E1D4")}>
                        {"One record"}
                      </span>
                      {" "}
                      <span style={sx("padding:5px 10px;border-radius:999px;background:rgba(243,239,230,.08);font-size:12px;font-weight:600;color:#E9E1D4")}>
                        {"One bill"}
                      </span>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            {(cards || []).map((k: any, $index: number) => (
              <React.Fragment key={k?.key ?? $index}>
                {" "}
                <div className="hx-card" style={sx(`left:${k.x}%;top:${k.y}%;transform:rotate(${k.r}deg);transition:left .9s cubic-bezier(.22,1,.36,1) ${k.d},top .9s cubic-bezier(.22,1,.36,1) ${k.d},transform .9s cubic-bezier(.22,1,.36,1) ${k.d}`)}>
                  {" "}
                  <div style={sx(`padding:14px 16px;border-radius:16px;background:#fff;border:1px solid ${k.bd};box-shadow:0 18px 40px -26px rgba(40,30,20,.45);transition:border-color .5s ease ${k.d2}`)}>
                    {" "}
                    <div style={sx("display:flex;align-items:center;gap:10px")}>
                      {" "}
                      <span style={sx(`flex:none;width:32px;height:32px;border-radius:10px;background:${k.ib};display:flex;align-items:center;justify-content:center;transition:background .5s ease ${k.d2}`)}>
                        <svg aria-hidden="true" viewBox="0 0 24 24" style={sx(`width:17px;height:17px;fill:none;stroke:${k.ic2};stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;transition:stroke .5s ease ${k.d2}`)}>
                          <path d={k.ic} />
                        </svg>
                      </span>
                      {" "}
                      <div style={sx("flex:1;min-width:0;font:600 15px/1.2 'Sora',sans-serif;letter-spacing:-0.015em")}>
                        {k.t}
                      </div>
                      {" "}
                      <span style={sx("display:grid;justify-items:end;font-size:11px;white-space:nowrap")}>
                        <span style={sx(`grid-area:1/1;color:#8C8478;opacity:${k.ob};transition:opacity .4s ease ${k.d2}`)}>
                          {k.who}
                        </span>
                        <span style={sx(`grid-area:1/1;color:#0B6F69;font-weight:600;opacity:${k.oa};transition:opacity .4s ease ${k.d2}`)}>
                          {"Wynsley"}
                        </span>
                      </span>
                      {" "}
                    </div>
                    {" "}
                    <div style={sx("margin-top:8px;font-size:12px;line-height:1.35;color:#6E665C")}>
                      {k.tags}
                    </div>
                    {" "}
                    <div style={sx("display:grid;margin-top:8px;padding-top:8px;border-top:1px solid #F0EBE2;font-size:12.5px;font-weight:600")}>
                      {" "}
                      <span style={sx(`grid-area:1/1;display:flex;align-items:center;gap:6px;color:#B4432E;opacity:${k.ob};transition:opacity .4s ease ${k.d2}`)}>
                        <span style={sx("flex:none;width:7px;height:7px;border-radius:50%;background:#FF6B5B")} />
                        {k.s0}
                      </span>
                      {" "}
                      <span style={sx(`grid-area:1/1;display:flex;align-items:center;gap:6px;color:#0B6F69;opacity:${k.oa};transform:translateY(${k.ya}px);transition:opacity .4s ease ${k.d2},transform .4s cubic-bezier(.22,1,.36,1) ${k.d2}`)}>
                        <svg aria-hidden="true" viewBox="0 0 24 24" style={sx("flex:none;width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:round;stroke-linejoin:round")}>
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                        {k.s1}
                      </span>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </React.Fragment>
            ))}
            {" "}
          </div>
          {" "}
          {/* WHAT THE OWNER GETS: one compact panel, four columns */}
          {" "}
          <div style={sx("margin-top:clamp(48px,6vw,72px)")}>
            {" "}
            <div style={sx("font:600 clamp(20px,2vw,24px)/1.2 'Sora',sans-serif;letter-spacing:-0.03em")}>
              {"What that's worth to an owner"}
            </div>
            {" "}
            <div className="ow-grid" style={sx("display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin-top:16px;border-radius:18px;background:#fff;border:1px solid #E6DFD3;overflow:hidden")}>
              {" "}
              {(outs || []).map((o: any, $index: number) => (
                <React.Fragment key={o?.key ?? $index}>
                  {" "}
                  <div style={sx(`padding:18px 20px 16px;border-left:1px solid #EFE9DF;margin-left:-1px;opacity:${o.o};transform:translateY(${o.y}px);transition:opacity .7s cubic-bezier(.22,1,.36,1) ${o.d},transform .7s cubic-bezier(.22,1,.36,1) ${o.d}`)}>
                    {" "}
                    <div style={sx("font-size:12.5px;font-weight:600;color:#0B6F69")}>
                      {o.t}
                    </div>
                    {" "}
                    <div style={sx("display:flex;align-items:center;gap:12px;margin-top:6px")}>
                      {" "}
                      <div style={sx("font:600 36px/1 'Sora',sans-serif;letter-spacing:-0.05em;font-variant-numeric:tabular-nums")}>
                        {o.n}
                      </div>
                      {" "}
                      {o.v0 ? (
                        <>
                          <span aria-hidden="true" style={sx("display:flex;gap:4px")}>
                            {(o.agents || []).map((g: any, $index: number) => (
                              <React.Fragment key={g?.key ?? $index}>
                                <span style={sx(`width:12px;height:12px;border-radius:50%;background:${g.bg};transition:background .5s ease ${g.d}`)} />
                              </React.Fragment>
                            ))}
                          </span>
                        </>
                      ) : null}
                      {" "}
                      {o.ring ? (
                        <>
                          <svg aria-hidden="true" viewBox="0 0 36 36" style={sx("flex:none;width:30px;height:30px;transform:rotate(-90deg)")}>
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#EFE9DF" strokeWidth="6" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#0B6F69" strokeWidth="6" pathLength="100" strokeDasharray={o.dash} />
                          </svg>
                        </>
                      ) : null}
                      {" "}
                    </div>
                    {" "}
                    {o.v1 ? (
                      <>
                        <div aria-hidden="true" style={sx("position:relative;margin-top:10px;height:5px;border-radius:3px;background:#EFE9DF")}>
                          <div style={sx(`position:absolute;left:0;top:0;bottom:0;border-radius:3px;background:#B9D9D4;width:${o.wa};transition:width 1.1s cubic-bezier(.22,1,.36,1) .2s`)} />
                          <div style={sx(`position:absolute;left:0;top:0;bottom:0;border-radius:3px;background:#0B6F69;width:${o.wb};transition:width 1.1s cubic-bezier(.22,1,.36,1) .5s`)} />
                        </div>
                      </>
                    ) : null}
                    {" "}
                    {o.v2 ? (
                      <>
                        <div aria-hidden="true" style={sx("position:relative;margin-top:10px;height:5px;border-radius:3px;background:#EFE9DF")}>
                          <div style={sx(`position:absolute;left:0;top:0;bottom:0;border-radius:3px;background:#FF6B5B;width:${o.wf};transition:width 1.1s cubic-bezier(.22,1,.36,1) .3s`)} />
                        </div>
                      </>
                    ) : null}
                    {" "}
                    <p style={sx("margin:10px 0 0;font-size:13px;line-height:1.4;color:#3A342E")}>
                      {o.s}
                    </p>
                    {" "}
                    <p style={sx("margin:4px 0 0;font-size:11px;color:#8C8478")}>
                      {o.src}
                    </p>
                    {" "}
                  </div>
                  {" "}
                </React.Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {/* TRY IT */}
          {" "}
          <div style={sx("display:flex;flex-wrap:wrap;align-items:center;gap:20px 32px;margin-top:clamp(40px,5vw,56px);padding:clamp(22px,3vw,30px);border-radius:20px;background:#1D1B19;color:#F3EFE6")}>
            {" "}
            <div style={sx("flex:1 1 520px;min-width:0")}>
              {" "}
              <div style={sx("font:600 clamp(20px,1.8vw,24px)/1.2 'Sora',sans-serif;letter-spacing:-0.025em")}>
                {"Check us before you trust us."}
              </div>
              {" "}
              <p style={sx("margin:8px 0 0;font-size:14.5px;line-height:1.5;color:#D6CEC0")}>
                {"Free: we check your site and Google profile, and time one test inquiry. Results within a week."}
              </p>
              {" "}
            </div>
            {" "}
            <a className="produc-ho1" href="#contact" style={sx("display:inline-flex;align-items:center;gap:8px;height:52px;padding:0 22px;border-radius:10px;background:linear-gradient(90deg,#FF6B5B,#FF9F1C);color:#1D1B19;font:600 16px 'Sora',sans-serif;text-decoration:none;white-space:nowrap")}>
              {"Get the free check →"}
            </a>
            {" "}
          </div>
          {" "}
          <p style={sx("margin:14px 0 0;font-size:12.5px;color:#6E665C")}>
            {"You choose what sends automatically. Pilot excludes SEO content."}
          </p>
        </div>
      </section>
      </>
    );
  }
}
