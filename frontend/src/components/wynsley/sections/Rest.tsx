"use client";

import React from "react";
import { sx } from "@/lib/sx";
import WynLogo from "@/components/wynsley/WynLogo";
import ImageSlot from "@/components/wynsley/ImageSlot";
import HowStarts from "./HowStarts";
import "./Rest.css";

declare global {
  interface Window {
    WyOpenApp?: (route: string) => void;
  }
}

/*
 * Ported from the Claude Design component V3Rest.dc.html.
 * Markup and inline styles are carried over verbatim; logic is ported from its DCLogic class.
 * Design props: none
 */
export default class Rest extends React.Component<any, any> {
  // by/byLong (the "results by" date) are computed on submit, never during render,
  // so server prerender never touches Date.
  state: any = { faq: 0, name: '', email: '', site: '', need: 3, size: 1, sent: false, by: '', byLong: '' };
  renderVals() {
    const S = this.state;
    const FAQ: [string, string][] = [
      ['How long does setup take?', 'A day for new inquiries. Your part is a one-hour kickoff. We do the rest.'],
      ['Do replies go out on their own?', 'Only if you want. Auto-send, review the first week, or approve every reply. Change it any time.'],
      ["Will customers know they're talking to an AI?", "Yes. It says so in its first message, in your firm's name, and a person is one reply away."],
      ['What if it doesn’t know the answer?', "It doesn't guess. It only uses facts you approved. Anything else goes to an agent."],
      ['Do we have to move our data ourselves?', 'No. We bring it over for you, with a receipt for every row and 30 days to undo.'],
      ['Do we have to switch our property software?', 'No. We connect to it. Rent money never passes through us.'],
      ['Can we leave?', 'Yes. Stop at day 30 or 60 of the pilot, then it’s month to month. Your data, site and domain stay yours.'],
    ];
    const NEEDS = ['Website & Google', 'Inquiry replies', 'Rentals & owners', 'All of it'];
    const SIZES = ['1–4', '5–15', '16–50', '50+'];
    const chip = (on: boolean, go: () => void, t: string, i: number) => ({ key: i, t, on: on ? 'true' as const : 'false' as const, bg: on ? '#1D1B19' : '#fff', c: on ? '#F3EFE6' : '#1D1B19', bd: on ? '#1D1B19' : '#D6CDBE', go });
    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ [k]: e.target.value });
    return {
      faq: FAQ.map(([q, a], i) => ({ key: i, q, a, h: S.faq === i ? 260 : 0, o: S.faq === i ? 1 : 0, rot: S.faq === i ? 45 : 0, toggle: () => this.setState((s: any) => ({ faq: s.faq === i ? -1 : i })) })),
      needs: NEEDS.map((t, i) => chip(S.need === i, () => this.setState({ need: i }), t, i)),
      sizes: SIZES.map((t, i) => chip(S.size === i, () => this.setState({ size: i }), t, i)),
      f: { name: S.name, email: S.email, site: S.site }, on: { name: set('name'), email: set('email'), site: set('site') }, done: (() => { const first = (S.name || '').trim().split(/\s+/)[0]; const site = (S.site || '').trim().replace(/^https?:\/\//, '').replace(/\/$/, ''); return { hi: first ? "You're in, " + first + '.' : "You're in.", email: (S.email || '').trim() || 'your inbox', site: site || 'your site', greet: first ? 'Hi ' + first + ',' : 'Hi there,', by: S.by as string, byLong: S.byLong as string }; })(),
      openInvite: () => { if (typeof window !== 'undefined' && window.WyOpenApp) window.WyOpenApp('console:invite'); },
      openLogin: (e: React.MouseEvent) => { if (e && e.preventDefault) e.preventDefault(); if (typeof window !== 'undefined' && window.WyOpenApp) window.WyOpenApp('console:login'); },
      open: !S.sent, sent: S.sent, thanksName: S.name ? ', ' + S.name.split(' ')[0] : '',
      submit: (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const by = new Date(Date.now() + 7 * 864e5);
        this.setState({
          sent: true,
          by: by.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase(),
          byLong: by.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
        });
      },
      reset: () => this.setState({ sent: false, name: '', email: '', site: '' }),
    };
  }

  render() {
    const { done, f, faq, needs, on, open, openInvite, openLogin, reset, sent, sizes, submit } = this.renderVals();
    return (
      <>
      <div style={sx("font-family:'Instrument Sans',system-ui,sans-serif;color:#1D1B19")}>
        <div className="sc-host">
          <HowStarts />
        </div>
        <section id="pricing" style={sx("background:#1D1B19;color:#F3EFE6;padding:clamp(64px,9vh,104px) clamp(20px,5vw,80px)")}>
          {" "}
          <div style={sx("max-width:1180px;margin:0 auto;display:flex;flex-wrap:wrap;gap:clamp(40px,6vw,96px);align-items:center")}>
            {" "}
            <div className="stk" style={sx("flex:1 1 360px;max-width:520px")}>
              {" "}
              <div style={sx("font:500 12px 'IBM Plex Mono',monospace;letter-spacing:.16em;color:#FF9F6B")}>
                {"PRICING"}
              </div>
              {" "}
              <h2 style={sx("margin:16px 0 0;font:600 clamp(36px,4.4vw,58px)/1.04 'Sora',sans-serif;letter-spacing:-0.04em;text-wrap:balance")}>
                {"One flat price for the "}
                <em style={sx("font-family:'Newsreader',Georgia,serif;font-style:italic;font-weight:400;letter-spacing:-0.01em;color:#FF9F6B")}>
                  {"whole firm."}
                </em>
              </h2>
              {" "}
              <p style={sx("margin:20px 0 0;font-size:18px;line-height:1.6;color:#D6CEC0")}>
                {"Not per lead, not per tour, not per deal. All six modules included, run for you."}
              </p>
              {" "}
              <div style={sx("margin-top:28px;padding:20px 0;border-top:1px solid rgba(243,239,230,.16);border-bottom:1px solid rgba(243,239,230,.16);font-size:16px;line-height:1.6;color:#F3EFE6")}>
                <b>
                  {"Reply-time guarantee."}
                </b>
                {" "}
                <span style={sx("color:#D6CEC0")}>
                  {"If we miss our reply-time promise, you get a credit on your bill. [GUARANTEE TERMS]"}
                </span>
              </div>
              {" "}
            </div>
            {" "}
            <div className="stk" style={sx("flex:1 1 380px;max-width:520px;border-radius:12px;background:#F3EFE6;color:#1D1B19;padding:clamp(28px,4vw,44px)")}>
              {" "}
              <div style={sx("display:flex;align-items:baseline;justify-content:space-between;gap:12px")}>
                <span style={sx("font:600 16px 'Sora',sans-serif")}>
                  {"90-day pilot"}
                </span>
                <span style={sx("font:500 12px 'IBM Plex Mono',monospace;color:#6E665C")}>
                  {"THEN MONTH TO MONTH"}
                </span>
              </div>
              {" "}
              <div style={sx("margin-top:14px;font:600 clamp(40px,4.2vw,54px)/1 'Sora',sans-serif;letter-spacing:-0.04em")}>
                {"$750"}
                <span style={sx("font-size:.4em;font-weight:500;letter-spacing:0;color:#6E665C")}>
                  {"/mo for 90 days"}
                </span>
              </div>
              {" "}
              <div style={sx("margin-top:10px;font-size:16px;color:#6E665C")}>
                {"then "}
                <b style={sx("color:#1D1B19")}>
                  {"$995 a month"}
                </b>
                {", flat per firm, up to 10 agents"}
              </div>
              <div style={sx("margin-top:6px;font-size:14px;color:#6E665C")}>
                {"Bigger team? 11–30 agents from $1,250 a month."}
              </div>
              {" "}
              <div style={sx("display:flex;flex-direction:column;gap:12px;margin-top:26px;padding-top:22px;border-top:1px solid #DDD5C7;font-size:16px")}>
                {" "}
                <span style={sx("display:flex;gap:12px")}>
                  <svg viewBox="0 0 24 24" style={sx("width:20px;height:20px;flex:none;fill:none;stroke:#1D1B19;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round")}>
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {"All six modules, set up and run by us (AI phone answering is an add-on)"}
                </span>
                {" "}
                <span style={sx("display:flex;gap:12px")}>
                  <svg viewBox="0 0 24 24" style={sx("width:20px;height:20px;flex:none;fill:none;stroke:#1D1B19;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round")}>
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {"Unlimited logins for your whole team"}
                </span>
                {" "}
                <span style={sx("display:flex;gap:12px")}>
                  <svg viewBox="0 0 24 24" style={sx("width:20px;height:20px;flex:none;fill:none;stroke:#1D1B19;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round")}>
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {"No set-up fee, and no bill before you go live"}
                </span>
                {" "}
                <span style={sx("display:flex;gap:12px")}>
                  <svg viewBox="0 0 24 24" style={sx("width:20px;height:20px;flex:none;fill:none;stroke:#1D1B19;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round")}>
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {"Your data, site and domain stay yours"}
                </span>
                {" "}
                <span style={sx("display:flex;gap:12px")}>
                  <svg viewBox="0 0 24 24" style={sx("width:20px;height:20px;flex:none;fill:none;stroke:#1D1B19;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round")}>
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {"Leave at day 30 or day 60 if it isn't working"}
                </span>
                {" "}
              </div>
              {" "}
              <a className="rest-ho1" href="#contact" style={sx("margin-top:30px;display:flex;align-items:center;justify-content:center;gap:10px;height:56px;border-radius:10px;background:linear-gradient(90deg,#FF6B5B,#FF9F1C);color:#1D1B19;font:600 16.5px 'Sora',sans-serif;text-decoration:none")}>
                {"See what you missed"}
                <span>
                  {"→"}
                </span>
              </a>
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section id="faq" style={sx("background:#F3EFE6;padding:clamp(88px,12vh,140px) clamp(20px,5vw,80px)")}>
          {" "}
          <div style={sx("max-width:1180px;margin:0 auto;display:flex;flex-wrap:wrap;gap:clamp(32px,6vw,96px)")}>
            {" "}
            <div className="stk" style={sx("flex:1 1 300px;max-width:380px")}>
              {" "}
              <div style={sx("font:500 12px 'IBM Plex Mono',monospace;letter-spacing:.16em;color:#D9542F")}>
                {"QUESTIONS"}
              </div>
              {" "}
              <h2 style={sx("margin:16px 0 0;font:600 clamp(34px,4vw,52px)/1.06 'Sora',sans-serif;letter-spacing:-0.04em;text-wrap:balance")}>
                {"What brokers "}
                <em style={sx("font-family:'Newsreader',Georgia,serif;font-style:italic;font-weight:400;letter-spacing:-0.01em;color:#D9542F")}>
                  {"ask us first."}
                </em>
              </h2>
              {" "}
            </div>
            {" "}
            <div style={sx("flex:2 1 480px;border-top:1px solid #1D1B19")}>
              {" "}
              {(faq || []).map((f: any, $index: number) => (
                <React.Fragment key={f?.key ?? $index}>
                  {" "}
                  <div style={sx("border-bottom:1px solid #DDD5C7")}>
                    {" "}
                    <button onClick={f.toggle} style={sx("width:100%;display:flex;align-items:center;gap:16px;padding:24px 0;border:0;background:transparent;cursor:pointer;text-align:left;color:#1D1B19;font:600 clamp(17px,1.5vw,19px)/1.35 'Sora',sans-serif")}>
                      <span style={sx("flex:1")}>
                        {f.q}
                      </span>
                      <svg viewBox="0 0 24 24" style={sx(`width:20px;height:20px;flex:none;fill:none;stroke:#D9542F;stroke-width:2;stroke-linecap:round;transform:rotate(${f.rot}deg);transition:transform .35s cubic-bezier(.22,1,.36,1)`)}>
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                    {" "}
                    <div style={sx(`overflow:hidden;max-height:${f.h}px;opacity:${f.o};transition:max-height .5s cubic-bezier(.22,1,.36,1),opacity .35s ease`)}>
                      <p style={sx("margin:0;padding:0 44px 24px 0;font-size:16.5px;line-height:1.65;color:#5A5249")}>
                        {f.a}
                      </p>
                    </div>
                    {" "}
                  </div>
                  {" "}
                </React.Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section id="contact" style={sx("position:relative;overflow:hidden;background:#1D1B19;color:#F3EFE6;padding:clamp(64px,9vh,104px) clamp(20px,5vw,80px)")}>
          {" "}
          <img src="/assets/palm-b.svg" alt="" style={sx("position:absolute;right:-160px;bottom:-120px;width:420px;aspect-ratio:1/2;opacity:.07;filter:invert(1)")} />
          {" "}
          <div style={sx("position:relative;max-width:1180px;margin:0 auto;display:flex;flex-wrap:wrap;gap:clamp(40px,6vw,96px);align-items:center")}>
            {" "}
            <div className="stk" style={sx("flex:1 1 360px;max-width:500px")}>
              {" "}
              <div style={sx("font:500 12px 'IBM Plex Mono',monospace;letter-spacing:.16em;color:#FF9F6B")}>
                {"FREE CHECK"}
              </div>
              {" "}
              <h2 style={sx("margin:16px 0 0;font:600 clamp(36px,4.4vw,60px)/1.04 'Sora',sans-serif;letter-spacing:-0.04em;text-wrap:balance")}>
                {"Start with a "}
                <em style={sx("font-family:'Newsreader',Georgia,serif;font-style:italic;font-weight:400;letter-spacing:-0.01em;color:#FF9F6B")}>
                  {"free check."}
                </em>
              </h2>
              {" "}
              <p style={sx("margin:18px 0 0;max-width:440px;font-size:18px;line-height:1.55;color:#D6CEC0")}>
                {"We test your website, Google profile and after-hours replies. Results in a week."}
              </p>
              {" "}
              <div style={sx("display:flex;align-items:center;gap:14px;margin-top:32px;padding-top:24px;border-top:1px solid rgba(243,239,230,.12)")}>
                <div style={sx("width:52px;height:52px;flex:none;border-radius:50%;overflow:hidden;background:#2A2623")}>
                  <ImageSlot id="madhav-photo" shape="circle" placeholder="Maddy's photo" style={sx("display:block;width:52px;height:52px")} />
                </div>
                <div>
                  <div style={sx("font-size:16px;font-weight:600;line-height:1.35;color:#F3EFE6")}>
                    {"Maddy · Setup and support"}
                  </div>
                  <div style={sx("margin-top:3px;font-size:13.5px;color:#A39A8C")}>
                    {"One person from your check to go-live. "}
                    <a className="rest-ho2" href="mailto:hello@wynsley.com" style={sx("color:#D6CEC0;text-decoration:underline;text-decoration-color:rgba(214,206,192,.4);text-underline-offset:3px")}>
                      {"hello@wynsley.com"}
                    </a>
                  </div>
                </div>
              </div>
              {" "}
            </div>
            {" "}
            <div className="stk" style={sx("flex:1 1 380px;max-width:560px;border-radius:16px;background:#F3EFE6;color:#1D1B19;padding:clamp(24px,3vw,34px)")}>
              {" "}
              {open ? (
                <>
                  {" "}
                  <form className="cf-grid" onSubmit={submit} style={sx("display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px")}>
                    {" "}
                    <label style={sx("display:flex;flex-direction:column;gap:7px;font-size:13.5px;font-weight:600")}>
                      {"Your name"}
                      <input className="rest-fo3" value={f.name} onChange={on.name} required autoComplete="name" style={sx("height:44px;padding:0 14px;border-radius:8px;border:1px solid #D6CDBE;background:#fff;font:500 16px 'Instrument Sans',sans-serif;color:#1D1B19;outline:none")} />
                    </label>
                    {" "}
                    <label style={sx("display:flex;flex-direction:column;gap:7px;font-size:13.5px;font-weight:600")}>
                      {"Work email"}
                      <input className="rest-fo4" type="email" value={f.email} onChange={on.email} required autoComplete="email" style={sx("height:44px;padding:0 14px;border-radius:8px;border:1px solid #D6CDBE;background:#fff;font:500 16px 'Instrument Sans',sans-serif;color:#1D1B19;outline:none")} />
                    </label>
                    {" "}
                    <label style={sx("grid-column:1/-1;display:flex;flex-direction:column;gap:7px;font-size:13.5px;font-weight:600")}>
                      {"Your firm's website"}
                      <input className="rest-fo5" value={f.site} onChange={on.site} required placeholder="yourfirm.com" style={sx("height:44px;padding:0 14px;border-radius:8px;border:1px solid #D6CDBE;background:#fff;font:500 16px 'Instrument Sans',sans-serif;color:#1D1B19;outline:none")} />
                    </label>
                    {" "}
                    <div style={sx("grid-column:1/-1")}>
                      <div style={sx("font-size:13.5px;font-weight:600")}>
                        {"How many agents?"}
                      </div>
                      <div style={sx("display:flex;flex-wrap:wrap;gap:6px;margin-top:8px")}>
                        {(sizes || []).map((n: any, $index: number) => (
                          <React.Fragment key={n?.key ?? $index}>
                            <button type="button" aria-pressed={n.on} onClick={n.go} style={sx(`height:36px;padding:0 12px;border-radius:8px;border:1px solid ${n.bd};background:${n.bg};color:${n.c};font:600 14px 'Instrument Sans',sans-serif;cursor:pointer;transition:background .15s,color .15s`)}>
                              {n.t}
                            </button>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    {" "}
                    <div style={sx("grid-column:1/-1")}>
                      <div style={sx("font-size:13.5px;font-weight:600")}>
                        {"What should we look at first?"}
                      </div>
                      <div style={sx("display:flex;flex-wrap:wrap;gap:6px;margin-top:8px")}>
                        {(needs || []).map((n: any, $index: number) => (
                          <React.Fragment key={n?.key ?? $index}>
                            <button type="button" aria-pressed={n.on} onClick={n.go} style={sx(`height:36px;padding:0 12px;border-radius:8px;border:1px solid ${n.bd};background:${n.bg};color:${n.c};font:600 14px 'Instrument Sans',sans-serif;cursor:pointer;transition:background .15s,color .15s`)}>
                              {n.t}
                            </button>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    {" "}
                    <button className="rest-ho6" type="submit" style={sx("grid-column:1/-1;margin-top:4px;height:52px;border:0;border-radius:10px;background:#1D1B19;color:#F3EFE6;font:600 16.5px 'Sora',sans-serif;cursor:pointer")}>
                      {"Start my free check →"}
                    </button>
                    {" "}
                    <div style={sx("grid-column:1/-1;font-size:13.5px;line-height:1.5;color:#6E665C")}>
                      {"Results by email within a week. No pressure."}
                    </div>
                    {" "}
                    <div style={sx("grid-column:1/-1;display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;margin-top:0;padding-top:14px;border-top:1px solid #E0D8CA;font-size:14.5px;color:#3A342E")}>
                      {"Rather talk?"}
                      <a className="rest-ho7" href="#booking-link" title="[BOOKING LINK]" style={sx("font-weight:600;color:#B45234;text-decoration:none")}>
                        {"Book a 15-minute call →"}
                      </a>
                      <span style={sx("flex:1")} />
                      <a href="#signin" onClick={openLogin} style={sx("font-size:14px;color:#6E665C;text-decoration:underline;text-underline-offset:3px")}>
                        {"Already a client? Sign in"}
                      </a>
                    </div>
                    {" "}
                  </form>
                  {" "}
                </>
              ) : null}
              {" "}
              {sent ? (
                <>
                  {" "}
                  <div style={sx("display:flex;flex-direction:column;gap:20px;animation:wUp .6s cubic-bezier(.22,1,.36,1) both")} role="status">
                    {" "}
                    <div style={sx("display:flex;align-items:center;gap:14px")}>
                      <span style={sx("width:44px;height:44px;flex:none;border-radius:50%;background:#14A89E;display:flex;align-items:center;justify-content:center")}>
                        <svg viewBox="0 0 24 24" style={sx("width:22px;height:22px;fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round")}>
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      </span>
                      <div style={sx("font:600 26px/1.15 'Sora',sans-serif;letter-spacing:-0.02em;color:#1D1B19")}>
                        {done.hi}
                      </div>
                    </div>
                    {" "}
                    <div style={sx("display:flex;flex-direction:column;border-bottom:1px solid #E0D8CA")}>
                      <div style={sx("display:grid;grid-template-columns:118px minmax(0,1fr);gap:12px;padding:12px 0;border-top:1px solid #E0D8CA")}>
                        <span style={sx("font:600 11.5px/1.6 'IBM Plex Mono',monospace;letter-spacing:.06em;color:#B45234")}>
                          {"NOW"}
                        </span>
                        <span style={sx("font-size:15px;line-height:1.5;color:#3A342E")}>
                          {"Confirmation sent to "}
                          <b style={sx("font-weight:600;color:#1D1B19")}>
                            {done.email}
                          </b>
                          {"."}
                        </span>
                      </div>
                      <div style={sx("display:grid;grid-template-columns:118px minmax(0,1fr);gap:12px;padding:12px 0;border-top:1px solid #E0D8CA")}>
                        <span style={sx("font:600 11.5px/1.6 'IBM Plex Mono',monospace;letter-spacing:.06em;color:#B45234")}>
                          {"THIS WEEK"}
                        </span>
                        <span style={sx("font-size:15px;line-height:1.5;color:#3A342E")}>
                          {"We check your site and Google profile, and time one unannounced test inquiry after hours."}
                        </span>
                      </div>
                      <div style={sx("display:grid;grid-template-columns:118px minmax(0,1fr);gap:12px;padding:12px 0;border-top:1px solid #E0D8CA")}>
                        <span style={sx("font:600 11.5px/1.6 'IBM Plex Mono',monospace;letter-spacing:.06em;color:#B45234")}>
                          {"BY "}{done.by}
                        </span>
                        <span style={sx("font-size:15px;line-height:1.5;color:#3A342E")}>
                          {"Maddy emails you what we found. No pressure."}
                        </span>
                      </div>
                    </div>
                    {" "}
                    <div style={sx("border-radius:14px;background:#fff;border:1px solid #E0D8CA;box-shadow:0 10px 30px rgba(40,30,20,.08);overflow:hidden")}>
                      {" "}
                      <div style={sx("display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid #EFE9DF;font-size:13px")}>
                        <span style={sx("width:30px;height:30px;flex:none;border-radius:50%;background:#1D1B19;color:#F3EFE6;font:600 13px 'Sora',sans-serif;display:flex;align-items:center;justify-content:center")}>
                          {"M"}
                        </span>
                        <div style={sx("min-width:0")}>
                          <div style={sx("font-weight:600;color:#1D1B19")}>
                            {"Maddy at Wynsley "}
                            <span style={sx("font-weight:400;color:#6E665C")}>
                              {"hello@wynsley.com"}
                            </span>
                          </div>
                          <div style={sx("color:#6E665C;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>
                            {"To: "}{done.email}
                          </div>
                        </div>
                        <span style={sx("margin-left:auto;font:500 11px 'IBM Plex Mono',monospace;color:#6E665C;white-space:nowrap")}>
                          {"JUST NOW"}
                        </span>
                      </div>
                      {" "}
                      <div style={sx("padding:14px 16px 16px;font-size:14px;line-height:1.55;color:#3A342E")}>
                        {" "}
                        <div style={sx("font-weight:600;color:#1D1B19")}>
                          {"Your free check for "}{done.site}{" has started"}
                        </div>
                        {" "}
                        <p style={sx("margin:10px 0 0")}>
                          {done.greet}
                        </p>
                        {" "}
                        <p style={sx("margin:8px 0 0")}>
                          {"Thanks for asking us to look at "}{done.site}{". This week we'll check your site and Google profile, and time one unannounced test inquiry after hours."}
                        </p>
                        {" "}
                        <p style={sx("margin:8px 0 0")}>
                          {"You'll get one email with what we find by "}{done.byLong}{". No pressure."}
                        </p>
                        {" "}
                        <p style={sx("margin:8px 0 0")}>
                          {"Rather talk sooner? "}
                          <a href="#booking-link" title="[BOOKING LINK]" style={sx("color:#B45234;font-weight:600;text-decoration:none")}>
                            {"Book a 15-minute call"}
                          </a>
                          {"."}
                        </p>
                        {" "}
                        <p style={sx("margin:12px 0 0;color:#1D1B19")}>
                          {"Maddy"}
                          <br />
                          <span style={sx("color:#6E665C")}>
                            {"Setup and support, Wynsley"}
                          </span>
                        </p>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <div style={sx("display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:12px;background:#1D1B19;color:#F3EFE6")}>
                      <div style={sx("flex:1;font-size:14px;line-height:1.45")}>
                        <b style={sx("font-weight:600")}>
                          {"If you say yes,"}
                        </b>
                        {" Maddy sets up your firm and emails you an invite. No sign-up forms."}
                      </div>
                      <button onClick={openInvite} style={sx("border:0;border-radius:8px;background:#F3EFE6;color:#1D1B19;font:600 13px 'Sora',sans-serif;padding:9px 12px;cursor:pointer;white-space:nowrap")}>
                        {"Preview it →"}
                      </button>
                    </div>
                    {" "}
                    <button className="rest-ho8" onClick={reset} style={sx("align-self:flex-start;border:0;padding:0;background:transparent;color:#B45234;font:600 15px 'Sora',sans-serif;cursor:pointer")}>
                      {"Send another →"}
                    </button>
                    {" "}
                  </div>
                  {" "}
                </>
              ) : null}
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <footer style={sx("background:#1D1B19;border-top:1px solid rgba(243,239,230,.1);color:#D6CEC0;padding:48px clamp(20px,5vw,80px)")}>
          {" "}
          <div style={sx("max-width:1180px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px")}>
            {" "}
            <a href="#top" aria-label="Wynsley home" style={sx("display:flex;align-items:center")}>
              <WynLogo tone="paper" size={118} />
            </a>
            {" "}
            <div style={sx("display:flex;flex-wrap:wrap;gap:24px;font-size:14px")}>
              <a href="#product" style={sx("color:#D6CEC0")}>
                {"Product"}
              </a>
              <a href="#how" style={sx("color:#D6CEC0")}>
                {"How it starts"}
              </a>
              <a href="#pricing" style={sx("color:#D6CEC0")}>
                {"Pricing"}
              </a>
              <a href="#faq" style={sx("color:#D6CEC0")}>
                {"Questions"}
              </a>
              <a href="#contact" style={sx("color:#D6CEC0")}>
                {"Contact"}
              </a>
            </div>
            {" "}
            <span style={sx("font-size:13px;color:#8C8478")}>
              {"© 2026 Wynsley · Built for real estate firms"}
            </span>
            {" "}
          </div>
        </footer>
      </div>
      </>
    );
  }
}
