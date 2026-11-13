"use client";

import React from "react";
import { sx } from "@/lib/sx";
import "./HowStarts.css";

/*
 * Ported from the Claude Design component HowStartsG.dc.html.
 * Markup and inline styles are carried over verbatim; logic is ported from its DCLogic class.
 * Design props: none
 */
export default class HowStarts extends React.Component<any, any> {
  state: any = { k: 0, mode: 1, rm: false };
  root: HTMLElement | null = null;
  hover = false;
  inView = false;
  io: IntersectionObserver | null = null;
  raf = 0;
  rootRef = (el: HTMLElement | null) => { this.root = el; };
  hov = { on: () => { this.hover = true; }, off: () => { this.hover = false; } };
  componentDidMount() {
    const rm = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (rm) { this.setState({ rm: true, k: 7 }); return; }
    this.inView = true;
    if ('IntersectionObserver' in window && this.root) {
      this.io = new IntersectionObserver((es) => es.forEach((e) => { this.inView = e.isIntersecting; }), { threshold: 0.2 });
      this.io.observe(this.root);
    }
    // k: 0 kickoff glow, 1..5 items done, 6 toast, 7 hold
    const D = [1600, 1100, 1100, 2000, 1400, 1400, 3000, 900];
    let t = 0, last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - last); last = now;
      if (this.inView && !this.hover && !document.hidden) {
        t += dt;
        if (t >= D[this.state.k]) { t = 0; this.setState((s: any) => ({ k: s.k >= 7 ? 0 : s.k + 1 })); }
      }
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }
  componentWillUnmount() { cancelAnimationFrame(this.raf); if (this.io) this.io.disconnect(); }
  renderVals() {
    const { k, mode } = this.state;
    const done = Math.min(5, Math.max(0, k >= 7 ? 5 : k));
    const shown = k === 0 ? 1 : Math.min(5, k + 1);
    const it = (i: number) => ({ o: i < shown ? 1 : 0.28, y: 0, bg: i < done ? (i === 2 ? '#FF6B5B' : '#14A89E') : '#3A352F', ck: i < done ? 1 : 0 });
    const dayIdx = [0, 0, 0, 1, 2, 4, 4, 4][k];
    const dh = (i: number) => ({ c: i === dayIdx ? '#0B6F69' : '#8A8276', n: i === dayIdx ? '#0B6F69' : '#1D1B19' });
    const on = k >= 3 && k <= 6;
    return {
      rootRef: this.rootRef, hov: this.hov,
      kickRing: k === 0 ? 6 : 0,
      it0: it(0), it1: it(1), it2: it(2), it3: it(3), it4: it(4),
      doneN: done, pct: done * 20, dayIdx,
      dh0: dh(0), dh1: dh(1), dh2: dh(2), dh3: dh(3), dh4: dh(4),
      toast: { o: on ? 1 : 0, y: on ? 0 : -10, s: on ? 1 : 0.96 },
      modes: ['Auto-send', 'Review week 1', 'Always review'].map((x, i) => ({ key: i, t: x, bg: i === mode ? '#1D1B19' : 'transparent', fg: i === mode ? '#F3EFE6' : '#6E665C', pick: () => this.setState({ mode: i }) })),
    };
  }

  render() {
    const { dayIdx, dh0, dh1, dh2, dh3, dh4, doneN, hov, it0, it1, it2, it3, it4, kickRing, modes, pct, rootRef, toast } = this.renderVals();
    return (
      <>
      <section id="how" ref={rootRef} style={sx("position:relative;background:#F3EFE6;border-top:1px solid #E2DACD;color:#1D1B19;font-family:'Instrument Sans',system-ui,sans-serif;overflow:hidden")}>
        {" "}
        <div className="hs-grid" style={sx("max-width:calc(1180px + 2 * clamp(20px,5vw,80px));box-sizing:border-box;margin:0 auto;padding:clamp(64px,10vh,104px) clamp(20px,5vw,80px) clamp(56px,8vh,88px);display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(40px,6vw,88px);align-items:center")}>
          {" "}
          <div>
            {" "}
            <div style={sx("font:500 12px 'IBM Plex Mono',monospace;letter-spacing:.16em;color:#B45234")}>
              {"HOW IT STARTS"}
            </div>
            {" "}
            <h2 style={sx("margin:14px 0 0;font:600 clamp(34px,4vw,54px)/1.04 'Sora',sans-serif;letter-spacing:-0.035em;text-wrap:balance")}>
              {"Live in a day."}
              <br />
              <em style={sx("font-family:'Newsreader',Georgia,serif;font-style:italic;font-weight:400;color:#B45234")}>
                {"Your part takes an hour."}
              </em>
            </h2>
            {" "}
            <p style={sx("margin:16px 0 0;max-width:460px;font-size:17px;line-height:1.5;color:#5E574E;text-wrap:pretty")}>
              {"Nothing to switch off. Nothing to move yourself. We set it up while your week carries on."}
            </p>
            {" "}
            <div style={sx("margin-top:26px")}>
              <div style={sx("display:flex;gap:14px;padding:14px 0;border-top:1px solid #E2DACD")}>
                {" "}
                <span style={sx("flex:none;width:32px;height:32px;border-radius:9px;background:#fff;border:1px solid #E6DFD3;display:flex;align-items:center;justify-content:center;color:#0B6F69")}>
                  <svg viewBox="0 0 24 24" style={sx("width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")}>
                    <path d="M4 7h16M4 12h10M4 17h7" />
                    <path d="M17 15l2 2 3-4" />
                  </svg>
                </span>
                {" "}
                <div>
                  <div style={sx("font:600 15px 'Sora',sans-serif;letter-spacing:-0.01em")}>
                    {"We move your records."}
                  </div>
                  <div style={sx("margin-top:3px;font-size:14px;line-height:1.45;color:#5E574E")}>
                    {"Pipeline at kickoff, the rest within 30 days. A receipt for every row."}
                  </div>
                </div>
              </div>
              <div style={sx("display:flex;gap:14px;padding:14px 0;border-top:1px solid #E2DACD")}>
                {" "}
                <span style={sx("flex:none;width:32px;height:32px;border-radius:9px;background:#fff;border:1px solid #E6DFD3;display:flex;align-items:center;justify-content:center;color:#0B6F69")}>
                  <svg viewBox="0 0 24 24" style={sx("width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")}>
                    <path d="M4 12h3l2-6 4 12 2-6h5" />
                  </svg>
                </span>
                {" "}
                <div>
                  <div style={sx("font:600 15px 'Sora',sans-serif;letter-spacing:-0.01em")}>
                    {"You choose what sends."}
                  </div>
                  <div style={sx("margin-top:3px;font-size:14px;line-height:1.45;color:#5E574E")}>
                    {"Change it any time."}
                  </div>
                  <div role="group" aria-label="Sending mode" style={sx("margin-top:8px;display:inline-flex;gap:3px;padding:3px;border-radius:999px;background:#fff;border:1px solid #E6DFD3")}>
                    {(modes || []).map((m: any, $index: number) => (
                      <React.Fragment key={m?.key ?? $index}>
                        <button className="hs-pill" onClick={m.pick} style={sx(`padding:5px 11px;border:0;border-radius:999px;cursor:pointer;font:600 12px 'Instrument Sans',sans-serif;white-space:nowrap;background:${m.bg};color:${m.fg};transition:background .35s ease,color .35s ease`)}>
                          {m.t}
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
              <div style={sx("display:flex;gap:14px;padding:14px 0;border-top:1px solid #E2DACD")}>
                {" "}
                <span style={sx("flex:none;width:32px;height:32px;border-radius:9px;background:#fff;border:1px solid #E6DFD3;display:flex;align-items:center;justify-content:center;color:#0B6F69")}>
                  <svg viewBox="0 0 24 24" style={sx("width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")}>
                    <rect x="3" y="6" width="18" height="13" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                </span>
                {" "}
                <div>
                  <div style={sx("font:600 15px 'Sora',sans-serif;letter-spacing:-0.01em")}>
                    {"No bill until you're live."}
                  </div>
                  <div style={sx("margin-top:3px;font-size:14px;line-height:1.45;color:#5E574E")}>
                    {"Stop at day 30 or 60 if it isn't working. Your data stays yours."}
                  </div>
                </div>
              </div>
            </div>
            {" "}
            <a href="#contact" style={sx("margin-top:22px;display:inline-flex;align-items:center;gap:10px;height:50px;padding:0 22px;border-radius:10px;background:#1D1B19;color:#F3EFE6;font:600 15px 'Sora',sans-serif;text-decoration:none")}>
              {"Book the 1-hour kickoff "}
              <span aria-hidden="true">
                {"→"}
              </span>
            </a>
            {" "}
            <p style={sx("margin:14px 0 0;font-size:12.5px;line-height:1.5;color:#8A8276")}>
              {"Elsewhere, AppFolio's average go-live is 1.6 months and Sierra plans 30–90 days of onboarding."}
            </p>
            {" "}
          </div>
          {" "}
          <div className="hs-vis" onMouseEnter={hov.on} onMouseLeave={hov.off} style={sx("position:relative;margin:34px 26px 110px 0")}>
            {" "}
            <div style={sx("position:relative;border-radius:18px;background:#fff;border:1px solid #E6DFD3;box-shadow:0 30px 70px -40px rgba(60,40,20,.35);overflow:hidden")}>
              {" "}
              <div style={sx("display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid #F0EBE2")}>
                {" "}
                <div style={sx("font:600 13.5px 'Sora',sans-serif;letter-spacing:-0.01em")}>
                  {"Your calendar "}
                  <span style={sx("font-weight:500;color:#8A8276")}>
                    {"· week 1"}
                  </span>
                </div>
                {" "}
                <div className="hs-leg" style={sx("display:flex;align-items:center;gap:6px;font-size:12px;color:#8A8276")}>
                  <span style={sx("width:8px;height:8px;border-radius:2px;background:#FF6B5B")} />
                  {"Wynsley"}
                  <span style={sx("width:8px;height:8px;margin-left:8px;border-radius:2px;background:#D3C8B6")} />
                  {"Your usual week"}
                </div>
                {" "}
              </div>
              {" "}
              <div style={sx("display:flex;padding-left:46px;border-bottom:1px solid #F0EBE2")}>
                <div style={sx(`flex:1;padding:8px 0 8px 8px;font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:${dh0.c};transition:color .5s ease`)}>
                  {"MON"}
                  <span style={sx(`display:block;margin-top:2px;font:600 15px 'Sora',sans-serif;letter-spacing:-0.01em;color:${dh0.n}`)}>
                    {"1"}
                  </span>
                </div>
                <div style={sx(`flex:1;padding:8px 0 8px 8px;font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:${dh1.c};transition:color .5s ease`)}>
                  {"TUE"}
                  <span style={sx(`display:block;margin-top:2px;font:600 15px 'Sora',sans-serif;letter-spacing:-0.01em;color:${dh1.n}`)}>
                    {"2"}
                  </span>
                </div>
                <div style={sx(`flex:1;padding:8px 0 8px 8px;font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:${dh2.c};transition:color .5s ease`)}>
                  {"WED"}
                  <span style={sx(`display:block;margin-top:2px;font:600 15px 'Sora',sans-serif;letter-spacing:-0.01em;color:${dh2.n}`)}>
                    {"3"}
                  </span>
                </div>
                <div style={sx(`flex:1;padding:8px 0 8px 8px;font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:${dh3.c};transition:color .5s ease`)}>
                  {"THU"}
                  <span style={sx(`display:block;margin-top:2px;font:600 15px 'Sora',sans-serif;letter-spacing:-0.01em;color:${dh3.n}`)}>
                    {"4"}
                  </span>
                </div>
                <div style={sx(`flex:1;padding:8px 0 8px 8px;font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:${dh4.c};transition:color .5s ease`)}>
                  {"FRI"}
                  <span style={sx(`display:block;margin-top:2px;font:600 15px 'Sora',sans-serif;letter-spacing:-0.01em;color:${dh4.n}`)}>
                    {"5"}
                  </span>
                </div>
              </div>
              {" "}
              <div style={sx("display:flex")}>
                {" "}
                <div style={sx("width:46px;padding-left:10px;box-sizing:border-box")}>
                  <div style={sx("height:34px;box-sizing:border-box;border-top:1px solid #F0EBE2;font:500 10px 'IBM Plex Mono',monospace;color:#B0A797;padding-top:2px")}>
                    {"9 AM"}
                  </div>
                  <div style={sx("height:34px;box-sizing:border-box;border-top:1px solid #F0EBE2;font:500 10px 'IBM Plex Mono',monospace;color:#B0A797;padding-top:2px")}>
                    {"10"}
                  </div>
                  <div style={sx("height:34px;box-sizing:border-box;border-top:1px solid #F0EBE2;font:500 10px 'IBM Plex Mono',monospace;color:#B0A797;padding-top:2px")}>
                    {"11"}
                  </div>
                  <div style={sx("height:34px;box-sizing:border-box;border-top:1px solid #F0EBE2;font:500 10px 'IBM Plex Mono',monospace;color:#B0A797;padding-top:2px")}>
                    {"12 PM"}
                  </div>
                  <div style={sx("height:34px;box-sizing:border-box;border-top:1px solid #F0EBE2;font:500 10px 'IBM Plex Mono',monospace;color:#B0A797;padding-top:2px")}>
                    {"1"}
                  </div>
                  <div style={sx("height:34px;box-sizing:border-box;border-top:1px solid #F0EBE2;font:500 10px 'IBM Plex Mono',monospace;color:#B0A797;padding-top:2px")}>
                    {"2"}
                  </div>
                  <div style={sx("height:34px;box-sizing:border-box;border-top:1px solid #F0EBE2;font:500 10px 'IBM Plex Mono',monospace;color:#B0A797;padding-top:2px")}>
                    {"3"}
                  </div>
                  <div style={sx("height:34px;box-sizing:border-box;border-top:1px solid #F0EBE2;font:500 10px 'IBM Plex Mono',monospace;color:#B0A797;padding-top:2px")}>
                    {"4"}
                  </div>
                </div>
                {" "}
                <div style={sx("position:relative;flex:1;height:272px")}>
                  {" "}
                  <span style={sx("position:absolute;left:20%;top:0;bottom:0;width:1px;background:#F0EBE2")} />
                  <span style={sx("position:absolute;left:40%;top:0;bottom:0;width:1px;background:#F0EBE2")} />
                  <span style={sx("position:absolute;left:60%;top:0;bottom:0;width:1px;background:#F0EBE2")} />
                  <span style={sx("position:absolute;left:80%;top:0;bottom:0;width:1px;background:#F0EBE2")} />
                  {" "}
                  <div style={sx(`position:absolute;top:0;bottom:0;left:calc(${dayIdx} * 20%);width:20%;background:rgba(11,111,105,.045);transition:left .8s cubic-bezier(.22,1,.36,1)`)} />
                  {" "}
                  <div className="hs-ev" style={sx("position:absolute;left:calc(0 * 20% + 3px);width:calc(20% - 6px);top:172px;height:30px;box-sizing:border-box;padding:5px 7px;border-radius:7px;background:#F1ECE3;border-left:3px solid #D3C8B6;font:500 11px/1.25 Instrument Sans,sans-serif;color:#7A7166;overflow:hidden")}>
                    {"Showing"}
                  </div>
                  <div className="hs-ev" style={sx("position:absolute;left:calc(1 * 20% + 3px);width:calc(20% - 6px);top:36px;height:47.0px;box-sizing:border-box;padding:5px 7px;border-radius:7px;background:#F1ECE3;border-left:3px solid #D3C8B6;font:500 11px/1.25 Instrument Sans,sans-serif;color:#7A7166;overflow:hidden")}>
                    {"Listing appt"}
                  </div>
                  <div className="hs-ev" style={sx("position:absolute;left:calc(1 * 20% + 3px);width:calc(20% - 6px);top:189.0px;height:30px;box-sizing:border-box;padding:5px 7px;border-radius:7px;background:#F1ECE3;border-left:3px solid #D3C8B6;font:500 11px/1.25 Instrument Sans,sans-serif;color:#7A7166;overflow:hidden")}>
                    {"Team call"}
                  </div>
                  <div className="hs-ev" style={sx("position:absolute;left:calc(2 * 20% + 3px);width:calc(20% - 6px);top:104px;height:30px;box-sizing:border-box;padding:5px 7px;border-radius:7px;background:#F1ECE3;border-left:3px solid #D3C8B6;font:500 11px/1.25 Instrument Sans,sans-serif;color:#7A7166;overflow:hidden")}>
                    {"Showing"}
                  </div>
                  <div className="hs-ev" style={sx("position:absolute;left:calc(2 * 20% + 3px);width:calc(20% - 6px);top:223.0px;height:30px;box-sizing:border-box;padding:5px 7px;border-radius:7px;background:#F1ECE3;border-left:3px solid #D3C8B6;font:500 11px/1.25 Instrument Sans,sans-serif;color:#7A7166;overflow:hidden")}>
                    {"Inspection"}
                  </div>
                  <div className="hs-ev" style={sx("position:absolute;left:calc(3 * 20% + 3px);width:calc(20% - 6px);top:19.0px;height:30px;box-sizing:border-box;padding:5px 7px;border-radius:7px;background:#F1ECE3;border-left:3px solid #D3C8B6;font:500 11px/1.25 Instrument Sans,sans-serif;color:#7A7166;overflow:hidden")}>
                    {"Closing"}
                  </div>
                  <div className="hs-ev" style={sx("position:absolute;left:calc(3 * 20% + 3px);width:calc(20% - 6px);top:155.0px;height:30px;box-sizing:border-box;padding:5px 7px;border-radius:7px;background:#F1ECE3;border-left:3px solid #D3C8B6;font:500 11px/1.25 Instrument Sans,sans-serif;color:#7A7166;overflow:hidden")}>
                    {"Showing"}
                  </div>
                  <div className="hs-ev" style={sx("position:absolute;left:calc(4 * 20% + 3px);width:calc(20% - 6px);top:70px;height:30px;box-sizing:border-box;padding:5px 7px;border-radius:7px;background:#F1ECE3;border-left:3px solid #D3C8B6;font:500 11px/1.25 Instrument Sans,sans-serif;color:#7A7166;overflow:hidden")}>
                    {"Open house"}
                  </div>
                  <div className="hs-ev" style={sx("position:absolute;left:calc(4 * 20% + 3px);width:calc(20% - 6px);top:189.0px;height:47.0px;box-sizing:border-box;padding:5px 7px;border-radius:7px;background:#F1ECE3;border-left:3px solid #D3C8B6;font:500 11px/1.25 Instrument Sans,sans-serif;color:#7A7166;overflow:hidden")}>
                    {"Showings"}
                  </div>
                  <div className="hs-ev" style={sx(`position:absolute;left:3px;width:calc(20% - 6px);top:36px;height:30px;min-height:30px;box-sizing:border-box;padding:5px 7px;border-radius:7px;background:#FFE7E2;border-left:3px solid #FF6B5B;font:600 11px/1.25 Instrument Sans,sans-serif;color:#B4432E;overflow:hidden;box-shadow:0 0 0 ${kickRing}px rgba(255,107,91,.18);transition:box-shadow .6s cubic-bezier(.22,1,.36,1)`)}>
                    {"Wynsley kickoff"}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
            </div>
            <div className="hs-panel" style={sx("position:absolute;right:-26px;bottom:-96px;width:min(350px,72%);padding:16px 18px 12px;border-radius:16px;background:#1D1B19;color:#F3EFE6;box-shadow:0 30px 60px -24px rgba(29,27,25,.55)")}>
              {" "}
              <div style={sx("display:flex;align-items:center;justify-content:space-between")}>
                {" "}
                <div style={sx("font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.12em;color:#7FE3D6")}>
                  {"MEANWHILE, OUR TEAM"}
                </div>
                {" "}
                <div style={sx("font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:#8C857B")}>
                  {doneN}{" / 5"}
                </div>
                {" "}
              </div>
              {" "}
              <div style={sx("margin-top:10px;height:3px;border-radius:3px;background:#3A352F;overflow:hidden")}>
                <span style={sx(`display:block;height:100%;width:${pct}%;background:linear-gradient(90deg,#14A89E,#7FE3D6);transition:width .8s cubic-bezier(.22,1,.36,1)`)} />
              </div>
              {" "}
              <div style={sx("margin-top:6px")}>
                <div style={sx(`display:flex;align-items:center;gap:10px;padding:7px 0;opacity:${it0.o};transform:translateY(${it0.y}px);transition:opacity .5s ease,transform .6s cubic-bezier(.22,1,.36,1)`)}>
                  {" "}
                  <span style={sx(`flex:none;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${it0.bg};transition:background .4s ease`)}>
                    <svg viewBox="0 0 24 24" style={sx(`width:11px;height:11px;fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:${it0.ck};transition:opacity .3s ease`)}>
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  {" "}
                  <span style={sx("flex:1;font-size:13px;color:#F3EFE6")}>
                    {"Chat, email and calls connected"}
                  </span>
                  {" "}
                  <span style={sx("font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:#8C857B")}>
                    {"MON"}
                  </span>
                </div>
                <div style={sx(`display:flex;align-items:center;gap:10px;padding:7px 0;opacity:${it1.o};transform:translateY(${it1.y}px);transition:opacity .5s ease,transform .6s cubic-bezier(.22,1,.36,1)`)}>
                  {" "}
                  <span style={sx(`flex:none;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${it1.bg};transition:background .4s ease`)}>
                    <svg viewBox="0 0 24 24" style={sx(`width:11px;height:11px;fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:${it1.ck};transition:opacity .3s ease`)}>
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  {" "}
                  <span style={sx("flex:1;font-size:13px;color:#F3EFE6")}>
                    {"Your rules loaded: pets, tours, hours"}
                  </span>
                  {" "}
                  <span style={sx("font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:#8C857B")}>
                    {"MON"}
                  </span>
                </div>
                <div style={sx(`display:flex;align-items:center;gap:10px;padding:7px 0;opacity:${it2.o};transform:translateY(${it2.y}px);transition:opacity .5s ease,transform .6s cubic-bezier(.22,1,.36,1)`)}>
                  {" "}
                  <span style={sx(`flex:none;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${it2.bg};transition:background .4s ease`)}>
                    <svg viewBox="0 0 24 24" style={sx(`width:11px;height:11px;fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:${it2.ck};transition:opacity .3s ease`)}>
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  {" "}
                  <span style={sx("flex:1;font-size:13px;color:#F3EFE6")}>
                    {"Live on new inquiries"}
                  </span>
                  {" "}
                  <span style={sx("font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:#8C857B")}>
                    {"TUE"}
                  </span>
                </div>
                <div style={sx(`display:flex;align-items:center;gap:10px;padding:7px 0;opacity:${it3.o};transform:translateY(${it3.y}px);transition:opacity .5s ease,transform .6s cubic-bezier(.22,1,.36,1)`)}>
                  {" "}
                  <span style={sx(`flex:none;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${it3.bg};transition:background .4s ease`)}>
                    <svg viewBox="0 0 24 24" style={sx(`width:11px;height:11px;fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:${it3.ck};transition:opacity .3s ease`)}>
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  {" "}
                  <span style={sx("flex:1;font-size:13px;color:#F3EFE6")}>
                    {"Active pipeline brought over, with receipts"}
                  </span>
                  {" "}
                  <span style={sx("font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:#8C857B")}>
                    {"WED"}
                  </span>
                </div>
                <div style={sx(`display:flex;align-items:center;gap:10px;padding:7px 0;opacity:${it4.o};transform:translateY(${it4.y}px);transition:opacity .5s ease,transform .6s cubic-bezier(.22,1,.36,1)`)}>
                  {" "}
                  <span style={sx(`flex:none;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${it4.bg};transition:background .4s ease`)}>
                    <svg viewBox="0 0 24 24" style={sx(`width:11px;height:11px;fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:${it4.ck};transition:opacity .3s ease`)}>
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  {" "}
                  <span style={sx("flex:1;font-size:13px;color:#F3EFE6")}>
                    {"Past records moved in for you"}
                  </span>
                  {" "}
                  <span style={sx("font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:#8C857B")}>
                    {"BY DAY 30"}
                  </span>
                </div>
              </div>
            </div>
            <div className="hs-toast" style={sx(`position:absolute;left:-28px;bottom:-28px;display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:14px;background:rgba(255,255,255,.96);border:1px solid #E6DFD3;box-shadow:0 20px 44px -20px rgba(29,27,25,.4);opacity:${toast.o};transform:translateY(${toast.y}px) scale(${toast.s});transition:opacity .5s ease,transform .7s cubic-bezier(.22,1,.36,1)`)}>
              {" "}
              <span style={sx("width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,#14A89E,#0B6F69);display:flex;align-items:center;justify-content:center")}>
                <svg viewBox="0 0 24 24" style={sx("width:16px;height:16px;fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round")}>
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              {" "}
              <div>
                <div style={sx("font:600 13.5px 'Sora',sans-serif;letter-spacing:-0.01em")}>
                  {"You're live on new inquiries."}
                </div>
                <div style={sx("margin-top:1px;font-size:12px;color:#6E665C")}>
                  {"Day 2. No bill before this."}
                </div>
              </div>
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
