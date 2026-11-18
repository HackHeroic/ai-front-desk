"use client";

import React from "react";
import { sx } from "@/lib/sx";
import WynLogo from "@/components/wynsley/WynLogo";
import HeroGold from "@/components/wynsley/sections/HeroGold";
import Problem from "@/components/wynsley/sections/Problem";
import Product from "@/components/wynsley/sections/Product";
import Rest from "@/components/wynsley/sections/Rest";
import { loadPrototype, type WyProtoApi } from "@/prototype/load";
import "./Landing.css";

/*
 * The Wynsley landing page, ported from the Claude Design page "Wynsley Landing v4".
 * Sections: golden-hour hero, Today (five vendors), Product (one partner runs all six),
 * How it starts, Pricing, Questions, Free check, footer. "Sign in" and the contact
 * form's "Preview it" open the product prototype full screen over the page.
 */

declare global {
  interface Window {
    WyOpenApp?: (route: string) => void;
  }
}

type State = { sc: boolean; w: number; appOpen: boolean };

export default class Landing extends React.Component<Record<string, never>, State> {
  state: State = { sc: false, w: 1440, appOpen: false };
  route = "console:login";
  appEl: HTMLDivElement | null = null;
  onS?: () => void;
  onR?: () => void;

  openApp = (route?: string) => {
    this.route = route || "console:login";
    this.setState({ appOpen: true });
  };

  openLogin = (e?: React.MouseEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    this.openApp("console:login");
  };

  appRef = (el: HTMLDivElement | null) => {
    if (!el) return;
    this.appEl = el;
    loadPrototype().then((W: WyProtoApi) => {
      const box = el as HTMLDivElement & { __wy?: number };
      if (box.__wy || !box.isConnected) return;
      box.__wy = 1;
      W.exit = (hash?: string) => {
        this.setState({ appOpen: false });
        document.body.style.overflow = "";
        if (hash)
          setTimeout(() => {
            const t = document.getElementById(hash);
            if (t) t.scrollIntoView({ behavior: "smooth" });
          }, 80);
      };
      const [s, ...r] = this.route.split(":");
      W.S.surface = s;
      W.S.route = r.join(":") || W.S.route;
      W.S.hist = [];
      W.mount(box);
      if (box.parentElement) box.parentElement.scrollTop = 0;
      document.body.style.overflow = "hidden";
    });
  };

  componentDidMount() {
    window.WyOpenApp = (r: string) => this.openApp(r);
    this.onS = () => {
      const sc = window.scrollY > 40;
      if (sc !== this.state.sc) this.setState({ sc });
    };
    this.onR = () => {
      if (window.innerWidth !== this.state.w) this.setState({ w: window.innerWidth });
    };
    window.addEventListener("scroll", this.onS, { passive: true });
    window.addEventListener("resize", this.onR);
    this.onS();
    this.onR();
  }

  componentWillUnmount() {
    if (this.onS) window.removeEventListener("scroll", this.onS);
    if (this.onR) window.removeEventListener("resize", this.onR);
    if (window.WyOpenApp) delete window.WyOpenApp;
  }

  render() {
    const S = this.state;
    const nav = {
      bg: S.sc ? "rgba(29,27,25,.96)" : "rgba(29,27,25,0)",
      bd: S.sc ? "rgba(243,239,230,.1)" : "rgba(243,239,230,0)",
      links: S.w >= 960,
    };
    return (
      <>
        <header
          style={sx(
            `position:fixed;left:0;right:0;top:0;z-index:50;background:${nav.bg};border-bottom:1px solid ${nav.bd};transition:background .4s ease,border-color .4s ease`,
          )}
        >
          <div
            style={sx(
              "max-width:calc(1180px + 2 * clamp(20px,5vw,80px));box-sizing:border-box;margin:0 auto;height:72px;display:flex;align-items:center;gap:40px;padding:0 clamp(20px,5vw,80px)",
            )}
          >
            <a href="#top" aria-label="Wynsley home" style={sx("display:flex;align-items:center")}>
              <WynLogo tone="paper" size={120} />
            </a>
            {nav.links ? (
              <>
                <nav style={sx("display:flex;gap:30px;font-size:15px;font-weight:500")}>
                  <a href="#product" style={sx("color:#F3EFE6;white-space:nowrap")}>Product</a>
                  <a href="#how" style={sx("color:#F3EFE6;white-space:nowrap")}>How it starts</a>
                  <a href="#pricing" style={sx("color:#F3EFE6;white-space:nowrap")}>Pricing</a>
                  <a href="#faq" style={sx("color:#F3EFE6;white-space:nowrap")}>Questions</a>
                </nav>
              </>
            ) : null}
            <a
              href="#signin"
              onClick={this.openLogin}
              className="nav-signin"
              style={sx("margin-left:auto;color:#F3EFE6;font-weight:500;font-size:15px;white-space:nowrap;text-decoration:none")}
            >
              Sign in
            </a>
            <a
              href="#contact"
              className="nav-cta lp-ho1"
              style={sx(
                "display:inline-flex;align-items:center;height:44px;padding:0 18px;border-radius:10px;background:linear-gradient(90deg,#FF6B5B,#FF9F1C);color:#1D1B19;font:600 15px 'Sora',sans-serif;white-space:nowrap",
              )}
            >
              <span className="nav-long">See what you missed</span>
              <span className="nav-short">Free check</span>
            </a>
          </div>
        </header>
        <div id="top"></div>
        <div className="sc-host" style={sx("position:relative")}>
          <HeroGold />
        </div>
        <div className="sc-host">
          <Problem topTone="ink" />
        </div>
        <div className="sc-host">
          <Product />
        </div>
        <div className="sc-host" style={sx("position:relative")}>
          <Rest />
        </div>
        {S.appOpen ? (
          <div style={sx("position:fixed;inset:0;z-index:300;overflow:auto;background:#E9E4DA")}>
            <div ref={this.appRef} style={sx("min-height:100%")}></div>
          </div>
        ) : null}
      </>
    );
  }
}
