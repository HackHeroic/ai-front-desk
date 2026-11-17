/*
 * Loads the Wynsley product prototype (wy-proto.js, ported unchanged from the
 * Claude Design project). It is a self-contained vanilla-JS app that renders the
 * product screens (web console, iPhone app, tenant pay page, customer chat, flow map)
 * into a container via window.WyProto.mount(el). Browser only.
 */
export type WyProtoApi = {
  mount: (el: HTMLElement) => void;
  exit?: (hash?: string) => void;
  S: { surface: string; route: string; hist: unknown[] };
};

declare global {
  interface Window {
    WyProto?: WyProtoApi & { __loaded?: number };
  }
}

let pending: Promise<WyProtoApi> | null = null;

export function loadPrototype(): Promise<WyProtoApi> {
  if (!pending) {
    pending = import("./wy-proto.js").then(() => {
      if (!window.WyProto) throw new Error("Wynsley prototype failed to load");
      return window.WyProto;
    });
  }
  return pending;
}
