"use client";

import React from "react";
import { sx } from "@/lib/sx";
import "./Problem.css";

/*
 * Ported from the Claude Design component V8Problem.dc.html.
 * Markup and inline styles are carried over verbatim; logic is ported from its DCLogic class.
 * Design props: topTone ("plum" | "ink", default "plum"); the landing page passes "ink".
 */
export default class Problem extends React.Component<any, any> {
  state: any = { chars: 0, step: 0 };
  Q = "Robert Klein";
  root: HTMLElement | null = null;
  started = false;
  io: IntersectionObserver | null = null;
  check: any = undefined;
  fb: any = undefined;
  fb2: any = undefined;
  tm: any[] = [];
  rootRef = (el: HTMLElement | null) => { this.root = el; };

  componentDidMount() {
    const rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) { this.setState({ chars: this.Q.length, step: 8 }); return; }
    this.check = () => {
      if (this.started || !this.root) return;
      const r = this.root.getBoundingClientRect(), h = window.innerHeight || 800;
      if (r.top < h * 0.6 && r.bottom > h * 0.3) this.play();
    };
    window.addEventListener("scroll", this.check, { passive: true });
    if ("IntersectionObserver" in window) {
      this.io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) this.play(); }), { threshold: 0.35 });
      if (this.root) this.io.observe(this.root);
    }
    this.fb = setTimeout(() => { this.check(); if (!this.started) this.fb2 = setTimeout(() => this.play(), 2500); }, 600);
  }

  play() {
    if (this.started) return;
    this.started = true;
    window.removeEventListener("scroll", this.check);
    if (this.io) this.io.disconnect();
    this.tm = [];
    for (let i = 1; i <= this.Q.length; i++) this.tm.push(setTimeout(() => this.setState({ chars: i }), 400 + i * 70));
    const t0 = 400 + this.Q.length * 70 + 350;
    // steps 1-5: results arrive · 6: footer · 7: caption
    [0, 1, 2, 3, 4, 5, 6].forEach((k) => this.tm.push(setTimeout(() => this.setState({ step: k + 1 }), t0 + (k < 5 ? k * 230 : 5 * 230 + (k - 4) * 450))));
  }

  componentWillUnmount() {
    if (this.check) window.removeEventListener("scroll", this.check);
    clearTimeout(this.fb);
    clearTimeout(this.fb2);
    (this.tm || []).forEach(clearTimeout);
    if (this.io) this.io.disconnect();
    // React StrictMode remounts class components in dev: allow a fresh start.
    this.started = false;
    this.io = null;
  }

  renderVals() {
    const S = this.state, st = S.step;
    const R = [
      ["Website + IDX", "Vendor 1", "#5B8DEF", "Form broken", "Anonymous visitor", "Saved a 2-bed search", "M3 5h18v14H3zM3 9h18M7 13h5"],
      ["Google profile", "Nobody", "#8C8478", "Review unanswered", "Robert K.", "\u201cNo one called back.\u201d", "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"],
      ["Shared inbox", "Agents, when free", "#8C8478", "Waiting 11h", "rk.klein@\u2026", "What could Unit 2 sell for?", "M3 5h18v14H3zM3 7l9 6 9-6"],
      ["CRM", "Vendor 2", "#9B7BEA", "No history", "Robert Klein", "New lead, source unknown", "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0"],
      ["Property software", "Vendor 3", "#E0A33B", "Hidden from sales", "R. Klein", "Owner, Units 1 and 2", "M4 21V8l8-5 8 5v13M9 21v-6h6v6"],
    ];
    const rows = R.map((r, i) => { const on = st >= i + 1; return { key: i, t: r[0], who: r[1], vc: r[2], bad: r[3], name: r[4], sees: r[5], ic: r[6], o: on ? 1 : 0, y: on ? 0 : 10 }; });
    const topTone = this.props.topTone ?? "plum";
    return {
      rootRef: this.rootRef,
      bgTop: topTone === "ink" ? "#1D1B19" : "#2A1A33",
      rows,
      q: { text: this.Q.slice(0, S.chars), caret: st >= 6 ? 0 : 1, anim: st >= 6 ? "none" : "skCaret 1s steps(1) infinite" },
      foot: { o: st >= 6 ? 1 : 0 },
      cap: { o: st >= 7 ? 1 : 0, y: st >= 7 ? 0 : 10 },
    };
  }

  render() {
    const { bgTop, cap, foot, q, rootRef, rows } = this.renderVals();
    return (
      <>
      <section id="doors" ref={rootRef} style={sx(`position:relative;overflow:hidden;background:linear-gradient(180deg,${bgTop} 0,#1D1B19 180px);color:#F3EFE6;padding:clamp(56px,8vh,96px) clamp(20px,5vw,80px) clamp(72px,10vh,120px);font-family:'Instrument Sans',system-ui,sans-serif`)}>
        {" "}
        <div className="sk-grid" style={sx("max-width:1180px;margin:0 auto")}>
          {" "}
          <div style={sx("min-width:0")}>
            {" "}
            <div style={sx("font-size:14px;font-weight:600;color:#FF9F6B")}>
              {"Today"}
            </div>
            {" "}
            <h2 style={sx("margin:16px 0 0;font:600 clamp(34px,3.9vw,54px)/1.05 'Sora',sans-serif;letter-spacing:-0.045em;text-wrap:balance")}>
              {"Five vendors. "}
              <span style={sx("color:#FF9F6B")}>
                {"None of them know your clients."}
              </span>
            </h2>
            {" "}
            <p className="sk-sub" style={sx("margin:18px 0 0;font-size:16px;line-height:1.55;color:#BDB4A6")}>
              {"Every gap between them is a client someone else picks up."}
            </p>
            {" "}
            <div style={sx("display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;max-width:480px;margin-top:clamp(32px,4vw,44px);padding-top:22px;border-top:1px solid rgba(243,239,230,.12)")}>
              {" "}
              <div>
                {" "}
                <div style={sx("font:600 24px/1 'Sora',sans-serif;letter-spacing:-0.04em")}>
                  {"15 of 15"}
                </div>
                {" "}
                <p style={sx("margin:8px 0 0;font-size:13.5px;line-height:1.45;color:#D6CEC0")}>
                  {"local brokerage sites we checked had visible problems"}
                  <sup style={sx("color:#8C8478")}>
                    {"1"}
                  </sup>
                </p>
                {" "}
              </div>
              {" "}
              <div>
                {" "}
                <div style={sx("font:600 24px/1 'Sora',sans-serif;letter-spacing:-0.04em;white-space:nowrap")}>
                  {"$1,500–$2,200"}
                </div>
                {" "}
                <p style={sx("margin:8px 0 0;font-size:13.5px;line-height:1.45;color:#D6CEC0")}>
                  {"a month in tools at list price, before anyone answers a lead"}
                  <sup style={sx("color:#8C8478")}>
                    {"2"}
                  </sup>
                </p>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <p style={sx("margin:16px 0 0;max-width:480px;font-size:11px;line-height:1.5;color:#8C8478")}>
              <sup>
                {"1"}
              </sup>
              {" Wynsley review, Fort Lauderdale to Delray Beach, Nov 2026. "}
              <sup>
                {"2"}
              </sup>
              {" Follow Up Boss Pro $499 + Real Geeks $399 + local SEO from about $575, Nov 2026."}
            </p>
            {" "}
          </div>
          {" "}
          <div className="sk" style={sx("min-width:0")}>
            {" "}
            <div style={sx("border-radius:20px;background:#FBF9F4;color:#1D1B19;box-shadow:0 40px 90px -40px rgba(0,0,0,.9),0 0 0 1px rgba(0,0,0,.3);overflow:hidden")}>
              {" "}
              <div style={sx("padding:16px 16px 12px")}>
                {" "}
                <div style={sx("display:flex;align-items:center;gap:10px;height:46px;padding:0 14px;border-radius:12px;background:#fff;border:1px solid #E2DACD;box-shadow:0 1px 0 rgba(0,0,0,.02)")}>
                  {" "}
                  <svg aria-hidden="true" viewBox="0 0 24 24" style={sx("flex:none;width:17px;height:17px;fill:none;stroke:#8C8478;stroke-width:2;stroke-linecap:round")}>
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5" />
                  </svg>
                  {" "}
                  <span style={sx("font-size:15px;font-weight:500")}>
                    {q.text}
                    <span aria-hidden="true" style={sx(`display:inline-block;width:1.5px;height:17px;margin-left:1px;vertical-align:-3px;background:#1D1B19;opacity:${q.caret};animation:${q.anim}`)} />
                  </span>
                  {" "}
                  <span style={sx("margin-left:auto;font-size:12px;color:#8C8478;white-space:nowrap")}>
                    {"Across your tools"}
                  </span>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div style={sx("padding:0 16px")}>
                {" "}
                {(rows || []).map((r: any, $index: number) => (
                  <React.Fragment key={r?.key ?? $index}>
                    {" "}
                    <div className="sk-row" style={sx(`padding:12px 0;border-top:1px solid #EFE9DF;opacity:${r.o};transform:translateY(${r.y}px);transition:opacity .45s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)`)}>
                      {" "}
                      <div className="sk-tool" style={sx("display:flex;align-items:center;gap:9px;min-width:0")}>
                        {" "}
                        <span style={sx("flex:none;width:28px;height:28px;border-radius:8px;background:#EFE8DC;display:flex;align-items:center;justify-content:center")}>
                          <svg aria-hidden="true" viewBox="0 0 24 24" style={sx("width:14px;height:14px;fill:none;stroke:#3A342E;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")}>
                            <path d={r.ic} />
                          </svg>
                        </span>
                        {" "}
                        <div style={sx("min-width:0")}>
                          <div style={sx("font-size:12.5px;font-weight:600;white-space:nowrap")}>
                            {r.t}
                          </div>
                          <div style={sx("display:flex;align-items:center;gap:5px;font-size:11px;color:#8C8478;white-space:nowrap")}>
                            <span style={sx(`width:6px;height:6px;border-radius:50%;background:${r.vc}`)} />
                            {r.who}
                          </div>
                        </div>
                        {" "}
                      </div>
                      {" "}
                      <div style={sx("min-width:0")}>
                        <div style={sx("font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>
                          {r.name}
                        </div>
                        <div style={sx("font-size:12.5px;color:#6E665C;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>
                          {r.sees}
                        </div>
                      </div>
                      {" "}
                      <span style={sx("justify-self:end;display:inline-flex;align-items:center;gap:6px;padding:4px 9px;border-radius:999px;background:#FFE7E1;color:#B4432E;font-size:11.5px;font-weight:600;white-space:nowrap")}>
                        <span style={sx("width:6px;height:6px;border-radius:50%;background:#FF6B5B")} />
                        {r.bad}
                      </span>
                      {" "}
                    </div>
                    {" "}
                  </React.Fragment>
                ))}
                {" "}
              </div>
              {" "}
              <div style={sx(`display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:4px;padding:12px 16px;border-top:1px solid #EFE9DF;background:#F4EFE6;font-size:12.5px;opacity:${foot.o};transition:opacity .5s ease`)}>
                {" "}
                <span style={sx("color:#3A342E")}>
                  <b style={sx("font-weight:600")}>
                    {"5 results."}
                  </b>
                  {" 5 different names."}
                </span>
                {" "}
                <span style={sx("font-weight:600;color:#B4432E")}>
                  {"0 linked"}
                </span>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div style={sx(`margin-top:22px;text-align:center;font:600 clamp(19px,1.9vw,24px)/1.25 'Sora',sans-serif;letter-spacing:-0.03em;opacity:${cap.o};transform:translateY(${cap.y}px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)`)}>
              {"Same person. Five records. "}
              <span style={sx("color:#FF9F6B")}>
                {"Zero context."}
              </span>
            </div>
            {" "}
          </div>
          {" "}
        </div>
      </section>
      </>
    );
  }
}
