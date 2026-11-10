"use client";

import React from "react";
import { sx } from "@/lib/sx";
import FitBox from "@/components/wynsley/FitBox";
import "./HeroGold.css";

/*
 * Ported from the Claude Design component LPHeroPhotoGold.dc.html.
 * Markup and inline styles are carried over verbatim; logic is ported from its DCLogic class.
 * Design props: none
 */
export default class HeroGold extends React.Component<any, any> {
  // Ported from the design's DCLogic class. Timings/sequence are unchanged; the only
  // differences are SSR safety: the clock starts in componentDidMount, the lock-screen
  // date is only computed once mounted, and the `wide` moon test is a CSS media query
  // (.herogo-moon in HeroGold.css) so server and client markup match.
  state: any = { t: 0, mounted: false };
  root: HTMLElement | null = null;
  phone: HTMLDivElement | null = null;
  t0 = 0;
  iv: ReturnType<typeof setInterval> | undefined = undefined;
  rootRef = (el: HTMLElement | null) => { this.root = el; };
  phoneRef = (el: HTMLDivElement | null) => { this.phone = el; };

  componentDidMount() {
    this.t0 = performance.now();
    this.setState({ mounted: true });
    this.iv = setInterval(() => {
      if (document.hidden) return;
      const r = this.root && this.root.getBoundingClientRect();
      if (r && (r.bottom < 0 || r.top > window.innerHeight)) return;
      this.setState({ t: performance.now() - this.t0 });
    }, 120);
  }

  componentWillUnmount() { clearInterval(this.iv); }

  renderVals(): any {
    const CYC = 29000, q = this.state.t % CYC, at = (ms: number) => q >= ms, cl = (x: number) => Math.max(0, Math.min(1, x));
    const scene = q < 9700 ? 0 : q < 18450 ? 1 : 2;
    const dim = q < 300 || (q >= 9200 && q < 10100) || (q >= 18000 && q < 18900) || q >= 27800 ? 0.4 : 0;
    const TEAL = ['#DDF3EF', '#0B6F69'], PURP = ['#EFE7FF', '#5B2BC4'], CORAL = ['#FFE4DE', '#B4372A'];
    const card = (inAt: number, expAt: number, resAt: number, footAt: number, starts: number[], tags: any[], titles: string[], bodies: string[], time: string) => {
      const show = scene < 2 && at(inAt), res = at(resAt), exp = at(expAt) && !res, foot = at(footAt) && !res;
      const st = res ? tags[2] : at(expAt) ? tags[1] : tags[0];
      const o: any = { wh: show ? (exp ? 470 : 170) : 0, wo: show ? 1 : 0, wy: show ? 0 : -18, lh: exp ? 240 : 0, fh: foot ? 44 : 0, fo: foot ? 1 : 0,
        tag: st[0], tb: st[1][0], tc: st[1][1], title: res ? titles[1] : titles[0], body: res ? bodies[1] : bodies[0], tm: res ? time : 'now' };
      starts.forEach((s, i) => { const v = at(s), d = at(s + 650); o['s' + i] = { h: v ? 30 : 0, o: v ? 1 : 0, sp: v && !d ? 1 : 0, ck: d ? 1 : 0, cs: d ? 1 : 0.3 }; });
      return o;
    };
    const a = card(700, 1900, 8000, 6600, [2300, 3150, 4000, 4850, 5700], [['NEW LEAD', CORAL], ['ANSWERING', PURP], ['TOUR BOOKED', TEAL]], ['Sofía H. · website chat', 'Tour booked · Sat 1:00 PM'], ['"¿El 2 hab. en Wilton Manors acepta perros?"', "Answered in Spanish, 38 seconds later. On Camila's calendar."], '9:47 PM');
    const b = card(10500, 11700, 16800, 15500, [12100, 12950, 13800, 14650], [['OWNER EMAIL', CORAL], ['ANSWERING', PURP], ['OWNER ANSWERED', TEAL]], ['Robert K. · owner email', 'Owner answered that night'], ['"Why is my October statement short?"', 'Answered 41 seconds later. Dana gets an FYI.'], '11:58 PM');
    const inC = scene === 2, fin = at(22200) && !at(23050), press = at(22800) && !at(23050), rip1 = at(23050);
    const s: any = { o: inC && at(19300) ? 1 : 0, y: inC && at(19300) ? 0 : 26, st: inC && at(19900) ? 1 : 0, sty: inC && at(19900) ? 0 : 10,
      nh: inC && at(20700) ? 240 : 0, no: inC && at(20700) ? 1 : 0, fo: inC && fin ? 1 : 0, fs: press ? 0.82 : fin ? 1 : 1.25, bp: press ? 0.96 : 1,
      ro: press ? 0.6 : 0, rs: rip1 ? 3 : 0.2, rt: rip1 ? 'transform .7s ease,opacity .7s ease' : 'none',
      bo: inC && at(23300) ? 0 : 1, so: inC && at(23300) ? 1 : 0, soy: inC && at(23300) ? 0 : 6, fh: inC && at(24200) ? 40 : 0, fo2: inC && at(24200) ? 1 : 0 };
    const cnt = (_from: number, sec: number) => sec + ' sec';
    a.rt = cnt(4650, 38); b.rt = cnt(13600, 41);
    s.n1 = Math.round(cl((q - 19900) / 700) * 6); s.n2 = Math.round(cl((q - 19900) / 700) * 2);
    const work = (at(1900) && !at(8000)) || (at(11700) && !at(16800));
    const island = { w: work ? 196 : 122, h: 36, r: 20, eo: 0, co: work ? 1 : 0, title: '', tm: '', cnt: q < 9700 ? 'Answering Sofía…' : 'Answering Robert…' };
    const p = [0.22, 0.5, 1][scene], dawn = Math.min(cl((p - 0.6) / 0.2), 1), morn = cl((p - 0.86) / 0.14), mt = cl((p - 0.12) / 0.66);
    const sk = { dusk: cl(1 - p / 0.16).toFixed(3), dawn: dawn.toFixed(3), morn: morn.toFixed(3), stars: (cl((p - 0.08) / 0.12) * cl((0.8 - p) / 0.12)).toFixed(3), mx: (12 + mt * 34).toFixed(1), my: (28 - Math.sin(mt * Math.PI) * 14).toFixed(1), mo: (cl((p - 0.12) / 0.08) * cl((0.78 - p) / 0.08)).toFixed(3), sx: p < 0.5 ? 42 : 46, sy: (p < 0.5 ? 80 + (p / 0.16) * 14 : 92 - morn * 20).toFixed(1), so: (p < 0.5 ? cl(1 - p / 0.14) : cl((p - 0.8) / 0.12)).toFixed(3) };
    // Design: `wide = window.innerWidth >= 1000`. Same test as a CSS media query (--hg-wide on .herogo-moon).
    const wide = 'var(--hg-wide)';
    const hz = [{ night: 0.82, stars: 0.7, moon: wide, mr: 6, my: 14, lights: 1, sun: 0, sy: 6, scrim: 0.3 }, { night: 1, stars: 1, moon: wide, mr: 9, my: 12, lights: 0.7, sun: 0, sy: 6, scrim: 0.3 }, { night: 0, stars: 0, moon: 0, mr: 16, my: 5, lights: 0, sun: 1, sy: -3, scrim: 1 }][scene];
    // Date is browser-only; a non-breaking space keeps the line box (and the big clock's position) until mount.
    const date = this.state.mounted ? new Date(Date.now() - (scene === 2 ? 0 : 864e5)).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : '\u00a0';
    return { hz, rootRef: this.rootRef, phoneRef: this.phoneRef, clock: ['9:47', '11:58', '7:02'][scene], date, island, a, b, s, dim, lockO: scene < 2 ? 1 : 0, sk };
  }

  render() {
    const { a, b, clock, date, dim, hz, island, lockO, phoneRef, rootRef, s, sk } = this.renderVals();
    return (
      <>
      <section ref={rootRef} style={sx("position:relative;z-index:1;overflow:hidden;min-height:min(100svh,860px);display:flex;align-items:center;font-family:'Instrument Sans',system-ui,sans-serif;color:#fff;background:linear-gradient(180deg,#0B0920 0%,#120F2C 30%,#1B1640 58%,#2A2052 78%,#3A2A5E 100%)")}>
        {" "}
        <div style={sx("position:absolute;inset:0;background:linear-gradient(180deg,#2E2766 0%,#4A3C8A 18%,#7A62A8 36%,#B07AB0 50%,#E393AE 62%,#F4A9A0 72%,#F8BE9C 80%,#F7D2B4 88%,#E9B7B8 100%)")} />
        <div style={sx("position:absolute;inset:0;background:radial-gradient(55% 30% at 62% 84%,rgba(255,228,170,.8),rgba(255,190,150,.3) 50%,transparent 75%),radial-gradient(70% 55% at 0% 0%,rgba(40,28,96,.45),transparent 70%)")} />
        <div style={sx("position:absolute;left:-6vw;top:20%;width:48vw;height:10px;border-radius:50%;background:linear-gradient(90deg,transparent,rgba(255,206,226,.5) 40%,transparent);filter:blur(4px);animation:wDrift 50s ease-in-out infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:46vw;top:30%;width:40vw;height:7px;border-radius:50%;background:linear-gradient(90deg,transparent,rgba(255,214,222,.45),transparent);filter:blur(3px);animation:wDrift 50s ease-in-out infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:10vw;top:58%;width:60vw;height:14px;border-radius:50%;background:linear-gradient(90deg,transparent,rgba(255,222,206,.55) 50%,transparent);filter:blur(6px);animation:wDrift 50s ease-in-out infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:58%;top:12%;width:20vw;height:2px;transform:rotate(-14deg);background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,250,252,.65));pointer-events:none")} />
        <div style={sx(`position:absolute;left:62%;bottom:16vh;width:11vh;height:11vh;margin-left:-5.5vh;border-radius:50%;background:radial-gradient(circle,#FFF7DE 0%,#FFE3A6 42%,rgba(255,206,150,0) 72%);transform:translateY(${hz.sy}vh);opacity:${hz.sun};transition:transform 3.2s cubic-bezier(.22,1,.36,1),opacity 2.4s cubic-bezier(.22,1,.36,1);pointer-events:none`)} />
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" style={sx("position:absolute;left:0;width:100%;height:24vh;pointer-events:none;bottom:16vh;opacity:.9;-webkit-mask-image:linear-gradient(90deg,transparent 0 36%,#000 58%);mask-image:linear-gradient(90deg,transparent 0 36%,#000 58%);")}>
          <g fill="#EDBBC8">
            <rect x="0.0" y="143.5" width="16.0" height="56.5" />
            <rect x="4.0" y="120.0" width="8.0" height="80.0" />
            <rect x="20.1" y="141.9" width="27.4" height="58.1" />
            <rect x="26.9" y="130.0" width="13.7" height="70.0" />
            <rect x="54.6" y="147.8" width="19.1" height="52.2" />
            <rect x="77.5" y="159.1" width="17.9" height="40.9" />
            <rect x="100.9" y="157.5" width="26.5" height="42.5" />
            <rect x="127.6" y="132.1" width="20.2" height="67.9" />
            <rect x="132.6" y="117.2" width="10.1" height="82.8" />
            <rect x="156.7" y="166.3" width="27.5" height="33.7" />
            <rect x="187.4" y="171.3" width="35.8" height="28.7" />
            <rect x="232.7" y="157.6" width="22.3" height="42.4" />
            <rect x="262.3" y="101.6" width="38.0" height="98.4" />
            <rect x="271.8" y="82.5" width="19.0" height="117.5" />
            <rect x="300.6" y="90.9" width="36.9" height="109.1" />
            <rect x="337.5" y="69.6" width="30.7" height="130.4" />
            <rect x="373.3" y="114.4" width="34.8" height="85.6" />
            <rect x="412.3" y="98.0" width="33.8" height="102.0" />
            <rect x="420.8" y="89.1" width="16.9" height="110.9" />
            <rect x="454.4" y="109.6" width="18.4" height="90.4" />
            <rect x="539.5" y="42.2" width="37.9" height="157.8" />
            <rect x="586.0" y="80.4" width="30.2" height="119.6" />
            <rect x="618.8" y="74.1" width="37.2" height="125.9" />
            <rect x="628.1" y="63.2" width="18.6" height="136.8" />
            <rect x="665.6" y="117.6" width="31.2" height="82.4" />
            <rect x="705.6" y="97.4" width="26.6" height="102.6" />
            <rect x="712.2" y="75.0" width="13.3" height="125.0" />
            <rect x="740.9" y="77.8" width="21.8" height="122.2" />
            <rect x="788.6" y="85.5" width="22.5" height="114.5" />
            <rect x="854.4" y="148.6" width="26.9" height="51.4" />
            <rect x="887.5" y="146.7" width="26.1" height="53.3" />
            <rect x="914.8" y="108.6" width="29.9" height="91.4" />
            <rect x="985.5" y="159.5" width="24.5" height="40.5" />
          </g>
          <g fill="#DCA2C0">
            <rect x="0.0" y="158.1" width="16.6" height="41.9" />
            <rect x="19.0" y="179.5" width="18.5" height="20.5" />
            <rect x="44.5" y="172.7" width="23.0" height="27.3" />
            <rect x="74.9" y="159.5" width="14.2" height="40.5" />
            <rect x="78.4" y="137.4" width="7.1" height="62.6" />
            <rect x="94.0" y="187.4" width="23.8" height="12.6" />
            <rect x="126.8" y="181.3" width="18.0" height="18.7" />
            <rect x="186.4" y="148.6" width="23.7" height="51.4" />
            <rect x="192.3" y="132.2" width="11.8" height="67.8" />
            <rect x="219.7" y="183.5" width="27.3" height="16.5" />
            <rect x="286.7" y="178.5" width="24.5" height="21.5" />
            <rect x="292.8" y="158.9" width="12.3" height="41.1" />
            <rect x="319.6" y="156.3" width="14.4" height="43.7" />
            <rect x="341.8" y="172.0" width="16.5" height="28.0" />
            <rect x="359.3" y="137.0" width="25.5" height="63.0" />
            <rect x="365.7" y="119.9" width="12.7" height="80.1" />
            <rect x="386.7" y="151.2" width="15.3" height="48.8" />
            <rect x="407.4" y="127.7" width="29.3" height="72.3" />
            <rect x="441.4" y="134.5" width="24.6" height="65.5" />
            <rect x="447.5" y="110.8" width="12.3" height="89.2" />
            <rect x="466.1" y="112.4" width="19.2" height="87.6" />
            <rect x="493.1" y="176.2" width="14.1" height="23.8" />
            <rect x="496.7" y="159.0" width="7.1" height="41.0" />
            <rect x="573.1" y="110.4" width="20.5" height="89.6" />
            <rect x="578.2" y="86.4" width="10.2" height="113.6" />
            <rect x="627.5" y="168.4" width="23.8" height="31.6" />
            <rect x="706.6" y="143.1" width="20.1" height="56.9" />
            <rect x="711.6" y="121.9" width="10.0" height="78.1" />
            <rect x="766.7" y="147.9" width="29.7" height="52.1" />
            <rect x="799.3" y="136.5" width="19.8" height="63.5" />
            <rect x="850.1" y="181.1" width="26.6" height="18.9" />
            <rect x="884.0" y="154.0" width="23.2" height="46.0" />
            <rect x="916.6" y="181.6" width="16.0" height="18.4" />
            <rect x="940.8" y="169.0" width="20.7" height="31.0" />
            <rect x="969.9" y="175.3" width="15.2" height="24.7" />
            <rect x="973.7" y="162.5" width="7.6" height="37.5" />
            <rect x="985.8" y="185.0" width="27.8" height="15.0" />
          </g>
        </svg>
        <svg viewBox="0 0 1000 40" preserveAspectRatio="none" style={sx("position:absolute;left:0;bottom:16vh;width:100%;height:3.4vh;pointer-events:none")}>
          <path d="M0 40 L0 23.4 L10 22.9 L20 14.5 L30 20.5 L40 27.9 L50 30.9 L60 31.2 L70 32.0 L80 22.4 L90 20.5 L100 18.1 L110 19.3 L120 23.3 L130 29.2 L140 32.3 L150 26.3 L160 19.7 L170 16.7 L180 20.4 L190 23.4 L200 29.9 L210 33.7 L220 34.6 L230 30.4 L240 19.1 L250 16.9 L260 16.5 L270 23.3 L280 26.3 L290 34.5 L300 27.4 L310 28.6 L320 19.5 L330 15.9 L340 16.3 L350 20.5 L360 28.7 L370 32.9 L380 27.6 L390 24.9 L400 23.6 L410 19.1 L420 16.1 L430 26.6 L440 29.0 L450 28.8 L460 27.9 L470 22.1 L480 19.2 L490 19.5 L500 17.2 L510 27.2 L520 29.8 L530 30.1 L540 27.8 L550 21.0 L560 20.9 L570 18.4 L580 21.7 L590 22.3 L600 31.6 L610 29.3 L620 25.8 L630 26.5 L640 15.5 L650 20.5 L660 20.2 L670 26.5 L680 33.1 L690 33.8 L700 26.5 L710 22.5 L720 18.9 L730 17.0 L740 19.3 L750 24.8 L760 27.5 L770 32.7 L780 27.0 L790 23.7 L800 21.4 L810 16.5 L820 19.1 L830 26.3 L840 33.6 L850 33.1 L860 25.6 L870 22.2 L880 17.8 L890 17.4 L900 21.8 L910 25.6 L920 28.1 L930 33.8 L940 26.5 L950 21.8 L960 20.0 L970 19.6 L980 24.7 L990 31.4 L1000 31.6 L1000 40Z" fill="#8D77C3" />
        </svg>
        <div style={sx("position:absolute;left:6%;bottom:17.5vh;width:min(2.6vh,4vw);aspect-ratio:1000/1400;background:#8D77C3;-webkit-mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;transform-origin:50% 100%;animation:wSway 9s ease-in-out 0s infinite alternate;pointer-events:none;")} />
        <div style={sx("position:absolute;left:9.5%;bottom:17.5vh;width:min(3.2vh,4vw);aspect-ratio:1000/1400;background:#8D77C3;-webkit-mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;transform-origin:50% 100%;animation:wSway 10s ease-in-out -1s infinite alternate;pointer-events:none;")} />
        <div style={sx("position:absolute;left:23%;bottom:17.5vh;width:min(3.8vh,4vw);aspect-ratio:1000/1400;background:#8D77C3;-webkit-mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;transform-origin:50% 100%;animation:wSway 11s ease-in-out -2s infinite alternate;pointer-events:none;")} />
        <div style={sx("position:absolute;left:31%;bottom:17.5vh;width:min(2.6vh,4vw);aspect-ratio:1000/1400;background:#8D77C3;-webkit-mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;transform-origin:50% 100%;animation:wSway 12s ease-in-out -3s infinite alternate;pointer-events:none;")} />
        <div style={sx("position:absolute;left:52%;bottom:17.5vh;width:min(3.2vh,4vw);aspect-ratio:1000/1400;background:#8D77C3;-webkit-mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;transform-origin:50% 100%;animation:wSway 13s ease-in-out -4s infinite alternate;pointer-events:none;")} />
        <div style={sx("position:absolute;left:57%;bottom:17.5vh;width:min(3.8vh,4vw);aspect-ratio:1000/1400;background:#8D77C3;-webkit-mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;transform-origin:50% 100%;animation:wSway 14s ease-in-out -5s infinite alternate;pointer-events:none;")} />
        <div style={sx("position:absolute;left:71%;bottom:17.5vh;width:min(2.6vh,4vw);aspect-ratio:1000/1400;background:#8D77C3;-webkit-mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;transform-origin:50% 100%;animation:wSway 15s ease-in-out -6s infinite alternate;pointer-events:none;")} />
        <div style={sx("position:absolute;left:88%;bottom:17.5vh;width:min(3.2vh,4vw);aspect-ratio:1000/1400;background:#8D77C3;-webkit-mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;transform-origin:50% 100%;animation:wSway 16s ease-in-out -7s infinite alternate;pointer-events:none;")} />
        <div style={sx("position:absolute;left:93%;bottom:17.5vh;width:min(3.8vh,4vw);aspect-ratio:1000/1400;background:#8D77C3;-webkit-mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;mask:url(/assets/palm-c.svg) center/100% 100% no-repeat;transform-origin:50% 100%;animation:wSway 17s ease-in-out -8s infinite alternate;pointer-events:none;")} />
        <div style={sx("position:absolute;left:0;right:0;bottom:0;height:16vh;background:linear-gradient(180deg,#C2A6D6 0%,#A48DCC 30%,#8774C0 100%)")} />
        <div style={sx("position:absolute;left:0;right:0;bottom:0;height:16vh;background:radial-gradient(24% 95% at 62% 0%,rgba(255,224,176,.65),transparent 75%)")} />
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" style={sx("position:absolute;left:0;width:100%;height:24vh;pointer-events:none;bottom:-8vh;transform:scaleY(-1);opacity:.28;filter:blur(2px);-webkit-mask-image:linear-gradient(to top,#000 20%,transparent 75%),linear-gradient(90deg,transparent 0 36%,#000 58%);-webkit-mask-composite:source-in;mask-image:linear-gradient(to top,#000 20%,transparent 75%),linear-gradient(90deg,transparent 0 36%,#000 58%);mask-composite:intersect")}>
          <g fill="#EDBBC8">
            <rect x="0.0" y="143.5" width="16.0" height="56.5" />
            <rect x="4.0" y="120.0" width="8.0" height="80.0" />
            <rect x="20.1" y="141.9" width="27.4" height="58.1" />
            <rect x="26.9" y="130.0" width="13.7" height="70.0" />
            <rect x="54.6" y="147.8" width="19.1" height="52.2" />
            <rect x="77.5" y="159.1" width="17.9" height="40.9" />
            <rect x="100.9" y="157.5" width="26.5" height="42.5" />
            <rect x="127.6" y="132.1" width="20.2" height="67.9" />
            <rect x="132.6" y="117.2" width="10.1" height="82.8" />
            <rect x="156.7" y="166.3" width="27.5" height="33.7" />
            <rect x="187.4" y="171.3" width="35.8" height="28.7" />
            <rect x="232.7" y="157.6" width="22.3" height="42.4" />
            <rect x="262.3" y="101.6" width="38.0" height="98.4" />
            <rect x="271.8" y="82.5" width="19.0" height="117.5" />
            <rect x="300.6" y="90.9" width="36.9" height="109.1" />
            <rect x="337.5" y="69.6" width="30.7" height="130.4" />
            <rect x="373.3" y="114.4" width="34.8" height="85.6" />
            <rect x="412.3" y="98.0" width="33.8" height="102.0" />
            <rect x="420.8" y="89.1" width="16.9" height="110.9" />
            <rect x="454.4" y="109.6" width="18.4" height="90.4" />
            <rect x="539.5" y="42.2" width="37.9" height="157.8" />
            <rect x="586.0" y="80.4" width="30.2" height="119.6" />
            <rect x="618.8" y="74.1" width="37.2" height="125.9" />
            <rect x="628.1" y="63.2" width="18.6" height="136.8" />
            <rect x="665.6" y="117.6" width="31.2" height="82.4" />
            <rect x="705.6" y="97.4" width="26.6" height="102.6" />
            <rect x="712.2" y="75.0" width="13.3" height="125.0" />
            <rect x="740.9" y="77.8" width="21.8" height="122.2" />
            <rect x="788.6" y="85.5" width="22.5" height="114.5" />
            <rect x="854.4" y="148.6" width="26.9" height="51.4" />
            <rect x="887.5" y="146.7" width="26.1" height="53.3" />
            <rect x="914.8" y="108.6" width="29.9" height="91.4" />
            <rect x="985.5" y="159.5" width="24.5" height="40.5" />
          </g>
          <g fill="#DCA2C0">
            <rect x="0.0" y="158.1" width="16.6" height="41.9" />
            <rect x="19.0" y="179.5" width="18.5" height="20.5" />
            <rect x="44.5" y="172.7" width="23.0" height="27.3" />
            <rect x="74.9" y="159.5" width="14.2" height="40.5" />
            <rect x="78.4" y="137.4" width="7.1" height="62.6" />
            <rect x="94.0" y="187.4" width="23.8" height="12.6" />
            <rect x="126.8" y="181.3" width="18.0" height="18.7" />
            <rect x="186.4" y="148.6" width="23.7" height="51.4" />
            <rect x="192.3" y="132.2" width="11.8" height="67.8" />
            <rect x="219.7" y="183.5" width="27.3" height="16.5" />
            <rect x="286.7" y="178.5" width="24.5" height="21.5" />
            <rect x="292.8" y="158.9" width="12.3" height="41.1" />
            <rect x="319.6" y="156.3" width="14.4" height="43.7" />
            <rect x="341.8" y="172.0" width="16.5" height="28.0" />
            <rect x="359.3" y="137.0" width="25.5" height="63.0" />
            <rect x="365.7" y="119.9" width="12.7" height="80.1" />
            <rect x="386.7" y="151.2" width="15.3" height="48.8" />
            <rect x="407.4" y="127.7" width="29.3" height="72.3" />
            <rect x="441.4" y="134.5" width="24.6" height="65.5" />
            <rect x="447.5" y="110.8" width="12.3" height="89.2" />
            <rect x="466.1" y="112.4" width="19.2" height="87.6" />
            <rect x="493.1" y="176.2" width="14.1" height="23.8" />
            <rect x="496.7" y="159.0" width="7.1" height="41.0" />
            <rect x="573.1" y="110.4" width="20.5" height="89.6" />
            <rect x="578.2" y="86.4" width="10.2" height="113.6" />
            <rect x="627.5" y="168.4" width="23.8" height="31.6" />
            <rect x="706.6" y="143.1" width="20.1" height="56.9" />
            <rect x="711.6" y="121.9" width="10.0" height="78.1" />
            <rect x="766.7" y="147.9" width="29.7" height="52.1" />
            <rect x="799.3" y="136.5" width="19.8" height="63.5" />
            <rect x="850.1" y="181.1" width="26.6" height="18.9" />
            <rect x="884.0" y="154.0" width="23.2" height="46.0" />
            <rect x="916.6" y="181.6" width="16.0" height="18.4" />
            <rect x="940.8" y="169.0" width="20.7" height="31.0" />
            <rect x="969.9" y="175.3" width="15.2" height="24.7" />
            <rect x="973.7" y="162.5" width="7.6" height="37.5" />
            <rect x="985.8" y="185.0" width="27.8" height="15.0" />
          </g>
        </svg>
        <div style={sx("position:absolute;left:86.3%;bottom:5.9vh;width:6.5vw;height:3.4px;border-radius:50%;background:rgba(255,206,222,.6);animation:wDrift 14.9s ease-in-out -6.0s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:65.6%;bottom:5.8vh;width:3.8vw;height:3.0px;border-radius:50%;background:rgba(255,232,204,.55);animation:wDrift 9.8s ease-in-out -5.7s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:81.5%;bottom:11.5vh;width:9.7vw;height:3.9px;border-radius:50%;background:rgba(255,232,204,.55);animation:wDrift 13.5s ease-in-out -2.9s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:61.8%;bottom:14.6vh;width:12.0vw;height:2.6px;border-radius:50%;background:rgba(255,206,222,.6);animation:wDrift 10.4s ease-in-out -2.0s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:1.6%;bottom:1.0vh;width:12.4vw;height:3.2px;border-radius:50%;background:rgba(255,232,204,.55);animation:wDrift 15.3s ease-in-out -4.5s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:12.3%;bottom:3.0vh;width:6.6vw;height:3.4px;border-radius:50%;background:rgba(255,206,222,.6);animation:wDrift 15.1s ease-in-out -3.5s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:44.5%;bottom:4.1vh;width:10.5vw;height:3.9px;border-radius:50%;background:rgba(255,206,222,.6);animation:wDrift 12.0s ease-in-out -1.9s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:37.5%;bottom:7.5vh;width:6.2vw;height:2.8px;border-radius:50%;background:rgba(255,232,204,.55);animation:wDrift 11.5s ease-in-out -1.5s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:17.2%;bottom:11.7vh;width:3.9vw;height:2.9px;border-radius:50%;background:rgba(255,232,204,.55);animation:wDrift 9.5s ease-in-out -6.6s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:17.8%;bottom:11.4vh;width:8.2vw;height:2.6px;border-radius:50%;background:rgba(255,206,222,.6);animation:wDrift 11.5s ease-in-out -2.6s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:79.8%;bottom:0.8vh;width:5.0vw;height:3.1px;border-radius:50%;background:rgba(255,232,204,.55);animation:wDrift 11.7s ease-in-out -4.7s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:82.4%;bottom:10.7vh;width:7.9vw;height:3.4px;border-radius:50%;background:rgba(255,232,204,.55);animation:wDrift 14.0s ease-in-out -1.2s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:59.5%;bottom:13.6vh;width:4.8vw;height:2.5px;border-radius:50%;background:rgba(255,232,204,.55);animation:wDrift 8.8s ease-in-out -2.7s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:58.9%;bottom:12.1vh;width:10.7vw;height:2.7px;border-radius:50%;background:rgba(255,232,204,.55);animation:wDrift 14.1s ease-in-out -5.6s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:15.1%;bottom:3.9vh;width:3.5vw;height:3.3px;border-radius:50%;background:rgba(255,232,204,.55);animation:wDrift 14.8s ease-in-out -2.8s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:56.7%;bottom:5.1vh;width:5.0vw;height:3.4px;border-radius:50%;background:rgba(255,206,222,.6);animation:wDrift 10.3s ease-in-out -5.3s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:94.4%;bottom:14.0vh;width:3.1vw;height:2.8px;border-radius:50%;background:rgba(255,232,204,.55);animation:wDrift 15.3s ease-in-out -5.1s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:18.8%;bottom:2.8vh;width:4.5vw;height:2.8px;border-radius:50%;background:rgba(255,232,204,.55);animation:wDrift 14.4s ease-in-out -2.9s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:48.0%;bottom:10.2vh;width:11.3vw;height:3.8px;border-radius:50%;background:rgba(255,206,222,.6);animation:wDrift 15.1s ease-in-out -0.5s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:53.9%;bottom:11.2vh;width:7.0vw;height:2.1px;border-radius:50%;background:rgba(255,232,204,.55);animation:wDrift 10.5s ease-in-out -5.4s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:5.3%;bottom:9.0vh;width:7.7vw;height:3.5px;border-radius:50%;background:rgba(255,206,222,.6);animation:wDrift 15.1s ease-in-out -5.3s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:67.4%;bottom:12.3vh;width:5.2vw;height:3.2px;border-radius:50%;background:rgba(255,206,222,.6);animation:wDrift 9.4s ease-in-out -7.9s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:59.9%;bottom:12.3vh;width:12.5vw;height:3.0px;border-radius:50%;background:rgba(255,206,222,.6);animation:wDrift 13.5s ease-in-out -3.5s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:65.2%;bottom:10.7vh;width:5.2vw;height:2.9px;border-radius:50%;background:rgba(255,206,222,.6);animation:wDrift 15.8s ease-in-out -5.6s infinite alternate;pointer-events:none")} />
        <div style={sx("position:absolute;left:0;right:0;bottom:16vh;height:1.5px;background:linear-gradient(90deg,rgba(255,230,210,.3),rgba(255,240,220,.95) 62%,rgba(255,230,210,.4))")} />
        <div style={sx("position:absolute;left:-6vw;bottom:-4vh;width:50vw;height:12vh;border-radius:0 100% 0 0/0 100% 0 0;background:linear-gradient(180deg,#F7D0BC,#EDB7B4)")} />
        <div style={sx("position:absolute;left:calc(-1 * min(24vh,30vw));top:-10vh;width:min(52vh,62vw);aspect-ratio:1/2;background:#6E4F95;-webkit-mask:url(/assets/palm-a.svg) center/100% 100% no-repeat;mask:url(/assets/palm-a.svg) center/100% 100% no-repeat;transform-origin:50% 100%;animation:wSway 13s ease-in-out -1s infinite alternate;pointer-events:none;")} />
        <div style={sx("position:absolute;right:calc(-1 * min(22vh,24vw));top:-16vh;width:min(46vh,50vw);aspect-ratio:1/2;background:#7A579E;-webkit-mask:url(/assets/palm-b.svg) center/100% 100% no-repeat;mask:url(/assets/palm-b.svg) center/100% 100% no-repeat;transform-origin:50% 100%;animation:wSway 14s ease-in-out -6s infinite alternate;pointer-events:none;scale:-1 1;")} />
        <div style={sx(`position:absolute;inset:0;background:linear-gradient(180deg,#8C86C8 0%,#B6ADDA 38%,#F1E3EE 68%,#F6E6E8 82%,#D9C2D6 100%);mix-blend-mode:multiply;opacity:${hz.night};transition:opacity 2.4s cubic-bezier(.22,1,.36,1);pointer-events:none`)} />
        <div style={sx(`position:absolute;inset:0;background:radial-gradient(46% 20% at 70% 82%,rgba(255,176,170,.55),transparent 70%),radial-gradient(40% 16% at 18% 88%,rgba(140,205,230,.28),transparent 70%);opacity:${hz.night};transition:opacity 2.4s cubic-bezier(.22,1,.36,1);pointer-events:none`)} />
        <div style={sx(`position:absolute;left:0;right:0;top:0;height:58%;background-image:radial-gradient(circle 0.8px at 2.8% 60.4%,#fff 90%,transparent),radial-gradient(circle 1.5px at 58.3% 72.2%,#fff 90%,transparent),radial-gradient(circle 1.1px at 45.5% 16.8%,#fff 90%,transparent),radial-gradient(circle 1.3px at 17.3% 24.3%,#fff 90%,transparent),radial-gradient(circle 1.0px at 88.4% 77.9%,#fff 90%,transparent),radial-gradient(circle 1.4px at 33.0% 5.8%,#fff 90%,transparent),radial-gradient(circle 1.6px at 80.5% 44.3%,#fff 90%,transparent),radial-gradient(circle 0.9px at 60.3% 57.3%,#fff 90%,transparent),radial-gradient(circle 1.3px at 21.0% 15.9%,#fff 90%,transparent),radial-gradient(circle 1.1px at 86.7% 25.0%,#fff 90%,transparent),radial-gradient(circle 1.1px at 1.2% 83.1%,#fff 90%,transparent),radial-gradient(circle 0.9px at 11.3% 19.8%,#fff 90%,transparent),radial-gradient(circle 1.2px at 90.6% 78.8%,#fff 90%,transparent),radial-gradient(circle 1.3px at 94.7% 84.5%,#fff 90%,transparent),radial-gradient(circle 1.1px at 13.9% 72.2%,#fff 90%,transparent),radial-gradient(circle 0.8px at 25.2% 22.4%,#fff 90%,transparent),radial-gradient(circle 1.6px at 74.2% 32.1%,#fff 90%,transparent),radial-gradient(circle 1.3px at 52.3% 32.7%,#fff 90%,transparent),radial-gradient(circle 0.9px at 90.6% 29.3%,#fff 90%,transparent),radial-gradient(circle 1.5px at 9.5% 60.7%,#fff 90%,transparent),radial-gradient(circle 1.6px at 83.9% 61.5%,#fff 90%,transparent),radial-gradient(circle 1.1px at 59.9% 95.2%,#fff 90%,transparent),radial-gradient(circle 0.9px at 17.3% 29.9%,#fff 90%,transparent),radial-gradient(circle 1.3px at 21.5% 74.8%,#fff 90%,transparent),radial-gradient(circle 1.3px at 32.1% 61.7%,#fff 90%,transparent),radial-gradient(circle 1.1px at 21.2% 59.0%,#fff 90%,transparent),radial-gradient(circle 1.1px at 75.9% 58.6%,#fff 90%,transparent),radial-gradient(circle 0.9px at 18.2% 81.3%,#fff 90%,transparent),radial-gradient(circle 1.3px at 63.1% 68.0%,#fff 90%,transparent),radial-gradient(circle 0.9px at 64.9% 31.4%,#fff 90%,transparent),radial-gradient(circle 1.0px at 70.7% 98.4%,#fff 90%,transparent),radial-gradient(circle 1.3px at 23.5% 43.4%,#fff 90%,transparent),radial-gradient(circle 1.6px at 81.5% 18.0%,#fff 90%,transparent),radial-gradient(circle 0.8px at 11.6% 19.3%,#fff 90%,transparent),radial-gradient(circle 1.1px at 95.8% 35.6%,#fff 90%,transparent),radial-gradient(circle 1.1px at 57.8% 0.0%,#fff 90%,transparent),radial-gradient(circle 1.1px at 14.4% 27.3%,#fff 90%,transparent),radial-gradient(circle 1.5px at 16.1% 75.7%,#fff 90%,transparent),radial-gradient(circle 1.0px at 85.4% 30.7%,#fff 90%,transparent),radial-gradient(circle 1.5px at 30.0% 72.2%,#fff 90%,transparent),radial-gradient(circle 1.1px at 21.3% 88.2%,#fff 90%,transparent),radial-gradient(circle 1.2px at 48.6% 96.2%,#fff 90%,transparent),radial-gradient(circle 1.6px at 16.5% 45.5%,#fff 90%,transparent),radial-gradient(circle 1.1px at 84.7% 47.9%,#fff 90%,transparent),radial-gradient(circle 0.9px at 44.3% 1.6%,#fff 90%,transparent),radial-gradient(circle 1.1px at 36.2% 73.6%,#fff 90%,transparent);opacity:${hz.stars};transition:opacity 2.4s cubic-bezier(.22,1,.36,1);pointer-events:none`)} />
        <div className="herogo-moon" style={sx(`position:absolute;right:${hz.mr}%;top:clamp(96px,${hz.my}vh,150px);width:46px;height:46px;border-radius:50%;box-shadow:inset -12px 6px 0 0 #FFF1DC;filter:drop-shadow(0 0 14px rgba(255,226,200,.55));transform:rotate(-18deg);opacity:${hz.moon};transition:right 3s cubic-bezier(.22,1,.36,1),top 3s cubic-bezier(.22,1,.36,1),opacity 2.4s ease;pointer-events:none`)} />
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" style={sx(`position:absolute;left:0;width:100%;height:24vh;pointer-events:none;bottom:16vh;-webkit-mask-image:linear-gradient(90deg,transparent 0 36%,#000 58%);mask-image:linear-gradient(90deg,transparent 0 36%,#000 58%);opacity:${hz.lights};transition:opacity 2.4s cubic-bezier(.22,1,.36,1);`)}>
          <g fill="#FFD9A0">
            <rect x="3.0" y="148.5" width="2.4" height="3.4" />
            <rect x="7.0" y="125.0" width="2.4" height="3.4" />
            <rect x="7.0" y="134.0" width="2.4" height="3.4" />
            <rect x="7.0" y="188.0" width="2.4" height="3.4" />
            <rect x="23.1" y="146.9" width="2.4" height="3.4" />
            <rect x="23.1" y="182.9" width="2.4" height="3.4" />
            <rect x="30.1" y="164.9" width="2.4" height="3.4" />
            <rect x="37.1" y="155.9" width="2.4" height="3.4" />
            <rect x="29.9" y="135.0" width="2.4" height="3.4" />
            <rect x="29.9" y="180.0" width="2.4" height="3.4" />
            <rect x="57.6" y="170.8" width="2.4" height="3.4" />
            <rect x="64.6" y="170.8" width="2.4" height="3.4" />
            <rect x="80.5" y="182.1" width="2.4" height="3.4" />
            <rect x="103.9" y="171.5" width="2.4" height="3.4" />
            <rect x="110.9" y="171.5" width="2.4" height="3.4" />
            <rect x="117.9" y="171.5" width="2.4" height="3.4" />
            <rect x="166.7" y="180.3" width="2.4" height="3.4" />
            <rect x="190.4" y="176.3" width="2.4" height="3.4" />
            <rect x="197.4" y="176.3" width="2.4" height="3.4" />
            <rect x="204.4" y="185.3" width="2.4" height="3.4" />
            <rect x="235.7" y="180.6" width="2.4" height="3.4" />
            <rect x="265.3" y="115.6" width="2.4" height="3.4" />
            <rect x="265.3" y="124.6" width="2.4" height="3.4" />
            <rect x="265.3" y="133.6" width="2.4" height="3.4" />
            <rect x="265.3" y="151.6" width="2.4" height="3.4" />
            <rect x="272.3" y="124.6" width="2.4" height="3.4" />
            <rect x="272.3" y="133.6" width="2.4" height="3.4" />
            <rect x="279.3" y="106.6" width="2.4" height="3.4" />
            <rect x="279.3" y="115.6" width="2.4" height="3.4" />
            <rect x="279.3" y="133.6" width="2.4" height="3.4" />
            <rect x="279.3" y="178.6" width="2.4" height="3.4" />
            <rect x="279.3" y="187.6" width="2.4" height="3.4" />
            <rect x="286.3" y="106.6" width="2.4" height="3.4" />
            <rect x="286.3" y="133.6" width="2.4" height="3.4" />
            <rect x="274.8" y="132.5" width="2.4" height="3.4" />
            <rect x="274.8" y="186.5" width="2.4" height="3.4" />
            <rect x="281.8" y="168.5" width="2.4" height="3.4" />
            <rect x="281.8" y="186.5" width="2.4" height="3.4" />
            <rect x="303.6" y="95.9" width="2.4" height="3.4" />
            <rect x="303.6" y="104.9" width="2.4" height="3.4" />
            <rect x="303.6" y="113.9" width="2.4" height="3.4" />
            <rect x="303.6" y="140.9" width="2.4" height="3.4" />
            <rect x="303.6" y="149.9" width="2.4" height="3.4" />
            <rect x="303.6" y="167.9" width="2.4" height="3.4" />
            <rect x="310.6" y="95.9" width="2.4" height="3.4" />
            <rect x="317.6" y="113.9" width="2.4" height="3.4" />
            <rect x="317.6" y="131.9" width="2.4" height="3.4" />
            <rect x="317.6" y="140.9" width="2.4" height="3.4" />
            <rect x="317.6" y="167.9" width="2.4" height="3.4" />
            <rect x="324.6" y="104.9" width="2.4" height="3.4" />
            <rect x="324.6" y="113.9" width="2.4" height="3.4" />
            <rect x="324.6" y="149.9" width="2.4" height="3.4" />
            <rect x="324.6" y="158.9" width="2.4" height="3.4" />
            <rect x="324.6" y="167.9" width="2.4" height="3.4" />
            <rect x="340.5" y="92.6" width="2.4" height="3.4" />
            <rect x="340.5" y="137.6" width="2.4" height="3.4" />
            <rect x="340.5" y="164.6" width="2.4" height="3.4" />
            <rect x="347.5" y="83.6" width="2.4" height="3.4" />
            <rect x="347.5" y="110.6" width="2.4" height="3.4" />
            <rect x="354.5" y="128.6" width="2.4" height="3.4" />
            <rect x="354.5" y="146.6" width="2.4" height="3.4" />
            <rect x="354.5" y="155.6" width="2.4" height="3.4" />
            <rect x="376.3" y="119.4" width="2.4" height="3.4" />
            <rect x="376.3" y="137.4" width="2.4" height="3.4" />
            <rect x="376.3" y="155.4" width="2.4" height="3.4" />
            <rect x="376.3" y="182.4" width="2.4" height="3.4" />
            <rect x="383.3" y="119.4" width="2.4" height="3.4" />
            <rect x="383.3" y="128.4" width="2.4" height="3.4" />
            <rect x="383.3" y="137.4" width="2.4" height="3.4" />
            <rect x="383.3" y="173.4" width="2.4" height="3.4" />
            <rect x="390.3" y="128.4" width="2.4" height="3.4" />
            <rect x="390.3" y="137.4" width="2.4" height="3.4" />
            <rect x="390.3" y="155.4" width="2.4" height="3.4" />
            <rect x="397.3" y="119.4" width="2.4" height="3.4" />
            <rect x="397.3" y="128.4" width="2.4" height="3.4" />
            <rect x="397.3" y="137.4" width="2.4" height="3.4" />
            <rect x="415.3" y="148.0" width="2.4" height="3.4" />
            <rect x="415.3" y="175.0" width="2.4" height="3.4" />
            <rect x="422.3" y="112.0" width="2.4" height="3.4" />
            <rect x="422.3" y="121.0" width="2.4" height="3.4" />
            <rect x="422.3" y="148.0" width="2.4" height="3.4" />
            <rect x="422.3" y="166.0" width="2.4" height="3.4" />
            <rect x="429.3" y="112.0" width="2.4" height="3.4" />
            <rect x="429.3" y="130.0" width="2.4" height="3.4" />
            <rect x="429.3" y="139.0" width="2.4" height="3.4" />
            <rect x="436.3" y="103.0" width="2.4" height="3.4" />
            <rect x="436.3" y="130.0" width="2.4" height="3.4" />
            <rect x="423.8" y="157.1" width="2.4" height="3.4" />
            <rect x="457.4" y="159.6" width="2.4" height="3.4" />
            <rect x="464.4" y="114.6" width="2.4" height="3.4" />
            <rect x="542.5" y="137.2" width="2.4" height="3.4" />
            <rect x="542.5" y="146.2" width="2.4" height="3.4" />
            <rect x="549.5" y="65.2" width="2.4" height="3.4" />
            <rect x="549.5" y="74.2" width="2.4" height="3.4" />
            <rect x="549.5" y="92.2" width="2.4" height="3.4" />
            <rect x="549.5" y="137.2" width="2.4" height="3.4" />
            <rect x="549.5" y="146.2" width="2.4" height="3.4" />
            <rect x="549.5" y="173.2" width="2.4" height="3.4" />
            <rect x="549.5" y="182.2" width="2.4" height="3.4" />
            <rect x="556.5" y="74.2" width="2.4" height="3.4" />
            <rect x="556.5" y="146.2" width="2.4" height="3.4" />
            <rect x="563.5" y="65.2" width="2.4" height="3.4" />
            <rect x="563.5" y="74.2" width="2.4" height="3.4" />
            <rect x="563.5" y="128.2" width="2.4" height="3.4" />
            <rect x="563.5" y="146.2" width="2.4" height="3.4" />
            <rect x="589.0" y="85.4" width="2.4" height="3.4" />
            <rect x="589.0" y="121.4" width="2.4" height="3.4" />
            <rect x="589.0" y="157.4" width="2.4" height="3.4" />
            <rect x="596.0" y="103.4" width="2.4" height="3.4" />
            <rect x="596.0" y="139.4" width="2.4" height="3.4" />
            <rect x="596.0" y="166.4" width="2.4" height="3.4" />
            <rect x="603.0" y="130.4" width="2.4" height="3.4" />
            <rect x="603.0" y="148.4" width="2.4" height="3.4" />
            <rect x="621.8" y="97.1" width="2.4" height="3.4" />
            <rect x="621.8" y="142.1" width="2.4" height="3.4" />
            <rect x="621.8" y="151.1" width="2.4" height="3.4" />
            <rect x="628.8" y="79.1" width="2.4" height="3.4" />
            <rect x="628.8" y="106.1" width="2.4" height="3.4" />
            <rect x="628.8" y="115.1" width="2.4" height="3.4" />
            <rect x="628.8" y="124.1" width="2.4" height="3.4" />
            <rect x="628.8" y="142.1" width="2.4" height="3.4" />
            <rect x="628.8" y="169.1" width="2.4" height="3.4" />
            <rect x="635.8" y="88.1" width="2.4" height="3.4" />
            <rect x="635.8" y="115.1" width="2.4" height="3.4" />
            <rect x="635.8" y="142.1" width="2.4" height="3.4" />
            <rect x="635.8" y="178.1" width="2.4" height="3.4" />
            <rect x="642.8" y="88.1" width="2.4" height="3.4" />
            <rect x="642.8" y="133.1" width="2.4" height="3.4" />
            <rect x="631.1" y="77.2" width="2.4" height="3.4" />
            <rect x="631.1" y="86.2" width="2.4" height="3.4" />
            <rect x="631.1" y="95.2" width="2.4" height="3.4" />
            <rect x="631.1" y="122.2" width="2.4" height="3.4" />
            <rect x="631.1" y="140.2" width="2.4" height="3.4" />
            <rect x="631.1" y="149.2" width="2.4" height="3.4" />
            <rect x="638.1" y="68.2" width="2.4" height="3.4" />
            <rect x="638.1" y="113.2" width="2.4" height="3.4" />
            <rect x="638.1" y="131.2" width="2.4" height="3.4" />
            <rect x="638.1" y="176.2" width="2.4" height="3.4" />
            <rect x="668.6" y="140.6" width="2.4" height="3.4" />
            <rect x="668.6" y="176.6" width="2.4" height="3.4" />
            <rect x="675.6" y="122.6" width="2.4" height="3.4" />
            <rect x="682.6" y="158.6" width="2.4" height="3.4" />
            <rect x="682.6" y="176.6" width="2.4" height="3.4" />
            <rect x="708.6" y="138.4" width="2.4" height="3.4" />
            <rect x="708.6" y="174.4" width="2.4" height="3.4" />
            <rect x="715.6" y="120.4" width="2.4" height="3.4" />
            <rect x="715.6" y="129.4" width="2.4" height="3.4" />
            <rect x="715.6" y="147.4" width="2.4" height="3.4" />
            <rect x="715.6" y="183.4" width="2.4" height="3.4" />
            <rect x="722.6" y="102.4" width="2.4" height="3.4" />
            <rect x="722.6" y="138.4" width="2.4" height="3.4" />
            <rect x="715.2" y="80.0" width="2.4" height="3.4" />
            <rect x="715.2" y="107.0" width="2.4" height="3.4" />
            <rect x="715.2" y="134.0" width="2.4" height="3.4" />
            <rect x="743.9" y="82.8" width="2.4" height="3.4" />
            <rect x="743.9" y="127.8" width="2.4" height="3.4" />
            <rect x="743.9" y="136.8" width="2.4" height="3.4" />
            <rect x="743.9" y="163.8" width="2.4" height="3.4" />
            <rect x="743.9" y="172.8" width="2.4" height="3.4" />
            <rect x="743.9" y="181.8" width="2.4" height="3.4" />
            <rect x="750.9" y="82.8" width="2.4" height="3.4" />
            <rect x="750.9" y="136.8" width="2.4" height="3.4" />
            <rect x="750.9" y="145.8" width="2.4" height="3.4" />
            <rect x="791.6" y="117.5" width="2.4" height="3.4" />
            <rect x="791.6" y="126.5" width="2.4" height="3.4" />
            <rect x="791.6" y="135.5" width="2.4" height="3.4" />
            <rect x="791.6" y="171.5" width="2.4" height="3.4" />
            <rect x="791.6" y="180.5" width="2.4" height="3.4" />
            <rect x="798.6" y="99.5" width="2.4" height="3.4" />
            <rect x="798.6" y="126.5" width="2.4" height="3.4" />
            <rect x="798.6" y="144.5" width="2.4" height="3.4" />
            <rect x="798.6" y="162.5" width="2.4" height="3.4" />
            <rect x="798.6" y="171.5" width="2.4" height="3.4" />
            <rect x="857.4" y="162.6" width="2.4" height="3.4" />
            <rect x="864.4" y="171.6" width="2.4" height="3.4" />
            <rect x="871.4" y="171.6" width="2.4" height="3.4" />
            <rect x="890.5" y="178.7" width="2.4" height="3.4" />
            <rect x="897.5" y="151.7" width="2.4" height="3.4" />
            <rect x="904.5" y="151.7" width="2.4" height="3.4" />
            <rect x="917.8" y="131.6" width="2.4" height="3.4" />
            <rect x="924.8" y="113.6" width="2.4" height="3.4" />
            <rect x="924.8" y="149.6" width="2.4" height="3.4" />
            <rect x="931.8" y="140.6" width="2.4" height="3.4" />
            <rect x="931.8" y="158.6" width="2.4" height="3.4" />
            <rect x="931.8" y="176.6" width="2.4" height="3.4" />
            <rect x="77.9" y="182.5" width="2.4" height="3.4" />
            <rect x="81.4" y="178.4" width="2.4" height="3.4" />
            <rect x="189.4" y="171.6" width="2.4" height="3.4" />
            <rect x="189.4" y="180.6" width="2.4" height="3.4" />
            <rect x="196.4" y="171.6" width="2.4" height="3.4" />
            <rect x="196.4" y="180.6" width="2.4" height="3.4" />
            <rect x="195.3" y="173.2" width="2.4" height="3.4" />
            <rect x="322.6" y="161.3" width="2.4" height="3.4" />
            <rect x="322.6" y="179.3" width="2.4" height="3.4" />
            <rect x="362.3" y="169.0" width="2.4" height="3.4" />
            <rect x="369.3" y="160.0" width="2.4" height="3.4" />
            <rect x="369.3" y="169.0" width="2.4" height="3.4" />
            <rect x="376.3" y="160.0" width="2.4" height="3.4" />
            <rect x="376.3" y="178.0" width="2.4" height="3.4" />
            <rect x="368.7" y="133.9" width="2.4" height="3.4" />
            <rect x="368.7" y="142.9" width="2.4" height="3.4" />
            <rect x="368.7" y="151.9" width="2.4" height="3.4" />
            <rect x="389.7" y="183.2" width="2.4" height="3.4" />
            <rect x="410.4" y="141.7" width="2.4" height="3.4" />
            <rect x="410.4" y="177.7" width="2.4" height="3.4" />
            <rect x="424.4" y="132.7" width="2.4" height="3.4" />
            <rect x="424.4" y="186.7" width="2.4" height="3.4" />
            <rect x="451.4" y="148.5" width="2.4" height="3.4" />
            <rect x="451.4" y="157.5" width="2.4" height="3.4" />
            <rect x="451.4" y="166.5" width="2.4" height="3.4" />
            <rect x="450.5" y="115.8" width="2.4" height="3.4" />
            <rect x="450.5" y="178.8" width="2.4" height="3.4" />
            <rect x="450.5" y="187.8" width="2.4" height="3.4" />
            <rect x="469.1" y="171.4" width="2.4" height="3.4" />
            <rect x="476.1" y="126.4" width="2.4" height="3.4" />
            <rect x="576.1" y="160.4" width="2.4" height="3.4" />
            <rect x="583.1" y="115.4" width="2.4" height="3.4" />
            <rect x="583.1" y="142.4" width="2.4" height="3.4" />
            <rect x="581.2" y="154.4" width="2.4" height="3.4" />
            <rect x="581.2" y="181.4" width="2.4" height="3.4" />
            <rect x="709.6" y="157.1" width="2.4" height="3.4" />
            <rect x="716.6" y="148.1" width="2.4" height="3.4" />
            <rect x="714.6" y="162.9" width="2.4" height="3.4" />
            <rect x="714.6" y="171.9" width="2.4" height="3.4" />
            <rect x="769.7" y="152.9" width="2.4" height="3.4" />
            <rect x="776.7" y="170.9" width="2.4" height="3.4" />
            <rect x="783.7" y="152.9" width="2.4" height="3.4" />
            <rect x="783.7" y="179.9" width="2.4" height="3.4" />
            <rect x="802.3" y="141.5" width="2.4" height="3.4" />
            <rect x="802.3" y="186.5" width="2.4" height="3.4" />
            <rect x="809.3" y="141.5" width="2.4" height="3.4" />
            <rect x="809.3" y="150.5" width="2.4" height="3.4" />
            <rect x="809.3" y="177.5" width="2.4" height="3.4" />
            <rect x="887.0" y="159.0" width="2.4" height="3.4" />
            <rect x="887.0" y="168.0" width="2.4" height="3.4" />
            <rect x="887.0" y="177.0" width="2.4" height="3.4" />
          </g>
        </svg>
        <div style={sx(`position:absolute;inset:0;opacity:${hz.lights};transition:opacity 2.4s cubic-bezier(.22,1,.36,1);pointer-events:none`)}>
          <div style={sx("position:absolute;left:51.3%;bottom:12.0vh;width:1.6vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 9.8s ease-in-out -4.8s infinite alternate")} />
          <div style={sx("position:absolute;left:55.1%;bottom:3.1vh;width:0.7vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 11.5s ease-in-out -1.5s infinite alternate")} />
          <div style={sx("position:absolute;left:86.0%;bottom:4.7vh;width:2.9vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 10.1s ease-in-out -3.9s infinite alternate")} />
          <div style={sx("position:absolute;left:45.4%;bottom:8.6vh;width:1.3vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 9.2s ease-in-out -3.8s infinite alternate")} />
          <div style={sx("position:absolute;left:73.5%;bottom:8.7vh;width:1.5vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 8.3s ease-in-out -5.6s infinite alternate")} />
          <div style={sx("position:absolute;left:95.4%;bottom:4.0vh;width:1.2vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 9.7s ease-in-out -3.8s infinite alternate")} />
          <div style={sx("position:absolute;left:52.4%;bottom:2.1vh;width:1.2vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 6.7s ease-in-out -3.2s infinite alternate")} />
          <div style={sx("position:absolute;left:94.4%;bottom:12.5vh;width:2.9vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 9.6s ease-in-out -2.0s infinite alternate")} />
          <div style={sx("position:absolute;left:92.3%;bottom:11.8vh;width:2.6vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 8.8s ease-in-out -5.1s infinite alternate")} />
          <div style={sx("position:absolute;left:45.1%;bottom:6.6vh;width:0.7vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 8.6s ease-in-out -5.4s infinite alternate")} />
          <div style={sx("position:absolute;left:80.6%;bottom:4.4vh;width:1.9vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 7.0s ease-in-out -5.8s infinite alternate")} />
          <div style={sx("position:absolute;left:52.7%;bottom:7.3vh;width:1.4vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 11.1s ease-in-out -4.0s infinite alternate")} />
          <div style={sx("position:absolute;left:60.0%;bottom:14.9vh;width:2.6vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 9.7s ease-in-out -4.9s infinite alternate")} />
          <div style={sx("position:absolute;left:45.5%;bottom:13.3vh;width:0.8vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 7.0s ease-in-out -1.0s infinite alternate")} />
          <div style={sx("position:absolute;left:76.8%;bottom:8.9vh;width:1.5vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 8.5s ease-in-out -5.8s infinite alternate")} />
          <div style={sx("position:absolute;left:55.3%;bottom:2.9vh;width:1.7vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 11.4s ease-in-out -0.2s infinite alternate")} />
          <div style={sx("position:absolute;left:76.6%;bottom:12.7vh;width:0.8vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 11.3s ease-in-out -4.7s infinite alternate")} />
          <div style={sx("position:absolute;left:70.4%;bottom:14.9vh;width:2.1vw;height:2px;border-radius:2px;background:rgba(255,212,150,.75);animation:wDrift 11.7s ease-in-out -2.9s infinite alternate")} />
        </div>
        <div style={sx("position:absolute;inset:0;background:url(/assets/grain.svg);opacity:.14;mix-blend-mode:overlay;pointer-events:none")} />
        <div aria-hidden="true" style={sx("position:absolute;inset:0;background:url(/assets/hero-miami-beach.jpg) 62% 55%/cover no-repeat;filter:saturate(1.1) brightness(1.04) contrast(1.02)")} />
        <div aria-hidden="true" style={sx("position:absolute;inset:0;background:linear-gradient(180deg,#C896C2 0%,#E394B1 9%,#F9A299 17%,#FFB37F 25%,#FEBD79 31%,#F6A8A0 40%,#DC9CB6 56%,#AE8AC6 78%,#927EC4 100%);mix-blend-mode:color;opacity:.42")} />
        <div aria-hidden="true" style={sx("position:absolute;inset:0;background:linear-gradient(180deg,rgba(226,150,184,.9) 0%,rgba(246,160,156,.85) 14%,rgba(255,178,128,.8) 26%,rgba(255,178,128,0) 42%);mix-blend-mode:color;opacity:.55")} />
        <div aria-hidden="true" style={sx("position:absolute;inset:0;background:linear-gradient(180deg,#C896C2 0%,#E394B1 9%,#F9A299 17%,#FFB37F 25%,#FEBD79 31%,#F6A8A0 40%,#DC9CB6 56%,#AE8AC6 78%,#927EC4 100%);mix-blend-mode:soft-light;opacity:.85")} />
        <div aria-hidden="true" style={sx("position:absolute;inset:0;background:linear-gradient(180deg,rgba(170,120,200,.22) 0%,rgba(255,200,170,.06) 40%,rgba(200,150,200,.12) 70%,rgba(70,40,100,.3) 100%);mix-blend-mode:multiply")} />
        <div aria-hidden="true" style={sx("position:absolute;inset:0;background:radial-gradient(60% 26% at 74% 29%,rgba(255,200,140,.6),rgba(255,160,150,.22) 50%,transparent 76%),linear-gradient(180deg,rgba(210,140,190,.26) 0%,transparent 22%);mix-blend-mode:screen")} />
        <div aria-hidden="true" style={sx("position:absolute;inset:0;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);-webkit-mask:linear-gradient(90deg,#000 0%,#000 40%,transparent 60%);mask:linear-gradient(90deg,#000 0%,#000 40%,transparent 60%)")} />
        <div className="hero-scrim" style={sx("position:absolute;inset:0;background:radial-gradient(52% 60% at 22% 46%,rgba(50,26,70,.22),transparent 80%),linear-gradient(90deg,rgba(46,24,66,.66) 0%,rgba(46,24,66,.5) 30%,rgba(46,24,66,.18) 50%,transparent 64%);pointer-events:none")} />
        {" "}
        <div className="hero-row" style={sx("position:relative;width:100%;max-width:calc(1180px + 2 * clamp(20px,5vw,80px));margin:0 auto;padding:clamp(92px,11vh,112px) clamp(20px,5vw,80px) clamp(28px,4vh,48px);box-sizing:border-box;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:clamp(32px,5vw,72px)")}>
          {" "}
          <div style={sx("flex:1 1 460px;max-width:640px;position:relative;isolation:isolate")}>
            <div aria-hidden="true" style={sx(`position:absolute;left:-4%;right:-6%;top:-5%;bottom:-7%;z-index:-1;border-radius:56px;background:rgba(44,22,64,.42);filter:blur(38px);opacity:${hz.scrim};transition:opacity 2.4s cubic-bezier(.22,1,.36,1);pointer-events:none`)} />
            {" "}
            <div style={sx("display:inline-flex;align-items:center;gap:9px;height:34px;box-sizing:border-box;padding:0 15px 0 12px;border-radius:999px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.24);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);font-size:14px;font-weight:600;color:#fff")}>
              <svg viewBox="0 0 24 24" style={sx("width:15px;height:15px;flex:none;fill:none;stroke:#FFC98A;stroke-width:2;stroke-linecap:round")}>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
              </svg>
              {"For South Florida brokerages"}
            </div>
            {" "}
            <h1 style={sx("margin:18px 0 0;font:700 clamp(52px,7.4vw,104px)/0.92 'Sora',sans-serif;letter-spacing:-0.06em;text-shadow:0 6px 40px rgba(10,20,30,.35);text-wrap:balance")}>
              {"Wake up to"}
              <br />
              <span style={sx("background:linear-gradient(90deg,#FF8A7A,#FFB347);-webkit-background-clip:text;background-clip:text;color:transparent")}>
                {"more deals."}
              </span>
            </h1>
            {" "}
            <p style={sx("margin:24px 0 0;max-width:560px;font-size:clamp(17px,1.45vw,19.5px);line-height:1.5;font-weight:500;color:#FFF4F7;text-shadow:0 1px 14px rgba(20,10,40,.5);text-wrap:pretty")}>
              {"Every chat and email answered in under a minute, in English or Spanish."}
            </p>
            {" "}
            <div style={sx("display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin-top:30px")}>
              {" "}
              <a className="herogo-ho1 herogo-ac2" href="#contact" style={sx("display:inline-flex;align-items:center;gap:12px;height:58px;padding:0 28px;border-radius:10px;background:linear-gradient(90deg,#FF6B5B,#FF9F1C);color:#1D1B19;font:600 17px 'Sora',sans-serif;text-decoration:none;box-shadow:0 14px 34px rgba(200,60,60,.35);transition:box-shadow .2s,transform .12s")}>
                {"See what you missed"}
                <svg viewBox="0 0 24 24" style={sx("width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              {" "}
              <a className="herogo-ho3" href="#product" style={sx("display:inline-flex;align-items:center;gap:8px;height:58px;padding:0 10px;color:#fff;font:600 16px 'Sora',sans-serif;text-decoration:none")}>
                {"See how it works"}
                <svg viewBox="0 0 24 24" style={sx("width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")}>
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </a>
              {" "}
            </div>
            {" "}
            <div style={sx("margin-top:14px;font-size:14px;line-height:1.5;color:rgba(255,255,255,.82)")}>
              {"Free: we check your site and Google profile, and time one unannounced test inquiry after hours. Results within a week."}
            </div>
            <div style={sx("display:flex;flex-wrap:wrap;gap:10px 22px;margin-top:22px;padding-top:18px;border-top:1px solid rgba(255,255,255,.14);font-size:14px;font-weight:500;color:rgba(255,255,255,.92)")}>
              <span style={sx("display:inline-flex;align-items:center;gap:7px;white-space:nowrap")}>
                <svg viewBox="0 0 24 24" style={sx("width:15px;height:15px;flex:none;fill:none;stroke:#7FE3D6;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round")}>
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {"Run for you"}
              </span>
              <span style={sx("display:inline-flex;align-items:center;gap:7px;white-space:nowrap")}>
                <svg viewBox="0 0 24 24" style={sx("width:15px;height:15px;flex:none;fill:none;stroke:#7FE3D6;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round")}>
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {"Reply-time guarantee"}
              </span>
              <span style={sx("display:inline-flex;align-items:center;gap:7px;white-space:nowrap")}>
                <svg viewBox="0 0 24 24" style={sx("width:15px;height:15px;flex:none;fill:none;stroke:#7FE3D6;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round")}>
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {"Month to month"}
              </span>
            </div>
            {" "}
          </div>
          {" "}
          <div className="hero-phone" style={sx("flex:0 0 auto;width:clamp(220px,62vw,292px)")}>
            {" "}
            <FitBox w={402} h={874} max={0.84} style={sx("display:block;width:100%")}>
              {" "}
              <div style={sx("width:402px;height:874px;transform:perspective(1800px) rotateY(-8deg) rotateX(2deg);transform-origin:50% 50%")}>
                {" "}
                <div ref={phoneRef} style={sx("position:relative;width:402px;height:874px;border-radius:56px;overflow:hidden;background:#000;box-shadow:0 0 0 10px #15101C,0 0 0 11.5px #3A3242,-40px 60px 120px rgba(10,4,30,.55)")}>
                  {" "}
                  <div style={sx("position:absolute;inset:0;background:linear-gradient(180deg,rgba(26,16,44,.74) 0%,rgba(40,24,60,.6) 45%,rgba(26,16,44,.74) 100%),url(/assets/hero-miami-beach.jpg) 80% 50%/cover")} />
                  {" "}
                  <div style={sx(`position:absolute;inset:0;opacity:${sk.dawn};transition:opacity 1.8s ease;background:linear-gradient(180deg,rgba(160,120,200,.35) 0%,rgba(240,150,170,.2) 40%,rgba(255,190,130,.16) 70%,rgba(40,22,60,.45) 100%),url(/assets/hero-miami-beach.jpg) 80% 50%/cover`)} />
                  {" "}
                  <div style={sx(`position:absolute;inset:0;opacity:${sk.dusk};transition:opacity 1.8s ease;background:linear-gradient(180deg,rgba(150,110,196,.5) 0%,rgba(236,148,170,.34) 38%,rgba(255,180,120,.28) 62%,rgba(46,24,66,.55) 100%),url(/assets/hero-miami-beach.jpg) 80% 50%/cover`)} />
                  {" "}
                  <div style={sx("position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,14,22,.2),transparent 30%,transparent 45%,rgba(8,14,22,.45))")} />
                  {" "}
                  <div style={sx(`position:absolute;left:50%;top:11px;width:${island.w}px;height:${island.h}px;transform:translateX(-50%);border-radius:${island.r}px;background:#000;z-index:6;overflow:hidden;transition:width .55s cubic-bezier(.34,1.4,.64,1),height .55s cubic-bezier(.34,1.4,.64,1),border-radius .55s`)}>
                    {" "}
                    <div style={sx(`position:absolute;inset:0;display:flex;align-items:center;gap:10px;padding:0 16px 0 12px;opacity:${island.eo};transition:opacity .3s`)}>
                      <img src="/assets/wynsley-icon.svg" alt="" style={sx("width:38px;height:38px;border-radius:11px;flex:none")} />
                      <div style={sx("min-width:0;flex:1")}>
                        <div style={sx("font:600 14.5px 'Sora',sans-serif;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>
                          {island.title}
                        </div>
                        <div style={sx("font-size:11.5px;color:rgba(255,255,255,.66);margin-top:2px")}>
                          {"Wynsley · "}{island.tm}
                        </div>
                      </div>
                      <span style={sx("width:10px;height:10px;border-radius:50%;background:#FF9F1C;box-shadow:0 0 12px #FF9F1C;flex:none")} />
                    </div>
                    {" "}
                    <div style={sx(`position:absolute;inset:0;display:flex;align-items:center;justify-content:space-between;padding:0 14px;opacity:${island.co};transition:opacity .3s`)}>
                      <span style={sx("width:8px;height:8px;border-radius:50%;background:#FF6B5B;box-shadow:0 0 8px #FF6B5B")} />
                      <span style={sx("font:600 12px 'Instrument Sans',sans-serif;color:#fff;white-space:nowrap")}>
                        {island.cnt}
                      </span>
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div style={sx("position:absolute;left:0;right:0;top:0;height:54px;display:flex;align-items:center;justify-content:space-between;padding:8px 34px 0 48px;box-sizing:border-box;font:600 16.5px 'Instrument Sans',sans-serif;z-index:5")}>
                    <span>
                      {clock}
                    </span>
                    <span style={sx("display:flex;gap:6px;align-items:center")}>
                      <svg viewBox="0 0 18 12" style={sx("width:18px;height:12px;fill:#fff")}>
                        <rect x="0" y="8" width="3" height="4" rx="1" />
                        <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                        <rect x="10" y="3" width="3" height="9" rx="1" />
                        <rect x="15" y="0" width="3" height="12" rx="1" />
                      </svg>
                      <svg viewBox="0 0 27 13" style={sx("width:27px;height:13px")}>
                        <rect x=".5" y=".5" width="23" height="12" rx="3.5" style={sx("fill:none;stroke:#fff;opacity:.45")} />
                        <rect x="2" y="2" width="20" height="9" rx="2" style={sx("fill:#fff")} />
                      </svg>
                    </span>
                  </div>
                  {" "}
                  <div style={sx("position:absolute;left:0;right:0;top:76px;text-align:center")}>
                    <div style={sx("font:600 18px 'Sora',sans-serif;opacity:.92")}>
                      {date}
                    </div>
                    <div style={sx("font:600 100px/1 'Sora',sans-serif;letter-spacing:-0.045em;margin-top:2px;font-variant-numeric:tabular-nums")}>
                      {clock}
                    </div>
                  </div>
                  {" "}
                  <div style={sx(`position:absolute;left:12px;right:12px;top:300px;z-index:4;display:flex;flex-direction:column;opacity:${lockO};transition:opacity .5s ease`)}>
                    <div style={sx(`overflow:hidden;max-height:${b.wh}px;opacity:${b.wo};transform:translateY(${b.wy}px);transition:max-height .7s cubic-bezier(.22,1,.36,1),opacity .5s ease,transform .7s cubic-bezier(.22,1,.36,1)`)}>
                      <div style={sx("padding-bottom:10px")}>
                        <div style={sx("border-radius:24px;padding:13px 15px 14px;background:rgba(250,246,252,.96);box-shadow:0 14px 34px rgba(10,5,25,.28);color:#22162B")}>
                          <div style={sx("display:flex;align-items:center;gap:8px")}>
                            <img src="/assets/wynsley-icon.svg" alt="" style={sx("width:20px;height:20px;border-radius:5px;flex:none")} />
                            <span style={sx("font-size:11.5px;font-weight:700;letter-spacing:.04em;color:#5B4A66")}>
                              {"WYNSLEY"}
                            </span>
                            <span style={sx(`font:600 9.5px 'IBM Plex Mono',monospace;letter-spacing:.06em;padding:2px 7px;border-radius:999px;background:${b.tb};color:${b.tc};transition:background .4s,color .4s`)}>
                              {b.tag}
                            </span>
                            <span style={sx("margin-left:auto;font-size:12px;color:#5B4A66")}>
                              {b.tm}
                            </span>
                          </div>
                          <div style={sx("font:600 15.5px 'Sora',sans-serif;letter-spacing:-0.01em;margin-top:7px")}>
                            {b.title}
                          </div>
                          <div style={sx("font-size:13.5px;line-height:1.36;margin-top:3px;color:#3A2E44")}>
                            {b.body}
                          </div>
                          <div style={sx(`overflow:hidden;max-height:${b.lh}px;transition:max-height .7s cubic-bezier(.22,1,.36,1)`)}>
                            <div style={sx("margin-top:10px;padding-top:6px;border-top:1px solid rgba(34,22,43,.08)")}>
                              <div style={sx(`overflow:hidden;max-height:${b.s0.h}px;opacity:${b.s0.o};transition:max-height .5s cubic-bezier(.22,1,.36,1),opacity .4s ease`)}>
                                <div style={sx("display:flex;align-items:center;gap:9px;height:30px")}>
                                  <span style={sx("position:relative;width:18px;height:18px;flex:none")}>
                                    <svg viewBox="0 0 24 24" style={sx(`position:absolute;inset:0;width:18px;height:18px;fill:none;stroke:#7A3FF2;stroke-width:2.6;stroke-linecap:round;opacity:${b.s0.sp};animation:wSpin .8s linear infinite;transition:opacity .2s`)}>
                                      <path d="M12 3a9 9 0 1 0 9 9" />
                                    </svg>
                                    <span style={sx(`position:absolute;inset:0;border-radius:50%;background:#14A89E;display:flex;align-items:center;justify-content:center;opacity:${b.s0.ck};transform:scale(${b.s0.cs});transition:opacity .2s ease,transform .45s cubic-bezier(.34,1.56,.64,1)`)}>
                                      <svg viewBox="0 0 24 24" style={sx("width:12px;height:12px;fill:none;stroke:#fff;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round")}>
                                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                                      </svg>
                                    </span>
                                  </span>
                                  <span style={sx("font-size:13px;color:#22162B;white-space:nowrap")}>
                                    {"Matched Robert to his owner record"}
                                  </span>
                                  <span style={sx(`margin-left:auto;font:500 11.5px 'IBM Plex Mono',monospace;color:#5B4A66;white-space:nowrap;opacity:${b.s0.ck};transition:opacity .3s ease`)}>
                                    {"2 units"}
                                  </span>
                                </div>
                              </div>
                              <div style={sx(`overflow:hidden;max-height:${b.s1.h}px;opacity:${b.s1.o};transition:max-height .5s cubic-bezier(.22,1,.36,1),opacity .4s ease`)}>
                                <div style={sx("display:flex;align-items:center;gap:9px;height:30px")}>
                                  <span style={sx("position:relative;width:18px;height:18px;flex:none")}>
                                    <svg viewBox="0 0 24 24" style={sx(`position:absolute;inset:0;width:18px;height:18px;fill:none;stroke:#7A3FF2;stroke-width:2.6;stroke-linecap:round;opacity:${b.s1.sp};animation:wSpin .8s linear infinite;transition:opacity .2s`)}>
                                      <path d="M12 3a9 9 0 1 0 9 9" />
                                    </svg>
                                    <span style={sx(`position:absolute;inset:0;border-radius:50%;background:#14A89E;display:flex;align-items:center;justify-content:center;opacity:${b.s1.ck};transform:scale(${b.s1.cs});transition:opacity .2s ease,transform .45s cubic-bezier(.34,1.56,.64,1)`)}>
                                      <svg viewBox="0 0 24 24" style={sx("width:12px;height:12px;fill:none;stroke:#fff;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round")}>
                                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                                      </svg>
                                    </span>
                                  </span>
                                  <span style={sx("font-size:13px;color:#22162B;white-space:nowrap")}>
                                    {"Replied as your firm's AI"}
                                  </span>
                                  <span style={sx(`margin-left:auto;font:500 11.5px 'IBM Plex Mono',monospace;color:#5B4A66;white-space:nowrap;opacity:${b.s1.ck};transition:opacity .3s ease`)}>
                                    {b.rt}
                                  </span>
                                </div>
                              </div>
                              <div style={sx(`overflow:hidden;max-height:${b.s2.h}px;opacity:${b.s2.o};transition:max-height .5s cubic-bezier(.22,1,.36,1),opacity .4s ease`)}>
                                <div style={sx("display:flex;align-items:center;gap:9px;height:30px")}>
                                  <span style={sx("position:relative;width:18px;height:18px;flex:none")}>
                                    <svg viewBox="0 0 24 24" style={sx(`position:absolute;inset:0;width:18px;height:18px;fill:none;stroke:#7A3FF2;stroke-width:2.6;stroke-linecap:round;opacity:${b.s2.sp};animation:wSpin .8s linear infinite;transition:opacity .2s`)}>
                                      <path d="M12 3a9 9 0 1 0 9 9" />
                                    </svg>
                                    <span style={sx(`position:absolute;inset:0;border-radius:50%;background:#14A89E;display:flex;align-items:center;justify-content:center;opacity:${b.s2.ck};transform:scale(${b.s2.cs});transition:opacity .2s ease,transform .45s cubic-bezier(.34,1.56,.64,1)`)}>
                                      <svg viewBox="0 0 24 24" style={sx("width:12px;height:12px;fill:none;stroke:#fff;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round")}>
                                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                                      </svg>
                                    </span>
                                  </span>
                                  <span style={sx("font-size:13px;color:#22162B;white-space:nowrap")}>
                                    {"Linked his October statement"}
                                  </span>
                                  <span style={sx(`margin-left:auto;font:500 11.5px 'IBM Plex Mono',monospace;color:#5B4A66;white-space:nowrap;opacity:${b.s2.ck};transition:opacity .3s ease`)}>
                                    {"owner portal"}
                                  </span>
                                </div>
                              </div>
                              <div style={sx(`overflow:hidden;max-height:${b.s3.h}px;opacity:${b.s3.o};transition:max-height .5s cubic-bezier(.22,1,.36,1),opacity .4s ease`)}>
                                <div style={sx("display:flex;align-items:center;gap:9px;height:30px")}>
                                  <span style={sx("position:relative;width:18px;height:18px;flex:none")}>
                                    <svg viewBox="0 0 24 24" style={sx(`position:absolute;inset:0;width:18px;height:18px;fill:none;stroke:#7A3FF2;stroke-width:2.6;stroke-linecap:round;opacity:${b.s3.sp};animation:wSpin .8s linear infinite;transition:opacity .2s`)}>
                                      <path d="M12 3a9 9 0 1 0 9 9" />
                                    </svg>
                                    <span style={sx(`position:absolute;inset:0;border-radius:50%;background:#14A89E;display:flex;align-items:center;justify-content:center;opacity:${b.s3.ck};transform:scale(${b.s3.cs});transition:opacity .2s ease,transform .45s cubic-bezier(.34,1.56,.64,1)`)}>
                                      <svg viewBox="0 0 24 24" style={sx("width:12px;height:12px;fill:none;stroke:#fff;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round")}>
                                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                                      </svg>
                                    </span>
                                  </span>
                                  <span style={sx("font-size:13px;color:#22162B;white-space:nowrap")}>
                                    {"Queued for Dana, his manager"}
                                  </span>
                                  <span style={sx(`margin-left:auto;font:500 11.5px 'IBM Plex Mono',monospace;color:#5B4A66;white-space:nowrap;opacity:${b.s3.ck};transition:opacity .3s ease`)}>
                                    {"8:00 AM"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={sx(`overflow:hidden;max-height:${b.fh}px;opacity:${b.fo};transition:max-height .6s cubic-bezier(.22,1,.36,1),opacity .5s ease`)}>
                            <div style={sx("display:flex;align-items:center;gap:7px;margin-top:8px;padding:7px 10px;border-radius:12px;background:#E3F5F2;color:#0B6F69;font-size:12.5px;font-weight:600")}>
                              <svg viewBox="0 0 24 24" style={sx("width:13px;height:13px;flex:none;fill:none;stroke:#0B6F69;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round")}>
                                <rect x="5" y="11" width="14" height="9" rx="2" />
                                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                              </svg>
                              {"Receipt sealed · no account details shared"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={sx(`overflow:hidden;max-height:${a.wh}px;opacity:${a.wo};transform:translateY(${a.wy}px);transition:max-height .7s cubic-bezier(.22,1,.36,1),opacity .5s ease,transform .7s cubic-bezier(.22,1,.36,1)`)}>
                      <div style={sx("padding-bottom:10px")}>
                        <div style={sx("border-radius:24px;padding:13px 15px 14px;background:rgba(250,246,252,.96);box-shadow:0 14px 34px rgba(10,5,25,.28);color:#22162B")}>
                          <div style={sx("display:flex;align-items:center;gap:8px")}>
                            <img src="/assets/wynsley-icon.svg" alt="" style={sx("width:20px;height:20px;border-radius:5px;flex:none")} />
                            <span style={sx("font-size:11.5px;font-weight:700;letter-spacing:.04em;color:#5B4A66")}>
                              {"WYNSLEY"}
                            </span>
                            <span style={sx(`font:600 9.5px 'IBM Plex Mono',monospace;letter-spacing:.06em;padding:2px 7px;border-radius:999px;background:${a.tb};color:${a.tc};transition:background .4s,color .4s`)}>
                              {a.tag}
                            </span>
                            <span style={sx("margin-left:auto;font-size:12px;color:#5B4A66")}>
                              {a.tm}
                            </span>
                          </div>
                          <div style={sx("font:600 15.5px 'Sora',sans-serif;letter-spacing:-0.01em;margin-top:7px")}>
                            {a.title}
                          </div>
                          <div style={sx("font-size:13.5px;line-height:1.36;margin-top:3px;color:#3A2E44")}>
                            {a.body}
                          </div>
                          <div style={sx(`overflow:hidden;max-height:${a.lh}px;transition:max-height .7s cubic-bezier(.22,1,.36,1)`)}>
                            <div style={sx("margin-top:10px;padding-top:6px;border-top:1px solid rgba(34,22,43,.08)")}>
                              <div style={sx(`overflow:hidden;max-height:${a.s0.h}px;opacity:${a.s0.o};transition:max-height .5s cubic-bezier(.22,1,.36,1),opacity .4s ease`)}>
                                <div style={sx("display:flex;align-items:center;gap:9px;height:30px")}>
                                  <span style={sx("position:relative;width:18px;height:18px;flex:none")}>
                                    <svg viewBox="0 0 24 24" style={sx(`position:absolute;inset:0;width:18px;height:18px;fill:none;stroke:#7A3FF2;stroke-width:2.6;stroke-linecap:round;opacity:${a.s0.sp};animation:wSpin .8s linear infinite;transition:opacity .2s`)}>
                                      <path d="M12 3a9 9 0 1 0 9 9" />
                                    </svg>
                                    <span style={sx(`position:absolute;inset:0;border-radius:50%;background:#14A89E;display:flex;align-items:center;justify-content:center;opacity:${a.s0.ck};transform:scale(${a.s0.cs});transition:opacity .2s ease,transform .45s cubic-bezier(.34,1.56,.64,1)`)}>
                                      <svg viewBox="0 0 24 24" style={sx("width:12px;height:12px;fill:none;stroke:#fff;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round")}>
                                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                                      </svg>
                                    </span>
                                  </span>
                                  <span style={sx("font-size:13px;color:#22162B;white-space:nowrap")}>
                                    {"Found the listing"}
                                  </span>
                                  <span style={sx(`margin-left:auto;font:500 11.5px 'IBM Plex Mono',monospace;color:#5B4A66;white-space:nowrap;opacity:${a.s0.ck};transition:opacity .3s ease`)}>
                                    {"NE 15th Ave · active"}
                                  </span>
                                </div>
                              </div>
                              <div style={sx(`overflow:hidden;max-height:${a.s1.h}px;opacity:${a.s1.o};transition:max-height .5s cubic-bezier(.22,1,.36,1),opacity .4s ease`)}>
                                <div style={sx("display:flex;align-items:center;gap:9px;height:30px")}>
                                  <span style={sx("position:relative;width:18px;height:18px;flex:none")}>
                                    <svg viewBox="0 0 24 24" style={sx(`position:absolute;inset:0;width:18px;height:18px;fill:none;stroke:#7A3FF2;stroke-width:2.6;stroke-linecap:round;opacity:${a.s1.sp};animation:wSpin .8s linear infinite;transition:opacity .2s`)}>
                                      <path d="M12 3a9 9 0 1 0 9 9" />
                                    </svg>
                                    <span style={sx(`position:absolute;inset:0;border-radius:50%;background:#14A89E;display:flex;align-items:center;justify-content:center;opacity:${a.s1.ck};transform:scale(${a.s1.cs});transition:opacity .2s ease,transform .45s cubic-bezier(.34,1.56,.64,1)`)}>
                                      <svg viewBox="0 0 24 24" style={sx("width:12px;height:12px;fill:none;stroke:#fff;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round")}>
                                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                                      </svg>
                                    </span>
                                  </span>
                                  <span style={sx("font-size:13px;color:#22162B;white-space:nowrap")}>
                                    {"Checked the pet rule"}
                                  </span>
                                  <span style={sx(`margin-left:auto;font:500 11.5px 'IBM Plex Mono',monospace;color:#5B4A66;white-space:nowrap;opacity:${a.s1.ck};transition:opacity .3s ease`)}>
                                    {"1 dog ≤ 25 lb"}
                                  </span>
                                </div>
                              </div>
                              <div style={sx(`overflow:hidden;max-height:${a.s2.h}px;opacity:${a.s2.o};transition:max-height .5s cubic-bezier(.22,1,.36,1),opacity .4s ease`)}>
                                <div style={sx("display:flex;align-items:center;gap:9px;height:30px")}>
                                  <span style={sx("position:relative;width:18px;height:18px;flex:none")}>
                                    <svg viewBox="0 0 24 24" style={sx(`position:absolute;inset:0;width:18px;height:18px;fill:none;stroke:#7A3FF2;stroke-width:2.6;stroke-linecap:round;opacity:${a.s2.sp};animation:wSpin .8s linear infinite;transition:opacity .2s`)}>
                                      <path d="M12 3a9 9 0 1 0 9 9" />
                                    </svg>
                                    <span style={sx(`position:absolute;inset:0;border-radius:50%;background:#14A89E;display:flex;align-items:center;justify-content:center;opacity:${a.s2.ck};transform:scale(${a.s2.cs});transition:opacity .2s ease,transform .45s cubic-bezier(.34,1.56,.64,1)`)}>
                                      <svg viewBox="0 0 24 24" style={sx("width:12px;height:12px;fill:none;stroke:#fff;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round")}>
                                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                                      </svg>
                                    </span>
                                  </span>
                                  <span style={sx("font-size:13px;color:#22162B;white-space:nowrap")}>
                                    {"Replied as your firm's AI, in Spanish"}
                                  </span>
                                  <span style={sx(`margin-left:auto;font:500 11.5px 'IBM Plex Mono',monospace;color:#5B4A66;white-space:nowrap;opacity:${a.s2.ck};transition:opacity .3s ease`)}>
                                    {a.rt}
                                  </span>
                                </div>
                              </div>
                              <div style={sx(`overflow:hidden;max-height:${a.s3.h}px;opacity:${a.s3.o};transition:max-height .5s cubic-bezier(.22,1,.36,1),opacity .4s ease`)}>
                                <div style={sx("display:flex;align-items:center;gap:9px;height:30px")}>
                                  <span style={sx("position:relative;width:18px;height:18px;flex:none")}>
                                    <svg viewBox="0 0 24 24" style={sx(`position:absolute;inset:0;width:18px;height:18px;fill:none;stroke:#7A3FF2;stroke-width:2.6;stroke-linecap:round;opacity:${a.s3.sp};animation:wSpin .8s linear infinite;transition:opacity .2s`)}>
                                      <path d="M12 3a9 9 0 1 0 9 9" />
                                    </svg>
                                    <span style={sx(`position:absolute;inset:0;border-radius:50%;background:#14A89E;display:flex;align-items:center;justify-content:center;opacity:${a.s3.ck};transform:scale(${a.s3.cs});transition:opacity .2s ease,transform .45s cubic-bezier(.34,1.56,.64,1)`)}>
                                      <svg viewBox="0 0 24 24" style={sx("width:12px;height:12px;fill:none;stroke:#fff;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round")}>
                                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                                      </svg>
                                    </span>
                                  </span>
                                  <span style={sx("font-size:13px;color:#22162B;white-space:nowrap")}>
                                    {"She picked a tour"}
                                  </span>
                                  <span style={sx(`margin-left:auto;font:500 11.5px 'IBM Plex Mono',monospace;color:#5B4A66;white-space:nowrap;opacity:${a.s3.ck};transition:opacity .3s ease`)}>
                                    {"Sat 1:00 PM"}
                                  </span>
                                </div>
                              </div>
                              <div style={sx(`overflow:hidden;max-height:${a.s4.h}px;opacity:${a.s4.o};transition:max-height .5s cubic-bezier(.22,1,.36,1),opacity .4s ease`)}>
                                <div style={sx("display:flex;align-items:center;gap:9px;height:30px")}>
                                  <span style={sx("position:relative;width:18px;height:18px;flex:none")}>
                                    <svg viewBox="0 0 24 24" style={sx(`position:absolute;inset:0;width:18px;height:18px;fill:none;stroke:#7A3FF2;stroke-width:2.6;stroke-linecap:round;opacity:${a.s4.sp};animation:wSpin .8s linear infinite;transition:opacity .2s`)}>
                                      <path d="M12 3a9 9 0 1 0 9 9" />
                                    </svg>
                                    <span style={sx(`position:absolute;inset:0;border-radius:50%;background:#14A89E;display:flex;align-items:center;justify-content:center;opacity:${a.s4.ck};transform:scale(${a.s4.cs});transition:opacity .2s ease,transform .45s cubic-bezier(.34,1.56,.64,1)`)}>
                                      <svg viewBox="0 0 24 24" style={sx("width:12px;height:12px;fill:none;stroke:#fff;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round")}>
                                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                                      </svg>
                                    </span>
                                  </span>
                                  <span style={sx("font-size:13px;color:#22162B;white-space:nowrap")}>
                                    {"Added to Camila's calendar"}
                                  </span>
                                  <span style={sx(`margin-left:auto;font:500 11.5px 'IBM Plex Mono',monospace;color:#5B4A66;white-space:nowrap;opacity:${a.s4.ck};transition:opacity .3s ease`)}>
                                    {"confirmed"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={sx(`overflow:hidden;max-height:${a.fh}px;opacity:${a.fo};transition:max-height .6s cubic-bezier(.22,1,.36,1),opacity .5s ease`)}>
                            <div style={sx("display:flex;align-items:center;gap:7px;margin-top:8px;padding:7px 10px;border-radius:12px;background:#E3F5F2;color:#0B6F69;font-size:12.5px;font-weight:600")}>
                              <svg viewBox="0 0 24 24" style={sx("width:13px;height:13px;flex:none;fill:none;stroke:#0B6F69;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round")}>
                                <rect x="5" y="11" width="14" height="9" rx="2" />
                                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                              </svg>
                              {"Receipt sealed · reply-time guarantee met"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={sx(`position:absolute;left:12px;right:12px;top:300px;z-index:4;opacity:${s.o};transform:translateY(${s.y}px);transition:opacity .7s ease,transform .9s cubic-bezier(.22,1,.36,1)`)}>
                    <div style={sx("border-radius:26px;padding:14px 16px 16px;background:rgba(250,246,252,.96);box-shadow:0 16px 40px rgba(10,5,25,.26);color:#22162B")}>
                      <div style={sx("display:flex;align-items:center;gap:8px")}>
                        <img src="/assets/wynsley-icon.svg" alt="" style={sx("width:20px;height:20px;border-radius:5px;flex:none")} />
                        <span style={sx("font-size:11.5px;font-weight:700;letter-spacing:.04em;color:#5B4A66")}>
                          {"WYNSLEY"}
                        </span>
                        <span style={sx("font:600 9.5px 'IBM Plex Mono',monospace;letter-spacing:.06em;padding:2px 7px;border-radius:999px;background:#FFEBDD;color:#A4561E;transition:background .4s,color .4s")}>
                          {"MORNING SUMMARY"}
                        </span>
                        <span style={sx("margin-left:auto;font-size:12px;color:#5B4A66")}>
                          {"7:02 AM"}
                        </span>
                      </div>
                      <div style={sx("font:700 24px/1.1 'Sora',sans-serif;letter-spacing:-0.025em;margin-top:10px")}>
                        {"Good morning, Ana."}
                      </div>
                      <div style={sx("font-size:14px;line-height:1.4;color:#3A2E44;margin-top:4px")}>
                        {"Your firm handled 6 overnight. Every chat and email answered in under a minute."}
                      </div>
                      <div style={sx(`display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:12px;opacity:${s.st};transform:translateY(${s.sty}px);transition:opacity .6s ease,transform .7s cubic-bezier(.22,1,.36,1)`)}>
                        <div style={sx("border-radius:14px;padding:9px 10px;background:#F3ECF3")}>
                          <div style={sx("font:700 20px/1.1 'Sora',sans-serif;letter-spacing:-0.02em")}>
                            {s.n1}
                          </div>
                          <div style={sx("font-size:11.5px;color:#5B4A66;margin-top:3px")}>
                            {"handled"}
                          </div>
                        </div>
                        <div style={sx("border-radius:14px;padding:9px 10px;background:#F3ECF3")}>
                          <div style={sx("font:700 20px/1.1 'Sora',sans-serif;letter-spacing:-0.02em")}>
                            {s.n2}
                          </div>
                          <div style={sx("font-size:11.5px;color:#5B4A66;margin-top:3px")}>
                            {"tours booked"}
                          </div>
                        </div>
                        <div style={sx("border-radius:14px;padding:9px 10px;background:#F3ECF3")}>
                          <div style={sx("font:700 20px/1.1 'Sora',sans-serif;letter-spacing:-0.02em")}>
                            {"0"}
                          </div>
                          <div style={sx("font-size:11.5px;color:#5B4A66;margin-top:3px")}>
                            {"missed"}
                          </div>
                        </div>
                      </div>
                      <div style={sx(`overflow:hidden;max-height:${s.nh}px;opacity:${s.no};transition:max-height .7s cubic-bezier(.22,1,.36,1),opacity .5s ease`)}>
                        <div style={sx("margin-top:10px;border-radius:18px;padding:12px;background:#fff;box-shadow:0 1px 0 rgba(34,22,43,.05)")}>
                          <span style={sx("font:600 9.5px 'IBM Plex Mono',monospace;letter-spacing:.06em;padding:2px 7px;border-radius:999px;background:#FFE4DE;color:#B4372A")}>
                            {"NEEDS YOU · 1"}
                          </span>
                          <div style={sx("font:600 15px 'Sora',sans-serif;margin-top:8px")}>
                            {"Greg W. wants to sell"}
                          </div>
                          <div style={sx("font-size:13px;line-height:1.38;color:#3A2E44;margin-top:3px")}>
                            {"He rented, then bought with you. Camila's reply is drafted."}
                          </div>
                          <div style={sx("display:grid;margin-top:10px")}>
                            <div style={sx(`grid-area:1/1;display:flex;gap:8px;opacity:${s.bo};transition:opacity .35s ease`)}>
                              <div style={sx("position:relative;flex:1;height:42px")}>
                                <div style={sx(`position:absolute;inset:0;border-radius:13px;overflow:hidden;background:linear-gradient(90deg,#FF6B5B,#FF9F1C);display:flex;align-items:center;justify-content:center;font:600 14.5px 'Sora',sans-serif;color:#1D1B19;transform:scale(${s.bp});transition:transform .18s ease`)}>
                                  {"Send"}
                                  <span style={sx(`position:absolute;left:50%;top:50%;width:60px;height:60px;margin:-30px 0 0 -30px;border-radius:50%;background:rgba(255,255,255,.6);opacity:${s.ro};transform:scale(${s.rs});transition:${s.rt}`)} />
                                </div>
                                <span style={sx(`position:absolute;left:50%;top:50%;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:rgba(255,255,255,.45);border:1.5px solid rgba(255,255,255,.95);box-shadow:0 6px 18px rgba(30,10,40,.25);opacity:${s.fo};transform:scale(${s.fs});transition:opacity .35s ease,transform .3s cubic-bezier(.22,1,.36,1);pointer-events:none`)} />
                              </div>
                              <div style={sx("width:84px;height:42px;box-sizing:border-box;border-radius:13px;border:1.5px solid rgba(34,22,43,.14);display:flex;align-items:center;justify-content:center;font:600 14.5px 'Sora',sans-serif")}>
                                {"Edit"}
                              </div>
                            </div>
                            <div style={sx(`grid-area:1/1;display:flex;align-items:center;gap:8px;height:42px;padding:0 12px;border-radius:13px;background:#E3F5F2;color:#0B6F69;font-size:13.5px;font-weight:600;opacity:${s.so};transform:translateY(${s.soy}px);transition:opacity .4s ease,transform .5s cubic-bezier(.22,1,.36,1)`)}>
                              <svg viewBox="0 0 24 24" style={sx("width:15px;height:15px;fill:none;stroke:#0B6F69;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round")}>
                                <path d="M5 12.5l4.5 4.5L19 7.5" />
                              </svg>
                              {"Sent. Camila takes it from here."}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={sx(`overflow:hidden;max-height:${s.fh}px;opacity:${s.fo2};transition:max-height .6s cubic-bezier(.22,1,.36,1),opacity .5s ease`)}>
                        <div style={sx("display:flex;align-items:center;gap:8px;margin-top:12px;font-size:13.5px;color:#22162B")}>
                          <span style={sx("width:22px;height:22px;border-radius:50%;background:#14A89E;display:flex;align-items:center;justify-content:center;flex:none")}>
                            <svg viewBox="0 0 24 24" style={sx("width:13px;height:13px;fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round")}>
                              <path d="M5 12.5l4.5 4.5L19 7.5" />
                            </svg>
                          </span>
                          <b style={sx("font-weight:600")}>
                            {"All clear."}
                          </b>
                          <span style={sx("color:#5B4A66")}>
                            {"Nothing waited."}
                          </span>
                          <span style={sx("margin-left:auto;display:inline-flex;align-items:center;gap:5px;font:500 11px 'IBM Plex Mono',monospace;color:#5B4A66")}>
                            <svg viewBox="0 0 24 24" style={sx("width:13px;height:13px;flex:none;fill:none;stroke:#5B4A66;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round")}>
                              <rect x="5" y="11" width="14" height="9" rx="2" />
                              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                            </svg>
                            {"6 receipts"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={sx(`position:absolute;inset:0;z-index:5;background:#05030C;opacity:${dim};transition:opacity .6s ease;pointer-events:none`)} />
                  {" "}
                  <div style={sx("position:absolute;left:50%;bottom:8px;width:136px;height:5px;margin-left:-68px;border-radius:3px;background:#fff;opacity:.85;z-index:30")} />
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </FitBox>
            {" "}
          </div>
          {" "}
        </div>
        <div aria-hidden="true" style={sx("position:absolute;left:0;right:0;bottom:0;height:150px;background:linear-gradient(180deg,rgba(29,27,25,0),#1D1B19 92%);pointer-events:none;z-index:0")} />
      </section>
      </>
    );
  }
}
