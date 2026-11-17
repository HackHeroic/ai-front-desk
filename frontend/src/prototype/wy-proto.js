if (!(window.WyProto && window.WyProto.__loaded)) {
/* Wynsley product prototype — core: data, styles, router. Fictional firm: Palmetto & Tide Realty. */
(function () {
'use strict';
const W = window.WyProto = window.WyProto || {};

/* ---------- styles ---------- */
const CSS = `
.wp{--ink:#1D1B19;--ink2:#3A342E;--mut:#6E665C;--mut2:#8A8276;--line:#E6DFD3;--line2:#EFE9DF;--paper:#F7F4EE;--card:#fff;--teal:#0B6F69;--teal2:#14A89E;--tealbg:#E3F2F0;--amb:#9A5B00;--ambbg:#FFF1D6;--cor:#C2412D;--corbg:#FDE8E3;--plum:#5B3E8C;--plumbg:#EEE8F7;
font-family:'Instrument Sans',system-ui,sans-serif;color:var(--ink);background:#E9E4DA;min-height:100vh;font-size:14px;line-height:1.45;-webkit-font-smoothing:antialiased}
.wp *{box-sizing:border-box}.wp button{font:inherit;color:inherit;cursor:pointer}.wp a{color:inherit}
.wp .mono{font-family:'IBM Plex Mono',monospace}.wp .sora{font-family:'Sora',sans-serif}
.wp-bar{position:sticky;top:0;z-index:80;display:flex;align-items:center;gap:6px;flex-wrap:nowrap;overflow-x:auto;white-space:nowrap;height:44px;padding:8px 14px;background:#141210;color:#E9E2D6;font-size:12.5px}
.wp-bar b{font-family:'Sora';font-weight:600;color:#fff;margin-right:8px}
.wp-bar .sp{flex:1}
.wp-tab{border:1px solid #3A352F;background:transparent;border-radius:999px;padding:5px 11px;color:#D6CEC0}
.wp-tab.on{background:#F3EFE6;color:#1D1B19;border-color:#F3EFE6}
.wp-sel{display:inline-flex;align-items:center;gap:6px;color:#A39A8C}
.wp-sel select{background:#25211E;color:#F3EFE6;border:1px solid #3A352F;border-radius:6px;padding:4px 6px;font:inherit}
/* console */
.cs{display:grid;grid-template-columns:232px minmax(0,1fr);min-height:calc(100vh - 44px);background:var(--paper)}
.cs-side{background:#FBF9F5;border-right:1px solid var(--line);padding:14px 10px;display:flex;flex-direction:column;gap:2px;position:sticky;top:44px;height:calc(100vh - 44px);overflow:auto}
.cs-firm{display:flex;align-items:center;gap:10px;padding:8px;border:1px solid var(--line);border-radius:10px;background:#fff;margin-bottom:10px;width:100%;text-align:left}
.cs-firm .lg{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,#0E4F5C,#1E8A86);color:#fff;display:grid;place-items:center;font:700 13px Sora}
.cs-nav{display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;border:0;background:none;border-radius:8px;text-align:left;color:var(--ink2);font-weight:500}
.cs-nav:hover{background:#F1ECE3}.cs-nav.on{background:#1D1B19;color:#fff}
.cs-nav .ct{margin-left:auto;font:600 11px 'IBM Plex Mono',monospace;background:var(--corbg);color:var(--cor);border-radius:999px;padding:1px 7px}
.cs-nav.on .ct{background:#fff;color:#1D1B19}
.cs-grp{font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.1em;color:var(--mut2);padding:12px 10px 4px}
.cs-main{min-width:0}
.cs-top{display:flex;align-items:center;gap:10px;padding:12px 28px;border-bottom:1px solid var(--line);background:rgba(247,244,238,.92);backdrop-filter:blur(8px);position:sticky;top:44px;z-index:20}
.cs-search{flex:1;max-width:520px;display:flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--mut2);text-align:left}
.cs-body{padding:24px 28px 80px;max-width:1240px}
.h1{font:600 26px/1.15 Sora,sans-serif;letter-spacing:-.02em;margin:0}
.h2{font:600 17px/1.25 Sora,sans-serif;letter-spacing:-.01em;margin:0}
.sub{color:var(--mut);margin-top:4px}
.eyb{font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.12em;color:var(--mut2);text-transform:uppercase}
.card{background:#fff;border:1px solid var(--line);border-radius:14px}
.pad{padding:16px 18px}
.row{display:flex;align-items:center;gap:10px}
.grid2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}
.grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.btn{display:inline-flex;align-items:center;gap:7px;height:34px;padding:0 13px;border-radius:9px;border:1px solid var(--line);background:#fff;font-weight:600;font-size:13px;white-space:nowrap}
.btn:hover{border-color:#CFC5B5}
.btn.pri{background:#1D1B19;color:#fff;border-color:#1D1B19}
.btn.teal{background:var(--teal);color:#fff;border-color:var(--teal)}
.btn.cor{background:var(--cor);color:#fff;border-color:var(--cor)}
.btn.sm{height:28px;padding:0 10px;font-size:12px;border-radius:7px}
.btn.ghost{border-color:transparent;background:transparent}
.kbd{font:600 11px 'IBM Plex Mono',monospace;border:1px solid currentColor;border-radius:5px;padding:0 5px;opacity:.7}
.pill{display:inline-flex;align-items:center;gap:5px;padding:2px 9px;border-radius:999px;font-size:12px;font-weight:600;white-space:nowrap;line-height:20px}
.p-clr{background:var(--tealbg);color:var(--teal)}
.p-pen{background:#fff;color:var(--amb);box-shadow:inset 0 0 0 1.5px #E7B451;}
.p-bad{background:var(--corbg);color:var(--cor)}
.p-mut{background:#F1ECE3;color:var(--mut)}
.p-ink{background:#1D1B19;color:#fff}
.p-plm{background:var(--plumbg);color:var(--plum)}
.src{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;color:var(--mut);border:1px dashed #D6CCBC;border-radius:6px;padding:1px 7px;white-space:nowrap}
.src.here{border-style:solid;border-color:#BFE0DB;color:var(--teal);background:#F2FAF8}
.lock{opacity:.75}
.tbl{width:100%;border-collapse:collapse}
.tbl th{font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:var(--mut2);text-align:left;padding:9px 12px;border-bottom:1px solid var(--line);text-transform:uppercase}
.tbl td{padding:11px 12px;border-bottom:1px solid var(--line2);vertical-align:middle}
.tbl tr.click{cursor:pointer}.tbl tr.click:hover td{background:#FBF9F5}
.up{display:inline-flex;align-items:center;gap:6px;padding:3px 9px;border-radius:7px;background:#FFF0E6;color:#A2471F;font-size:12px;font-weight:600;border:1px solid #F6CDB4}
.up b{font:700 10px 'IBM Plex Mono',monospace;letter-spacing:.08em}
.tl{position:relative;padding-left:22px}
.tl:before{content:"";position:absolute;left:7px;top:6px;bottom:6px;width:2px;background:var(--line)}
.tl-i{position:relative;padding:0 0 14px}
.tl-i:before{content:"";position:absolute;left:-19px;top:4px;width:10px;height:10px;border-radius:50%;background:#fff;border:2px solid #CFC5B5}
.tl-i.ok:before{background:var(--teal);border-color:var(--teal)}
.tl-i.pen:before{background:#fff;border-color:#E7B451}
.tl-i.bad:before{background:var(--cor);border-color:var(--cor)}
.tl-i.cur:before{box-shadow:0 0 0 4px rgba(11,111,105,.18)}
.who{font:500 11px 'IBM Plex Mono',monospace;color:var(--mut2)}
.testband{background:repeating-linear-gradient(135deg,#FFE27A 0 14px,#1D1B19 14px 28px);height:6px}
.testlbl{display:flex;align-items:center;gap:8px;padding:6px 28px;background:#FFF7D1;color:#6B5200;font:600 12px 'IBM Plex Mono',monospace;letter-spacing:.06em;border-bottom:1px solid #F0DC8A}
.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#1D1B19;color:#fff;padding:11px 16px;border-radius:12px;font-weight:500;z-index:200;box-shadow:0 18px 40px -14px rgba(0,0,0,.5);display:flex;gap:10px;align-items:center;animation:wpUp .35s cubic-bezier(.22,1,.36,1)}
@keyframes wpUp{from{opacity:0;transform:translate(-50%,10px)}to{opacity:1;transform:translate(-50%,0)}}
@keyframes wpIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.anim{animation:wpIn .7s cubic-bezier(.22,1,.36,1) both}
.modal-bg{position:fixed;inset:0;background:rgba(29,27,25,.42);z-index:150;display:grid;place-items:center;padding:20px}
.modal{width:min(520px,100%);background:#fff;border-radius:16px;padding:22px;box-shadow:0 30px 80px -20px rgba(0,0,0,.45);animation:wpIn .4s cubic-bezier(.22,1,.36,1)}
.inp{width:100%;height:40px;border:1px solid var(--line);border-radius:9px;padding:0 12px;font:inherit;background:#fff}
.lbl{font-size:12.5px;font-weight:600;margin-bottom:5px;display:block}
.seg{display:inline-flex;padding:3px;border-radius:10px;background:#EFE9DF;gap:2px}
.seg button{border:0;background:none;padding:5px 11px;border-radius:8px;font-size:12.5px;font-weight:600;color:var(--mut)}
.seg button.on{background:#fff;color:var(--ink);box-shadow:0 1px 2px rgba(0,0,0,.08)}
.dot{width:8px;height:8px;border-radius:50%;display:inline-block;flex:none}
.note{font-size:12px;color:var(--mut)}
.link{background:none;border:0;padding:0;color:var(--teal);font-weight:600;text-decoration:underline;text-underline-offset:3px}
.qcard{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:14px;align-items:start;padding:14px 16px;border-bottom:1px solid var(--line2);cursor:pointer}
.qcard:hover{background:#FBF9F5}.qcard.sel{background:#F5F1EA;box-shadow:inset 3px 0 0 #1D1B19}
.kind{font:700 10px 'IBM Plex Mono',monospace;letter-spacing:.08em;padding:3px 7px;border-radius:6px}
.k-rev{background:#1D1B19;color:#fff}.k-q{background:var(--plumbg);color:var(--plum)}.k-fyi{background:#F1ECE3;color:var(--mut)}.k-hold{background:var(--ambbg);color:var(--amb)}
.bubble{max-width:78%;padding:10px 13px;border-radius:14px;font-size:13.5px}
.b-in{background:#F1ECE3;border-bottom-left-radius:4px}
.b-ai{background:#E3F2F0;border-bottom-right-radius:4px;margin-left:auto}
.b-me{background:#1D1B19;color:#fff;border-bottom-right-radius:4px;margin-left:auto}
.b-draft{background:#fff;border:1.5px dashed #9CC9C1;border-bottom-right-radius:4px;margin-left:auto}
.empty{padding:28px;text-align:center;color:var(--mut)}
/* phone */
.ph-stage{display:flex;gap:40px;justify-content:center;align-items:flex-start;padding:28px 20px 60px;background:radial-gradient(1200px 500px at 50% -10%,#F6EBDD,#E9E4DA)}
.ph{width:390px;height:844px;border-radius:56px;background:#111;padding:12px;box-shadow:0 40px 90px -30px rgba(0,0,0,.55),inset 0 0 0 2px #333;flex:none;position:relative}
.ph-scr{width:100%;height:100%;border-radius:44px;overflow:hidden;position:relative;background:#F7F4EE;display:flex;flex-direction:column}
.ph-isl{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:120px;height:34px;border-radius:20px;background:#000;z-index:30}
.ph-sb{height:50px;flex:none;display:flex;align-items:flex-end;justify-content:space-between;padding:0 30px 6px;font:600 15px Sora,sans-serif;z-index:5}
.ph-body{flex:1;overflow:auto;position:relative}
.ph-body::-webkit-scrollbar{display:none}
.ph-tabs{flex:none;position:sticky;bottom:0;margin-top:auto;display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid var(--line);background:rgba(251,249,245,.96);padding:6px 4px 22px}
.ph-tab{border:0;background:none;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:10.5px;font-weight:600;color:var(--mut2);position:relative}
.ph-tab.on{color:var(--ink)}
.ph-tab .bd{position:absolute;top:-2px;right:18px;background:var(--cor);color:#fff;font:700 9.5px 'IBM Plex Mono',monospace;border-radius:8px;padding:0 4px}
.side-notes{width:320px;flex:none}
.sn{background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px 16px;margin-bottom:12px}
.sn h4{margin:0 0 6px;font:600 13.5px Sora}
.sn p{margin:0;color:var(--mut);font-size:12.5px}
.sn .go{margin-top:8px;display:flex;flex-wrap:wrap;gap:6px}
@media (max-width:1100px){.side-notes{display:none}.cs{grid-template-columns:200px minmax(0,1fr)}}
`;

/* ---------- icons ---------- */
const P = {
 inbox:'<path d="M3 13h5l2 3h4l2-3h5"/><path d="M5 5h14l2 8v6H3v-6z"/>', queue:'<path d="M4 6h16M4 12h16M4 18h10"/>', user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
 home:'<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>', pipe:'<path d="M4 6h6v12H4zM14 6h6v7h-6z"/>', key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3"/>',
 card:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/>', book:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>', globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
 plug:'<path d="M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0zM12 18v3"/>', team:'<circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20c1-4 4-6 7-6s6 2 7 6M15 14c3 0 5 2 6 5"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>', mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>', chk:'<path d="M5 12.5 9.5 17 19 7.5"/>',
 x:'<path d="M6 6l12 12M18 6 6 18"/>', back:'<path d="M15 5l-7 7 7 7"/>', right:'<path d="M9 5l7 7-7 7"/>', clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 ret:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>', lockI:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>', wrench:'<path d="M14 7a4 4 0 0 0 5 5l-8 8-3-3 8-8a4 4 0 0 0-2-2z"/>',
 phone:'<path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z"/>', chat:'<path d="M4 5h16v11H9l-5 4z"/>', bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
 report:'<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h7M9 8h3"/>', ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>', sidebar:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>', chev:'<path d="m7 10 5 5 5-5"/>', more:'<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
 shield:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>', down:'<path d="M12 4v12M6 11l6 6 6-6M4 20h16"/>', bank:'<path d="M3 10 12 4l9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/>', spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'
};
W.ic = (n, s = 16, sw = 2) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`;

/* ---------- data (all fictional) ---------- */
W.firm = { name: 'Palmetto & Tide Realty', short: 'Palmetto & Tide', phone: '(954) 555-0100', city: 'Fort Lauderdale' };
W.staff = [
 { id: 'dana', name: 'Dana Ruiz', role: 'Owner', status: 'active', last: 'Now', dev: 2, alerts: 'Text + app' },
 { id: 'camila', name: 'Camila Reyes', role: 'Agent', status: 'active', last: 'Today 8:12 a.m.', dev: 1, alerts: 'Text' },
 { id: 'marcus', name: 'Marcus Bell', role: 'Agent', status: 'active', last: 'Yesterday', dev: 2, alerts: 'App' },
 { id: 'tess', name: 'Tess Moreno', role: 'Admin', status: 'active', last: 'Today 9:40 a.m.', dev: 1, alerts: 'Email', note: 'Bookkeeper' },
 { id: 'jo', name: 'Jo Alvarez', role: 'Agent', status: 'invited', last: '—', dev: 0, alerts: 'Text', exp: 'Expires Nov 30' },
 { id: 'kevin', name: 'Kevin Doyle', role: 'Reviewer', status: 'removed', last: 'Nov 2', dev: 0, alerts: '—', note: 'Removed Nov 18 by Dana' }
];
W.money = c => '$' + (c / 100).toLocaleString('en-US', { minimumFractionDigits: c % 100 ? 2 : 0, maximumFractionDigits: 2 });

W.units = [
 { id: 'kl1', addr: '1418 NE 15th Ave', unit: 'Unit 1', owner: 'robert', tenant: 'luis', rent: 215000, lease: 'Mar 1, 2026 – Feb 28, 2027', due: '1st', grace: 3, status: 'leased', renew: 'not started', src: 'pms' },
 { id: 'kl2', addr: '1418 NE 15th Ave', unit: 'Unit 2', owner: 'robert', tenant: 'yolanda', rent: 235000, lease: 'Aug 1, 2026 – Jul 31, 2027', due: '1st', grace: 3, status: 'leased', renew: 'not started', src: 'pms' },
 { id: 'cr4', addr: '2200 Coral Ridge Dr', unit: '#4', owner: 'helen', tenant: 'marisol', rent: 180000, lease: 'Jun 1, 2026 – May 31, 2027', due: '1st', grace: 3, status: 'leased', renew: 'not started', src: 'pms', locked: true },
 { id: 'cr6', addr: '2200 Coral Ridge Dr', unit: '#6', owner: 'helen', tenant: 'andre', rent: 195000, lease: 'Feb 1, 2026 – Jan 31, 2027', due: '1st', grace: 3, status: 'leased', renew: 'not started', src: 'pms', ending: true },
 { id: 'se3', addr: '812 SE 3rd St', unit: '', owner: 'gina', tenant: 'keisha', rent: 185000, lease: 'Oct 1, 2026 – Sep 30, 2027', due: '1st', grace: 3, status: 'leased', renew: '—', src: 'here' },
 { id: 'wm2', addr: '2611 NW 9th Ave, Wilton Manors', unit: 'Unit B', owner: 'gina', tenant: null, rent: 210000, lease: '—', due: '—', grace: 0, status: 'vacant', renew: '—', src: 'here' },
 { id: 'vp7', addr: '540 SE 7th St', unit: '#7', owner: 'helen', tenant: 'daniel', rent: 165000, lease: 'Jan 1, 2026 – Dec 31, 2026', due: '1st', grace: 3, status: 'notice given', renew: 'moving out', src: 'pms' }
];

W.people = {
 robert: { name: 'Robert Klein', phone: '(954) 555-0187', email: 'rk.klein@mail.com', lang: 'English', consent: { email: 'Yes · web form, Aug 2021', text: 'Yes · texted first, Mar 2024', phone: 'Yes' }, roles: [['Owner', 'kl1'], ['Owner', 'kl2'], ['Thinking of selling', 'kl2'], ['Former renter', 'cr6']], agent: 'Marcus Bell' },
 yolanda: { name: 'Yolanda Pierre', phone: '(954) 555-0129', email: 'ypierre@mail.com', lang: 'English', consent: { email: 'Yes', text: 'Yes · signed lease', phone: 'Yes' }, roles: [['Tenant', 'kl2']] },
 luis: { name: 'Luis Ortega', phone: '(954) 555-0164', email: 'lortega@mail.com', lang: 'Spanish', consent: { email: 'Yes', text: 'Yes · signed lease', phone: 'Yes' }, roles: [['Tenant', 'kl1']] },
 marisol: { name: 'Marisol Vega', phone: '(954) 555-0142', email: 'm.vega@mail.com', lang: 'Spanish', consent: { email: 'Yes', text: 'Yes · signed lease', phone: 'Yes' }, roles: [['Tenant', 'cr4']] },
 andre: { name: 'Andre Thompson', phone: '(954) 555-0118', email: 'andre.t@mail.com', lang: 'English', consent: { email: 'Yes', text: 'No', phone: 'Yes' }, roles: [['Tenant', 'cr6']] },
 keisha: { name: 'Keisha Brown', phone: '(954) 555-0175', email: 'kbrown@mail.com', lang: 'English', consent: { email: 'Yes', text: 'Yes', phone: 'Yes' }, roles: [['Tenant', 'se3']] },
 daniel: { name: 'Daniel Kim', phone: '(954) 555-0133', email: 'dkim@mail.com', lang: 'English', consent: { email: 'Yes', text: 'Yes', phone: 'Yes' }, roles: [['Tenant', 'vp7'], ['Wants to buy', null]] },
 helen: { name: 'Helen Castro', phone: '(954) 555-0150', email: 'hcastro@mail.com', lang: 'English', consent: { email: 'Yes', text: 'Yes', phone: 'Yes' }, roles: [['Owner', 'cr4'], ['Owner', 'cr6'], ['Owner', 'vp7']] },
 gina: { name: 'Gina Morales', phone: '(954) 555-0191', email: 'gmorales@mail.com', lang: 'Spanish', consent: { email: 'Yes', text: 'Yes', phone: 'Yes' }, roles: [['Owner', 'se3'], ['Owner', 'wm2']] },
 sofia: { name: 'Sofía Herrera', phone: '(754) 555-0102', email: '—', lang: 'Spanish', consent: { email: '—', text: 'Yes · tapped "Text us", Nov 22', phone: '—' }, roles: [['Wants to rent', 'wm2']] },
 jordan: { name: 'Jordan Avery', phone: '—', email: 'jordan.avery@mail.com', lang: 'English', consent: { email: 'Yes · inquiry form', text: 'Not yet', phone: '—' }, roles: [['Wants to buy', 'vp-list']] }
};
W.listing = { id: 'vp-list', addr: '1520 NE 4th Ave, Victoria Park', price: '$689,000', bb: '3 bd · 2 ba · 1,640 sq ft', status: 'Active', mls: 'F10498812' };

/* payments for November (cents) */
W.pays = {
 kl1: { st: 'cleared', amt: 215000, method: 'Card', fee: 'Tenant paid $64.50', who: 'luis', ref: 'py_3QdL…8Kd', steps: [['Started', 'Nov 1, 7:02 a.m.', 'ok'], ['Cleared', 'Nov 1, 7:02 a.m.', 'ok'], ['In trust account', 'Nov 4 · payout po_1Qa…77', 'ok']] },
 kl2: { st: 'cleared', amt: 235000, method: 'Bank', fee: 'Firm paid $5.00', who: 'yolanda', ref: 'py_3QdM…2Za', steps: [['Started', 'Nov 2, 6:40 p.m.', 'ok'], ['Pending', 'Bank payments take about 4 business days', 'ok'], ['Cleared', 'Nov 6, 9:15 a.m.', 'ok'], ['In trust account', 'Nov 9 · payout po_1Qb…31', 'ok']] },
 cr4: { st: 'returned', amt: 180000, method: 'Bank', fee: 'Firm paid $5.00', who: 'marisol', ref: 'py_3QdN…4Rt', steps: [['Started', 'Nov 3, 8:11 a.m.', 'ok'], ['Pending', 'Nov 3 – Nov 7', 'ok'], ['Cleared', 'Nov 7, 9:02 a.m.', 'ok'], ['In trust account', 'Nov 9 · payout po_1Qb…31', 'ok'], ['Returned by her bank', 'Nov 17 · R01 insufficient funds · $1,800 debited from the trust account', 'bad']] },
 cr6: { st: 'partial', amt: 100000, of: 195000, method: 'Bank', fee: 'Firm paid $5.00', who: 'andre', ref: 'py_3QdP…9Wn', steps: [['Started', 'Nov 20, 5:30 p.m. · $1,000 of $1,950', 'ok'], ['Pending', 'Expected to clear about Nov 26', 'pen cur'], ['Cleared', '', ''], ['In trust account', '', '']] },
 se3: { st: 'late', amt: 0, of: 185000, who: 'keisha', steps: [['Due', 'Nov 1', 'ok'], ['Grace ended', 'Nov 4, 11:59 p.m. Florida time', 'bad']] },
 vp7: { st: 'recorded', amt: 165000, method: 'Money order', fee: '—', who: 'daniel', ref: 'Recorded by Tess Moreno', steps: [['Recorded by staff', 'Nov 2 · money order #2219 · Tess Moreno', 'ok'], ['Deposited', 'Nov 3 · trust account', 'ok']] }
};
W.payouts = [
 { id: 'po_1Qb…31', date: 'Nov 9', amt: 415000, st: 'In trust account', items: ['kl2', 'cr4'] },
 { id: 'po_1Qa…77', date: 'Nov 4', amt: 215000, st: 'In trust account', items: ['kl1'] },
 { id: 'po_1Qc…05', date: 'Nov 17', amt: -180000, st: 'Debit · return', items: ['cr4'] }
];

/* queue */
W.queueSeed = () => ([
 { id: 'q1', kind: 'rev', who: 'jordan', role: 'Buyer', prop: 'vp-list', sum: 'Asks if the seller would take $650,000.', wait: '6 min', conv: 'jordan',
   draft: "Thanks, Jordan. Price and offers are a conversation for one of our licensed agents. Marcus Bell can call you today. What time works?", srcs: ['Rule: price and offers go to a licensed person', 'Listing field: List price $689,000'], area: 'sales' },
 { id: 'q2', kind: 'rev', who: 'marisol', role: 'Tenant', prop: 'cr4', sum: 'Her November rent ($1,800) was returned by her bank on Nov 17, after it reached the trust account.', wait: '2 h', area: 'rent', pay: 'cr4',
   draft: "Hola Marisol, le escribe Palmetto & Tide. Su banco devolvió el pago de renta de noviembre ($1,800). Por favor llame a la oficina al (954) 555-0100. Por ahora aceptamos solo fondos certificados.", srcs: ['Payment py_3QdN…4Rt · returned R01', 'Lease rule: online payments now locked'], next: 'Online payments for this lease are locked. Rent is unpaid until certified funds are recorded. The trust account was debited $1,800 on Nov 17.' },
 { id: 'q3', kind: 'q', who: 'luis', role: 'Tenant', prop: 'kl1', sum: 'Repair: AC not cooling, 84°F inside. Urgent, not an emergency.', wait: '18 min', area: 'repair', ask: 'Who should take this repair?', opts: ['Ray (your maintenance)', 'Coastal Air (vendor)'] },
 { id: 'q4', kind: 'q', who: 'sofia', role: 'Wants to rent', prop: 'wm2', sum: 'Asked if two cats are OK at 2611 NW 9th Ave.', wait: '41 min', area: 'facts', ask: "Your fact sheet covers dogs, not cats. What's the answer?", opts: null },
 { id: 'q5', kind: 'fyi', who: 'andre', role: 'Tenant', prop: 'cr6', sum: 'Lease ends Jan 31. No renewal started (69 days left).', wait: '1 d', area: 'lease' },
 { id: 'q6', kind: 'fyi', who: 'sofia', role: 'Wants to rent', prop: 'wm2', sum: 'Tour booked Sat 1:00 p.m. Camila accepted the hand-off in 2 min.', wait: '3 h', area: 'sales', conv: 'sofia' },
 { id: 'q7', kind: 'hold', who: null, role: 'Unknown', prop: 'wm2', sum: 'Self-tour access asked from a number with no verification.', wait: '22 min', area: 'hold', why: ['Asked for a door code within 40 seconds', 'Number first seen today', 'Proof rule: ID, selfie and liveness check at access'], },
]);
W.facts = [
 { t: 'Pets', q: 'Are dogs allowed at 2611 NW 9th Ave?', a: 'Yes, one dog up to 25 lb, $300 pet fee.', to: 'One building', lang: 'EN + ES', st: 'approved', by: 'Dana · Nov 22' },
 { t: 'Showings', q: 'When can I see a rental?', a: 'Weekdays 10–6, Saturdays 10–2. An agent always offers a showing in person.', to: 'Firm', lang: 'EN + ES', st: 'approved', by: 'Dana · Nov 22' },
 { t: 'Applications', q: 'What does it cost to apply?', a: '$75 per adult, non-refundable.', to: 'Firm', lang: 'EN + ES', st: 'approved', by: 'Dana · Nov 22' },
 { t: 'Fees', q: 'Is there a move-in fee at 2200 Coral Ridge?', a: '$150 association move-in fee, paid to the association.', to: 'One building', lang: 'EN', st: 'draft', by: 'Drafted from website' },
 { t: 'Hours', q: 'When is the office open?', a: 'Mon–Fri 9–6, Sat 10–2.', to: 'Firm', lang: 'EN + ES', st: 'approved', by: 'Dana · Nov 22' },
 { t: 'Areas', q: 'Which areas do you serve?', a: 'Fort Lauderdale to Delray Beach.', to: 'Firm', lang: 'EN + ES', st: 'draft', by: 'Drafted from Google profile' }
];

/* ---------- state ---------- */
const S = W.S = {
 surface: 'map', route: 'invite', hist: [], toast: null, modal: null,
 sc: { pms: 'none', stripe: 'live', texting: 'pending', ph: 'lock' },
 queue: W.queueSeed(), sel: 'q1', qf: 'all', resolved: [],
 setup: { profile: true, email: true, calls: false, chat: true, texting: 'filed', exports: false, live: false, mode: 'review' },
 inviteState: 'ok', signedIn: false, codeSent: false,
 staff: W.staff.map(s => ({ ...s })),
 signed: false, payTab: 'month', rentSel: 'cr4', leaseRules: { cr4: { partial: false, locked: true, autopay: false }, cr6: { partial: true, locked: false, autopay: false }, kl2: { partial: false, locked: false, autopay: true } },
 pay: { lang: 'en', step: 'home', method: 'bank', autopay: false, state: 'due' },
 chat: { lang: 'es', step: 0 },
 ph: { tab: 'today', sel: null, stack: [] },
 personF: 'all', rentalsTab: 'units', unitSel: 'kl2', pipeTab: 'all', repairRouted: {}
};

/* ---------- router ---------- */
let root = null;
W.render = () => { if (!root) return; const y = window.scrollY; root.innerHTML = `<style>${CSS}${W.CSS2 || ''}</style><div class="wp ${S.notes ? 'notes' : ''}">${W.bar()}${W.view()}${S.modal ? W.modalView() : ''}${S.toast ? `<div class="toast">${W.ic('chk', 16, 2.4)}${S.toast}</div>` : ''}</div>`; if (S._keepY) window.scrollTo(0, y); S._keepY = false; };
W.toast = (t) => { S.toast = t; clearTimeout(W._tt); W._tt = setTimeout(() => { S.toast = null; S._keepY = true; W.render(); }, 2600); };
W.go = (target, keep) => {
 const [surf, ...r] = target.split(':'); const route = r.join(':');
 if (!keep) S.hist.push([S.surface, S.route]);
 S.surface = surf; if (route) S.route = route; S.modal = null;
 if (surf === 'phone' && route) { W.phoneGo(route); }
 W.render(); window.scrollTo(0, 0);
};
W.back = () => { const h = S.hist.pop(); if (h) { S.surface = h[0]; S.route = h[1]; } W.render(); };
W.ACT = {};
W.view = () => {
 if (S.surface === 'console') return W.consoleView();
 if (S.surface === 'phone') return W.phoneStage();
 if (S.surface === 'pay') return W.payStage();
 if (S.surface === 'chat') return W.chatStage();
 if (S.surface === 'map') return W.mapView();
 return '';
};
W.bar = () => {
 const t = (s, l, r) => `<button class="wp-tab ${S.surface === s ? 'on' : ''}" data-go="${s}:${r}">${l}</button>`;
 const sel = (k, label, opts) => `<label class="wp-sel">${label}<select data-sc="${k}">${opts.map(([v, l]) => `<option value="${v}" ${S.sc[k] === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label>`;
 return `<div class="wp-bar">${W.exit ? `<button class="wp-tab" style="border-color:#F3EFE6;color:#fff" data-act="exitApp">← Back to website</button>` : '<b>Wynsley · product prototype</b>'}
 ${t('map', 'Flow map', '')}${t('console', 'Web console', S.surface === 'console' ? S.route : (S.signedIn ? 'today' : 'invite'))}${t('phone', 'iPhone app', '')}${t('pay', "Tenant's pay page", '')}${t('chat', 'Customer chat', '')}
 <span class="sp"></span>
 ${sel('pms', 'Firm:', [['none', 'No PMS'], ['appfolio', 'Keeps AppFolio']])}
 ${sel('stripe', 'Stripe:', [['live', 'Live'], ['test', 'Test mode'], ['info', 'Needs info'], ['none', 'Off']])}
 ${sel('texting', 'Texting:', [['pending', 'Waiting'], ['live', 'Approved']])}
 <button class="wp-tab ${S.notes ? 'on' : ''}" data-act="notes">Design notes</button><button class="wp-tab" data-act="reset">Reset</button></div>`;
};

/* ---------- events ---------- */
W.mount = (el) => {
 root = el; W.render();
 el.addEventListener('click', (e) => {
  const g = e.target.closest('[data-go]'); const a = e.target.closest('[data-act]');
  if (a && el.contains(a)) { e.preventDefault(); const [n, ...arg] = a.getAttribute('data-act').split('|'); if (W.ACT[n]) { W.ACT[n](...arg); } else { console.warn('no act', n); } return; }
  if (g && el.contains(g)) { e.preventDefault(); const v = g.getAttribute('data-go'); if (v === 'back') W.back(); else W.go(v); }
 });
 el.addEventListener('change', (e) => {
  const s = e.target.closest('[data-sc]'); if (s) { S.sc[s.getAttribute('data-sc')] = s.value; S._keepY = true; W.render(); W.toast('Scenario changed: every screen now shows this state.'); }
  const f = e.target.closest('[data-field]'); if (f) { S[f.getAttribute('data-field')] = f.value; }
 });
};
W.ACT.reset = () => { const keep = S.surface; Object.assign(S, { route: 'invite', hist: [], queue: W.queueSeed(), sel: 'q1', resolved: [], signedIn: false, codeSent: false, inviteState: 'ok', staff: W.staff.map(s => ({ ...s })), signed: false, setup: { profile: true, email: true, calls: false, chat: true, texting: 'filed', exports: false, live: false, mode: 'review' }, pay: { lang: 'en', step: 'home', method: 'bank', autopay: false, state: 'due' }, chat: { lang: 'es', step: 0 }, ph: { tab: 'today', sel: null, stack: [] }, repairRouted: {} }); S.surface = keep; W.render(); W.toast('Prototype reset.'); };
W.ACT.exitApp = (h) => { if (W.exit) W.exit(h); else W.toast('This opens the website in the live product.'); };
W.ACT.notes = () => { S.notes = !S.notes; S._keepY = true; W.render(); };
W.ACT.modalClose = () => { S.modal = null; S._keepY = true; W.render(); };
W.ACT.toast = (t) => W.toast(t);
W.modalView = () => `<div class="modal-bg" data-act="modalBg"><div class="modal" data-stop="1">${W.MODALS[S.modal.k](S.modal)}</div></div>`;
W.ACT.modalBg = () => {}; // clicks inside handled; outside closes via X
W.MODALS = {};

/* helpers */
W.pname = id => (W.people[id] || {}).name || 'Unknown sender';
W.unit = id => W.units.find(u => u.id === id);
W.uname = id => { if (id === 'vp-list') return W.listing.addr; const u = W.unit(id); return u ? `${u.addr}${u.unit ? ' · ' + u.unit : ''}` : '—'; };
W.srcChip = (u) => { const pms = S.sc.pms === 'appfolio' && u && u.src === 'pms'; return pms ? `<span class="src">${W.ic('lockI', 11)} From AppFolio · synced 9:40 a.m.</span>` : `<span class="src here">Kept in Wynsley</span>`; };
W.isPms = (u) => S.sc.pms === 'appfolio' && u && u.src === 'pms';
W.payPill = (st, small) => ({
 cleared: `<span class="pill p-clr">${W.ic('chk', 12, 3)} Cleared</span>`,
 pending: `<span class="pill p-pen">${W.ic('clock', 12, 2.4)} Pending · not paid yet</span>`,
 partial: `<span class="pill p-pen">${W.ic('clock', 12, 2.4)} Partly paid · pending</span>`,
 returned: `<span class="pill p-bad">${W.ic('ret', 12, 2.4)} Returned</span>`,
 late: `<span class="pill p-bad">Late</span>`,
 recorded: `<span class="pill p-clr">${W.ic('chk', 12, 3)} Recorded by staff</span>`,
 due: `<span class="pill p-mut">Due</span>`
})[st] || st;
W.testBanner = () => S.sc.stripe === 'test' ? `<div class="testband"></div><div class="testlbl">${W.ic('shield', 14)} TEST MODE · NO REAL MONEY MOVES · Stripe test data until the EIN, bank account, Stripe review and attorney answers are in</div>` : '';
})();
/* console part A: sign-in & invites (12), shell, set-up & health (8), team */
(function () {
const W = window.WyProto, S = W.S, ic = W.ic;

const AUTH = ['login', 'logincode', 'noaccount', 'invite', 'signin', 'code', 'welcome', 'noaccess', 'wrongemail', 'removed', 'expired'];
W.consoleView = () => {
 if (AUTH.includes(S.route)) return W.authView();
 const r = S.route.split(':');
 const body = (W.CR[r[0]] || W.CR.today)(r[1]);
 return `<div class="cs">${W.side(r[0])}<div class="cs-main">${W.testBanner()}${W.top()}<div class="cs-body anim" key="${S.route}">${body}</div></div></div>`;
};

/* ---------- auth ---------- */
const shellAuth = (inner, aside) => `<div style="min-height:calc(100vh - 44px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);background:var(--paper)">
 <div style="display:flex;flex-direction:column;justify-content:center;padding:48px clamp(24px,6vw,96px)">${inner}</div>
 <div style="position:relative;overflow:hidden;color:#F3EFE6;padding:48px clamp(24px,5vw,72px);display:flex;flex-direction:column;justify-content:flex-end;background:#0F1E2B"><div aria-hidden="true" style="position:absolute;inset:0;background:url(assets/hero-miami-beach.jpg) 70% 50%/cover no-repeat"></div><div aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,20,32,.15) 0%,rgba(8,20,32,.35) 40%,rgba(8,18,28,.88) 100%)"></div><div style="position:relative;max-width:520px;padding:24px 26px;border-radius:18px;background:rgba(12,22,32,.55);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.12)">${aside}</div></div></div>`;
W.ssoBtns = (act) => `<button class="btn" style="height:46px;justify-content:center;gap:10px;font-size:14px;font-weight:500" data-act="${act}"><svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg> Continue with Google</button><button class="btn" style="height:46px;justify-content:center;gap:10px;font-size:14px;font-weight:500" data-act="${act}"><svg width="17" height="17" viewBox="0 0 21 21" aria-hidden="true"><rect x="1" y="1" width="9" height="9" fill="#F25022"/><rect x="11" y="1" width="9" height="9" fill="#7FBA00"/><rect x="1" y="11" width="9" height="9" fill="#00A4EF"/><rect x="11" y="11" width="9" height="9" fill="#FFB900"/></svg> Continue with Microsoft</button><div class="note" style="text-align:center;margin-top:-2px">Works with Google Workspace, Gmail, Microsoft 365 and Outlook</div>`;
const wordmark = (c = '#1D1B19') => `<div class="sora" style="font-weight:700;font-size:22px;letter-spacing:-.03em;color:${c}"><span style="background:linear-gradient(90deg,#FF6B5B,#FF9F1C);-webkit-background-clip:text;background-clip:text;color:transparent">w</span>ynsley</div>`;
const authAside = `<div class="eyb" style="color:#C9C1B4">What happens next</div>
 <div class="h1" style="color:#fff;margin-top:10px;font-size:30px">Live on new inquiries today.<br><span style="font-family:Newsreader,Georgia,serif;font-style:italic;font-weight:400;color:#FFB38A">Nothing gets switched off.</span></div>
 <div style="margin-top:22px;display:grid;gap:14px">
  ${[['Your part', 'about 25 min', ['Approve your profile', 'Turn on forwarding', 'Run your exports']], ['Our part', 'while you watch', ['Chat on your website', 'Texting registration']]].map(([a, b, items]) => `<div><div class="row" style="gap:8px"><b style="font-size:13.5px;color:#fff">${a}</b><span style="font-size:12.5px;color:#A9B4BE">${b}</span></div><div class="row" style="flex-wrap:wrap;gap:6px;margin-top:7px">${items.map(x => `<span style="padding:5px 11px;border-radius:999px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14);font-size:12.5px;color:#EDE7DC">${x}</span>`).join('')}</div></div>`).join('')}
 </div>`;

W.authView = () => {
 const r = S.route;
 const staffAside = `<div class="eyb" style="color:#A39A8C">Who signs in here</div>
  <div class="h1" style="color:#fff;margin-top:10px">Brokers, agents and their team.<br><span style="font-family:Newsreader,Georgia,serif;font-style:italic;font-weight:400;color:#FF9F6B">Nobody else needs an account.</span></div>
  <div style="margin-top:24px;display:grid;gap:12px;font-size:13.5px;color:#D6CEC0">
   <div class="row" style="align-items:flex-start">${ic('user', 16)}<span><b style="color:#fff">Tenants</b> pay rent and report repairs from a link we text them.</span></div>
   <div class="row" style="align-items:flex-start">${ic('home', 16)}<span><b style="color:#fff">Owners and buyers</b> get updates by email and text.</span></div>
   <div class="row" style="align-items:flex-start">${ic('phone', 16)}<span><b style="color:#fff">Agents</b> can answer straight from an alert, without signing in.</span></div></div>
  <div class="row" style="margin-top:26px;gap:8px;flex-wrap:wrap"><button class="btn sm" style="color:#1D1B19" data-go="pay:">See a tenant's pay link</button><button class="btn sm" style="color:#1D1B19" data-go="phone:lock">See an agent's alert</button></div>`;
 if (r === 'login') return shellAuth(`${wordmark()}<h1 class="h1" style="margin-top:30px">Sign in</h1><p class="sub">For brokerage staff. Use the email your invite went to.</p>
  <div style="display:grid;gap:10px;margin-top:22px;max-width:380px">
   ${W.ssoBtns('loginDone')}
   <div class="row note" style="justify-content:center">or</div>
   <label class="lbl">Work email<input class="inp" value="dana@palmettotide.com" style="margin-top:5px"></label>
   <button class="btn pri" style="height:44px;justify-content:center" data-go="console:logincode">Email me a code</button>
   <div class="note" style="display:grid;gap:6px;margin-top:6px"><span>Got an invite? <button class="link" data-go="console:invite">Open it from your email</button></span><span>Not a client yet? <button class="link" data-go="console:noaccount">How to get access</button></span></div></div>`, staffAside);
 if (r === 'logincode') return shellAuth(`${wordmark()}<h1 class="h1" style="margin-top:30px">Check your email</h1><p class="sub">We sent a 6-digit code to dana@palmettotide.com.</p>
  <div class="row" style="margin-top:20px;gap:8px">${'731058'.split('').map(d => `<div class="sora" style="width:46px;height:56px;border:1px solid var(--line);border-radius:10px;background:#fff;display:grid;place-items:center;font-size:22px;font-weight:600">${d}</div>`).join('')}</div>
  <div style="margin-top:20px" class="row"><button class="btn pri" style="height:44px" data-act="loginDone">Sign in</button><button class="btn ghost" data-go="console:noaccess">Try: an email with no access</button></div>`, staffAside);
 if (r === 'noaccount') return shellAuth(`${wordmark()}<h1 class="h1" style="margin-top:30px">Wynsley is invite-only</h1><p class="sub" style="max-width:440px">There's no sign-up form. It starts with a free check of your website, Google profile and after-hours replies. If you go ahead, Maddy sets up your firm and emails your invite; the rest takes about an hour.</p>
  <div class="row" style="margin-top:20px;flex-wrap:wrap"><button class="btn pri" style="height:44px" data-act="exitApp|contact">Start with a free check →</button><button class="btn" style="height:44px" data-go="console:invite">See what the invite looks like</button></div>`, staffAside);
 if (r === 'invite') return `<div style="padding:32px 20px 60px;background:var(--paper);min-height:calc(100vh - 44px)"><div style="max-width:620px;margin:0 auto">
  <div class="eyb">Step 0 · the invite email, in the owner's inbox</div>
  <div class="card" style="margin-top:10px;overflow:hidden">
   <div class="pad" style="border-bottom:1px solid var(--line2);font-size:13px"><b>From:</b> Maddy at Wynsley &lt;setup@wynsley.com&gt;<br><b>To:</b> dana@palmettotide.com<br><b>Subject:</b> You're invited to run Palmetto &amp; Tide Realty on Wynsley</div>
   <div style="padding:26px 28px">${wordmark()}
    <h2 class="h1" style="margin-top:18px;font-size:24px">Dana, your firm is ready for you.</h2>
    <p style="color:var(--ink2)">Maddy (Wynsley setup) invited you to <b>Palmetto &amp; Tide Realty</b> as <b>Owner</b>. You can invite your team once you're in.</p>
    <div class="card pad" style="background:#FBF9F5;margin:14px 0">
     <div class="grid3" style="font-size:12.5px"><div><div class="eyb">Firm</div>Palmetto &amp; Tide Realty</div><div><div class="eyb">Your role</div>Owner</div><div><div class="eyb">Expires</div>Nov 30, 11:59 p.m.</div></div></div>
    <button class="btn pri" style="height:44px;padding:0 20px;font-size:14px" data-go="console:signin">Accept and sign in →</button>
    <p class="note" style="margin-top:14px">Didn't expect this? Ignore it and nothing happens. Wynsley never asks for payment details by email.</p>
   </div></div>
  <div class="row" style="margin-top:16px;flex-wrap:wrap"><span class="note">Other states:</span>
   <button class="btn sm" data-go="console:expired">Invite expired</button><button class="btn sm" data-go="console:wrongemail">Signed in with the wrong email</button><button class="btn sm" data-go="console:noaccess">No access to this firm</button><button class="btn sm" data-go="console:removed">Access removed</button></div>
 </div></div>`;
 if (r === 'signin') return shellAuth(`${wordmark()}<div class="eyb" style="margin-top:30px">Invited to Palmetto &amp; Tide Realty · Owner · by Maddy</div>
  <h1 class="h1" style="margin-top:8px">Sign in to accept</h1><p class="sub">Use dana@palmettotide.com, the address the invite went to.</p>
  <div style="display:grid;gap:10px;margin-top:22px;max-width:380px">
   ${W.ssoBtns('signinGoogle')}
   <div class="row note" style="justify-content:center">or</div>
   <label class="lbl">Work email<input class="inp" value="dana@palmettotide.com" style="margin-top:5px"></label>
   <button class="btn pri" style="height:44px;justify-content:center" data-go="console:code">Email me a code</button>
   <p class="note">A password is optional. You can add one later in your profile.</p></div><div class="up" style="margin-top:22px;max-width:380px"><b>UPGRADE</b> The invite is the sign-up: no public sign-up page.</div>`, authAside);
 if (r === 'code') return shellAuth(`${wordmark()}<h1 class="h1" style="margin-top:30px">Check your email</h1><p class="sub">We sent a 6-digit code to dana@palmettotide.com. It works for 10 minutes.</p>
  <div class="row" style="margin-top:20px;gap:8px">${'482913'.split('').map(d => `<div class="sora" style="width:46px;height:56px;border:1px solid var(--line);border-radius:10px;background:#fff;display:grid;place-items:center;font-size:22px;font-weight:600">${d}</div>`).join('')}</div>
  <div style="margin-top:20px" class="row"><button class="btn pri" style="height:44px" data-act="signinDone">Sign in</button><button class="btn ghost" data-act="toast|New code sent. The old one stopped working.">Send a new code</button></div>`, authAside);
 if (r === 'welcome') return shellAuth(`${wordmark()}<div class="eyb" style="margin-top:30px">Signed in · Palmetto &amp; Tide Realty · Owner</div>
  <h1 class="h1" style="margin-top:8px;font-size:32px">Welcome, Dana.<br>Let's get you live today.</h1>
  <p class="sub" style="max-width:440px">We already drafted your profile, hours and 24 answers from your website and Google profile. You check them; you don't type them.</p>
  <div class="row" style="margin-top:22px"><button class="btn pri" style="height:44px;padding:0 20px" data-go="console:setup">Start the checklist →</button><span class="note">About 40 minutes, with Maddy on the call.</span></div>`, authAside);
 const st = {
  expired: ['This invite expired', 'Invites last 7 days. Ask for a new one and it arrives in a minute.', `<button class="btn pri" data-act="toast|New invite sent to dana@palmettotide.com. The old link no longer works.">Send me a new invite</button>`],
  wrongemail: ['You signed in as dana.ruiz@gmail.com', 'This invite is for dana@palmettotide.com. Sign out and sign in with that address, or ask Maddy to send the invite to this one.', `<button class="btn pri" data-go="console:signin">Use dana@palmettotide.com</button><button class="btn" data-act="toast|Request sent to Maddy at Wynsley.">Ask for a new invite</button>`],
  noaccess: ["You don't have access to this firm", "You're signed in, but nobody at Palmetto & Tide has invited this account. Ask the owner to invite you.", `<button class="btn" data-go="console:invite">Back to the invite</button>`],
  removed: ['Your access was removed', 'Dana Ruiz removed this account from Palmetto & Tide Realty on Nov 18. You were signed out on every device at that moment.', `<button class="btn" data-go="console:invite">Back to the invite</button>`]
 }[r];
 return shellAuth(`${wordmark()}<h1 class="h1" style="margin-top:30px">${st[0]}</h1><p class="sub" style="max-width:440px">${st[1]}</p><div class="row" style="margin-top:20px">${st[2]}</div>`, authAside);
};
W.ACT.signinGoogle = () => { W.go('console:welcome'); S.signedIn = true; };
W.ACT.loginDone = () => { S.signedIn = true; S.setup.live = true; W.go('console:today'); W.toast('Signed in to Palmetto & Tide Realty.'); };
W.ACT.signinDone = () => { S.signedIn = true; W.go('console:welcome'); };

/* ---------- shell ---------- */
W.side = (cur) => {
 const n = (r, l, i, ct) => `<button class="cs-nav ${cur === r ? 'on' : ''}" data-go="console:${r}">${ic(i)}${l}${ct ? `<span class="ct">${ct}</span>` : ''}</button>`;
 const open = S.queue.filter(q => !S.resolved.includes(q.id) && q.kind !== 'hold').length;
 const setupLeft = ['profile', 'email', 'calls', 'chat', 'exports'].filter(k => !S.setup[k]).length + (S.setup.texting === 'todo' ? 1 : 0);
 return `<aside class="cs-side">
 <button class="cs-firm" data-act="firmSwitch"><span class="lg">P&amp;T</span><span style="min-width:0"><span style="display:block;font-weight:600;font-size:13px">Palmetto &amp; Tide</span><span class="note">Owner · switch firm</span></span></button>
 ${n('today', 'Today', 'queue', open)}${n('inbox', 'Conversations', 'chat')}${n('people', 'People & homes', 'user')}${n('pipeline', 'Pipeline', 'pipe')}
 <div class="cs-grp">Rentals</div>${n('rentals', 'Units, leases, repairs', 'key')}${n('rent', 'Rent & payments', 'card', S.sc.stripe === 'test' ? 'TEST' : '')}
 <div class="cs-grp">The desk</div>${n('facts', 'Fact sheet', 'book', '1')}${n('reports', 'Reports', 'report')}${n('site', 'Website & Google', 'globe')}
 <div class="cs-grp">Firm</div>${n('setup', 'Set-up & health', 'plug', S.setup.live ? '' : (setupLeft > 0 ? setupLeft + ' left' : ''))}${n('team', 'Team & access', 'team')}
 <div style="flex:1"></div>
 <div class="card" style="padding:10px;font-size:12px"><div class="row"><span class="dot" style="background:${S.setup.live ? '#14A89E' : '#E7B451'}"></span><b>${S.setup.live ? 'Live' : 'Set-up'}</b><span class="note" style="margin-left:auto">${S.setup.live ? (S.setup.mode === 'review' ? 'review week 1' : S.setup.mode === 'auto' ? 'auto-send' : 'always review') : 'not live yet'}</span></div>
 <div class="note" style="margin-top:4px">Support: Maddy · replies in about 1 hour</div></div>
 <button class="cs-nav" data-go="phone:today">${ic('phone')}Open the iPhone app</button>
 </aside>`;
};
W.top = () => `<div class="cs-top"><button class="cs-search" data-act="search">${ic('search')} Search people, homes, units, payments <span class="kbd" style="margin-left:auto">⌘K</span></button>
 <button class="btn" data-act="voice">${ic('mic')} Voice note</button><span style="flex:1"></span>
 <button class="btn ghost" data-go="back">${ic('back')} Back</button>
 <button class="btn ghost" data-go="console:team" title="Dana Ruiz"><span style="width:26px;height:26px;border-radius:50%;background:#1D1B19;color:#fff;display:grid;place-items:center;font:600 11px Sora,sans-serif">DR</span></button></div>`;
W.ACT.firmSwitch = () => { S.modal = { k: 'firm' }; S._keepY = true; W.render(); };
W.MODALS.firm = () => `<div class="row"><h3 class="h2">Switch firm</h3><button class="btn ghost sm" style="margin-left:auto" data-act="modalClose">${ic('x')}</button></div>
 <p class="note">You see one firm at a time. Everything you see comes from the firm you pick.</p>
 <div style="display:grid;gap:8px;margin-top:10px"><button class="cs-firm" data-act="modalClose"><span class="lg">P&amp;T</span><span><b>Palmetto &amp; Tide Realty</b><br><span class="note">Owner · current</span></span></button>
 <button class="cs-firm" data-act="toast|Only people in two firms see a second one. Dana is in one."><span class="lg" style="background:#8A8276">+</span><span><b>No other firms</b><br><span class="note">Someone in two firms switches here</span></span></button></div>`;
W.ACT.search = () => { S.modal = { k: 'search' }; S._keepY = true; W.render(); };
W.MODALS.search = () => `<div class="row"><input class="inp" value="Klein" autofocus><button class="btn ghost sm" data-act="modalClose">${ic('x')}</button></div>
 <div class="eyb" style="margin-top:14px">People</div>
 <button class="cs-nav" data-go="console:person:robert">${ic('user')} Robert Klein <span class="note" style="margin-left:6px">Owner · 2 units · thinking of selling</span></button>
 <div class="eyb" style="margin-top:10px">Homes and units</div>
 <button class="cs-nav" data-go="console:unit:kl1">${ic('home')} 1418 NE 15th Ave · Unit 1</button><button class="cs-nav" data-go="console:unit:kl2">${ic('home')} 1418 NE 15th Ave · Unit 2</button>
 <div class="eyb" style="margin-top:10px">Payments</div><button class="cs-nav" data-go="console:rent">${ic('card')} Rent for the units Robert owns · November</button>`;
W.ACT.voice = () => { S.modal = { k: 'voice' }; S._keepY = true; W.render(); };
W.MODALS.voice = () => `<div class="row"><h3 class="h2">Voice note</h3><button class="btn ghost sm" style="margin-left:auto" data-act="modalClose">${ic('x')}</button></div>
 <p class="note">Teach the desk something. It turns your words into a proposed fact; nothing reaches customers until you approve it.</p>
 <div class="card pad" style="margin-top:12px;background:#FBF9F5"><div class="row"><span class="dot" style="background:var(--cor)"></span><span class="mono note">0:07</span></div>
 <p style="margin:8px 0 0">"Two cats are fine at the Wilton Manors place, same fee as a dog."</p></div>
 <div class="card pad" style="margin-top:10px"><div class="eyb">Proposed fact · Pets · 2611 NW 9th Ave</div><p style="margin:6px 0 0">Up to two cats are allowed. $300 pet fee.</p><p class="note">Spanish version drafted too: "Se permiten hasta dos gatos. Cargo por mascota de $300."</p></div>
 <div class="row" style="margin-top:14px"><button class="btn pri" data-act="approveFact">Approve</button><button class="btn" data-go="console:facts">Edit on the fact sheet</button><button class="btn ghost" data-act="modalClose">Discard</button></div>`;
W.ACT.approveFact = () => { S.modal = null; if (!S.resolved.includes('q4')) S.resolved.push('q4'); W.toast('Approved. The desk will answer the cat question now, in English and Spanish.'); S._keepY = true; W.render(); };

/* ---------- set-up & health (8) ---------- */
W.CR = {};
W.CR.setup = () => {
 const st = S.setup;
 const step = (k, n, t, who, time, doneTxt, actLbl, act, extra = '') => {
  const done = k === 'texting' ? st.texting !== 'todo' : st[k];
  const wait = k === 'texting' && st.texting === 'filed' && S.sc.texting === 'pending';
  return `<div class="row" style="align-items:flex-start;padding:14px 16px;border-bottom:1px solid var(--line2)">
  <span style="width:26px;height:26px;border-radius:50%;flex:none;display:grid;place-items:center;${done ? (wait ? 'border:2px solid #E7B451;color:var(--amb)' : 'background:var(--teal);color:#fff') : 'border:1.5px solid #CFC5B5;color:var(--mut)'}">${done ? (wait ? ic('clock', 13, 2.4) : ic('chk', 14, 3)) : `<span class="mono" style="font-size:11px">${n}</span>`}</span>
  <div style="flex:1;min-width:0"><div style="font-weight:600">${t}</div><div class="note">${who} · ${time}</div>
   ${done ? `<div style="margin-top:5px;font-size:12.5px;color:${wait ? 'var(--amb)' : 'var(--teal)'}">${wait ? 'Filed Nov 20. Waiting on the carriers: usually days, sometimes up to six weeks. Until then, replies go by email and chat; no texts go out.' : doneTxt}</div>` : ''}${extra}</div>
  ${done ? (k === 'exports' ? `<button class="btn sm" data-act="importModal">See import receipt</button>` : '') : `<button class="btn sm pri" data-act="${act}">${actLbl}</button>`}</div>`;
 };
 const allDone = st.profile && st.email && st.calls && st.chat && st.exports;
 const conns = W.connRows();
 return `<div class="row" style="align-items:flex-end;flex-wrap:wrap"><div><div class="eyb scr">Screen 8 · Set-up and health</div><h1 class="h1" style="margin-top:6px">${st.live ? 'Everything that connects your firm' : 'Live in a day'}</h1>
 <p class="sub">${st.live ? 'Every door is tested each morning. Anything waiting on someone outside says who and how long.' : 'Six steps inside the one-hour kickoff. Steps marked Wynsley are ours; you watch them happen.'}</p></div>
 <span style="flex:1"></span>${st.live ? `<span class="pill p-clr">${ic('chk', 12, 3)} Live since today, 10:48 a.m.</span>` : ''}</div>
 <div class="grid2" style="grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);margin-top:18px;align-items:start">
 <div class="card">${step('profile', 1, 'Approve the profile the AI drafted', 'You', '5 min', 'Approved by Dana · hours, areas, routing, tone of voice', 'Review profile', 'profileModal')}
  ${step('email', 2, 'Turn on email forwarding', 'You, in Google Workspace', '3 min', 'Test email arrived 10:21 a.m. and got a reply in 14 sec', 'Show me how', 'stepDone|email')}
  ${step('calls', 3, 'Turn on call forwarding', 'You, from the office phone', '2 min · dial *72 then the number we give you', 'Test call rang through at 10:32 a.m.', 'I did it · test it', 'stepDone|calls')}
  ${step('chat', 4, 'Switch the chat on', 'Wynsley', 'Done for you, on your website', 'Live on palmettotide.com · recording notice and "Talk to a person" showing', 'Switch on', 'stepDone|chat')}
  ${step('texting', 5, 'File the texting registration', 'Wynsley files it under your tax ID', 'Carriers review it', 'Approved Nov 24 · texts can go out 8 a.m.–8 p.m.', 'File it', 'stepDone|texting')}
  ${step('exports', 6, 'Run the exports', 'You export, we import', S.sc.pms === 'appfolio' ? '10 min · from your CRM (AppFolio stays connected)' : '10 min · from your CRM and your rent roll', '', 'Upload exports', 'stepDone|exports', st.exports ? '' : '<div class="note" style="margin-top:5px">Active pipeline comes in now; older records within 30 days, in batches.</div>')}
  <div class="pad" style="background:#FBF9F5;border-radius:0 0 14px 14px">${st.live ? `<div class="row"><b>Sending mode</b><span class="note">· change any time</span></div>${W.modeSeg()}` : `<div class="row" style="flex-wrap:wrap"><div style="flex:1;min-width:200px"><b>Go live on new inquiries</b><div class="note">${allDone ? 'Pick how replies go out. Nothing is switched off: your inbox and phones keep working.' : 'Finish steps 1–4 and 6. Texting can still be waiting.'}</div>${allDone ? W.modeSeg() : ''}</div><button class="btn ${allDone ? 'teal' : ''}" ${allDone ? 'data-act="goLive"' : 'data-act="toast|Finish the steps above first. Texting can still be waiting on carriers."'}>Go live →</button></div>`}</div>
 </div>
 <div style="display:grid;gap:14px">
  <div class="card pad"><div class="eyb">Your named contact</div><div class="row" style="margin-top:8px"><span style="width:36px;height:36px;border-radius:50%;background:#2A2623;color:#fff;display:grid;place-items:center;font:600 13px Sora,sans-serif">M</span><div><b>Maddy · Setup and support</b><div class="note">One shared thread · replies in about an hour</div></div></div>
   <button class="btn sm" style="margin-top:10px" data-act="toast|Opened your shared thread with Maddy.">Message Maddy</button></div>
  <div class="card pad"><div class="eyb">Drafted for you, from your website and Google profile</div>
   <div style="margin-top:8px;display:grid;gap:6px;font-size:13px"><div class="row">${ic('chk', 14, 3)} Profile: sells, rents and manages</div><div class="row">${ic('chk', 14, 3)} Hours: Mon–Fri 9–6, Sat 10–2</div><div class="row">${ic('book', 14)} 24 answers waiting on the fact sheet <button class="link" style="margin-left:auto" data-go="console:facts">Review</button></div></div></div>
  <div class="card pad"><div class="eyb">Data you can take with you</div><p class="note" style="margin:6px 0 10px">From day one, every record, receipt and payment exports in one file.</p><button class="btn sm" data-act="toast|Export started. A link arrives by email in a few minutes.">${ic('down', 14)} Export everything</button></div>
 </div></div>
 <div class="row" style="margin-top:30px;align-items:flex-end"><div><h2 class="h2">Connections</h2><div class="note">Who sets each one up, what it needs, and what works while it waits.</div></div><span style="flex:1"></span><span class="up"><b>UPGRADE</b> "While it waits" column: a pending approval never looks like a broken product.</span></div>
 <div class="card" style="margin-top:10px;overflow:auto"><table class="tbl"><thead><tr><th>Connection</th><th>Who</th><th>Needs</th><th>Status</th><th>While it waits</th></tr></thead><tbody>${conns}</tbody></table></div>
 ${S.sc.pms === 'appfolio' ? W.dataMap() : ''}
 <div class="row" style="margin-top:30px"><h2 class="h2">Doors, tested every morning</h2><span class="note" style="margin-left:8px">Sent, arrived, replied</span></div>
 <div class="card" style="margin-top:10px"><table class="tbl"><thead><tr><th>Door</th><th>Mode</th><th>Today's test</th><th>Times</th></tr></thead><tbody>
 ${[['Mailbox · leasing@palmettotide.com', 'pass', '6:02 sent · 6:02 arrived · 6:02 replied'], ['Web form · palmettotide.com/contact', 'pass', '6:03 · 6:03 · 6:03'], ['Chat · palmettotide.com', 'pass', '6:03 · 6:03 · 6:03'], ['Text · (954) 555-0100', S.sc.texting === 'live' ? 'pass' : 'wait', S.sc.texting === 'live' ? '6:04 · 6:04 · 6:05' : 'Not tested: waiting on carriers'], ['Calls · forwarding', 'fail', 'Failed at 6:05: the call rang out. Forwarding looks off.']].map(([d, s, t]) => `<tr><td><b>${d}</b></td><td>${S.setup.live ? 'Live' : 'Shadow'}</td><td>${s === 'pass' ? '<span class="pill p-clr">Pass</span>' : s === 'wait' ? '<span class="pill p-pen">Waiting</span>' : '<span class="pill p-bad">Fail</span>'}</td><td class="note">${t}${s === 'fail' ? ` <button class="link" data-act="toast|Steps sent to Dana: re-dial *72 from the office phone.">Fix it</button>` : ''}</td></tr>`).join('')}</tbody></table></div>`;
};
W.modeSeg = () => `<div class="seg" style="margin-top:8px">${[['auto', 'Auto-send from day one'], ['review', 'Review the first week'], ['always', 'Review every reply']].map(([k, l]) => `<button class="${S.setup.mode === k ? 'on' : ''}" data-act="mode|${k}">${l}</button>`).join('')}</div>`;
W.ACT.mode = (k) => { S.setup.mode = k; S._keepY = true; W.render(); W.toast(k === 'auto' ? 'Replies that pass the rules send on their own. Price, offers and hard cases still come to you.' : k === 'review' ? 'For 7 days every draft waits for 1 Send, 2 Edit, 3 I\'ll call. Then it switches to auto-send.' : 'Every reply waits for you. Customers still get the 60-second first reply.'); };
W.ACT.stepDone = (k) => { if (k === 'texting') S.setup.texting = 'filed'; else S.setup[k] = true; S._keepY = true; W.render(); if (k === 'exports') W.ACT.importModal(); else W.toast({ email: 'Test email sent… arrived… replied in 14 sec.', calls: 'Test call placed. It rang through to the desk.', chat: 'Chat is on your site.', texting: 'Filed with the carriers. We\'ll tell you the moment it clears.' }[k] || 'Done.'); };
W.ACT.goLive = () => { S.setup.live = true; S._keepY = true; W.render(); W.toast('You\'re live on new inquiries. No bill before this moment.'); };
W.ACT.profileModal = () => { S.modal = { k: 'profile' }; S._keepY = true; W.render(); };
W.MODALS.profile = () => `<div class="row"><h3 class="h2">The profile we drafted</h3><button class="btn ghost sm" style="margin-left:auto" data-act="modalClose">${ic('x')}</button></div>
 <p class="note">From palmettotide.com and your Google profile. Our team checked it before you see it.</p>
 <div style="display:grid;gap:8px;margin-top:10px;font-size:13px">${[['Type', 'Sells, rents and manages'], ['Areas', 'Fort Lauderdale, Wilton Manors, Oakland Park, Pompano Beach'], ['Hours', 'Mon–Fri 9–6 · Sat 10–2 · texts 8 a.m.–8 p.m.'], ['Routing', 'Rentals → Camila · Sales → Marcus · Owners → Dana'], ['Tone', 'Warm, short, bilingual']].map(([a, b]) => `<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--line2);padding-bottom:6px"><span class="note">${a}</span><span>${b}</span></div>`).join('')}</div>
 <div class="row" style="margin-top:14px"><button class="btn pri" data-act="profileOk">Approve</button><button class="btn" data-act="toast|Edits go to Maddy, who updates it during the call.">Change something</button></div>`;
W.ACT.profileOk = () => { S.setup.profile = true; S.modal = null; S._keepY = true; W.render(); W.toast('Profile approved.'); };
W.ACT.importModal = () => { S.modal = { k: 'import' }; S._keepY = true; W.render(); };
W.MODALS.import = () => `<div class="row"><h3 class="h2">Import receipt · batch 1</h3><button class="btn ghost sm" style="margin-left:auto" data-act="modalClose">${ic('x')}</button></div>
 <p class="note">Every row is accounted for. The AI suggested the column matches; it never rewrites a name, phone, email or address.</p>
 <div class="grid3" style="margin-top:12px">${[['1,240', 'ready', 'p-clr'], ['37', 'need a look · about 6 min', 'p-pen'], ['12', "can't import", 'p-bad']].map(([n, l, c]) => `<div class="card pad"><div class="sora" style="font-size:24px;font-weight:600">${n}</div><span class="pill ${c}" style="margin-top:6px">${l}</span></div>`).join('')}</div>
 <div class="card" style="margin-top:12px;font-size:12.5px">${[['Row 212', 'Two people share one phone number', 'Keep both'], ['Row 418', 'Email looks mistyped: gmial.com', 'Keep as is'], ['Row 1,077', 'No name, phone only', 'Import as new person']].map(([a, b, c]) => `<div class="row" style="padding:9px 12px;border-bottom:1px solid var(--line2)"><span class="mono note" style="width:70px">${a}</span><span style="flex:1">${b}</span><button class="btn sm">${c}</button></div>`).join('')}</div>
 <p class="note" style="margin-top:10px">1,289 rows from Follow Up Boss and AppFolio exports. Imported contacts get texts only after they say yes. Undo this whole batch until Dec 23.</p>
 <div class="row" style="margin-top:10px"><button class="btn pri" data-act="modalClose">Done</button><button class="btn" data-act="toast|Batch 1 undone. Nothing else changed.">Undo batch</button></div>`;

W.connRows = () => {
 const pms = S.sc.pms === 'appfolio';
 const rows = [
  ['Mailbox', 'Google Workspace forwarding', 'You', 'A forwarding rule', 'ok', 'Live · test passed 6:02 a.m.', '—'],
  ['Calls', 'Call forwarding', 'You', 'Dial *72 on the office line', 'bad', 'Failing since 6:05 a.m.', 'Calls ring your office as before'],
  ['Texting number', 'A2P 10DLC registration', 'Wynsley files', 'Your EIN · carrier review', S.sc.texting === 'live' ? 'ok' : 'wait', S.sc.texting === 'live' ? 'Approved Nov 24' : 'Filed Nov 20 · usually days, up to 6 weeks', 'Replies go by email and chat. Tap-to-text is hidden.'],
  ['MLS feed', 'BeachesMLS via Spark', 'You sign · MLS approves', 'Data agreement naming Wynsley "Consultant"', 'wait', 'Agreement signed Nov 21 · MLS reviewing', "The desk answers from your own listings; others link to the MLS page"],
  ['Property software', pms ? 'AppFolio' : 'None', pms ? 'You' : '—', pms ? 'A read-only user · or an export' : '—', pms ? 'ok' : 'na', pms ? 'Read-only · synced 9:40 a.m.' : 'Rentals are kept in Wynsley', pms ? '—' : '—'],
  ['Stripe (online rent)', 'Your own Stripe account', 'You', 'Business details, trust account, Stripe review', S.sc.stripe === 'live' ? 'ok' : S.sc.stripe === 'none' ? 'todo' : 'wait', { live: 'Active · payouts to trust ••4821', test: 'Test mode · no real money', info: 'Needs information: trust account letter', none: 'Not started' }[S.sc.stripe], 'Tenants pay the way they do today'],
  ['Google Business Profile', 'Manager access', 'You grant, we manage', 'Owner verification', 'wait', 'Verified · posting allowed from Jan 18', 'We draft posts; you post them'],
  ['Calendars', 'Google Calendar', 'Each agent', 'One click each', 'ok', '3 of 4 connected', 'Jo hasn\'t joined yet']
 ];
 const p = { ok: '<span class="pill p-clr">Connected</span>', wait: '<span class="pill p-pen">Waiting</span>', bad: '<span class="pill p-bad">Failing</span>', todo: '<span class="pill p-mut">Not started</span>', na: '<span class="pill p-mut">Not used</span>' };
 return rows.map(r => `<tr class="click" data-act="${r[0].startsWith('Stripe') ? 'goStripe' : 'toast|' + r[0] + ': ' + r[5]}"><td><b>${r[0]}</b><div class="note">${r[1]}</div></td><td>${r[2]}</td><td class="note">${r[3]}</td><td>${p[r[4]]}<div class="note" style="margin-top:3px">${r[5]}</div></td><td class="note">${r[6]}</td></tr>`).join('');
};
W.ACT.goStripe = () => { S.payTab = 'stripe'; W.go('console:rent'); };
W.dataMap = () => `<div class="row" style="margin-top:30px;align-items:flex-end"><div><h2 class="h2">Where your data lives</h2><div class="note">You keep AppFolio. This is what it owns and what Wynsley owns.</div></div><span style="flex:1"></span><span class="up"><b>UPGRADE</b> One map instead of guessing field by field.</span></div>
 <div class="grid2" style="margin-top:10px"><div class="card pad"><div class="row"><span class="src">${ic('lockI', 11)} AppFolio owns · read-only here</span></div><div style="margin-top:10px;display:grid;gap:6px;font-size:13px">${['Units, owners and tenants', 'Leases and rent amounts', 'Rent payments (paid in AppFolio)', 'Work orders, once sent'].map(x => `<div class="row">${ic('lockI', 13)} ${x}</div>`).join('')}</div><p class="note" style="margin-top:10px">Edit these in AppFolio. Synced every hour · last at 9:40 a.m. · mode: read-only</p></div>
 <div class="card pad"><div class="row"><span class="src here">Wynsley owns · edit here</span></div><div style="margin-top:10px;display:grid;gap:6px;font-size:13px">${['Every conversation, tour and hand-off', 'Leads, deals and the pipeline', 'Repair requests until sent to AppFolio', 'Owner updates and seller logs', 'Custom fields and notes'].map(x => `<div class="row">${ic('chk', 13, 3)} ${x}</div>`).join('')}</div><p class="note" style="margin-top:10px">Nothing here writes back to AppFolio except repair requests it accepts.</p></div></div>`;

/* ---------- team & access (12) ---------- */
W.CR.team = () => `<div class="row" style="align-items:flex-end"><div><div class="eyb scr">Screen 12 · Sign-in and invites</div><h1 class="h1" style="margin-top:6px">Team &amp; access</h1><p class="sub">Invite only. Removing someone signs them out everywhere at once.</p></div><span style="flex:1"></span><button class="btn pri" data-act="inviteModal">Invite someone</button></div>
 <div class="card" style="margin-top:16px"><table class="tbl"><thead><tr><th>Person</th><th>Role</th><th>Status</th><th>Last sign-in</th><th>Alerts by</th><th></th></tr></thead><tbody>
 ${S.staff.map(p => `<tr><td><b>${p.name}</b>${p.note ? `<div class="note">${p.note}</div>` : ''}</td><td>${p.status === 'removed' ? '—' : `<span class="pill p-mut">${p.role}</span>`}</td><td>${p.status === 'active' ? '<span class="pill p-clr">Active</span>' : p.status === 'invited' ? `<span class="pill p-pen">Invited</span><div class="note">${p.exp}</div>` : '<span class="pill p-bad">Removed</span>'}</td><td class="note">${p.last}${p.dev ? ` · ${p.dev} device${p.dev > 1 ? 's' : ''}` : ''}</td><td class="note">${p.alerts}</td>
 <td style="text-align:right">${p.id === 'dana' ? '<span class="note">You</span>' : p.status === 'active' ? `<button class="btn sm" data-act="toast|Role options: owner, admin, agent, reviewer.">Change role</button> <button class="btn sm" data-act="removeStaff|${p.id}">Remove</button>` : p.status === 'invited' ? `<button class="btn sm" data-act="toast|Invite re-sent to ${p.name}. It expires in 7 days.">Resend</button>` : `<button class="btn sm" data-act="toast|Re-invite sent. They start fresh, with no old sessions.">Re-invite</button>`}</td></tr>`).join('')}
 </tbody></table></div>
 <div class="grid2" style="margin-top:16px"><div class="card pad"><div class="eyb">Agents rarely open the console</div><p style="margin:6px 0 0">Alerts carry signed links and reply codes: <b>1 Send · 2 Edit · 3 I'll call</b>. A link works for one item, for 24 hours.</p><button class="btn sm" style="margin-top:10px" data-go="phone:sms">See an agent's alert</button></div>
 <div class="card pad"><div class="eyb">Wynsley team only</div><p style="margin:6px 0 0">Create a firm at the kickoff and invite its owner. Hidden from firm staff.</p><button class="btn sm" style="margin-top:10px" data-go="console:invite">See the owner's invite</button></div></div>`;
W.ACT.removeStaff = (id) => { const p = S.staff.find(x => x.id === id); p.status = 'removed'; p.note = 'Removed just now by Dana'; const d = p.dev; p.dev = 0; S._keepY = true; W.render(); W.toast(`${p.name} removed. Signed out of ${d || 1} device${d > 1 ? 's' : ''} just now. Open alerts and links stopped working.`); };
W.ACT.inviteModal = () => { S.modal = { k: 'invite' }; S._keepY = true; W.render(); };
W.MODALS.invite = () => `<div class="row"><h3 class="h2">Invite someone</h3><button class="btn ghost sm" style="margin-left:auto" data-act="modalClose">${ic('x')}</button></div>
 <label class="lbl" style="margin-top:12px">Email<input class="inp" value="nina@palmettotide.com" style="margin-top:5px"></label>
 <div class="lbl" style="margin-top:12px">Role</div><div class="seg">${['Owner', 'Admin', 'Agent', 'Reviewer'].map((r, i) => `<button class="${i === 2 ? 'on' : ''}">${r}</button>`).join('')}</div>
 <p class="note" style="margin-top:8px">Agents see their own leads, the queue items routed to them, and the records they work on.</p>
 <div class="card pad" style="margin-top:10px;background:#FBF9F5;font-size:12.5px">The email says: <b>Dana Ruiz invited you to Palmetto &amp; Tide Realty as Agent.</b> Expires in 7 days.</div>
 <div class="row" style="margin-top:14px"><button class="btn pri" data-act="sendInvite">Send invite</button></div>`;
W.ACT.sendInvite = () => { S.staff.push({ id: 'nina', name: 'nina@palmettotide.com', role: 'Agent', status: 'invited', last: '—', dev: 0, alerts: 'Text', exp: 'Expires Nov 30' }); S.modal = null; S._keepY = true; W.render(); W.toast('Invite sent.'); };
})();
/* console part B: Today (3 + brief 5), conversations & receipt (4), people & homes (9), pipeline (10) */
(function () {
const W = window.WyProto, S = W.S, ic = W.ic;
const kindTag = k => ({ rev: '<span class="kind k-rev">REVIEW</span>', q: '<span class="kind k-q">QUESTION</span>', fyi: '<span class="kind k-fyi">FYI</span>', hold: '<span class="kind k-hold">HELD</span>' })[k];
W.kindTag = kindTag;
W.openQ = () => S.queue.filter(q => !S.resolved.includes(q.id));

W.brief = () => {
 const open = W.openQ();
 return `<div class="card pad" style="background:#1D1B19;color:#F3EFE6;border-color:#1D1B19">
 <div class="row"><span class="eyb" style="color:#A39A8C">Morning brief · Mon Nov 23 · also sent by text at 7:30 a.m.</span><span style="flex:1"></span><button class="btn sm" style="background:transparent;color:#F3EFE6;border-color:#4A433C" data-go="phone:sms">See it as a text</button></div>
 <ol style="margin:10px 0 0;padding-left:18px;display:grid;gap:5px">
  <li>14 new inquiries since yesterday, all 14 answered · 9 after hours <button class="link" style="color:#7FE3D6" data-go="console:inbox">see them</button></li>
  <li>Tours today: 11:00 Victoria Park 3/2 with Marcus · 4:30 Coral Ridge #6 with Camila</li>
  <li>${open.filter(q => q.kind !== 'hold').length} waiting for you · 2 tasks due today <button class="link" style="color:#7FE3D6" data-act="qf|all">queue</button> · <button class="link" style="color:#7FE3D6" data-go="console:pipeline">pipeline</button></li>
  <li style="color:#FFB4A6">Broken: call forwarding failed this morning's test <button class="link" style="color:#FFB4A6" data-go="console:setup">fix</button></li>
  <li>Win: Sofía H. booked a Saturday tour at 2:14 a.m., in Spanish, in 38 sec</li></ol>
 <div class="note" style="color:#8C857B;margin-top:8px">Five lines, then it ends.</div></div>`;
};

/* ---------- Today (3) ---------- */
W.CR.today = () => {
 const all = W.openQ();
 const f = S.qf;
 const list = all.filter(q => f === 'all' ? q.kind !== 'hold' : f === 'rent' ? ['rent', 'repair', 'lease'].includes(q.area) : f === 'hold' ? q.kind === 'hold' : q.kind === f);
 const cnt = k => all.filter(q => q.kind === k).length;
 if (!list.find(q => q.id === S.sel)) S.sel = list[0] && list[0].id;
 const sel = all.find(q => q.id === S.sel);
 return `<div class="row" style="align-items:flex-end;flex-wrap:wrap;gap:12px"><div><div class="eyb scr">Screen 3 · The queue, with the morning brief on top</div><h1 class="h1" style="margin-top:6px">Good morning, Dana.</h1><p class="sub">Clear what needs a person. Everything else already happened.</p></div><span style="flex:1"></span><span class="up"><b>UPGRADE</b> The brief and the queue are one screen: the 7:30 text opens exactly this.</span></div>
 <div style="margin-top:16px">${W.brief()}</div>
 <div class="row" style="margin-top:20px;flex-wrap:wrap"><div class="seg">${[['all', `All ${all.filter(q => q.kind !== 'hold').length}`], ['rev', `Review ${cnt('rev')}`], ['q', `Question ${cnt('q')}`], ['fyi', `FYI ${cnt('fyi')}`], ['rent', 'Rentals & rent'], ['hold', `Held ${cnt('hold')}`]].map(([k, l]) => `<button class="${f === k ? 'on' : ''}" data-act="qf|${k}">${l}</button>`).join('')}</div>
 <span class="note" style="margin-left:8px">Keys: 1 Send · 2 Edit · 3 I'll call</span><span style="flex:1"></span>${f === 'hold' ? '<span class="up"><b>UPGRADE</b> Holds live inside the queue as a filter, not a separate screen.</span>' : ''}</div>
 ${list.length ? `<div class="grid2" style="grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);margin-top:12px;align-items:start">
  <div class="card" style="overflow:hidden">${list.map(q => `<div class="qcard ${q.id === S.sel ? 'sel' : ''}" data-act="qsel|${q.id}">${kindTag(q.kind)}<div style="min-width:0"><div class="row" style="gap:6px"><b>${q.who ? W.pname(q.who) : 'Unknown sender'}</b><span class="note">${q.role}</span></div><div style="margin-top:2px">${q.sum}</div><div class="note" style="margin-top:2px">${W.uname(q.prop)}</div></div><span class="note mono" style="white-space:nowrap">${q.wait}</span></div>`).join('')}</div>
  <div class="card pad" style="position:sticky;top:120px">${sel ? W.qDetail(sel) : ''}</div></div>`
 : `<div class="card empty" style="margin-top:12px"><div class="sora" style="font-size:20px;color:var(--ink)">All clear.</div><p>Nothing needs you right now. New items arrive here and on your phone.</p><button class="btn" data-act="reset">Restore the demo items</button></div>`}`;
};
W.ACT.qf = (k) => { S.qf = k; S.surface = 'console'; S.route = 'today'; S._keepY = true; W.render(); };
W.ACT.qsel = (id) => { S.sel = id; S._keepY = true; W.render(); };
W.qDetail = (q) => {
 const person = q.who ? `<button class="link" data-go="console:person:${q.who}">${W.pname(q.who)}</button>` : 'Unknown sender';
 const head = `<div class="row">${kindTag(q.kind)}<span class="note">waiting ${q.wait}</span><span style="flex:1"></span>${q.conv ? `<button class="btn sm" data-go="console:conv:${q.conv}">Open conversation</button>` : ''}${q.pay ? `<button class="btn sm" data-act="openPay|${q.pay}">Open payment</button>` : ''}</div>
 <div style="margin-top:12px"><div style="font-weight:600">${person} <span class="note">· ${q.role} · ${W.uname(q.prop)}</span></div><p style="margin:6px 0 0">${q.sum}</p></div>`;
 if (q.kind === 'rev') return `${head}${q.next ? `<div class="card pad" style="margin-top:12px;background:var(--corbg);border-color:#F6CDB4"><div class="eyb" style="color:var(--cor)">What happens next</div><p style="margin:4px 0 0;font-size:13px">${q.next}</p></div>` : ''}
  <div class="eyb" style="margin-top:14px">Drafted reply${q.area === 'rent' ? ' · in Spanish, her language' : ''}</div><div class="bubble b-draft" style="max-width:100%;margin-top:6px">${q.draft}</div>
  <div class="note" style="margin-top:8px">Sources: ${q.srcs.map(s => `<span class="src" style="margin:2px 2px 0 0">${s}</span>`).join('')}</div>
  <div class="note" style="margin-top:6px">${q.area === 'sales' ? 'Price and offers: AI drafts, your agent sends under their own name.' : 'Sent in the name of Palmetto & Tide. Never asks for gift cards or wire transfers.'}</div>
  <div class="row" style="margin-top:14px;flex-wrap:wrap"><button class="btn pri" data-act="resolve|${q.id}|Sent. Logged on the receipt.">1 Send</button><button class="btn" data-act="toast|Draft opened for editing. Your edit is saved as the sent version.">2 Edit</button><button class="btn" data-act="resolve|${q.id}|Marked: you'll call. Reminder in 30 min if it isn't logged.">3 I'll call</button>${q.area === 'rent' ? `<button class="btn" data-act="openPay|cr4">Record certified funds</button>` : ''}</div>`;
 if (q.kind === 'q') return `${head}<div class="card pad" style="margin-top:12px;background:var(--plumbg);border-color:#DCCFEF"><div class="eyb" style="color:var(--plum)">The desk asks</div><p style="margin:4px 0 0">${q.ask}</p></div>
  ${q.opts ? `<div class="row" style="margin-top:12px;flex-wrap:wrap">${q.opts.map(o => `<button class="btn" data-act="route|${q.id}|${o}">${o}</button>`).join('')}</div><p class="note" style="margin-top:8px">Luis gets a text in Spanish at each step: received, routed, scheduled, done.</p><button class="btn sm" style="margin-top:6px" data-go="console:rentals">See it in repairs</button>`
   : `<input class="inp" style="margin-top:12px" placeholder="Type the answer…" value="Two cats are fine, same $300 fee."><div class="row" style="margin-top:10px"><button class="btn pri" data-act="approveFact">Answer and save as a fact</button><button class="btn" data-act="voice">${ic('mic')} Answer by voice note</button></div>`}`;
 if (q.kind === 'hold') return `${head}<div class="card pad" style="margin-top:12px;background:var(--ambbg);border-color:#F3D9A4"><div class="eyb" style="color:var(--amb)">Why it's held</div><ul style="margin:6px 0 0;padding-left:18px;font-size:13px">${q.why.map(w => `<li>${w}</li>`).join('')}</ul></div>
  <p class="note" style="margin-top:10px">The person already got the same first reply as everyone, and an agent-led showing was offered. Only the door code waits for proof.</p>
  <div class="row" style="margin-top:10px"><button class="btn" data-act="resolve|${q.id}|Kept on hold. Proof link sent; an agent-led showing stays offered.">Keep the proof rule</button><button class="btn" data-act="resolve|${q.id}|Restored. Excluded items always show their evidence.">Restore</button></div>`;
 return `${head}<div class="row" style="margin-top:14px;flex-wrap:wrap">${q.area === 'lease' ? `<button class="btn pri" data-act="resolve|${q.id}|Renewal offer drafted for Andre and a task added for Camila.">Start renewal</button><button class="btn" data-go="console:unit:cr6">Open unit</button>` : `<button class="btn" data-go="console:conv:${q.conv || 'sofia'}">Open receipt</button>`}<button class="btn" data-act="resolve|${q.id}|Dismissed.">Dismiss</button></div>`;
};
W.ACT.resolve = (id, msg) => { S.resolved.push(id); S._keepY = true; W.render(); W.toast(msg); };
W.ACT.route = (id, who) => { S.repairRouted.kl1 = who; S.resolved.push(id); S._keepY = true; W.render(); W.toast(`Sent to ${who}. Luis got a text: "Su reparación fue asignada."`); };
W.ACT.openPay = (u) => { S.rentSel = u; S.payTab = 'month'; W.go('console:rent'); };

/* ---------- Conversations & receipt (4) ---------- */
W.convs = {
 sofia: { who: 'sofia', ch: 'Website chat → text', st: 'handed off', prop: 'wm2', lang: 'Spanish', msgs: [
  ['in', '2:14 a.m.', '¿El 2 hab. en Wilton Manors acepta perros?'],
  ['ai', '2:14 a.m. · 38 sec', 'Hola, soy el asistente de IA de Palmetto & Tide. Sí, se permite un perro de hasta 25 lb, con un cargo de $300. ¿Quiere verlo? Tengo sábado 11:00, 1:00 o 4:00.'],
  ['in', '2:16 a.m.', 'Sábado a la 1:00 por favor'],
  ['ai', '2:16 a.m.', 'Listo: sábado 1:00 p.m. Camila Reyes la acompañará. Para recordatorios por texto, toque "Text us".'],
  ['sys', '2:17 a.m.', 'Hand-off offered to Camila Reyes · 15-min clock (starts at 9:00 a.m., office hours)'],
  ['me', '9:02 a.m. · Camila Reyes', '¡Hola Sofía! Soy Camila. Nos vemos el sábado a la 1:00.']],
  rc: [['Inquiry arrived', '2:14:06 a.m. · chat', 'Our system', 'ok'], ['Told it is an AI', 'First message', 'Our system', 'ok'], ['First useful reply', '38 sec', 'Our system', 'ok'], ['Fact stated: dogs up to 25 lb, $300', 'Fact sheet · Pets · approved Nov 22 by Dana', 'Our system', 'ok'], ['Text consent', 'Tapped "Text us" · 2:17 a.m.', 'Twilio', 'ok'], ['Tour booked', 'Sat 1:00 p.m.', 'Our system', 'ok'], ['Licensed person took over', 'Camila Reyes · accepted in 2 min', 'Our system', 'ok cur']] },
 jordan: { who: 'jordan', ch: 'Email', st: 'waiting for review', prop: 'vp-list', lang: 'English', msgs: [
  ['in', '8:51 a.m.', 'Is 1520 NE 4th still available? Would the seller take $650k?'],
  ['ai', '8:51 a.m. · 41 sec', "Hi Jordan, I'm Palmetto & Tide's AI assistant. Yes, 1520 NE 4th Ave is active at $689,000: 3 bed, 2 bath. I can book a showing. Pricing questions go to one of our licensed agents."],
  ['draft', 'Waiting for review', "Thanks, Jordan. Price and offers are a conversation for one of our licensed agents. Marcus Bell can call you today. What time works?"]],
  rc: [['Inquiry arrived', '8:51:02 a.m. · email', 'Google', 'ok'], ['Told it is an AI', 'First message', 'Our system', 'ok'], ['First useful reply', '41 sec', 'Our system', 'ok'], ['Fact stated: list price $689,000', 'Listing field · ListPrice · MLS F10498812', 'Our system', 'ok'], ['Price question → licensed person', 'Waiting for review · 6 min', 'Our system', 'pen cur']] }
};
W.CR.inbox = () => `<div class="eyb scr">Screen 4 · Conversations</div><h1 class="h1" style="margin-top:6px">Conversations</h1><p class="sub">Every email, text, chat and call, newest first. Calls show here as conversations.</p>
 <div class="card" style="margin-top:16px"><table class="tbl"><thead><tr><th>Person</th><th>About</th><th>Channel</th><th>Status</th><th>First reply</th></tr></thead><tbody>
 ${[['jordan', 'vp-list', 'Email', '<span class="pill p-pen">Waiting for review</span>', '41 sec'], ['sofia', 'wm2', 'Chat → text', '<span class="pill p-clr">Handed off · Camila</span>', '38 sec'], ['luis', 'kl1', 'Text · repair', '<span class="pill p-mut">Open</span>', '22 sec'], ['robert', 'kl2', 'Email', '<span class="pill p-clr">Handed off · Marcus</span>', '52 sec']].map(([w, p, c, s, t]) => `<tr class="click" data-go="console:conv:${W.convs[w] ? w : 'sofia'}"><td><b>${W.pname(w)}</b></td><td class="note">${W.uname(p)}</td><td>${c}</td><td>${s}</td><td class="mono">${t}</td></tr>`).join('')}</tbody></table></div>`;
W.CR.conv = (id) => {
 const c = W.convs[id] || W.convs.sofia, p = W.people[c.who];
 const lab = { in: p.name, ai: 'AI assistant', me: '', draft: 'Draft · not sent', sys: 'System' };
 return `<div class="row"><button class="btn sm ghost" data-go="back">${ic('back', 14)} Back</button><span class="note">Conversations / ${p.name}</span></div>
 <div class="grid2" style="grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);margin-top:10px;align-items:start">
 <div class="card"><div class="pad row" style="border-bottom:1px solid var(--line2)"><div><h1 class="h2">${p.name}</h1><div class="note">${c.ch} · ${c.lang} · ${W.uname(c.prop)}</div></div><span style="flex:1"></span><span class="pill ${c.st === 'handed off' ? 'p-clr' : 'p-pen'}">${c.st}</span></div>
  <div class="pad" style="display:grid;gap:10px">${c.msgs.map(([k, t, m]) => k === 'sys' ? `<div class="note mono" style="text-align:center;font-size:11px">${m} · ${t}</div>` : `<div><div class="who" style="text-align:${k === 'in' ? 'left' : 'right'}">${k === 'me' ? t : lab[k] + ' · ' + t}${k === 'ai' ? ' · <b>AI</b>' : ''}</div><div class="bubble ${{ in: 'b-in', ai: 'b-ai', me: 'b-me', draft: 'b-draft' }[k]}" style="margin-top:3px">${m}</div></div>`).join('')}
  ${c.st === 'waiting for review' ? `<div class="row" style="justify-content:flex-end"><button class="btn pri" data-act="resolve|q1|Sent by Marcus under his own name.">1 Send</button><button class="btn">2 Edit</button><button class="btn" data-act="resolve|q1|Marcus will call. Logged.">3 I'll call</button></div>` : ''}</div></div>
 <div style="display:grid;gap:14px">
  <div class="card pad"><div class="row"><div class="eyb">Receipt</div><span style="flex:1"></span><span class="pill p-ink" title="Log locked at 3:00 a.m.">${ic('lockI', 11)} Sealed 3:00 a.m.</span></div>
   <div class="grid2" style="margin:10px 0 14px;gap:8px"><div class="card" style="padding:10px"><div class="note">First useful reply</div><div class="sora" style="font-size:20px;font-weight:600">${id === 'jordan' ? '41 sec' : '38 sec'}</div></div><div class="card" style="padding:10px"><div class="note">First licensed person</div><div class="sora" style="font-size:20px;font-weight:600">${id === 'jordan' ? '—' : '6 h 48 m'}</div><div class="note">${id === 'jordan' ? 'waiting' : 'office opened 9:00'}</div></div></div>
   <div class="tl">${c.rc.map(([a, b, w, s]) => `<div class="tl-i ${s}"><div style="font-weight:600;font-size:13px">${a}</div><div class="note">${b}</div><div class="who">stamped by ${w}</div></div>`).join('')}</div>
   <div class="row"><button class="btn sm" data-act="toast|Share link copied. It shows the receipt, not the customer's contact details.">Share as a page</button><span class="note">Guarantee: met</span></div></div>
  <div class="card pad"><div class="eyb">Contact</div><div style="margin-top:6px"><b>${p.name}</b><div class="note">${p.roles.map(r => r[0]).join(' · ')} · ${p.lang}</div><div class="note">Text consent: ${p.consent.text}</div></div><button class="btn sm" style="margin-top:10px" data-go="console:person:${c.who}">Full record →</button></div>
  ${c.prop === 'vp-list' ? `<div class="card pad"><div class="eyb">Listing</div><b style="display:block;margin-top:6px">${W.listing.addr}</b><div class="note">${W.listing.price} · ${W.listing.bb} · ${W.listing.status}</div><div class="note">Listed by Palmetto & Tide · MLS ${W.listing.mls}</div></div>` : `<div class="card pad"><div class="eyb">Home</div><b style="display:block;margin-top:6px">${W.uname(c.prop)}</b><div class="note">2 bd · 1 ba · $2,100/mo · vacant</div><button class="btn sm" style="margin-top:8px" data-go="console:unit:${c.prop}">Open unit</button></div>`}
 </div></div>`;
};

/* ---------- People & homes (9) ---------- */
W.CR.people = () => `<div class="eyb scr">Screen 9 · Person and property record</div><h1 class="h1" style="margin-top:6px">People &amp; homes</h1><p class="sub">One record per person, across buying, selling, renting and owning. Nobody typed any of it.</p>
 <div class="card" style="margin-top:16px"><table class="tbl"><thead><tr><th>Person</th><th>Roles</th><th>Last touch</th><th>Agent</th></tr></thead><tbody>
 ${['robert', 'sofia', 'jordan', 'yolanda', 'luis', 'marisol', 'helen', 'gina', 'daniel'].map(id => { const p = W.people[id]; return `<tr class="click" data-go="console:person:${id}"><td><b>${p.name}</b><div class="note">${p.phone} · ${p.lang}</div></td><td>${[...new Set(p.roles.map(r => r[0]))].map(r => `<span class="pill ${/Owner|selling/.test(r) ? 'p-plm' : /Tenant|rent/.test(r) ? 'p-clr' : 'p-mut'}" style="margin:2px">${r}</span>`).join('')}</td><td class="note">${id === 'robert' ? 'Today · email' : 'This week'}</td><td class="note">${p.agent || (id === 'sofia' ? 'Camila Reyes' : id === 'jordan' ? 'Marcus Bell' : 'Camila Reyes')}</td></tr>`; }).join('')}</tbody></table></div>`;

const robertTL = [
 ['sales', 'Today 8:30 a.m.', 'Email', 'Asked: "What could Unit 2 sell for?" AI answered with the process, offered Marcus.', 'Handed off to Marcus · accepted in 4 min', 'conv'],
 ['rent', 'Nov 17', 'Owner update', 'Owner note: both units paid for November; the Unit 1 faucet is fixed.', 'Sent by Dana · in the owner note', null],
 ['rent', 'Nov 9', 'Payment', 'Unit 2 · Yolanda Pierre · $2,350 · in the trust account', 'Payout po_1Qb…31', 'pay:kl2'],
 ['rent', 'Nov 4', 'Payment', 'Unit 1 · Luis Ortega · $2,150 · in the trust account', 'Payout po_1Qa…77', 'pay:kl1'],
 ['rent', 'Oct 28', 'Repair', 'Unit 1 · leaking faucet · routed to Ray, done in 2 days', 'Tenant texted at each step', null],
 ['sales', 'Sep 3', 'Tour', 'Toured 1520 NE 4th Ave with Marcus (as a buyer, for himself)', 'Completed', null],
 ['rent', 'Mar 2024', 'Owner', 'Became owner of 1418 NE 15th Ave · management deal won', 'Deal · management · won', null],
 ['rent', 'Aug 2021', 'Renter', 'Rented 2200 Coral Ridge #6 through Palmetto & Tide', 'Lease ended Jan 2023', null]
];
W.CR.person = (id) => {
 const p = W.people[id] || W.people.robert;
 if (id !== 'robert') return W.personSimple(id, p);
 const f = S.personF;
 const tl = robertTL.filter(t => f === 'all' || t[0] === f);
 return `<div class="row"><button class="btn sm ghost" data-go="back">${ic('back', 14)} Back</button><span class="note">People & homes / ${p.name}</span></div>
 <div class="row" style="margin-top:10px;align-items:flex-start;flex-wrap:wrap;gap:16px"><div><h1 class="h1">${p.name}</h1>
  <div class="row" style="margin-top:8px;flex-wrap:wrap;gap:6px"><span class="pill p-plm">Owner · 2 units at 1418 NE 15th Ave</span><span class="pill p-plm">Thinking of selling · Unit 2</span><span class="pill p-mut">Former renter · 2021–23</span><span class="pill p-mut">Toured as a buyer · Sep</span></div></div>
  <span style="flex:1"></span><button class="btn" data-go="console:conv:sofia">${ic('mail', 14)} Email</button><button class="btn">${ic('phone', 14)} Call</button><button class="btn pri" data-act="toast|Task added for Marcus: prepare a pricing conversation for Unit 2.">Add task</button></div>
 <div class="up" style="margin-top:12px"><b>UPGRADE</b> One timeline with a colour per side of the business, not a Sales tab and a Rentals tab: the renter who became an owner who now wants to sell reads as one story.</div>
 <div class="grid2" style="grid-template-columns:260px minmax(0,1fr) 300px;margin-top:14px;align-items:start">
  <div class="card pad" style="font-size:13px"><div class="eyb">Contact</div><div style="margin-top:6px">${p.phone}<br>${p.email}<br>${p.lang}</div>
   <div class="eyb" style="margin-top:14px">Consent</div>${Object.entries(p.consent).map(([k, v]) => `<div class="row" style="margin-top:4px"><span style="width:44px" class="note">${k}</span><span>${v}</span></div>`).join('')}
   <div class="eyb" style="margin-top:14px">Custom fields</div><div class="note" style="margin-top:4px">Prefers email · Pays HOA himself</div>
   <div class="eyb" style="margin-top:14px">Drips</div><div class="row" style="margin-top:4px"><span>Owner check-in, quarterly</span><button class="link" style="margin-left:auto" data-act="toast|Drip stopped for Robert. Logged.">Stop</button></div></div>
  <div class="card pad"><div class="row"><div class="seg">${[['all', 'Everything'], ['sales', 'Buying & selling'], ['rent', 'Renting & owning']].map(([k, l]) => `<button class="${f === k ? 'on' : ''}" data-act="pf|${k}">${l}</button>`).join('')}</div><span style="flex:1"></span><span class="note">newest first</span></div>
   <div class="tl" style="margin-top:14px">${tl.map(t => `<div class="tl-i ok" style="--c:1"><div class="row" style="gap:6px"><span class="dot" style="background:${t[0] === 'sales' ? '#5B3E8C' : '#0B6F69'}"></span><b style="font-size:13px">${t[2]}</b><span class="note">${t[1]}</span></div><div style="margin-top:2px;font-size:13px">${t[3]}</div><div class="row" style="gap:8px"><span class="note">${t[4]}</span>${t[5] ? `<button class="link" style="font-size:12px" data-${t[5].startsWith('pay') ? 'act="openPay|' + t[5].split(':')[1] + '"' : 'go="console:conv:robert"'}>open</button>` : ''}</div></div>`).join('')}</div></div>
  <div style="display:grid;gap:12px">
   <div class="card pad"><div class="eyb">Homes</div>${['kl1', 'kl2'].map(u => { const x = W.unit(u); const py = W.pays[u]; return `<button class="cs-nav" style="padding:10px 0;border-bottom:1px solid var(--line2);border-radius:0" data-go="console:unit:${u}"><span style="text-align:left"><b>${x.unit}</b> · owner<div class="note">${W.pname(x.tenant)} · ${W.money(x.rent)}/mo</div></span><span style="margin-left:auto">${W.payPill(py.st)}</span></button>`; }).join('')}<div class="note" style="margin-top:8px">Rent: November, as of 10:42 a.m.</div></div>
   <div class="card pad"><div class="eyb">Open deals</div><div style="margin-top:6px"><span class="pill p-plm">Sale</span> <b>1418 NE 15th Ave · Unit 2</b><div class="note">Stage: thinking · Marcus · 0 days</div></div><div style="margin-top:8px"><span class="pill p-clr">Management</span> <b>1418 NE 15th Ave</b><div class="note">Won Mar 2024 · Dana</div></div><button class="btn sm" style="margin-top:10px" data-go="console:pipeline">Pipeline →</button></div>
   <div class="card pad" style="background:var(--ambbg);border-color:#F3D9A4"><div class="eyb" style="color:var(--amb)">Worth knowing</div><p style="margin:4px 0 0;font-size:13px">If Unit 2 sells, Yolanda's lease runs to Jul 31, 2027. The desk won't discuss this with her; Marcus and Dana lead.</p></div>
  </div></div>`;
};
W.ACT.pf = (k) => { S.personF = k; S._keepY = true; W.render(); };
W.personSimple = (id, p) => `<div class="row"><button class="btn sm ghost" data-go="back">${ic('back', 14)} Back</button><span class="note">People & homes / ${p.name}</span></div>
 <h1 class="h1" style="margin-top:10px">${p.name}</h1><div class="row" style="margin-top:8px;flex-wrap:wrap;gap:6px">${p.roles.map(r => `<span class="pill ${/Owner|buy/.test(r[0]) ? 'p-plm' : 'p-clr'}">${r[0]}${r[1] ? ' · ' + W.uname(r[1]) : ''}</span>`).join('')}</div>
 <div class="grid2" style="margin-top:14px"><div class="card pad"><div class="eyb">Contact and consent</div><div style="margin-top:6px">${p.phone} · ${p.email} · ${p.lang}</div>${Object.entries(p.consent).map(([k, v]) => `<div class="note">${k}: ${v}</div>`).join('')}</div>
 <div class="card pad"><div class="eyb">Linked</div>${p.roles.filter(r => r[1] && r[1] !== 'vp-list').map(r => `<button class="cs-nav" data-go="console:unit:${r[1]}">${ic('home', 14)} ${W.uname(r[1])}</button>`).join('')}${W.convs[id] ? `<button class="cs-nav" data-go="console:conv:${id}">${ic('chat', 14)} Conversation and receipt</button>` : ''}${p.roles.some(r => r[0] === 'Tenant') ? `<button class="cs-nav" data-act="openPay|${p.roles.find(r => r[0] === 'Tenant')[1]}">${ic('card', 14)} Rent and payments</button>` : ''}</div></div>
 <p class="note" style="margin-top:12px">A tenant's lease and payments show to staff only.</p>`;

/* ---------- Pipeline (10) ---------- */
W.CR.pipeline = () => {
 const deals = [['sale', 'Robert Klein', '1418 NE 15th Ave · Unit 2', 'Marcus', 'Thinking', '0 d', 'robert'], ['sale', 'Jordan Avery', '1520 NE 4th Ave', 'Marcus', 'Touring', '1 d', 'jordan'], ['lease', 'Sofía Herrera', '2611 NW 9th Ave · B', 'Camila', 'Tour booked', '1 d', 'sofia'], ['lease', 'Andre Thompson', 'Coral Ridge #6 · renewal', 'Camila', 'Renewal not started', '69 d to end', 'andre'], ['management', 'Gina Morales', '3 more units, Pompano', 'Dana', 'Proposal sent', '5 d', 'gina'], ['sale', 'Daniel Kim', 'Wants to buy · first home', 'Marcus', 'New', '2 d', 'daniel']];
 const t = S.pipeTab;
 const stages = { sale: ['New', 'Thinking', 'Touring', 'Offer', 'Under contract'], lease: ['New', 'Tour booked', 'Applied', 'Renewal not started', 'Signed'], management: ['New', 'Proposal sent', 'Signed'] };
 const kinds = t === 'all' ? ['sale', 'lease', 'management'] : [t];
 return `<div class="eyb scr">Screen 10 · Pipeline and follow-ups</div><h1 class="h1" style="margin-top:6px">Pipeline</h1><p class="sub">Sales, leases and management in one pipeline, by stage. Nobody types to move a card: tours, replies and signatures move them.</p>
 <div class="row" style="margin-top:14px"><div class="seg">${[['all', 'All'], ['sale', 'Sales'], ['lease', 'Leases'], ['management', 'Management']].map(([k, l]) => `<button class="${t === k ? 'on' : ''}" data-act="pt|${k}">${l}</button>`).join('')}</div></div>
 ${kinds.map(k => `<div style="margin-top:16px"><div class="eyb">${k}</div><div class="row" style="align-items:stretch;gap:10px;margin-top:8px;overflow:auto">${stages[k].map(s => `<div style="flex:1;min-width:170px;background:#F1ECE3;border-radius:12px;padding:8px"><div class="note" style="font-weight:600;padding:2px 4px 6px">${s}</div>${deals.filter(d => d[0] === k && d[4] === s).map(d => `<button class="card" style="display:block;width:100%;text-align:left;padding:10px;margin-bottom:6px" data-go="console:person:${d[6]}"><b style="font-size:13px">${d[1]}</b><div class="note">${d[2]}</div><div class="note">${d[3]} · ${d[5]}</div></button>`).join('')}</div>`).join('')}</div></div>`).join('')}
 <div class="grid2" style="margin-top:20px"><div class="card pad"><div class="eyb">Due today</div>${[['Call Jordan about price', 'Marcus', 'jordan'], ['Send renewal to Andre', 'Camila', 'andre']].map(([a, b, c]) => `<div class="row" style="padding:8px 0;border-bottom:1px solid var(--line2)"><button class="btn sm" data-act="toast|Done. Logged on ${W.pname(c)}'s record.">${ic('chk', 13, 3)}</button><span>${a}</span><span class="note" style="margin-left:auto">${b}</span></div>`).join('')}</div>
 <div class="card pad"><div class="eyb">Drips</div>${[['New renter · 4 steps over 10 days', '12 people', 'Stops on reply, tour or hand-off'], ['Owner check-in · quarterly', '9 owners', 'Email only'], ['Past buyers · yearly home value', '31 people', '2 taken off: opted out']].map(([a, b, c]) => `<div style="padding:8px 0;border-bottom:1px solid var(--line2)"><b style="font-size:13px">${a}</b><div class="note">${b} · ${c}</div></div>`).join('')}<p class="note" style="margin-top:8px">Texts wait for consent and 8 a.m.–8 p.m. One opt-out stops all marketing.</p></div></div>`;
};
W.ACT.pt = (k) => { S.pipeTab = k; S._keepY = true; W.render(); };
})();
/* console part C: rentals (13), unit timeline, rent & payments (14a), fact sheet (7), reports (5), website (11), replay (2) */
(function () {
const W = window.WyProto, S = W.S, ic = W.ic;

W.convs.robert = { who: 'robert', ch: 'Email', st: 'handed off', prop: 'kl2', lang: 'English', msgs: [
 ['in', '8:30 a.m.', 'Hi, what could Unit 2 at 1418 NE 15th sell for? Thinking about it for next year.'],
 ['ai', '8:30 a.m. · 52 sec', "Hi Robert, I'm Palmetto & Tide's AI assistant. A price opinion comes from one of our licensed agents, so I've asked Marcus Bell to reach out. He can also walk you through selling with a tenant in place."],
 ['sys', '8:31 a.m.', 'Hand-off offered to Marcus Bell · 15-min clock'],
 ['me', '8:35 a.m. · Marcus Bell', "Robert, happy to help. I'll pull recent sales on your street and call you this afternoon."]],
 rc: [['Inquiry arrived', '8:30:11 a.m. · email', 'Google', 'ok'], ['Told it is an AI', 'First message', 'Our system', 'ok'], ['First useful reply', '52 sec', 'Our system', 'ok'], ['Price opinion → licensed person', 'Rule: inform, never advise', 'Our system', 'ok'], ['Licensed person took over', 'Marcus Bell · accepted in 4 min', 'Our system', 'ok cur']] };

/* ---------- Rentals (13) ---------- */
W.repairs = [
 { id: 'r1', unit: 'kl1', who: 'luis', what: 'AC not cooling · 84°F inside', urg: 'urgent', via: 'Text', st: 'new', to: null, when: '—' },
 { id: 'r2', unit: 'cr4', who: 'marisol', what: 'Water under the kitchen sink', urg: 'emergency', via: 'Call · 11:42 p.m. Sat', st: 'done', to: 'Ray (your maintenance)', when: 'Sun 7:10 a.m.', note: 'After hours: Ray didn\'t answer in 5 min, so Dana was called and picked up' },
 { id: 'r3', unit: 'se3', who: 'keisha', what: 'Bedroom blinds broken', urg: 'routine', via: 'Pay page', st: 'scheduled', to: 'Coastal Handyman (vendor)', when: 'Wed 10–12' }
];
W.CR.rentals = () => {
 const t = S.rentalsTab, pms = S.sc.pms === 'appfolio';
 const tabs = [['units', 'Units'], ['leases', 'Leases ending'], ['repairs', 'Repairs'], ['owners', 'Owner updates']];
 let body = '';
 if (t === 'units') body = `<table class="tbl"><thead><tr><th>Unit</th><th>Owner</th><th>Tenant</th><th>Rent</th><th>Lease</th><th>Status</th><th>Where it lives</th></tr></thead><tbody>${W.units.map(u => `<tr class="click" data-go="console:unit:${u.id}"><td><b>${u.addr}</b><div class="note">${u.unit || 'Single-family'}</div></td><td>${W.pname(u.owner)}</td><td>${u.tenant ? W.pname(u.tenant) : '<span class="note">No lease</span>'}</td><td class="mono">${W.money(u.rent)}</td><td class="note">${u.lease}</td><td>${u.status === 'vacant' ? '<span class="pill p-mut">Vacant</span>' : u.status === 'notice given' ? '<span class="pill p-pen">Notice given</span>' : '<span class="pill p-clr">Leased</span>'}</td><td>${W.srcChip(u)}</td></tr>`).join('')}</tbody></table>`;
 if (t === 'leases') body = `<table class="tbl"><thead><tr><th>Unit</th><th>Tenant</th><th>Ends</th><th>Renewal</th><th></th></tr></thead><tbody>${[['cr6', 'Jan 31, 2027 · 69 days', '<span class="pill p-bad">Not started</span>', 'In the queue for Camila'], ['vp7', 'Dec 31, 2026 · 38 days', '<span class="pill p-mut">Moving out</span>', 'Listing drafted for Jan 1']].map(([u, e, r, n]) => `<tr class="click" data-go="console:unit:${u}"><td><b>${W.uname(u)}</b></td><td>${W.pname(W.unit(u).tenant)}</td><td>${e}</td><td>${r}</td><td class="note">${n}</td></tr>`).join('')}</tbody></table><div class="pad note">Renewals surface 90 days out, as queue items, not as a report.</div>`;
 if (t === 'repairs') body = `<table class="tbl"><thead><tr><th>Repair</th><th>Unit · tenant</th><th>Urgency</th><th>Came in</th><th>Went to</th><th>Status</th></tr></thead><tbody>${W.repairs.map(r => { const routed = S.repairRouted[r.unit]; const st = r.id === 'r1' && routed ? 'routed' : r.st; const to = r.id === 'r1' ? (routed || '<button class="btn sm pri" data-act="qsel|q3" data-go="console:today">Route it</button>') : r.to; return `<tr><td><b>${r.what}</b>${r.note ? `<div class="note">${r.note}</div>` : ''}</td><td class="note">${W.uname(r.unit)} · ${W.pname(r.who)}</td><td>${r.urg === 'emergency' ? '<span class="pill p-bad">Emergency</span>' : r.urg === 'urgent' ? '<span class="pill p-pen">Urgent</span>' : '<span class="pill p-mut">Routine</span>'}</td><td class="note">${r.via}</td><td>${to}<div class="note">${r.when !== '—' ? r.when : ''}</div></td><td><span class="pill ${st === 'done' ? 'p-clr' : st === 'new' ? 'p-bad' : 'p-pen'}">${st}</span></td></tr>`; }).join('')}</tbody></table>
  <div class="pad note">Routing: emergencies after hours go to your maintenance person, then the owner on call, every 5 minutes until a person answers. ${pms ? 'Sent to AppFolio as a work order where it accepts one.' : ''} The tenant gets a text at each step.</div>`;
 if (t === 'owners') body = `<table class="tbl"><thead><tr><th>Owner</th><th>Last update</th><th>What they were told</th><th></th></tr></thead><tbody>${[['robert', 'Nov 17 · email', 'Both units paid for November. Unit 1 faucet fixed in 2 days.'], ['helen', 'Nov 18 · email', 'Coral Ridge #4 payment returned; office is handling it. #6 renewal starting.'], ['gina', 'Nov 1 · text', 'Unit B listed; 6 inquiries, 2 tours booked.']].map(([o, d, w]) => `<tr><td><b>${W.pname(o)}</b></td><td class="note">${d}</td><td>${w}</td><td><button class="btn sm" data-go="console:reports">Owner note</button></td></tr>`).join('')}</tbody></table>`;
 return `<div class="row" style="align-items:flex-end;flex-wrap:wrap"><div><div class="eyb scr">Screen 13 · Rentals</div><h1 class="h1" style="margin-top:6px">Units, leases, repairs</h1><p class="sub">${pms ? 'Stage 1: AppFolio stays your system for units and leases. Fields from it are read-only here.' : 'Stage 2: no PMS. Units, leases and repairs are kept here, on the same record as your sales.'}</p></div><span style="flex:1"></span>
 ${pms ? `<span class="src">${ic('lockI', 11)} AppFolio · read-only · synced 9:40 a.m.</span><button class="btn sm" data-act="toast|Sync started. Takes about a minute.">Sync now</button>` : `<button class="btn pri" data-act="toast|New unit form: address, owner, rent. Lease comes next.">Add a unit</button>`}</div>
 ${pms ? '' : ''}<div class="row" style="margin-top:14px"><div class="seg">${tabs.map(([k, l]) => `<button class="${t === k ? 'on' : ''}" data-act="rt|${k}">${l}</button>`).join('')}</div></div>
 <div class="card" style="margin-top:12px;overflow:auto">${body}</div>
 ${pms ? `<div class="card pad" style="margin-top:12px;background:var(--corbg);border-color:#F6CDB4"><div class="row"><span class="pill p-bad">Sync failed once</span><span style="font-size:13px">Yesterday 3:40 p.m.: AppFolio returned "rate limit". The next run at 4:40 p.m. worked. Nothing was lost.</span></div></div>` : ''}`;
};
W.ACT.rt = (k) => { S.rentalsTab = k; S._keepY = true; W.render(); };

W.CR.unit = (id) => {
 const u = W.unit(id) || W.unit('kl2'), pms = W.isPms(u), py = W.pays[u.id];
 const f = (l, v) => `<div style="padding:8px 0;border-bottom:1px solid var(--line2)"><div class="note">${l}</div><div class="row" style="justify-content:space-between"><span>${v}</span>${pms ? `<span class="lock" title="Edit in AppFolio">${ic('lockI', 13)}</span>` : `<button class="link" style="font-size:12px" data-act="toast|Edited here. Logged with your name.">Edit</button>`}</div></div>`;
 const tl = u.id === 'kl2' ? [['ok', 'Nov 9', 'Rent in the trust account · $2,350 · payout po_1Qb…31', 'pay'], ['ok', 'Nov 6', 'Rent cleared · bank payment', 'pay'], ['ok', 'Nov 2', 'Yolanda paid by bank from the pay link · $5 fee paid by the firm', 'pay'], ['ok', 'Oct 28', 'Text to Yolanda: rent reminder for Nov 1', 'msg'], ['ok', 'Sep 14', 'Repair: bathroom fan · done in 1 day · Ray', 'rep'], ['ok', 'Aug 1', 'Lease started · $2,350 · due the 1st · 3 grace days', 'lease']]
  : u.id === 'cr4' ? [['bad', 'Nov 17', 'Payment returned by her bank (R01) · $1,800 debited from trust · online payments locked', 'pay'], ['ok', 'Nov 9', 'In the trust account · payout po_1Qb…31', 'pay'], ['ok', 'Nov 8', 'Emergency repair: water under sink · Ray on site Sun 7:10 a.m.', 'rep'], ['ok', 'Nov 3', 'Marisol paid by bank · $1,800', 'pay'], ['ok', 'Jun 1', 'Lease started', 'lease']]
  : [['ok', 'Nov', 'Rent this month: ' + (py ? py.st : 'no lease'), 'pay'], ['ok', u.lease.split(' – ')[0] || '—', 'Lease started', 'lease']];
 const rules = S.leaseRules[u.id] || { partial: false, locked: false, autopay: false };
 return `<div class="row"><button class="btn sm ghost" data-go="back">${ic('back', 14)} Back</button><span class="note">Rentals / ${u.addr} ${u.unit}</span></div>
 <div class="row" style="margin-top:10px;flex-wrap:wrap;align-items:flex-end"><div><h1 class="h1">${u.addr} · ${u.unit || 'House'}</h1><div class="row" style="margin-top:6px;gap:6px">${W.srcChip(u)}${py ? W.payPill(py.st) : ''}</div></div><span style="flex:1"></span>
 ${pms ? `<button class="btn" data-act="toast|Opens this unit in AppFolio, in a new tab.">${ic('ext', 14)} Edit in AppFolio</button>` : ''}<button class="btn" data-act="toast|Repair started. The tenant gets a text with the next step.">${ic('wrench', 14)} New repair</button><button class="btn pri" data-act="openPay|${u.id}">Rent & payments</button></div>
 <div class="grid2" style="grid-template-columns:300px minmax(0,1fr) 280px;margin-top:14px;align-items:start">
  <div class="card pad"><div class="eyb">Lease ${pms ? '· from AppFolio' : '· kept here'}</div>${f('Tenant', u.tenant ? `<button class="link" data-go="console:person:${u.tenant}">${W.pname(u.tenant)}</button>` : '—')}${f('Owner', `<button class="link" data-go="console:person:${u.owner}">${W.pname(u.owner)}</button>`)}${f('Rent', W.money(u.rent) + ' · due the ' + u.due)}${f('Grace days', u.grace)}${f('Dates', u.lease)}${f('Renewal', u.renew)}
   ${pms ? '<p class="note" style="margin-top:10px">Read-only: AppFolio owns these. Last synced 9:40 a.m.</p>' : ''}</div>
  <div class="card pad"><div class="row"><div class="eyb">One timeline for this unit</div><span style="flex:1"></span><span class="note">lease · payments · repairs · messages</span></div>
   <div class="tl" style="margin-top:14px">${tl.map(([s, d, t, k]) => `<div class="tl-i ${s}"><div class="row" style="gap:6px"><span class="pill p-mut" style="font-size:10.5px">${{ pay: 'Payment', rep: 'Repair', lease: 'Lease', msg: 'Message' }[k]}</span><span class="note">${d}</span></div><div style="font-size:13px;margin-top:2px">${t}</div></div>`).join('')}</div></div>
  <div style="display:grid;gap:12px">${pms ? `<div class="card pad"><div class="eyb">Rent for this lease</div><p style="margin:6px 0 0;font-size:13px">Collected in AppFolio's resident portal. Payment rules (partial, autopay, locks) live there too.</p><button class="btn sm" style="margin-top:8px" data-act="toast|Opens this ledger in AppFolio, in a new tab.">${ic('ext', 13)} Open ledger in AppFolio</button></div>` : ''}<div class="card pad" style="${pms ? 'display:none' : ''}"><div class="eyb">Payment rules for this lease</div>
   ${[['partial', 'Partial payments', rules.partial ? 'Allowed' : 'Blocked'], ['locked', 'Online payments', rules.locked ? 'Locked · certified funds only' : 'Open'], ['autopay', 'Autopay', rules.autopay ? 'On' : 'Off · tenant sets it']].map(([k, l, v]) => `<div class="row" style="padding:7px 0;border-bottom:1px solid var(--line2)"><span style="font-size:13px">${l}</span><span style="margin-left:auto" class="pill ${k === 'locked' && rules.locked ? 'p-bad' : 'p-mut'}">${v}</span>${k !== 'autopay' ? `<button class="btn sm ghost" data-act="rule|${u.id}|${k}">Change</button>` : ''}</div>`).join('')}
   <p class="note" style="margin-top:8px">Taking partial rent after a 3-day notice brings extra duties in Florida.</p></div>
   <div class="card pad"><div class="eyb">Repairs here</div><div class="note" style="margin-top:4px">${W.repairs.filter(r => r.unit === u.id).map(r => r.what + ' · ' + r.st).join('<br>') || 'None open'}</div><button class="btn sm" style="margin-top:8px" data-act="rtGo|repairs">All repairs</button></div></div>
 </div>`;
};
W.ACT.rule = (u, k) => { const r = S.leaseRules[u] = S.leaseRules[u] || { partial: false, locked: false, autopay: false }; r[k] = !r[k]; S._keepY = true; W.render(); W.toast(k === 'locked' ? (r.locked ? 'Online payments locked. The pay page now asks for certified funds.' : 'Online payments open again.') : (r.partial ? 'Partial payments allowed for this lease.' : 'Partial payments blocked for this lease.')); };
W.ACT.rtGo = (k) => { S.rentalsTab = k; W.go('console:rentals'); };

/* ---------- Rent & payments (14a) ---------- */
W.CR.rent = () => {
 const s = S.sc.stripe, t = S.payTab;
 if (s === 'none' || s === 'info') return W.stripeSetup(s);
 const pmsPaid = S.sc.pms === 'appfolio';
 const rows = W.units.filter(u => u.tenant).map(u => [u, W.pays[u.id]]);
 const due = rows.reduce((a, [u]) => a + u.rent, 0);
 const sum = st => rows.filter(([, p]) => p.st === st).reduce((a, [, p]) => a + p.amt, 0);
 const sel = W.pays[S.rentSel] ? S.rentSel : 'cr4';
 return `<div class="row" style="align-items:flex-end;flex-wrap:wrap"><div><div class="eyb scr">Screen 14a · Rent and payments</div><h1 class="h1" style="margin-top:6px">November rent</h1><p class="sub">As of 10:42 a.m. today. Pending is never counted as paid.</p></div><span style="flex:1"></span>
  <div class="seg">${[['month', 'This month'], ['payouts', 'Payouts'], ['stripe', 'Stripe account']].map(([k, l]) => `<button class="${t === k ? 'on' : ''}" data-act="ptab|${k}">${l}</button>`).join('')}</div></div>
 ${pmsPaid ? `<div class="card pad" style="margin-top:12px;font-size:13px;background:#FBF9F5"><b>Mixed firm:</b> units in AppFolio collect rent in AppFolio and show here read-only; units kept in Wynsley use online rent through your Stripe. <span class="up" style="margin-left:6px"><b>UPGRADE</b> One rent roll even when two systems collect.</span></div>` : ''}
 ${t === 'month' ? `<div class="grid3" style="grid-template-columns:repeat(5,minmax(0,1fr));margin-top:14px">${[['Due', W.money(due), 'p-mut', '6 leases'], ['Cleared', W.money(sum('cleared') + sum('recorded')), 'p-clr', 'in or headed to trust'], ['Pending', W.money(sum('partial')), 'p-pen', 'clears about Nov 26'], ['Returned', W.money(180000), 'p-bad', '1 · after payout'], ['Late', W.money(185000), 'p-bad', '1 · grace ended Nov 4']].map(([l, v, c, n]) => `<div class="card pad"><span class="pill ${c}">${l}</span><div class="sora" style="font-size:22px;font-weight:600;margin-top:8px">${v}</div><div class="note">${n}</div></div>`).join('')}</div>
 <div class="grid2" style="grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);margin-top:14px;align-items:start">
  <div class="card" style="overflow:auto"><table class="tbl"><thead><tr><th>Unit · tenant</th><th>Due</th><th>Status</th><th>Paid</th></tr></thead><tbody>${rows.map(([u, p]) => `<tr class="click" data-act="rsel|${u.id}" style="${u.id === sel ? 'background:#F5F1EA' : ''}"><td><b>${u.addr.split(',')[0]} ${u.unit}</b><div class="note">${W.pname(u.tenant)}${W.isPms(u) ? ' · paid in AppFolio' : ''}</div></td><td class="mono">${W.money(u.rent)}</td><td>${W.payPill(p.st)}</td><td class="mono">${p.st === 'returned' ? '<span style="color:var(--cor)">$0 · returned</span>' : p.amt ? W.money(p.amt) : '—'}</td></tr>`).join('')}</tbody></table>
   <div class="row pad" style="border-top:1px solid var(--line2)"><button class="btn sm" data-act="recordCash">Record cash, check or money order</button><button class="btn sm" data-act="toast|CSV downloaded: one row per payment, amounts in dollars and cents.">${ic('down', 13)} Export CSV</button><span style="flex:1"></span>${S.signed ? `<span class="pill p-ink">${ic('lockI', 11)} Signed off · locked</span>` : `<button class="btn sm pri" data-act="signoff">Sign off November</button>`}</div></div>
  ${W.payDetail(sel)}</div>
  <div class="row note" style="margin-top:12px;gap:14px;flex-wrap:wrap"><span class="row" style="gap:6px">${W.payPill('cleared')} solid = money is there</span><span class="row" style="gap:6px">${W.payPill('pending')} outlined = still clearing</span><span class="row" style="gap:6px">${W.payPill('returned')} red = money came back out</span><span class="up"><b>UPGRADE</b> Shape, not just colour: outlined vs solid reads at a glance and for colour-blind eyes.</span></div>`
 : t === 'payouts' ? `<div class="card" style="margin-top:14px"><table class="tbl"><thead><tr><th>Payout</th><th>Date</th><th>Amount</th><th>Payments inside</th><th>Status</th></tr></thead><tbody>${W.payouts.map(p => `<tr><td class="mono">${p.id}</td><td>${p.date}</td><td class="mono" style="color:${p.amt < 0 ? 'var(--cor)' : 'inherit'}">${p.amt < 0 ? '−' : ''}${W.money(Math.abs(p.amt))}</td><td class="note">${p.items.map(i => W.pname(W.unit(i).tenant)).join(', ')}</td><td><span class="pill ${p.amt < 0 ? 'p-bad' : 'p-clr'}">${p.st}</span></td></tr>`).join('')}</tbody></table><div class="pad row"><button class="btn sm" data-act="toast|CSV downloaded for the bookkeeper.">${ic('down', 13)} Export CSV</button><span class="note">Each deposit into the trust account ••4821, with the payments inside it.</span></div></div>`
 : W.stripeCard()}
 `;
};
W.ACT.ptab = (k) => { S.payTab = k; S._keepY = true; W.render(); };
W.ACT.rsel = (u) => { S.rentSel = u; S._keepY = true; W.render(); };
W.ACT.signoff = () => { S.modal = { k: 'signoff' }; S._keepY = true; W.render(); };
W.MODALS.signoff = () => `<div class="row"><h3 class="h2">Sign off November?</h3><button class="btn ghost sm" style="margin-left:auto" data-act="modalClose">${ic('x')}</button></div>
 <p>This locks November. Nothing in it can change. A later correction goes into December as a reversing entry with a reason.</p>
 <div class="card pad" style="background:var(--ambbg);border-color:#F3D9A4;font-size:13px">Still open: Andre's $1,000 is pending, and Marisol's returned payment is unpaid. Both carry into December.</div>
 <div class="row" style="margin-top:14px"><button class="btn pri" data-act="doSignoff">Sign off and lock</button><button class="btn" data-act="modalClose">Not yet</button></div>`;
W.ACT.doSignoff = () => { S.signed = true; S.modal = null; S._keepY = true; W.render(); W.toast('November signed off by Dana Ruiz at 10:44 a.m. Locked.'); };
W.ACT.recordCash = () => { S.modal = { k: 'cash' }; S._keepY = true; W.render(); };
W.MODALS.cash = () => `<div class="row"><h3 class="h2">Record a payment taken in person</h3><button class="btn ghost sm" style="margin-left:auto" data-act="modalClose">${ic('x')}</button></div>
 <div class="grid2" style="margin-top:10px"><label class="lbl">Lease<select class="inp" style="margin-top:5px"><option>2200 Coral Ridge #4 · Marisol Vega</option></select></label><label class="lbl">Kind<select class="inp" style="margin-top:5px"><option>Cashier's check (certified)</option><option>Money order</option><option>Cash</option></select></label>
 <label class="lbl">Amount<input class="inp" value="$1,800.00" style="margin-top:5px"></label><label class="lbl">Reference<input class="inp" value="Check #50812" style="margin-top:5px"></label></div>
 <p class="note">Recorded by Dana Ruiz, today. It can't be edited later, only reversed with a reason.</p>
 <div class="row" style="margin-top:12px"><button class="btn pri" data-act="cashDone">Record</button></div>`;
W.ACT.cashDone = () => { W.pays.cr4.steps.push(['Certified funds recorded', 'Today · cashier\'s check #50812 · Dana Ruiz', 'ok cur']); W.pays.cr4.st = 'recorded'; S.modal = null; if (!S.resolved.includes('q2')) S.resolved.push('q2'); S._keepY = true; W.render(); W.toast('Recorded. Marisol gets a receipt by text, in Spanish.'); };
W.payDetail = (id) => {
 const u = W.unit(id), p = W.pays[id];
 if (W.isPms(u)) return `<div class="card pad" style="position:sticky;top:120px"><div class="row"><div><div class="eyb">Payment · from AppFolio</div><b style="font-size:15px">${W.pname(u.tenant)}</b><div class="note">${W.uname(id)}</div></div><span style="flex:1"></span>${W.payPill(p.st)}</div>
  <div class="card pad" style="margin-top:12px;background:#FBF9F5"><span class="src">${ic('lockI', 11)} Collected in AppFolio · synced 9:40 a.m.</span><p class="note" style="margin:8px 0 0">This tenant pays rent in AppFolio's resident portal. Wynsley shows the status read-only and links residents to AppFolio's payment page. Any change happens in AppFolio.</p></div>
  <div class="row" style="margin-top:10px"><button class="btn sm" data-act="toast|Opens this ledger in AppFolio, in a new tab.">${ic('ext', 13)} Open in AppFolio</button><button class="btn sm" data-go="console:unit:${id}">Unit timeline →</button></div></div>`;
 return `<div class="card pad" style="position:sticky;top:120px"><div class="row"><div><div class="eyb">Payment</div><b style="font-size:15px">${W.pname(u.tenant)}</b><div class="note">${W.uname(id)}</div></div><span style="flex:1"></span>${W.payPill(p.st)}</div>
  <div class="grid2" style="gap:8px;margin-top:12px;font-size:12.5px">${[['Amount', p.amt ? W.money(p.amt) + (p.of ? ' of ' + W.money(p.of) : '') : '—'], ['Method', p.method || '—'], ['Fee', p.fee || '—'], ['Reference', p.ref || '—']].map(([a, b]) => `<div><div class="note">${a}</div><div class="${a === 'Reference' ? 'mono' : ''}">${b}</div></div>`).join('')}</div>
  <div class="eyb" style="margin-top:14px">Tracker · stamped by Stripe</div>
  <div class="tl" style="margin-top:8px">${p.steps.map(([a, b, s]) => `<div class="tl-i ${s}" style="${s ? '' : 'opacity:.45'}"><div style="font-weight:600;font-size:13px">${a}</div><div class="note">${b || 'not yet'}</div></div>`).join('')}</div>
  ${p.st === 'returned' ? `<div class="card pad" style="background:var(--corbg);border-color:#F6CDB4"><div class="eyb" style="color:var(--cor)">What happens next</div><ul style="margin:6px 0 0;padding-left:18px;font-size:13px"><li>A reversing entry was added on Nov 17. Nothing was edited.</li><li>Online payments for this lease are locked: certified funds only.</li><li>November shows unpaid for Marisol until funds are recorded.</li></ul><div class="row" style="margin-top:10px"><button class="btn sm pri" data-act="recordCash">Record certified funds</button><button class="btn sm" data-go="console:today">Message in the queue</button></div></div>`
  : p.st === 'partial' ? `<p class="note">Partial payments are allowed on this lease. $950 is still due. The $1,000 shows as pending until about Nov 26.</p>` : p.st === 'late' ? `<div class="row"><button class="btn sm pri" data-act="toast|Pay link sent to Keisha by text and email, from Palmetto & Tide.">Send pay link</button><button class="btn sm" data-act="recordCash">Record a payment</button></div><p class="note">No late fee is charged automatically.</p>` : ''}
  <button class="btn sm" style="margin-top:10px" data-go="console:unit:${id}">Unit timeline →</button></div>`;
};
W.stripeCard = () => `<div class="grid2" style="margin-top:14px"><div class="card pad"><div class="eyb">Your Stripe account</div><div class="row" style="margin-top:8px"><span class="pill ${S.sc.stripe === 'test' ? 'p-pen' : 'p-clr'}">${S.sc.stripe === 'test' ? 'Test mode' : 'Active · live'}</span><span class="pill p-clr">Payouts on</span></div>
 <div style="margin-top:12px;display:grid;gap:6px;font-size:13px"><div>Account holder: Palmetto &amp; Tide Realty LLC</div><div>Pays out to: trust account ••4821 (Chase)</div><div>Who pays fees: tenant pays card fee · firm pays $5 bank fee</div></div>
 <p class="note" style="margin-top:10px">Rent is charged on your Stripe account and paid out to your trust account. Wynsley starts and records each payment; it never receives or holds the money.</p></div>
 <div class="card pad"><div class="eyb">Rules</div><div style="display:grid;gap:6px;margin-top:8px;font-size:13px"><div>Bank payments clear in about 4 business days and can still be returned after that.</div><div>A customer can dispute a bank debit for up to 60 days.</div><div>No refunds in the pilot. No automatic late fees.</div></div><button class="btn sm" style="margin-top:10px" data-act="toast|Opens Stripe's dashboard in a new tab.">${W.ic('ext', 13)} Open Stripe</button></div></div>`;
W.stripeSetup = (s) => `<div class="eyb scr">Screen 14a · Rent and payments</div><h1 class="h1" style="margin-top:6px">${s === 'none' ? 'Online rent is off' : 'Stripe needs one more thing'}</h1><p class="sub">${s === 'none' ? 'Tenants pay the way they do today. Turn this on when you want them to pay from a link.' : 'Stripe asked for a letter from your bank naming the trust account. Until then, online rent stays off.'}</p>
 <div class="grid2" style="margin-top:16px;align-items:start"><div class="card pad"><div class="tl">${[['Create your own Stripe account', 'You · 10 min · in the firm\'s name', s === 'none' ? '' : 'ok'], ['Add the trust account for payouts', 'You · bank details stay with Stripe', s === 'none' ? '' : 'pen cur'], ['Stripe reviews the business', 'Stripe · usually 1–3 days', ''], ['Test mode', 'Run a test payment; nothing real moves', ''], ['Live', 'After the attorney\'s answers and the EIN', '']].map(([a, b, c]) => `<div class="tl-i ${c}"><b style="font-size:13px">${a}</b><div class="note">${b}</div></div>`).join('')}</div>
  <button class="btn pri" data-act="toast|Opens Stripe's own sign-up, in your firm's name.">${s === 'none' ? 'Start with Stripe' : 'Upload the bank letter'}</button></div>
  <div class="card pad"><div class="eyb">What tenants see meanwhile</div><p style="margin:6px 0 0;font-size:13px">Rent texts say how to pay the way they do today. The pay page isn't sent.</p><button class="btn sm" style="margin-top:10px" data-go="pay:">Preview the pay page</button></div></div>`;

/* ---------- Fact sheet (7) ---------- */
W.CR.facts = () => `<div class="row" style="align-items:flex-end"><div><div class="eyb scr">Screen 7 · Fact sheet</div><h1 class="h1" style="margin-top:6px">What the desk may say</h1><p class="sub">Drafts were written from your website and Google profile. Nothing reaches customers until you approve it.</p></div><span style="flex:1"></span><button class="btn" data-act="voice">${ic('mic')} Teach by voice</button></div>
 ${S.resolved.includes('q4') ? '' : `<div class="card pad" style="margin-top:14px;background:var(--plumbg);border-color:#DCCFEF"><div class="eyb" style="color:var(--plum)">From your voice note, 10:12 a.m.</div><p style="margin:4px 0 0">You said "two cats are fine at the Wilton Manors place", so the proposed fact is: <b>Up to two cats are allowed at 2611 NW 9th Ave. $300 pet fee.</b></p><div class="row" style="margin-top:10px"><button class="btn sm pri" data-act="approveFact">Approve</button><button class="btn sm">Edit</button><button class="btn sm ghost" data-act="toast|Discarded.">Discard</button></div></div>`}
 <div class="card" style="margin-top:14px"><table class="tbl"><thead><tr><th>Topic</th><th>Question → answer</th><th>Applies to</th><th>Language</th><th>Status</th></tr></thead><tbody>${W.facts.map((f, i) => `<tr><td><span class="pill p-mut">${f.t}</span></td><td><b style="font-size:13px">${f.q}</b><div>${f.a}</div></td><td class="note">${f.to}</td><td class="note">${f.lang}</td><td>${f.st === 'approved' ? `<span class="pill p-clr">Approved</span><div class="note">${f.by}</div>` : `<span class="pill p-pen">Draft</span><div class="note">${f.by}</div><button class="btn sm" style="margin-top:4px" data-act="factOk|${i}">Approve</button>`}</td></tr>`).join('')}</tbody></table></div>
 <div class="card pad" style="margin-top:14px"><div class="eyb">Building book</div><table class="tbl" style="margin-top:6px"><thead><tr><th>Building</th><th>Approval</th><th>Days</th><th>App fee</th><th>Min lease</th><th>Pets</th><th>Verified</th></tr></thead><tbody><tr><td><b>2200 Coral Ridge Dr</b></td><td>Association</td><td>14</td><td>$100</td><td>180 days</td><td>1 dog ≤ 20 lb</td><td class="note">Nov 21</td></tr></tbody></table></div>`;
W.ACT.factOk = (i) => { W.facts[i].st = 'approved'; W.facts[i].by = 'Dana · just now'; S._keepY = true; W.render(); W.toast('Approved. The desk can say this now, with its source on every receipt.'); };

/* ---------- Reports (5) ---------- */
W.CR.reports = () => `<div class="row" style="align-items:flex-end;flex-wrap:wrap"><div><div class="eyb scr">Screen 5 · Monthly report (the brief and weekly letter are messages)</div><h1 class="h1" style="margin-top:6px">October, in plain words</h1><p class="sub">Printable, safe to forward. Every number opens the receipts behind it.</p></div><span style="flex:1"></span><button class="btn" data-go="phone:sms">Morning brief (text)</button><button class="btn" data-act="toast|Weekly letter opened as a printable page.">Weekly letter</button><button class="btn pri" data-act="toast|PDF ready to forward.">${ic('down', 14)} PDF</button></div>
 <div class="card" style="margin-top:16px;padding:32px 36px;max-width:820px"><div class="eyb">Palmetto &amp; Tide Realty · October 2026</div>
 <p style="font:400 19px/1.55 Newsreader,Georgia,serif;margin:12px 0 0">You got 212 inquiries in October. Every one got a first reply, typically in 41 seconds, including 96 that arrived after hours. 31 tours were booked, and agents took over in about 6 minutes.</p>
 <div class="grid3" style="margin-top:20px">${[['41 sec', 'typical first reply', 'Sept: 44 sec · before us: 6 h 10 m'], ['96', 'after-hours inquiries answered', 'Sept: 81 · before us: 23'], ['31', 'tours booked', 'Sept: 24 · before us: 14']].map(([n, l, c]) => `<button class="card pad" style="text-align:left" data-go="console:inbox"><div class="sora" style="font-size:30px;font-weight:600">${n}</div><div style="font-weight:600">${l}</div><div class="note">${c}</div></button>`).join('')}</div>
 <div class="eyb" style="margin-top:22px">The guarantee · 30 of 31 days met</div><div class="row" style="gap:3px;margin-top:6px">${Array.from({ length: 31 }, (_, i) => `<span title="Oct ${i + 1}" style="width:18px;height:18px;border-radius:4px;background:${i === 13 ? '#C2412D' : '#0B6F69'}"></span>`).join('')}</div><div class="note" style="margin-top:4px">Oct 14: a text provider outage (documented). Credit applied: [CREDIT].</div>
 <div class="eyb" style="margin-top:22px">Rent</div><p style="margin:6px 0 0">$12,350 collected of $12,350 due. On time: 5 of 6. Repairs: 4 opened, 4 closed, median 2 days.</p>
 <div class="eyb" style="margin-top:22px">Support receipts</div><p style="margin:6px 0 0">You asked us 6 things; we replied in a median of 52 minutes.</p>
 <div class="eyb" style="margin-top:22px">Three suggested actions</div><ol style="margin:6px 0 0;padding-left:20px"><li>Fix call forwarding: 3 calls rang out this month.</li><li>Approve the 2 draft facts on the fact sheet.</li><li>Start Andre's renewal at Coral Ridge #6.</li></ol>
 <div class="row" style="margin-top:20px"><button class="btn sm" data-go="console:replay">See the "before us" Replay</button><button class="btn sm" data-act="toast|Owner note for Robert Klein opened.">Owner notes</button><button class="btn sm" data-act="toast|Seller log opened.">Seller logs</button></div></div>`;
W.CR.replay = () => `<div class="row"><button class="btn sm ghost" data-go="back">${ic('back', 14)} Back</button></div><div class="eyb scr" style="margin-top:8px">Screen 2 · Replay · kept as the baseline</div><h1 class="h1" style="margin-top:6px">Before Wynsley: Aug 1 – Oct 31</h1><p class="sub">Run Nov 12 on an export of your past inquiries. "What really happened" is measured; "what we'd have sent" is a simulation.</p>
 <div class="up" style="margin-top:10px"><b>UPGRADE</b> The sales demo becomes the "before us" line in every monthly report, so the proof keeps working after the sale.</div>
 <div class="card" style="margin-top:14px"><table class="tbl"><thead><tr><th>Arrived</th><th>Channel</th><th>Who</th><th>What really happened</th><th>Simulation</th></tr></thead><tbody>${[['Sat 9:14 p.m.', 'Zillow email', 'Renter · Coral Ridge', '<span class="pill p-bad">No reply</span>', 'Reply in ~40 sec'], ['Tue 2:02 p.m.', 'Web form', 'Buyer · Victoria Park', '3 h 12 m', 'Reply in ~40 sec'], ['Sun 11:30 a.m.', 'Text', 'Owner · Wilton Manors', '<span class="pill p-bad">No reply</span>', 'Reply + hand-off to Dana']].map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

/* ---------- Website & Google (11) ---------- */
W.CR.site = () => `<div class="eyb scr">Screen 11 · Website and Google</div><h1 class="h1" style="margin-top:6px">Website &amp; Google</h1><p class="sub">Up, fast, safe, within the rules, and easy to find.</p>
 <div class="card" style="margin-top:14px"><table class="tbl"><thead><tr><th>Check</th><th>Result</th><th>Ran</th></tr></thead><tbody>${[['Uptime', 'pass', '100% this month', '6:00 a.m.'], ['Speed', 'pass', 'Mobile 1.9 s', '6:00 a.m.'], ['Backups', 'pass', 'Nightly · kept 30 days', '2:00 a.m.'], ['Accessibility · WCAG 2.2 AA', 'fail', '2 images without alt text on /rentals · a person reviews before it counts', 'Sun'], ['MLS display', 'pass', 'Disclaimer, listing firm credit, no listing older than 12 h (synced hourly)', '9:40 a.m.'], ['Brokerage name beside every contact', 'pass', 'All 14 pages', 'Sun'], ['Fair housing review', 'pass', '212 AI replies and 18 listing texts checked', 'Sun']].map(([a, s, d, t]) => `<tr><td><b>${a}</b></td><td>${s === 'pass' ? '<span class="pill p-clr">Pass</span>' : '<span class="pill p-bad">Failed</span>'} <span class="note">${d}</span></td><td class="note">${t}</td></tr>`).join('')}</tbody></table></div>
 <div class="grid2" style="margin-top:14px"><div class="card pad"><div class="eyb">Google Business Profile</div><p style="margin:6px 0 0">Verified Nov 19. Automated posts start Jan 18 (Google needs 60 days). Until then we draft and you post.</p><button class="btn sm" style="margin-top:8px" data-act="toast|Review link copied: g.page/palmettotide/review">Copy review link</button></div>
 <div class="card pad"><div class="eyb">Area pages</div><p style="margin:6px 0 0">Wilton Manors · live. Oakland Park · waiting for your approval. Pompano Beach · drafting.</p><p class="note">Local SEO content is outside the pilot.</p></div></div>`;
})();
/* iPhone app: lock-screen alerts, text alerts with reply codes, the app's daily screens */
(function () {
const W = window.WyProto, S = W.S, ic = W.ic;
S.ph.view = 'lock'; S.ph.sms = [];
W.phoneGo = (r) => { S.ph.view = r || 'today'; };
const pg = (r) => `data-act="ph|${r}"`;
W.ACT.ph = (r) => { S.ph.prev = S.ph.view; S.ph.view = r; S._keepY = true; W.render(); const b = document.querySelector('.ph-body'); if (b) b.scrollTop = 0; };

const sb = (dark) => `<div class="ph-sb" style="color:${dark ? '#fff' : '#1D1B19'}"><span>9:41</span><span style="display:flex;gap:5px;align-items:center;font-size:12px">●●●● ${ic('globe', 13)} 87%</span></div>`;
const tabs = (cur) => { const n = W.openQ().filter(q => q.kind !== 'hold').length; return `<div class="ph-tabs">${[['today', 'Today', 'queue', n], ['inbox', 'Inbox', 'chat'], ['people', 'People', 'user'], ['rent', 'Rentals', 'key'], ['more', 'More', 'more']].map(([k, l, i, b]) => `<button class="ph-tab ${cur === k ? 'on' : ''}" ${pg(k)}>${ic(i, 22, 1.8)}${l}${b ? `<span class="bd">${b}</span>` : ''}</button>`).join('')}</div>`; };
const hdr = (t, back, right = '') => `<div style="padding:4px 18px 10px;display:flex;align-items:center;gap:8px">${back ? `<button class="btn ghost sm" style="padding:0 4px" ${pg(back)}>${ic('back', 20)}</button>` : ''}<div class="sora" style="font-size:${back ? 17 : 28}px;font-weight:600;letter-spacing:-.02em">${t}</div><span style="flex:1"></span>${right}</div>`;

W.phoneScreens = {
 lock: () => `<div style="position:absolute;inset:0;background:linear-gradient(180deg,#2A3B5C 0%,#6D5A8E 45%,#E39AA8 75%,#F5B98A 100%)"></div><div style="position:relative;z-index:1;color:#fff;display:flex;flex-direction:column;height:100%">${sb(true)}
  <div style="text-align:center;margin-top:20px"><div style="font:500 17px Sora,sans-serif;opacity:.9">Monday, November 23</div><div style="font:600 84px/1 Sora,sans-serif;letter-spacing:-.04em">9:41</div></div>
  <div style="padding:20px 12px;display:grid;gap:8px">
   ${W.openQ().find(q => q.id === 'q1') ? `<button style="text-align:left;border:0;border-radius:20px;background:rgba(255,255,255,.82);backdrop-filter:blur(20px);color:#1D1B19;padding:12px 14px" ${pg('notif')}><div class="row" style="font-size:12px"><span style="width:20px;height:20px;border-radius:6px;background:#1D1B19;color:#fff;display:grid;place-items:center;font:700 9px Sora,sans-serif">P&T</span><b>WYNSLEY · PALMETTO &amp; TIDE</b><span style="margin-left:auto;opacity:.6">6m</span></div><div style="font-weight:600;margin-top:5px">Review · Jordan Avery · price question</div><div style="font-size:13px">"Would the seller take $650k?" Draft ready. Hold to answer: 1 Send · 2 Edit · 3 I'll call</div></button>` : ''}
   <button style="text-align:left;border:0;border-radius:20px;background:rgba(255,255,255,.82);backdrop-filter:blur(20px);color:#1D1B19;padding:12px 14px" ${pg('emergency')}><div class="row" style="font-size:12px"><span style="width:20px;height:20px;border-radius:6px;background:#C2412D;color:#fff;display:grid;place-items:center">${ic('wrench', 12)}</span><b>EMERGENCY REPAIR</b><span style="margin-left:auto;opacity:.6">Sat 11:47 p.m.</span></div><div style="font-weight:600;margin-top:5px">Water under sink · Coral Ridge #4</div><div style="font-size:13px">Ray didn't answer in 5 min. You're next. Tap to call Marisol.</div></button>
   <button style="text-align:left;border:0;border-radius:20px;background:rgba(255,255,255,.82);backdrop-filter:blur(20px);color:#1D1B19;padding:12px 14px" ${pg('sms')}><div class="row" style="font-size:12px"><span style="width:20px;height:20px;border-radius:6px;background:#34C759;color:#fff;display:grid;place-items:center">${ic('chat', 12)}</span><b>MESSAGES</b><span style="margin-left:auto;opacity:.6">7:30 a.m.</span></div><div style="font-weight:600;margin-top:5px">P&amp;T Desk</div><div style="font-size:13px">Morning brief: 14 new, all answered. 2 tours today. ${W.openQ().filter(q => q.kind !== 'hold').length} waiting for you…</div></button>
  </div><div style="flex:1"></div><div style="text-align:center;padding-bottom:30px;font-size:13px;opacity:.85">Tap an alert · no sign-in needed for one item</div></div>`,
 notif: () => `<div style="position:absolute;inset:0;background:linear-gradient(180deg,#2A3B5C 0%,#6D5A8E 45%,#E39AA8 75%,#F5B98A 100%);filter:blur(14px);transform:scale(1.1)"></div><div style="position:relative;z-index:1;padding:70px 12px 0;display:grid;gap:10px">
  <div style="border-radius:20px;background:rgba(255,255,255,.92);padding:14px"><div class="row" style="font-size:12px"><b>WYNSLEY · PALMETTO &amp; TIDE</b><span style="margin-left:auto;opacity:.6">6m</span></div><div style="font-weight:600;margin-top:6px">Jordan Avery · 1520 NE 4th Ave</div><div style="font-size:13px;margin-top:2px">"Would the seller take $650k?"</div><div class="bubble b-draft" style="max-width:100%;margin-top:8px;font-size:13px">Thanks, Jordan. Price and offers are a conversation for one of our licensed agents. Marcus Bell can call you today. What time works?</div><div class="note" style="margin-top:6px">Source: rule · price goes to a licensed person</div></div>
  <div style="border-radius:16px;background:rgba(255,255,255,.92);overflow:hidden">${[['1 Send', 'phSend|q1'], ['2 Edit', 'ph|item:q1'], ["3 I'll call", 'phCall|q1'], ['Open in app', 'ph|item:q1']].map(([l, a], i) => `<button style="display:block;width:100%;text-align:left;border:0;border-top:${i ? '1px solid #E6DFD3' : '0'};background:none;padding:13px 16px;font-size:15px;font-weight:${i < 3 ? 600 : 400};color:${i < 3 ? '#0A62C9' : '#1D1B19'}" data-act="${a}">${l}</button>`).join('')}</div>
  <button class="btn" style="margin:0 auto;background:rgba(255,255,255,.7)" ${pg('lock')}>Close</button></div>`,
 emergency: () => `${sb()}<div style="padding:10px 18px"><span class="pill p-bad">EMERGENCY · after hours</span><h2 class="h1" style="margin-top:10px;font-size:24px">Water under the kitchen sink</h2><p class="sub">2200 Coral Ridge #4 · Marisol Vega · called Sat 11:42 p.m.</p>
  <div class="card pad" style="margin-top:12px"><div class="tl">${[['Call came in · AI took the details in Spanish', '11:42 p.m.', 'ok'], ['Told Marisol: shut the valve under the sink', '11:43 p.m.', 'ok'], ['Paged Ray (your maintenance)', 'No answer in 5 min', 'bad'], ['Paging you, Dana', 'Now', 'pen cur']].map(([a, b, c]) => `<div class="tl-i ${c}"><b style="font-size:13px">${a}</b><div class="note">${b}</div></div>`).join('')}</div></div>
  <div style="display:grid;gap:8px;margin-top:14px"><button class="btn pri" style="height:46px;justify-content:center" data-act="toast|Calling Marisol from the office number…">${ic('phone', 16)} Call Marisol</button><button class="btn" style="height:46px;justify-content:center" data-act="toast|Sent to Coastal Plumbing (after-hours vendor). Marisol was texted.">Send the after-hours plumber</button><button class="btn" style="height:46px;justify-content:center" data-act="ph|lock">I've got it · stop paging</button></div>
  <p class="note" style="margin-top:10px">An emergency always reaches a person. Every 5 minutes it moves to the next name until someone answers.</p></div>`,
 sms: () => { const extra = S.ph.sms.map(m => `<div class="bubble ${m.me ? 'b-me' : 'b-in'}" style="${m.me ? 'background:#0A84FF' : ''}">${m.t}</div>`).join('');
  return `${sb()}<div style="text-align:center;padding:0 0 8px;border-bottom:1px solid var(--line)"><div style="width:44px;height:44px;border-radius:50%;background:#1D1B19;color:#fff;margin:0 auto;display:grid;place-items:center;font:700 13px Sora,sans-serif">P&T</div><div style="font-size:12px;margin-top:4px"><b>P&amp;T Desk</b> · alerts from Wynsley</div></div>
  <div style="padding:12px;display:grid;gap:8px;font-size:14px">
   <div class="note" style="text-align:center;font-size:11px">Today 7:30 a.m.</div>
   <div class="bubble b-in" style="max-width:88%">Morning brief, Mon Nov 23<br>1. 14 new inquiries, all 14 answered (9 after hours)<br>2. Tours: 11:00 Victoria Park (Marcus) · 4:30 Coral Ridge #6 (Camila)<br>3. ${W.openQ().filter(q => q.kind !== 'hold').length} waiting for you · 2 tasks due: <u data-act="ph|today">open</u><br>4. Broken: call forwarding failed the 6:05 test: <u data-go="console:setup">fix</u><br>5. Win: Sofía H. booked Sat in 38 sec, in Spanish.</div>
   <div class="note" style="text-align:center;font-size:11px">8:57 a.m.</div>
   <div class="bubble b-in" style="max-width:88%">REVIEW · Jordan Avery asks if the seller takes $650k on 1520 NE 4th. Draft: "Price and offers are a conversation for one of our licensed agents. Marcus Bell can call you today…"<br>Reply 1 Send · 2 Edit · 3 I'll call<br><u data-act="ph|item:q1">See it</u> (link works once, for 24 h)</div>
   ${extra}
  </div><div style="flex:1"></div>
  <div style="padding:8px 12px 26px;border-top:1px solid var(--line);background:#fff"><div class="note" style="margin-bottom:6px">Tap a reply code:</div><div class="row">${[['1', 'Send'], ['2', 'Edit'], ['3', "I'll call"]].map(([k, l]) => `<button class="btn" style="flex:1;justify-content:center" data-act="smsCode|${k}">${k} · ${l}</button>`).join('')}</div></div>`; },
 today: () => `${sb()}${hdr('Today', null, `<button class="btn sm" data-act="voice">${ic('mic', 14)}</button>`)}
  <div style="padding:0 14px"><div class="card" style="padding:12px 14px;background:#1D1B19;color:#F3EFE6;border:0;font-size:13px"><div class="eyb" style="color:#A39A8C">Brief</div>14 new, all answered · 2 tours · <span style="color:#FFB4A6">calls failing</span></div></div>
  <div style="padding:12px 14px;display:grid;gap:8px">${W.openQ().filter(q => q.kind !== 'hold').map(q => `<button class="card" style="text-align:left;padding:12px 14px;display:block;width:100%" ${pg('item:' + q.id)}><div class="row">${W.kindTag(q.kind)}<span class="note" style="margin-left:auto">${q.wait}</span></div><div style="font-weight:600;margin-top:6px">${W.pname(q.who)} <span class="note">· ${q.role}</span></div><div style="font-size:13px;margin-top:2px">${q.sum}</div></button>`).join('') || '<div class="empty"><div class="sora" style="font-size:20px;color:var(--ink)">All clear.</div></div>'}</div>${tabs('today')}`,
 inbox: () => `${sb()}${hdr('Inbox')}<div style="padding:0 14px;display:grid;gap:8px">${['jordan', 'sofia', 'robert'].map(id => `<button class="card" style="text-align:left;padding:12px 14px" ${pg('conv:' + id)}><b>${W.pname(id)}</b><div class="note">${W.convs[id].ch} · ${W.convs[id].st}</div><div style="font-size:13px;margin-top:3px">${W.convs[id].msgs[0][2].slice(0, 70)}…</div></button>`).join('')}</div>${tabs('inbox')}`,
 people: () => `${sb()}${hdr('People')}<div style="padding:0 14px"><div class="cs-search" style="max-width:none">${ic('search')} Name, phone, address</div></div><div style="padding:10px 14px;display:grid;gap:6px">${['robert', 'sofia', 'jordan', 'marisol', 'luis'].map(id => `<button class="card" style="text-align:left;padding:11px 14px" ${pg('person:' + id)}><b>${W.pname(id)}</b><div class="note">${[...new Set(W.people[id].roles.map(r => r[0]))].join(' · ')}</div></button>`).join('')}</div>${tabs('people')}`,
 rent: () => { const rows = W.units.filter(u => u.tenant); return `${sb()}${hdr('Rentals')}
  <div style="padding:0 14px"><div class="card pad"><div class="eyb">November rent · as of 10:42 a.m.</div>
   <div style="display:grid;gap:6px;margin-top:10px;font-size:14px">${[['Cleared', '3 of 6', '$6,150', 'p-clr'], ['Pending', '1', '$1,000', 'p-pen'], ['Returned', '1', '$1,800', 'p-bad'], ['Late', '1', '$1,850', 'p-bad']].map(([a, b, c, d]) => `<div class="row"><span class="pill ${d}" style="width:92px;justify-content:center">${a}</span><span class="note">${b}</span><span class="mono" style="margin-left:auto">${c}</span></div>`).join('')}</div>
   <p class="note" style="margin-top:8px">Outlined = still clearing. Solid = the money is there.</p></div></div>
  <div style="padding:12px 14px;display:grid;gap:6px">${rows.map(u => `<button class="card" style="text-align:left;padding:11px 14px;display:flex;align-items:center;gap:8px" ${pg('unit:' + u.id)}><span style="min-width:0"><b style="font-size:13px">${u.addr.split(',')[0]} ${u.unit}</b><div class="note">${W.pname(u.tenant)}</div></span><span style="margin-left:auto">${W.payPill(W.pays[u.id].st)}</span></button>`).join('')}
  <button class="card" style="text-align:left;padding:11px 14px" ${pg('repairs')}><b>Repairs</b><div class="note">1 new · 1 scheduled · 1 done this week</div></button></div>
  <div style="padding:0 14px 14px"><div class="up"><b>UPGRADE</b> Phone shows rent read-only plus "send pay link" and "record cash"; payouts, CSV and sign-off stay on desktop.</div></div>${tabs('rent')}`; },
 more: () => `${sb()}${hdr('More')}<div style="padding:0 14px;display:grid;gap:6px">${[['Fact sheet · approve proposals', 'console:facts'], ['Set-up & health · status only', 'console:setup'], ['Team · remove someone fast', 'console:team'], ['Reports', 'console:reports'], ['Pipeline', 'console:pipeline']].map(([l, g]) => `<button class="card" style="text-align:left;padding:12px 14px" data-go="${g}">${l} <span class="note">· opens the web console</span></button>`).join('')}
  <div class="card pad" style="margin-top:6px"><div class="eyb">Signed in</div><b>Dana Ruiz · Owner</b><div class="note">Palmetto &amp; Tide Realty · Face ID on</div></div></div>${tabs('more')}`
};
W.phoneScreens.item = (id) => { const q = S.queue.find(x => x.id === id) || S.queue[0]; const done = S.resolved.includes(q.id);
 return `${sb()}${hdr(W.pname(q.who), 'today')}<div style="padding:0 16px">${W.kindTag(q.kind)} <span class="note">${q.role} · ${W.uname(q.prop)}</span><p style="font-size:15px">${q.sum}</p>
  ${q.draft ? `<div class="eyb">Draft</div><div class="bubble b-draft" style="max-width:100%;margin-top:6px">${q.draft}</div><div class="note" style="margin-top:6px">${q.srcs.join(' · ')}</div>` : ''}
  ${q.next ? `<div class="card pad" style="margin-top:10px;background:var(--corbg);border-color:#F6CDB4;font-size:13px">${q.next}</div>` : ''}
  ${q.ask ? `<div class="card pad" style="margin-top:10px;background:var(--plumbg);border-color:#DCCFEF">${q.ask}</div>` : ''}
  ${done ? `<div class="card pad" style="margin-top:14px;background:var(--tealbg);border-color:#BFE0DB">${ic('chk', 14, 3)} Done. Logged on the receipt.</div>` : q.kind === 'rev' ? `<div style="display:grid;gap:8px;margin-top:14px"><button class="btn pri" style="height:46px;justify-content:center" data-act="phSend|${q.id}">1 Send</button><button class="btn" style="height:46px;justify-content:center" data-act="toast|Edit the draft, then send.">2 Edit</button><button class="btn" style="height:46px;justify-content:center" data-act="phCall|${q.id}">3 I'll call</button></div>`
   : q.opts ? `<div style="display:grid;gap:8px;margin-top:14px">${q.opts.map(o => `<button class="btn" style="height:46px;justify-content:center" data-act="phRoute|${q.id}|${o}">${o}</button>`).join('')}</div>` : q.kind === 'q' ? `<button class="btn pri" style="height:46px;width:100%;justify-content:center;margin-top:14px" data-act="voice">${ic('mic')} Answer by voice note</button>` : `<button class="btn" style="height:46px;width:100%;justify-content:center;margin-top:14px" data-act="phSend|${q.id}">Dismiss</button>`}
  <div class="row" style="margin-top:12px;gap:8px;flex-wrap:wrap">${q.who ? `<button class="btn sm" ${pg('person:' + q.who)}>Record</button>` : ''}${q.conv ? `<button class="btn sm" ${pg('conv:' + q.conv)}>Conversation</button>` : ''}${q.pay ? `<button class="btn sm" ${pg('unit:' + q.pay)}>Payment</button>` : ''}</div></div>`; };
W.phoneScreens.conv = (id) => { const c = W.convs[id] || W.convs.sofia;
 return `${sb()}${hdr(W.pname(c.who), 'inbox')}<div style="padding:0 14px;display:grid;gap:8px">${c.msgs.map(([k, t, m]) => k === 'sys' ? `<div class="note" style="text-align:center;font-size:11px">${m}</div>` : `<div class="bubble ${{ in: 'b-in', ai: 'b-ai', me: 'b-me', draft: 'b-draft' }[k]}" style="font-size:13px">${m}<div class="who" style="margin-top:3px">${k === 'ai' ? 'AI · ' : ''}${t}</div></div>`).join('')}
  <div class="card pad" style="margin-top:6px"><div class="eyb">Receipt</div>${c.rc.slice(-3).map(([a, b]) => `<div style="font-size:12.5px;margin-top:4px"><b>${a}</b> · <span class="note">${b}</span></div>`).join('')}<button class="link" style="margin-top:6px;font-size:12px" data-go="console:conv:${id}">Full receipt on desktop</button></div></div>`; };
W.phoneScreens.person = (id) => { const p = W.people[id] || W.people.robert;
 return `${sb()}${hdr(p.name, 'people')}<div style="padding:0 16px"><div class="row" style="flex-wrap:wrap;gap:5px">${p.roles.map(r => `<span class="pill ${/Owner|sell|buy/.test(r[0]) ? 'p-plm' : 'p-clr'}">${r[0]}</span>`).join('')}</div>
  <div class="row" style="margin-top:12px;gap:8px"><button class="btn" style="flex:1;justify-content:center">${ic('phone', 14)} Call</button><button class="btn" style="flex:1;justify-content:center">${ic('chat', 14)} Text</button><button class="btn" style="flex:1;justify-content:center">${ic('mail', 14)} Email</button></div>
  <div class="card pad" style="margin-top:12px"><div class="eyb">Latest</div>${id === 'robert' ? `<div style="font-size:13px;margin-top:6px"><span class="dot" style="background:#5B3E8C"></span> Today · asked what Unit 2 could sell for · Marcus has it</div><div style="font-size:13px;margin-top:6px"><span class="dot" style="background:#0B6F69"></span> Nov 9 · Unit 2 rent in trust · $2,350</div><div style="font-size:13px;margin-top:6px"><span class="dot" style="background:#0B6F69"></span> Nov 4 · Unit 1 rent in trust · $2,150</div>` : `<div class="note" style="margin-top:6px">${p.lang} · ${p.phone}</div>`}</div>
  <button class="link" style="margin-top:10px" data-go="console:person:${id}">Full record on desktop</button></div>`; };
W.phoneScreens.unit = (id) => { const u = W.unit(id) || W.unit('cr4'), p = W.pays[u.id];
 return `${sb()}${hdr(u.addr.split(',')[0] + ' ' + u.unit, 'rent')}<div style="padding:0 16px">${W.payPill(p.st)} ${W.srcChip(u)}<div class="note" style="margin-top:6px">${W.pname(u.tenant)} · ${W.money(u.rent)} due the 1st</div>
  <div class="card pad" style="margin-top:12px"><div class="eyb">Tracker</div><div class="tl" style="margin-top:8px">${p.steps.map(([a, b, s]) => `<div class="tl-i ${s}" style="${s ? '' : 'opacity:.45'}"><b style="font-size:13px">${a}</b><div class="note">${b || 'not yet'}</div></div>`).join('')}</div></div>
  <div style="display:grid;gap:8px;margin-top:12px"><button class="btn" style="height:44px;justify-content:center" data-act="toast|Pay link sent by text, from Palmetto & Tide.">Send pay link</button><button class="btn" style="height:44px;justify-content:center" data-go="console:rent">Record a payment (desktop)</button></div></div>`; };
W.phoneScreens.repairs = () => `${sb()}${hdr('Repairs', 'rent')}<div style="padding:0 14px;display:grid;gap:8px">${W.repairs.map(r => `<div class="card" style="padding:12px 14px"><div class="row">${r.urg === 'emergency' ? '<span class="pill p-bad">Emergency</span>' : r.urg === 'urgent' ? '<span class="pill p-pen">Urgent</span>' : '<span class="pill p-mut">Routine</span>'}<span class="note" style="margin-left:auto">${r.id === 'r1' && S.repairRouted.kl1 ? 'routed' : r.st}</span></div><b style="display:block;margin-top:6px;font-size:14px">${r.what}</b><div class="note">${W.uname(r.unit)} · ${W.pname(r.who)}</div>${r.id === 'r1' && !S.repairRouted.kl1 ? `<button class="btn sm pri" style="margin-top:8px" ${pg('item:q3')}>Route it</button>` : ''}</div>`).join('')}</div>`;

W.ACT.phSend = (id) => { if (!S.resolved.includes(id)) S.resolved.push(id); W.ACT.ph('today'); W.toast('Sent. Logged on the receipt.'); };
W.ACT.phCall = (id) => { if (!S.resolved.includes(id)) S.resolved.push(id); W.ACT.ph('today'); W.toast("Marked: you'll call. Reminder in 30 min if it isn't logged."); };
W.ACT.phRoute = (id, who) => { W.ACT.route(id, who); S.surface = 'phone'; S.ph.view = 'repairs'; W.render(); };
W.ACT.smsCode = (k) => { S.ph.sms.push({ me: 1, t: k }); S.ph.sms.push({ me: 0, t: k === '1' ? 'Sent to Jordan as Marcus Bell. Receipt: wyn.link/r/8Kd2' : k === '2' ? 'Reply with your edit, or open: wyn.link/e/8Kd2' : "Got it, you'll call Jordan. I'll check back in 30 min." }); if (k !== '2' && !S.resolved.includes('q1')) S.resolved.push('q1'); S._keepY = true; W.render(); };

const notes = {
 lock: [['Alerts do the work', 'Agents act from the lock screen. Each alert carries a signed link that works for that one item, for 24 hours, without signing in.'], ['Where it leads', null, [['Hold the review alert', 'ph|notif'], ['Emergency repair', 'ph|emergency'], ['Morning brief text', 'ph|sms']]]],
 notif: [['1 · 2 · 3 from the lock screen', 'The same three answers everywhere: alert, text, app and desktop.'], ['Then', null, [['Open in the app', 'ph|item:q1'], ['Same item on desktop', 'go|console:today']]]],
 sms: [['No app needed', 'For agents who never install anything, texts with reply codes do everything the queue does.'], ['Where it leads', null, [['Open today in the app', 'ph|today'], ['Fix call forwarding (desktop)', 'go|console:setup']]]],
 today: [['Phone + desktop', 'The queue is the phone app\'s home. Same items, same 1 · 2 · 3, as the console.'], ['Phone only? Desktop only?', 'Phone: queue, inbox, people, rent at a glance, repairs. Desktop: set-up, fact sheet editing, payouts, sign-off, reports, website.']],
 rent: [['Pending vs cleared on a phone', 'Shape plus word: outlined "Pending · not paid yet", solid "Cleared". Never a green tick for pending.'], ['Where it leads', null, [['Returned payment', 'ph|unit:cr4'], ['Desktop payment record', 'go|console:rent']]]],
 emergency: [['An emergency always reaches a person', 'After hours it pages your maintenance person, then the owner on call, every 5 minutes.']]
};
W.phoneStage = () => {
 const [v, arg] = S.ph.view.split(':');
 const scr = (W.phoneScreens[v] || W.phoneScreens.today)(arg);
 const ns = notes[v] || notes.today;
 const nav = [['lock', 'Lock screen'], ['sms', 'Text alerts'], ['today', 'App · Today'], ['rent', 'App · Rentals'], ['emergency', 'Emergency']];
 return `<div class="ph-stage"><div class="side-notes"><div class="eyb" style="margin-bottom:8px">iPhone app · jump to</div>${nav.map(([k, l]) => `<button class="cs-nav ${v === k ? 'on' : ''}" data-act="ph|${k}">${l}</button>`).join('')}
  <div class="sn" style="margin-top:14px"><h4>Signing in on the phone</h4><p>The invite link opens the app; Face ID after the first email code. Removing someone signs this phone out at once.</p></div></div>
 <div class="ph"><div class="ph-isl"></div><div class="ph-scr">${v === 'lock' || v === 'notif' ? scr : `<div class="ph-body" style="display:flex;flex-direction:column">${scr}</div>`}</div></div>
 <div class="side-notes">${ns.map(([h, p, go]) => `<div class="sn"><h4>${h}</h4>${p ? `<p>${p}</p>` : ''}${go ? `<div class="go">${go.map(([l, a]) => `<button class="btn sm" ${a.startsWith('go|') ? `data-go="${a.slice(3)}"` : `data-act="${a}"`}>${l}</button>`).join('')}</div>` : ''}</div>`).join('')}</div></div>`;
};
})();
/* tenant pay page (14b) and customer chat (6): customer-facing, in the brokerage's brand */
(function () {
const W = window.WyProto, S = W.S, ic = W.ic;
const T = {
 en: { hi: 'Hi Yolanda', unit: '1418 NE 15th Ave · Unit 2', due: 'December rent', dueOn: 'Due Mon, Dec 1', pay: 'Pay rent', bank: 'Bank account', bankN: 'No fee · clears in about 4 business days', card: 'Debit or credit card', cardN: 'Fee $70.50 (3%) · clears today', where: 'Goes to Palmetto & Tide Realty\'s trust account, through Stripe.', scam: 'Palmetto & Tide will never ask you to pay by gift card or wire transfer.', auto: 'Pay automatically each month', autoN: 'You authorize Palmetto & Tide Realty to debit this account for rent on the 1st of each month until you turn it off. Turn it off any time from a new link.', cont: 'Continue', confirm: 'Confirm payment', youPay: 'You pay', fee: 'Fee', total: 'Total', paidT: 'Payment started', pendT: 'Pending · not paid yet', pendN: 'Bank payments take about 4 business days to clear. We\'ll text you when it does.', rcpt: 'Receipt', past: 'Past payments', call: 'Questions? Call the office', rep: 'Report a repair', lang: 'Español', clearedT: 'Cleared', failT: 'Your bank returned this payment', failN: 'Nothing else is charged. Please call the office at (954) 555-0100 to pay another way.', expT: 'This link expired', expN: 'Pay links last 7 days so nobody else can use them. Get a new one sent to the phone or email we have on file.', newLink: 'Text me a new link', nothing: 'Nothing due right now', nothingN: 'Your next rent is due Jan 1. We\'ll text you a link a few days before.', lockT: 'Online payment is paused for this lease', lockN: 'After a returned payment, rent must be paid with certified funds (cashier\'s check or money order). Call the office at (954) 555-0100.', partT: 'Partial payments aren\'t accepted', partN: 'This lease needs the full amount in one payment.', choose: 'How do you want to pay?', stripe: 'Secured by Stripe', sel: 'Choose your bank', trk: ['Started', 'Pending', 'Cleared', 'In the trust account'] },
 es: { hi: 'Hola Yolanda', unit: '1418 NE 15th Ave · Unidad 2', due: 'Renta de diciembre', dueOn: 'Vence el lunes 1 de dic.', pay: 'Pagar la renta', bank: 'Cuenta bancaria', bankN: 'Sin cargo · se acredita en unos 4 días hábiles', card: 'Tarjeta de débito o crédito', cardN: 'Cargo $70.50 (3%) · se acredita hoy', where: 'Va a la cuenta fiduciaria de Palmetto & Tide Realty, a través de Stripe.', scam: 'Palmetto & Tide nunca le pedirá pagar con tarjetas de regalo ni transferencias.', auto: 'Pagar automáticamente cada mes', autoN: 'Usted autoriza a Palmetto & Tide Realty a debitar esta cuenta el día 1 de cada mes hasta que lo desactive. Puede desactivarlo con un enlace nuevo.', cont: 'Continuar', confirm: 'Confirmar el pago', youPay: 'Usted paga', fee: 'Cargo', total: 'Total', paidT: 'Pago iniciado', pendT: 'Pendiente · aún no pagado', pendN: 'Los pagos bancarios tardan unos 4 días hábiles. Le avisaremos por texto.', rcpt: 'Recibo', past: 'Pagos anteriores', call: '¿Preguntas? Llame a la oficina', rep: 'Reportar una reparación', lang: 'English', clearedT: 'Acreditado', failT: 'Su banco devolvió este pago', failN: 'No se cobró nada más. Llame a la oficina al (954) 555-0100 para pagar de otra forma.', expT: 'Este enlace venció', expN: 'Los enlaces duran 7 días para que nadie más los use. Le enviamos uno nuevo al teléfono o correo que tenemos.', newLink: 'Envíenme un enlace nuevo', nothing: 'No hay nada pendiente', nothingN: 'Su próxima renta vence el 1 de enero. Le enviaremos un enlace unos días antes.', lockT: 'El pago en línea está pausado', lockN: 'Después de un pago devuelto, la renta debe pagarse con fondos certificados. Llame a la oficina al (954) 555-0100.', partT: 'No se aceptan pagos parciales', partN: 'Este contrato requiere el monto completo en un solo pago.', choose: '¿Cómo quiere pagar?', stripe: 'Protegido por Stripe', sel: 'Elija su banco', trk: ['Iniciado', 'Pendiente', 'Acreditado', 'En la cuenta fiduciaria'] }
};
const brand = (t) => `<div style="display:flex;align-items:center;gap:10px;padding:14px 18px;background:#0E4F5C;color:#fff"><span style="width:34px;height:34px;border-radius:9px;background:#fff;color:#0E4F5C;display:grid;place-items:center;font:700 13px Sora,sans-serif">P&amp;T</span><div style="line-height:1.2"><div style="font:600 15px Sora,sans-serif">Palmetto &amp; Tide Realty</div><div style="font-size:11.5px;opacity:.8">Licensed real estate broker · Fort Lauderdale</div></div><span style="flex:1"></span><button style="border:1px solid rgba(255,255,255,.4);background:none;color:#fff;border-radius:999px;padding:4px 10px;font-size:12px" data-act="payLang">${t.lang}</button></div>`;
const foot = (t) => `<div style="padding:14px 18px 26px;font-size:12.5px;color:var(--mut);display:grid;gap:6px;border-top:1px solid var(--line)"><div>${ic('shield', 13)} ${t.scam}</div><div class="row" style="gap:12px"><button class="link" data-act="toast|Calling (954) 555-0100…">${t.call}</button><button class="link" data-act="payRepair">${t.rep}</button></div></div>`;
const big = 'height:52px;width:100%;justify-content:center;font-size:16px;border-radius:12px';
W.payScreens = {
 home: (t) => `<div style="padding:20px 18px"><div style="font:600 22px Sora,sans-serif">${t.hi}</div><div class="note">${t.unit}</div>
  <div class="card pad" style="margin-top:14px"><div class="note">${t.due}</div><div class="sora" style="font-size:36px;font-weight:600;letter-spacing:-.03em">$2,350.00</div><div class="note">${t.dueOn} · as of 9:41 a.m.</div></div>
  <div style="margin-top:16px;font-weight:600">${t.choose}</div>
  ${[['bank', t.bank, t.bankN, 'bank'], ['card', t.card, t.cardN, 'card']].map(([k, a, b, i]) => `<button class="card" style="display:flex;gap:12px;align-items:center;width:100%;text-align:left;padding:14px;margin-top:8px;${S.pay.method === k ? 'border:2px solid #0E4F5C' : ''}" data-act="payMethod|${k}">${ic(i, 22)}<span><b>${a}</b><div class="note">${b}</div></span>${S.pay.method === k ? `<span style="margin-left:auto;color:#0E4F5C">${ic('chk', 18, 3)}</span>` : ''}</button>`).join('')}
  <label class="row" style="margin-top:14px;align-items:flex-start;gap:10px;font-size:13px"><input type="checkbox" ${S.pay.autopay ? 'checked' : ''} data-act="payAuto" style="margin-top:3px"><span><b>${t.auto}</b><div class="note">${t.autoN}</div></span></label>
  <div class="note" style="margin-top:12px">${ic('bank', 13)} ${t.where}</div>
  <button class="btn" style="${big};margin-top:14px;background:#0E4F5C;color:#fff;border-color:#0E4F5C" data-act="payStep|${S.pay.method === 'bank' ? 'bank' : 'confirm'}">${t.cont}</button>
  <div class="note" style="text-align:center;margin-top:8px">${ic('lockI', 12)} ${t.stripe}</div>
  <button class="link" style="margin-top:14px;font-size:12.5px" data-act="payStep|history">${t.past}</button></div>${foot(t)}`,
 bank: (t) => `<div style="padding:20px 18px"><div style="font:600 18px Sora,sans-serif">${t.sel}</div><div class="note">${t.stripe} · Palmetto &amp; Tide never sees your login</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px">${['Chase', 'Bank of America', 'Wells Fargo', 'TD Bank', 'Truist', 'Regions'].map(b => `<button class="card" style="padding:16px 10px;font-weight:600" data-act="payStep|confirm">${b}</button>`).join('')}</div>
  <button class="link" style="margin-top:12px;font-size:12.5px" data-act="payStep|confirm">Enter routing and account number instead</button></div>`,
 confirm: (t) => { const card = S.pay.method === 'card'; return `<div style="padding:20px 18px"><div style="font:600 18px Sora,sans-serif">${t.confirm}</div>
  <div class="card pad" style="margin-top:12px;font-size:14px">${[[t.youPay, '$2,350.00'], [t.fee, card ? '$70.50' : '$0.00'], [t.total, card ? '$2,420.50' : '$2,350.00']].map(([a, b], i) => `<div class="row" style="padding:6px 0;${i === 2 ? 'border-top:1px solid var(--line);font-weight:700' : ''}"><span>${a}</span><span class="mono" style="margin-left:auto">${b}</span></div>`).join('')}
   <div class="note" style="margin-top:6px">${card ? 'Visa ••4242' : 'Chase checking ••6610'} · ${t.where}</div></div>
  ${S.pay.autopay ? `<div class="card pad" style="margin-top:10px;font-size:12.5px;background:#FBF9F5">${t.autoN}</div>` : ''}
  <button class="btn" style="${big};margin-top:16px;background:#0E4F5C;color:#fff;border-color:#0E4F5C" data-act="payStep|done">${t.confirm} · ${card ? '$2,420.50' : '$2,350.00'}</button>
  <button class="btn ghost" style="${big};margin-top:6px" data-act="payStep|home">←</button></div>`; },
 done: (t) => { const card = S.pay.method === 'card'; const steps = card ? [[t.trk[0], 'Today 9:42 a.m.', 'ok'], [t.trk[2], 'Today 9:42 a.m.', 'ok cur'], [t.trk[3], '~Dec 3', '']] : [[t.trk[0], 'Today 9:42 a.m.', 'ok'], [t.trk[1], t.pendN, 'pen cur'], [t.trk[2], '~Nov 27', ''], [t.trk[3], '~Dec 1', '']];
  return `<div style="padding:22px 18px"><div style="width:52px;height:52px;border-radius:50%;display:grid;place-items:center;${card ? 'background:#0B6F69;color:#fff' : 'border:2.5px solid #E7B451;color:#9A5B00'}">${card ? ic('chk', 26, 3) : ic('clock', 26, 2.4)}</div>
  <div style="font:600 22px Sora,sans-serif;margin-top:12px">${card ? t.clearedT : t.pendT}</div><div class="note">$2,350.00 · ${t.unit}</div>
  <div class="card pad" style="margin-top:14px"><div class="tl">${steps.map(([a, b, s]) => `<div class="tl-i ${s}" style="${s ? '' : 'opacity:.45'}"><b style="font-size:13px">${a}</b><div class="note">${b}</div></div>`).join('')}</div></div>
  <div class="card pad" style="margin-top:10px;font-size:12.5px"><div class="eyb">${t.rcpt}</div><div class="mono" style="margin-top:4px">py_3QfA…7Lm · ${card ? 'Visa ••4242' : 'Chase ••6610'}</div><div class="note">${t.where}</div></div>
  <div class="up" style="margin-top:12px"><b>UPGRADE</b> Same tracker the broker sees, so a tenant's "did it go through?" call answers itself.</div>
  <div class="row" style="margin-top:12px;gap:8px;flex-wrap:wrap"><button class="btn sm" data-act="payState|cleared">Later: it cleared</button><button class="btn sm" data-act="payState|failed">Later: bank returned it</button></div></div>${foot(t)}`; },
 cleared: (t) => `<div style="padding:22px 18px"><div style="width:52px;height:52px;border-radius:50%;background:#0B6F69;color:#fff;display:grid;place-items:center">${ic('chk', 26, 3)}</div><div style="font:600 22px Sora,sans-serif;margin-top:12px">${t.clearedT} · $2,350.00</div><div class="note">Nov 27 · ${t.where}</div>
  <div class="card pad" style="margin-top:14px"><div class="tl">${[[t.trk[0], 'Nov 23', 'ok'], [t.trk[1], 'Nov 23 – 27', 'ok'], [t.trk[2], 'Nov 27, 9:10 a.m.', 'ok cur'], [t.trk[3], '~Dec 1', '']].map(([a, b, s]) => `<div class="tl-i ${s}" style="${s ? '' : 'opacity:.45'}"><b style="font-size:13px">${a}</b><div class="note">${b}</div></div>`).join('')}</div></div></div>${foot(t)}`,
 failed: (t) => `<div style="padding:22px 18px"><div style="width:52px;height:52px;border-radius:50%;background:var(--cor);color:#fff;display:grid;place-items:center">${ic('ret', 24, 2.4)}</div><div style="font:600 22px Sora,sans-serif;margin-top:12px">${t.failT}</div><p style="color:var(--ink2)">${t.failN}</p><div class="note">R01 · insufficient funds · Dec 2</div><button class="btn" style="${big};margin-top:14px" data-act="toast|Calling (954) 555-0100…">${ic('phone', 16)} (954) 555-0100</button></div>${foot(t)}`,
 expired: (t) => `<div style="padding:22px 18px"><div style="font:600 22px Sora,sans-serif">${t.expT}</div><p style="color:var(--ink2)">${t.expN}</p><button class="btn" style="${big};background:#0E4F5C;color:#fff;border-color:#0E4F5C" data-act="toast|Sent to the phone ending 0129.">${t.newLink}</button></div>${foot(t)}`,
 nothing: (t) => `<div style="padding:22px 18px"><div style="font:600 22px Sora,sans-serif">${t.nothing}</div><p style="color:var(--ink2)">${t.nothingN}</p><button class="link" data-act="payStep|history">${t.past}</button></div>${foot(t)}`,
 locked: (t) => `<div style="padding:22px 18px"><span class="pill p-bad">${ic('lockI', 12)} ${t.lockT}</span><p style="color:var(--ink2);margin-top:12px">${t.lockN}</p><button class="btn" style="${big}" data-act="toast|Calling (954) 555-0100…">${ic('phone', 16)} (954) 555-0100</button></div>${foot(t)}`,
 partial: (t) => `<div style="padding:22px 18px"><div style="font:600 20px Sora,sans-serif">${t.partT}</div><p style="color:var(--ink2)">${t.partN}</p><div class="card pad"><div class="note">${t.due}</div><div class="sora" style="font-size:28px;font-weight:600">$2,350.00</div></div><button class="btn" style="${big};margin-top:12px;background:#0E4F5C;color:#fff" data-act="payStep|home">${t.pay}</button></div>${foot(t)}`,
 history: (t) => `<div style="padding:20px 18px"><div style="font:600 18px Sora,sans-serif">${t.past}</div>${[['Nov 2', '$2,350.00', 'Bank ••6610', 'cleared'], ['Oct 1', '$2,350.00', 'Bank ••6610', 'cleared'], ['Sep 1', '$2,350.00', 'Bank ••6610', 'cleared']].map(([d, a, m, s]) => `<div class="row" style="padding:12px 0;border-bottom:1px solid var(--line2)"><div><b>${a}</b><div class="note">${d} · ${m}</div></div><span style="margin-left:auto">${W.payPill(s)}</span></div>`).join('')}<button class="btn sm" style="margin-top:12px" data-act="payStep|home">←</button></div>${foot(t)}`,
 repair: (t) => `<div style="padding:20px 18px"><div style="font:600 18px Sora,sans-serif">${t.rep}</div><textarea class="inp" style="height:90px;padding:10px;margin-top:10px">${S.pay.lang === 'es' ? 'La puerta del baño no cierra.' : "The bathroom door won't close."}</textarea><button class="card" style="width:100%;padding:16px;margin-top:8px">+ Photo</button><p class="note">Water, gas, fire or no heat or AC in summer? Call (954) 555-0100 now: it reaches a person, day or night.</p><button class="btn" style="${big};background:#0E4F5C;color:#fff" data-act="repairSent">Send</button></div>`
};
W.ACT.payLang = () => { S.pay.lang = S.pay.lang === 'en' ? 'es' : 'en'; S._keepY = true; W.render(); };
W.ACT.payMethod = (k) => { S.pay.method = k; S._keepY = true; W.render(); };
W.ACT.payAuto = () => { S.pay.autopay = !S.pay.autopay; S._keepY = true; W.render(); };
W.ACT.payStep = (k) => { S.pay.step = k; S._keepY = true; W.render(); };
W.ACT.payState = (k) => { S.pay.step = k; S._keepY = true; W.render(); };
W.ACT.payRepair = () => { S.pay.step = 'repair'; S._keepY = true; W.render(); };
W.ACT.repairSent = () => { S.pay.step = 'home'; S._keepY = true; W.render(); W.toast('Repair sent. It lands in the firm\'s queue, routed by urgency. You\'ll get a text at each step.'); };
W.payStage = () => {
 const t = T[S.pay.lang]; const scr = (W.payScreens[S.pay.step] || W.payScreens.home)(t);
 const states = [['home', 'Due'], ['done', 'Paid · pending'], ['cleared', 'Cleared'], ['failed', 'Failed'], ['partial', 'Partial blocked'], ['locked', 'Locked'], ['expired', 'Link expired'], ['nothing', 'Nothing due']];
 return `${S.sc.stripe === 'test' ? W.testBanner() : ''}<div class="ph-stage"><div class="side-notes"><div class="eyb" style="margin-bottom:8px">Screen 14b · tenant's pay page · states</div>${states.map(([k, l]) => `<button class="cs-nav ${S.pay.step === k ? 'on' : ''}" data-act="payStep|${k}">${l}</button>`).join('')}
  <div class="sn" style="margin-top:14px"><h4>How she got here</h4><p>A text from Palmetto &amp; Tide's own number: "Rent for Dec is $2,350. Pay securely: ptrealty.co/p/7Lm (expires Nov 30). We never ask for gift cards or wires."</p></div></div>
 <div class="ph"><div class="ph-isl"></div><div class="ph-scr"><div class="ph-sb" style="background:#0E4F5C;color:#fff"><span>9:41</span><span style="font-size:12px">ptrealty.co</span></div>${S.sc.stripe === 'test' ? `<div style="background:#FFE27A;color:#3D2E00;font:700 11px 'IBM Plex Mono',monospace;text-align:center;padding:4px">TEST MODE · NO REAL MONEY</div>` : ''}<div class="ph-body">${brand(t)}${scr}</div></div></div>
 <div class="side-notes"><div class="sn"><h4>Under a minute, no account</h4><p>Open link → pick bank (the cheapest, first) → pick your bank → confirm. Four taps. Fees show before she commits.</p></div>
  <div class="sn"><h4>Where the money goes</h4><p>Named on every screen: the brokerage's trust account, through Stripe. Wynsley never appears to the tenant and never holds the money.</p></div>
  <div class="sn"><h4>Changing autopay without an account</h4><p>"Text STOP AUTOPAY" or tap "Change autopay" in any rent text: a fresh signed link opens just that setting.</p><div class="go"><button class="btn sm" data-go="console:rent">The broker's view of this payment</button></div></div></div></div>`;
};

/* ---------- customer chat (6) ---------- */
const C = {
 es: { notice: 'Este chat se graba. [RECORDING NOTICE]', hi: 'Hola, soy el asistente de IA de Palmetto & Tide. Puedo ayudarle con propiedades, visitas y preguntas de inquilinos.', person: 'Hablar con una persona', q: '¿Cuánto debo de renta?', a: 'Por seguridad no muestro saldos aquí. Le envié un enlace de pago seguro al teléfono que termina en 0129. Está a nombre de Palmetto & Tide Realty; nunca pedimos tarjetas de regalo ni transferencias.', chips: ['¿Cuánto debo?', 'Reportar una reparación', 'Ver propiedades'], ph: 'Escriba un mensaje…' },
 en: { notice: 'This chat is recorded. [RECORDING NOTICE]', hi: "Hi, I'm Palmetto & Tide's AI assistant. I can help with homes, tours and resident questions.", person: 'Talk to a person', q: 'How much rent do I owe?', a: "For your safety I don't show balances here. I've sent a secure pay link to the phone ending 0129. It's from Palmetto & Tide Realty; we never ask for gift cards or wires.", chips: ['What do I owe?', 'Report a repair', 'See homes'], ph: 'Type a message…' }
};
W.ACT.chatLang = () => { S.chat.lang = S.chat.lang === 'es' ? 'en' : 'es'; S._keepY = true; W.render(); };
W.ACT.chatAsk = () => { S.chat.step = 1; S._keepY = true; W.render(); };
W.chatStage = () => { const c = C[S.chat.lang];
 return `<div class="ph-stage" style="align-items:stretch"><div style="flex:1;max-width:760px;background:#fff;border-radius:16px;border:1px solid var(--line);overflow:hidden;position:relative;min-height:640px">
  <div style="padding:16px 24px;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:10px"><span style="width:30px;height:30px;border-radius:8px;background:#0E4F5C;color:#fff;display:grid;place-items:center;font:700 11px Sora,sans-serif">P&amp;T</span><b class="sora">Palmetto &amp; Tide Realty</b><span class="note" style="margin-left:auto">palmettotide.com · Rentals</span></div>
  <div style="padding:30px 24px;color:var(--mut)"><div class="sora" style="font-size:26px;color:var(--ink);font-weight:600">Homes for rent in Fort Lauderdale</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px">${[1, 2, 3].map(() => '<div style="height:120px;border-radius:12px;background:#EFE9DF"></div>').join('')}</div></div>
  <div style="position:absolute;right:20px;bottom:20px;width:350px;border-radius:18px;background:#fff;box-shadow:0 30px 70px -20px rgba(0,0,0,.35);border:1px solid var(--line);overflow:hidden">
   <div style="background:#0E4F5C;color:#fff;padding:12px 14px;display:flex;align-items:center;gap:8px"><b style="font-size:13px">Palmetto &amp; Tide Realty</b><span style="font-size:10px;border:1px solid rgba(255,255,255,.5);border-radius:5px;padding:0 4px">AI</span><span style="flex:1"></span><button style="background:none;border:1px solid rgba(255,255,255,.4);color:#fff;border-radius:999px;font-size:11px;padding:2px 8px" data-act="chatLang">${S.chat.lang === 'es' ? 'English' : 'Español'}</button></div>
   <div style="padding:8px 14px;background:#FBF9F5;font-size:11.5px;color:var(--mut)">${c.notice}</div>
   <div style="padding:12px 14px;display:grid;gap:8px;max-height:360px;overflow:auto"><div class="bubble b-ai" style="margin-left:0">${c.hi}</div>${S.chat.step ? `<div class="bubble b-me">${c.q}</div><div class="bubble b-ai" style="margin-left:0">${c.a}</div>` : ''}</div>
   <div style="padding:0 14px 8px;display:flex;gap:6px;flex-wrap:wrap">${c.chips.map((x, i) => `<button class="btn sm" data-act="${i === 0 ? 'chatAsk' : 'toast|' + x}">${x}</button>`).join('')}</div>
   <div style="padding:8px 14px 12px;border-top:1px solid var(--line);display:flex;gap:6px;align-items:center"><div class="inp" style="flex:1;display:flex;align-items:center;color:var(--mut2)">${c.ph}</div><button class="btn sm pri" data-act="toast|${c.person}: Camila Reyes will take it from here.">${c.person}</button></div>
  </div></div>
  <div class="side-notes"><div class="sn"><h4>Screen 6 · in the firm's brand</h4><p>Firm name beside the button, recording notice before the first message, "AI" tag on every message, "Talk to a person" always visible, English and Spanish.</p></div>
  <div class="sn"><h4>"What do I owe?"</h4><p>Never answered in the open chat. The AI sends the signed pay link to the phone on file; the balance shows only behind that link, always "as of" a time.</p><div class="go"><button class="btn sm" data-go="pay:">Open that pay link</button></div></div></div></div>`; };
})();
/* flow map: every screen, where it lives, where it leads; answers to the nine questions; upgrades */
(function () {
const W = window.WyProto, S = W.S, ic = W.ic;
const dev = { P: ['Phone', '#5B3E8C', '#EEE8F7'], D: ['Desktop', '#1D1B19', '#EFE9DF'], B: ['Phone + desktop', '#0B6F69', '#E3F2F0'], C: ['Customer, no account', '#0E4F5C', '#DDEEF0'], M: ['Message', '#9A5B00', '#FFF1D6'] };
const tag = k => `<span class="pill" style="background:${dev[k][2]};color:${dev[k][1]};font-size:11px">${dev[k][0]}</span>`;
const cols = [
 ['1 · Start', 'Invite to live desk, inside the kickoff hour', [
  ['Website · Sign in', 'B', '12', 'console:login', [['Code', 'console:logincode'], ['No account yet', 'console:noaccount']]],
  ['Invite email', 'M', '12', 'console:invite', [['Sign in', 'console:signin'], ['Expired / wrong email', 'console:expired']]],
  ['Sign in', 'B', '12', 'console:signin', [['Email code', 'console:code'], ['Welcome', 'console:welcome']]],
  ['Live in a day', 'D', '8', 'console:setup', [['Import receipt', 'console:setup'], ['Fact sheet', 'console:facts'], ['Stripe', 'console:rent']]],
  ['Team & access', 'D', '12', 'console:team', [['Agent alert', 'phone:sms']]]]],
 ['2 · Every day', 'Most of it happens before anyone opens the app', [
  ['Lock-screen alert', 'P', '3', 'phone:lock', [['1 · 2 · 3', 'phone:notif'], ['Emergency', 'phone:emergency']]],
  ['Morning brief (text)', 'M', '5', 'phone:sms', [['Today', 'console:today'], ['Fix a door', 'console:setup']]],
  ['Today: brief + queue', 'B', '3', 'console:today', [['Conversation', 'console:conv:jordan'], ['Payment', 'console:rent'], ['Record', 'console:person:robert']]],
  ['Conversation + receipt', 'B', '4', 'console:conv:sofia', [['Record', 'console:person:sofia'], ['Unit', 'console:unit:wm2']]]]],
 ['3 · One record', 'Sales and rentals on the same person', [
  ['Person record', 'B', '9', 'console:person:robert', [['Unit', 'console:unit:kl2'], ['Pipeline', 'console:pipeline'], ['Conversation', 'console:conv:robert']]],
  ['Pipeline', 'D', '10', 'console:pipeline', [['Person', 'console:person:jordan']]],
  ['Fact sheet', 'D', '7', 'console:facts', [['Voice note', 'console:today']]]]],
 ['4 · Rentals and rent', 'Stage 1 connect · 2 tools · 3 online rent', [
  ['Units, leases, repairs', 'B', '13', 'console:rentals', [['Unit timeline', 'console:unit:cr4'], ['Route repair', 'console:today']]],
  ['Rent & payments', 'D', '14a', 'console:rent', [['Returned payment', 'console:rent'], ['Payouts', 'console:rent']]],
  ['Rent at a glance', 'P', '14a', 'phone:rent', [['Tracker', 'phone:unit:cr4']]],
  ['Tenant pay page', 'C', '14b', 'pay:', [['Customer chat', 'chat:']]],
  ['Customer chat', 'C', '6', 'chat:', [['Pay link', 'pay:']]]]],
 ['5 · Prove it', 'Why they stay', [
  ['Monthly report', 'B', '5', 'console:reports', [['Replay baseline', 'console:replay'], ['Receipts', 'console:inbox']]],
  ['Website & Google', 'D', '11', 'console:site', []],
  ['Replay', 'D', '2', 'console:replay', [['Reports', 'console:reports']]]]]
];
const QA = [
 ['1', 'Invite to live desk in one hour', 'There is no sign-up page: our team creates the firm, the owner\'s invite names firm, role, sender and expiry, and the first sign-in drops straight into the six-step "Live in a day" checklist. The AI has already drafted the profile and 24 answers, so the hour is spent approving, not typing. Go-live needs steps 1–4 and 6; texting can still be waiting. The owner picks a sending mode (auto-send, review week 1, review every reply) on the way in.', 'console:invite'],
 ['2', 'Who sets up each connection, and the waiting state', 'One Connections table: who does it (you, Wynsley, or an outside reviewer), what it needs, its status, and a "while it waits" column. Texting waiting on carriers means replies go by email and chat, and tap-to-text hides. The MLS waiting means answers come from the firm\'s own listings. Waiting is amber and outlined, never red.', 'console:setup'],
 ['3', 'The morning check, mostly without the app', 'A 7:30 text with five lines and links, then lock-screen alerts with 1 Send · 2 Edit · 3 I\'ll call. Reply codes work by text. The app\'s Today screen is the same five lines on top of the queue. An after-hours emergency pages people in turn until someone answers.', 'phone:sms'],
 ['4', 'Sales and rentals on one person', 'Role chips across the top (Owner ×2, Thinking of selling, Former renter), then one timeline coloured by side of the business, with a filter rather than tabs. Homes and their rent status sit on the right; deals of every kind in one list.', 'console:person:robert'],
 ['5', 'AppFolio firms: what lives where', 'Every unit and field carries a source chip: "From AppFolio · synced 9:40 a.m." (dashed, with a lock) or "Kept in Wynsley" (solid). Locked fields have an "Edit in AppFolio" button. Set-up shows one map of what each system owns. Switch the Firm control to "Keeps AppFolio" to see it.', 'console:setup'],
 ['6', 'Pending vs cleared, and a return two weeks later', 'Shape plus words: pending is an outlined amber pill that says "not paid yet"; cleared is solid teal. Every total says "as of". Each payment has a Stripe-stamped tracker. A return after payout adds a red step, a reversing entry, a queue item with "what happens next", and locks online payment for that lease. Nothing is silently edited.', 'console:rent'],
 ['7', 'Tenant pays in under a minute', 'Signed link from the firm\'s own number → bank (no fee, cheapest first) or card (fee shown) → pick bank → confirm. Four taps, no account, Spanish toggle. Every screen names the trust account and Stripe, and the tracker shows pending until it clears.', 'pay:'],
 ['8', 'Where next, how back, which device', 'Every screen has Back and links to the record, conversation, unit or payment it touches. Phone carries the daily screens (queue, inbox, people, rent at a glance, repairs, alerts). Desktop has every screen, and set-up, facts editing, payouts, sign-off, reports and the website stay there.', 'map:'],
 ['9', 'Merge, split, cut', 'See the Upgrades below: brief + queue merged, holds folded into the queue, the receipt kept inside the conversation, Replay reused as the "before us" baseline, rent split between a broker glance (phone) and a bookkeeper record (desktop).', 'map:']
];
const UP = [
 ['Merge', 'Morning brief + queue = "Today"', 'The 7:30 text and the app open the same five lines, so there is one place to look.'],
 ['Merge', 'Holds and step-ups → a "Held" filter in the queue', 'Same 1 · 2 · 3 habit, no extra screen to remember.'],
 ['Merge', 'Receipt stays inside the conversation', 'Proof sits next to what it proves; "share as a page" covers sending it.'],
 ['Reuse', 'Replay becomes the "before us" baseline in every monthly report', 'The sales demo keeps proving value after the sale.'],
 ['Split', 'Rent on phone = glance and pay link; on desktop = the full record', 'Brokers check, bookkeepers reconcile; the risky actions stay on a big screen.'],
 ['Add', 'Connections table with a "while it waits" column', 'Pending outside approvals never look like a broken product.'],
 ['Add', 'Data map for firms that keep their PMS', 'They can see in one place what is read-only here and why.'],
 ['Add', 'One tracker for receipts, payments and the tenant page', 'Broker and tenant read the same steps, so "did it go through?" calls answer themselves.'],
 ['Add', 'Remove someone from the phone (More → Team)', 'Cutting access is urgent and often happens away from a desk.'],
 ['Cut', 'Separate pipeline report screen', 'Its numbers live in the monthly report; the pipeline stays a working board.']
];
W.mapView = () => `<div style="background:var(--paper);min-height:calc(100vh - 44px);padding:28px clamp(16px,3vw,40px) 80px"><div style="max-width:1320px;margin:0 auto">
 <div class="eyb">Wynsley product · flow map</div><h1 class="h1" style="margin-top:8px;font-size:32px">From "yes" to running sales and rentals in one place</h1>
 <p class="sub" style="max-width:760px">Every box opens that screen in the prototype; every chip under it is a real path. Palmetto &amp; Tide Realty is a made-up firm. Use the controls in the black bar to switch the firm's PMS, Stripe and texting states; every screen follows.</p>
 <div class="row" style="margin-top:12px;gap:6px;flex-wrap:wrap">${Object.keys(dev).map(tag).join('')}<span class="note" style="margin-left:6px">Numbers are spec screens.</span></div>
 <div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-top:20px">${cols.map(([h, s, nodes]) => `<div style="background:#F1ECE3;border-radius:16px;padding:12px"><div style="font:600 14px Sora,sans-serif">${h}</div><div class="note">${s}</div>
  <div style="display:grid;gap:8px;margin-top:10px">${nodes.map(([n, d, num, go, leads], i) => `<div class="card" style="padding:10px 12px;position:relative">${i ? '<span style="position:absolute;top:-9px;left:22px;width:2px;height:9px;background:#CFC5B5"></span>' : ''}<button style="border:0;background:none;padding:0;text-align:left;width:100%" data-go="${go}"><div class="row" style="gap:6px"><span class="mono note" style="font-size:10.5px">${num}</span><b style="font-size:13.5px">${n}</b></div><div style="margin-top:4px">${tag(d)}</div></button>
  ${leads.length ? `<div class="row" style="flex-wrap:wrap;gap:4px;margin-top:8px">${leads.map(([l, g]) => `<button class="btn sm" style="height:24px;font-size:11px;padding:0 7px" data-go="${g}">→ ${l}</button>`).join('')}</div>` : ''}</div>`).join('')}</div></div>`).join('')}</div>
 <h2 class="h2" style="margin-top:36px;font-size:22px">The nine questions</h2>
 <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:12px">${QA.map(([n, h, a, g]) => `<div class="card pad"><div class="row"><span class="mono" style="width:24px;height:24px;border-radius:50%;background:#1D1B19;color:#fff;display:grid;place-items:center;font-size:11px">${n}</span><b style="font-size:14px">${h}</b></div><p style="margin:8px 0 0;font-size:13px;color:var(--ink2)">${a}</p>${g !== 'map:' ? `<button class="btn sm" style="margin-top:10px" data-go="${g}">Show me →</button>` : ''}</div>`).join('')}</div>
 <h2 class="h2" style="margin-top:36px;font-size:22px">Upgrades</h2><p class="sub">Each one is a proposal for Madhav to accept; the spec's scope stays as written until then. None needs new data.</p>
 <div class="card" style="margin-top:12px"><table class="tbl"><thead><tr><th>Kind</th><th>Upgrade</th><th>Why</th></tr></thead><tbody>${UP.map(([k, a, b]) => `<tr><td><span class="up"><b>${k.toUpperCase()}</b></span></td><td><b>${a}</b></td><td class="note">${b}</td></tr>`).join('')}</tbody></table></div>
 <div class="card pad" style="margin-top:16px;background:#FBF9F5"><div class="eyb">Kept as fixed</div><p style="margin:6px 0 0;font-size:13px">One record per person. Rent on the broker's own Stripe into its trust account; Wynsley never holds it; pending never shown as paid; corrections are reversing entries; no automatic late fees, refunds or owner payouts. Staff by invitation only; customers never make an account. Everything customers see is in the brokerage's name. No chart dashboards. Spanish from day one.</p></div>
</div></div>`;
})();
/* v2 console shell + Today: calmer, denser, product-grade. Overrides earlier definitions. */
(function () {
const W = window.WyProto, S = W.S, ic = W.ic;

W.CSS2 = `
.wp:not(.notes) .up,.wp:not(.notes) .scr{display:none !important}
.cs{grid-template-columns:240px minmax(0,1fr);background:#F6F3EE}
.cs-side{background:#FAF8F4;padding:12px 10px;gap:1px;border-right:1px solid #E8E2D8}
.cs-firm{border:0;background:transparent;padding:8px 8px 10px;margin-bottom:6px;border-radius:10px}
.cs-firm:hover{background:#F1ECE4}
.cs-firm .lg{width:28px;height:28px;border-radius:7px;font-size:11px}
.cs-nav{height:32px;padding:0 10px;font-size:13.5px;font-weight:500;color:#4A443D;border-radius:7px;gap:10px}
.cs-nav svg{color:#8A8276}
.cs-nav:hover{background:#F0EBE2}
.cs-nav.on{background:#EAE4D9;color:#1D1B19}
.cs-nav.on svg{color:#1D1B19}
.cs-nav .ct{background:none;color:#8A8276;font:500 12px 'Instrument Sans',sans-serif;padding:0}
.cs-nav .ct.hot{background:#1D1B19;color:#fff;border-radius:999px;padding:0 7px;font-weight:600;font-size:11.5px;line-height:18px}
.cs-nav.on .ct{background:none;color:#4A443D}.cs-nav.on .ct.hot{background:#1D1B19;color:#fff}
.cs-grp{font:600 11.5px 'Instrument Sans',sans-serif;letter-spacing:0;color:#9A9184;padding:14px 10px 4px;text-transform:none}
.cs-top{height:56px;padding:0 28px;background:rgba(246,243,238,.9);border-bottom:1px solid #E8E2D8}
.cs-search{max-width:420px;height:36px;padding:0 12px;border-color:#E3DCD0;background:#fff;font-size:13.5px}
.cs-body{padding:24px 28px 64px;max-width:1320px}
.icb{width:36px;height:36px;border-radius:9px;border:1px solid #E3DCD0;background:#fff;display:grid;place-items:center;color:#4A443D}
.icb:hover{border-color:#CFC5B5}
.cs .eyb{font:600 12px 'Instrument Sans',sans-serif;letter-spacing:0;text-transform:none;color:#8A8276}
.cs .h1{font-size:22px}
.cs .card{border-color:#E8E2D8;border-radius:12px}
.cs .btn{height:32px;border-color:#E3DCD0;border-radius:8px;font-weight:600}
.cs .kbd{opacity:1;border:1px solid rgba(255,255,255,.35);border-radius:4px;padding:0 4px;font:600 10.5px 'IBM Plex Mono',monospace;line-height:16px}
.cs .btn:not(.pri) .kbd{border-color:#D9D1C3;color:#8A8276}
/* today */
.td-head{display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap}
.td-tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:#E8E2D8;border:1px solid #E8E2D8;border-radius:12px;overflow:hidden;margin-top:16px}
.td-tile{background:#fff;padding:14px 16px;text-align:left;border:0;display:block;width:100%}
.td-tile:hover{background:#FCFBF8}
.td-tile .l{font-size:12.5px;color:#6E665C;font-weight:500;display:flex;align-items:center;gap:6px}
.td-tile .v{font:600 24px/1.1 'Sora',sans-serif;letter-spacing:-.02em;margin-top:6px;color:#1D1B19}
.td-tile .s{font-size:12.5px;color:#6E665C;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.td-tile.bad .v{color:#B8392A}
.td-win{display:flex;align-items:center;gap:8px;margin-top:10px;font-size:13px;color:#4A443D}
.qp{margin-top:22px;background:#fff;border:1px solid #E8E2D8;border-radius:12px;overflow:hidden}
.qp-h{display:flex;align-items:center;gap:18px;padding:0 16px;border-bottom:1px solid #EEE8DE;height:46px}
.qp-t{border:0;background:none;height:46px;padding:0 2px;font-size:13px;font-weight:600;color:#8A8276;border-bottom:2px solid transparent;display:flex;align-items:center;gap:6px}
.qp-t .n{font-weight:500;color:#A39A8C}
.qp-t.on{color:#1D1B19;border-bottom-color:#1D1B19}.qp-t.on .n{color:#6E665C}
.qp-b{display:grid;grid-template-columns:380px minmax(0,1fr);min-height:560px}
.ql{border-right:1px solid #EEE8DE;max-height:680px;overflow:auto}
.qr{display:grid;grid-template-columns:32px minmax(0,1fr) auto;gap:11px;padding:12px 14px 12px 16px;border-bottom:1px solid #F2EDE5;cursor:pointer;position:relative}
.qr:hover{background:#FBF9F6}
.qr.sel{background:#F5F1EA}
.qr.sel:before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:#1D1B19}
.av{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;font:600 11.5px 'Instrument Sans',sans-serif;flex:none}
.qr .nm{font-weight:600;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.qr .sm{font-size:13px;color:#3A342E;margin-top:1px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.qr .mt{display:flex;align-items:center;gap:6px;margin-top:5px;font-size:12px;color:#8A8276;white-space:nowrap;overflow:hidden}
.kd{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600}
.kd i{width:7px;height:7px;border-radius:2px;display:inline-block}
.qd{display:flex;flex-direction:column;min-width:0}
.qd-h{display:flex;align-items:center;gap:12px;padding:16px 22px;border-bottom:1px solid #F2EDE5}
.qd-b{padding:18px 22px;flex:1;display:grid;gap:16px;align-content:start}
.qd-f{display:flex;align-items:center;gap:8px;padding:12px 22px;border-top:1px solid #EEE8DE;background:#FCFBF8;flex-wrap:wrap}
.msg{background:#F4F0E9;border-radius:12px;border-top-left-radius:4px;padding:10px 13px;font-size:14px;max-width:560px}
.lbl2{font-size:12px;font-weight:600;color:#8A8276;margin-bottom:6px;display:flex;align-items:center;gap:8px}
.draft{border:1px solid #CFE3DF;background:#F7FBFA;border-radius:10px;padding:12px 14px;font-size:14px;line-height:1.5}
.fn{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.fn span{font-size:12px;color:#5E574E;background:#F4F0E9;border-radius:6px;padding:2px 8px}
.callout{border-radius:10px;padding:12px 14px;font-size:13px;line-height:1.5}
.co-red{background:#FDF1EE;border:1px solid #F6D3CB}.co-amb{background:#FFF8EA;border:1px solid #F3DFB2}.co-plm{background:#F6F2FB;border:1px solid #E4D9F2}
.opt{display:flex;align-items:center;gap:12px;border:1px solid #E3DCD0;border-radius:10px;padding:12px 14px;text-align:left;background:#fff;width:100%}
.opt.on{border-color:#1D1B19;box-shadow:0 0 0 1px #1D1B19}
.mini-tr{display:flex;align-items:center;gap:0;margin-top:4px}
.mini-tr .st{display:flex;flex-direction:column;align-items:flex-start;gap:4px;flex:1;font-size:11.5px;color:#6E665C}
.mini-tr .bar{height:3px;width:100%;border-radius:2px}
@media (max-width:1180px){.qp-b{grid-template-columns:320px minmax(0,1fr)}.td-tiles{grid-template-columns:repeat(2,minmax(0,1fr))}}
`;

const avc = { jordan: ['#E8E1F5', '#5B3E8C'], marisol: ['#FDE3DC', '#A1362A'], luis: ['#DDEFEC', '#0B6F69'], sofia: ['#FCEBD3', '#8F5A00'], andre: ['#E6EEF7', '#2C5A8C'], robert: ['#EFE6DA', '#6B4E2E'] };
W.av = (id, size = 32) => { const n = W.pname(id); const ini = id ? n.split(' ').map(x => x[0]).slice(0, 2).join('') : '?'; const c = avc[id] || ['#EEE9E1', '#6E665C']; return `<span class="av" style="width:${size}px;height:${size}px;background:${c[0]};color:${c[1]};font-size:${size > 34 ? 14 : 11.5}px">${ini}</span>`; };
const KIND = { rev: ['Reply to review', '#1D1B19'], q: ['Question for you', '#7A55B8'], fyi: ['FYI', '#B3A99A'], hold: ['Held for proof', '#D08A12'] };
const kd = k => `<span class="kd" style="color:${k === 'fyi' ? '#8A8276' : KIND[k][1]}"><i style="background:${KIND[k][1]}"></i>${KIND[k][0]}</span>`;
const extra = {
 q1: { ch: 'Email', icon: 'mail', msg: 'Is 1520 NE 4th still available? Would the seller take $650k?', at: '8:51 a.m.' },
 q2: { ch: 'Payment', icon: 'card', at: 'Nov 17' },
 q3: { ch: 'Text', icon: 'chat', msg: 'El aire acondicionado no enfría. Hace 84 grados adentro.', tr: "The AC isn't cooling. It's 84 degrees inside.", at: '9:23 a.m.' },
 q4: { ch: 'Website chat', icon: 'chat', msg: '¿Se permiten dos gatos en el de Wilton Manors?', tr: 'Are two cats allowed at the Wilton Manors one?', at: '9:00 a.m.' },
 q5: { ch: 'Lease', icon: 'key', at: 'Yesterday' },
 q6: { ch: 'Chat → text', icon: 'chat', at: '2:16 a.m.' },
 q7: { ch: 'Text', icon: 'chat', msg: 'Send me the door code for 2611 NW 9th, I want to see it now', at: '9:19 a.m.' }
};

/* ---------- shell ---------- */
W.side = (cur) => {
 const open = W.openQ().filter(q => q.kind !== 'hold').length;
 const left = ['profile', 'email', 'calls', 'chat', 'exports'].filter(k => !S.setup[k]).length + (S.setup.texting === 'todo' ? 1 : 0);
 const n = (r, l, i, ct, hot) => `<button class="cs-nav ${cur === r ? 'on' : ''}" data-go="console:${r}">${ic(i, 16, 1.8)}${l}${ct ? `<span class="ct ${hot ? 'hot' : ''}" style="margin-left:auto">${ct}</span>` : ''}</button>`;
 return `<aside class="cs-side">
 <button class="cs-firm" data-act="firmSwitch" style="display:flex;align-items:center;gap:10px;width:100%;text-align:left"><span class="lg">P&amp;T</span><span style="min-width:0;flex:1"><span style="display:block;font-weight:600;font-size:13.5px">Palmetto &amp; Tide</span><span style="font-size:12px;color:#8A8276">Dana Ruiz · Owner</span></span>${ic('chev', 15, 2)}</button>
 ${n('today', 'Today', 'queue', open, true)}${n('inbox', 'Conversations', 'chat')}${n('people', 'People & homes', 'user')}${n('pipeline', 'Pipeline', 'pipe')}
 <div class="cs-grp">Rentals</div>${n('rentals', 'Units & repairs', 'key')}${n('rent', 'Rent & payments', 'card', S.sc.stripe === 'test' ? 'Test' : '')}
 <div class="cs-grp">Desk</div>${n('facts', 'Fact sheet', 'book', S.resolved.includes('q4') ? '' : '1')}${n('reports', 'Reports', 'report')}${n('site', 'Website & Google', 'globe')}
 <div class="cs-grp">Firm</div>${n('setup', 'Set-up & health', 'plug', S.setup.live ? '' : (left ? left + ' left' : ''))}${n('team', 'Team & access', 'team')}
 <div style="flex:1"></div>
 <button class="cs-nav" data-go="phone:today">${ic('phone', 16, 1.8)}iPhone app</button>
 <button class="cs-nav" data-act="toast|Opened your shared thread with Maddy.">${ic('chat', 16, 1.8)}Message Maddy<span class="ct" style="margin-left:auto">~1 h</span></button>
 </aside>`;
};
W.top = () => `<div class="cs-top"><button class="cs-search" data-act="search">${ic('search', 15)}<span>Search people, homes, payments</span><span class="kbd" style="margin-left:auto;opacity:.7">⌘K</span></button><span style="flex:1"></span>
 <span class="row" style="gap:6px;font-size:12.5px;color:#4A443D;margin-right:6px"><span class="dot" style="background:${S.setup.live ? '#14A89E' : '#E7B451'}"></span>${S.setup.live ? 'Live · ' + ({ auto: 'auto-send', review: 'review week 1', always: 'review every reply' }[S.setup.mode]) : 'Setting up'}</span>
 <button class="icb" title="Voice note" data-act="voice">${ic('mic', 16, 1.8)}</button>
 <button class="icb" title="Alerts" data-go="phone:lock">${ic('bell', 16, 1.8)}</button>
 <button class="icb" title="Dana Ruiz" style="background:#1D1B19;color:#fff;border-color:#1D1B19;font:600 11.5px 'Instrument Sans',sans-serif" data-go="console:team">DR</button></div>`;

/* ---------- Today ---------- */
W.CR.today = () => {
 const all = W.openQ(), f = S.qf;
 const match = q => f === 'all' ? q.kind !== 'hold' : f === 'rent' ? ['rent', 'repair', 'lease'].includes(q.area) : f === 'hold' ? q.kind === 'hold' : q.kind === f;
 const list = all.filter(match);
 const cnt = k => all.filter(q => q.kind === k).length;
 if (!list.find(q => q.id === S.sel)) S.sel = list[0] && list[0].id;
 const sel = all.find(q => q.id === S.sel);
 const need = all.filter(q => q.kind !== 'hold').length;
 const callsBroken = !S.setup.calls;
 const tabs = [['all', 'All', need], ['rev', 'Replies', cnt('rev')], ['q', 'Questions', cnt('q')], ['fyi', 'FYI', cnt('fyi')], ['rent', 'Rent & repairs', all.filter(q => ['rent', 'repair', 'lease'].includes(q.area)).length], ['hold', 'Held', cnt('hold')]];
 return `<div class="eyb scr">Screen 3 · the queue, with the morning brief (5) on top</div>
 <div class="td-head"><div><h1 class="h1" style="font-size:24px">Good morning, Dana</h1><div style="color:#6E665C;margin-top:3px">Monday, November 23 · here's what happened since you left at 6:10 p.m.</div></div><span style="flex:1"></span>
  <button class="btn" data-go="phone:sms">${ic('chat', 14, 1.8)} Brief by text</button><button class="btn" data-go="console:reports">${ic('report', 14, 1.8)} Weekly letter</button></div>
 <div class="up" style="margin-top:10px"><b>UPGRADE</b> Brief and queue are one screen; the 7:30 text opens exactly this.</div>
 <div class="td-tiles">
  <button class="td-tile" data-go="console:inbox"><div class="l">${ic('inbox', 14, 1.8)} New inquiries</div><div class="v">14</div><div class="s">All answered · 9 after hours</div></button>
  <button class="td-tile" data-go="console:pipeline"><div class="l">${ic('home', 14, 1.8)} Tours today</div><div class="v">2</div><div class="s">11:00 Victoria Park · 4:30 Coral Ridge #6</div></button>
  <button class="td-tile" data-act="qf|all"><div class="l">${ic('queue', 14, 1.8)} Needs you</div><div class="v">${need}</div><div class="s">${need ? `${cnt('rev')} replies · ${cnt('q')} questions · ${cnt('fyi')} FYI · 2 tasks due` : 'All clear'}</div></button>
  <button class="td-tile ${callsBroken ? 'bad' : ''}" data-go="console:setup"><div class="l">${ic(callsBroken ? 'x' : 'chk', 14, 2)} Health</div><div class="v">${callsBroken ? '1 issue' : 'All good'}</div><div class="s">${callsBroken ? 'Call forwarding failed the 6:05 a.m. test →' : 'Every door passed its morning test'}</div></button>
 </div>
 <div class="td-win">${ic('spark', 15, 1.8)}<span><b style="font-weight:600">Win:</b> Sofía H. asked about a rental at 2:14 a.m. in Spanish and booked a Saturday tour 38 seconds later.</span><button class="link" style="margin-left:4px;font-size:12.5px" data-go="console:conv:sofia">See receipt</button></div>
 <div class="qp" id="queue"><div class="qp-h">${tabs.map(([k, l, n]) => `<button class="qp-t ${f === k ? 'on' : ''}" data-act="qf|${k}">${l}<span class="n">${n}</span></button>`).join('')}<span style="flex:1"></span><span style="font-size:12px;color:#8A8276">${ic('clock', 12, 2)} Oldest first · <span class="kbd" style="border-color:#D9D1C3;color:#8A8276">J</span> <span class="kbd" style="border-color:#D9D1C3;color:#8A8276">K</span> to move</span></div>
 ${list.length ? `<div class="qp-b"><div class="ql">${list.map(q => { const x = extra[q.id] || {}; return `<div class="qr ${q.id === S.sel ? 'sel' : ''}" data-act="qsel|${q.id}">${W.av(q.who)}<div style="min-width:0"><div class="row" style="gap:6px"><span class="nm">${q.who ? W.pname(q.who) : 'Unknown number'}</span><span style="font-size:12px;color:#8A8276;white-space:nowrap">${q.role}</span></div><div class="sm">${q.sum}</div><div class="mt">${kd(q.kind)}<span>·</span>${ic(x.icon || 'chat', 12, 1.8)}<span style="overflow:hidden;text-overflow:ellipsis">${W.uname(q.prop).split(',')[0]}</span></div></div><span style="font-size:12px;color:${/h|d/.test(q.wait) ? '#B8392A' : '#8A8276'};white-space:nowrap">${q.wait}</span></div>`; }).join('')}</div>
  <div class="qd">${sel ? W.qDetail(sel) : ''}</div></div>`
 : `<div class="empty" style="padding:64px 20px"><div style="width:44px;height:44px;border-radius:50%;background:#E3F2F0;color:#0B6F69;display:grid;place-items:center;margin:0 auto">${ic('chk', 22, 2.4)}</div><div class="sora" style="font-size:18px;color:#1D1B19;margin-top:12px;font-weight:600">You're all caught up</div><p style="margin:6px 0 14px">New items show up here and on your phone.</p><button class="btn" data-act="reset">Restore demo items</button></div>`}</div>
 <div class="up" style="margin-top:10px"><b>UPGRADE</b> Holds live inside the queue as a filter, not a separate screen.</div>`;
};

W.qDetail = (q) => {
 const x = extra[q.id] || {}, p = q.who ? W.people[q.who] : null;
 const head = `<div class="qd-h">${W.av(q.who, 40)}<div style="min-width:0;flex:1"><div class="row" style="gap:8px"><b style="font-size:15px">${q.who ? W.pname(q.who) : 'Unknown number'}</b>${kd(q.kind)}</div><div style="font-size:12.5px;color:#6E665C;margin-top:2px">${q.role}${p ? ' · ' + p.lang : ''} · ${W.uname(q.prop)}</div></div>
  ${q.conv ? `<button class="icb" title="Open conversation" data-go="console:conv:${q.conv}">${ic('chat', 15, 1.8)}</button>` : ''}${q.pay ? `<button class="icb" title="Open payment" data-act="openPay|${q.pay}">${ic('card', 15, 1.8)}</button>` : ''}${q.who ? `<button class="icb" title="Open record" data-go="console:person:${q.who}">${ic('user', 15, 1.8)}</button>` : ''}</div>`;
 const incoming = x.msg ? `<div><div class="lbl2">${ic(x.icon, 13, 1.8)} ${x.ch} · ${x.at}</div><div class="msg">${x.msg}${x.tr ? `<div style="font-size:12.5px;color:#6E665C;margin-top:6px;border-top:1px solid #E6DFD3;padding-top:6px">${x.tr}</div>` : ''}</div></div>` : '';
 const draft = (label) => `<div><div class="lbl2">${ic('spark', 13, 1.8)} ${label}<span style="flex:1"></span><span style="font-weight:500">Waiting ${q.wait}</span></div><div class="draft">${q.draft}</div><div class="fn">${q.srcs.map(s => `<span>${s}</span>`).join('')}</div></div>`;
 const btn = (lbl, k, act, pri) => `<button class="btn ${pri ? 'pri' : ''}" data-act="${act}">${lbl} <span class="kbd">${k}</span></button>`;
 if (q.id === 'q2') {
  return `${head}<div class="qd-b"><div class="callout co-red"><div class="row" style="gap:8px"><b>Payment returned · $1,800</b><span style="flex:1"></span><span style="font-size:12px;color:#8A8276">py_3QdN…4Rt</span></div>
   <div class="mini-tr" style="margin-top:12px">${[['Paid Nov 3', '#0B6F69'], ['Cleared Nov 7', '#0B6F69'], ['In trust Nov 9', '#0B6F69'], ['Returned Nov 17', '#C2412D']].map(([l, c]) => `<div class="st"><span class="bar" style="background:${c}"></span>${l}</div>`).join('<span style="width:4px"></span>')}</div>
   <ul style="margin:12px 0 0;padding-left:18px;color:#3A342E"><li>Her bank returned it (R01, insufficient funds). $1,800 came back out of the trust account.</li><li>Online payments for this lease are now locked: certified funds only.</li><li>November shows unpaid until funds are recorded. A reversing entry was added; nothing was edited.</li></ul></div>
   ${draft('Text to Marisol · in Spanish')}</div>
   <div class="qd-f">${btn('Send text', '1', 'resolve|q2|Sent to Marisol in Spanish, from Palmetto & Tide\'s number.', 1)}${btn('Edit', '2', 'toast|Edit the text, then send.')}${btn("I'll call", '3', "resolve|q2|Marked: you'll call Marisol.")}<span style="flex:1"></span><button class="btn" data-act="openPay|cr4">Record certified funds</button></div>`;
 }
 if (q.kind === 'rev') return `${head}<div class="qd-b">${incoming}${draft('Drafted reply · AI')}<div style="font-size:12.5px;color:#6E665C">${ic('shield', 13, 1.8)} Price and offers: the AI drafts, Marcus sends it under his own name.</div></div>
  <div class="qd-f">${btn('Send', '1', `resolve|${q.id}|Sent as Marcus Bell. Logged on the receipt.`, 1)}${btn('Edit', '2', 'toast|Edit the draft, then send. Your edit becomes the sent version.')}${btn("I'll call", '3', `resolve|${q.id}|Marked: you'll call. Reminder in 30 min if it isn't logged.`)}<span style="flex:1"></span><button class="btn ghost" data-act="voice">${ic('mic', 14, 1.8)} Teach the desk</button></div>`;
 if (q.id === 'q3') { const r = S.routePick || 0; return `${head}<div class="qd-b">${incoming}
  <div class="row" style="gap:8px"><span class="pill p-pen">Urgent</span><span style="font-size:12.5px;color:#6E665C">Not an emergency: no water, gas or fire. Luis is home all day.</span></div>
  <div><div class="lbl2">Who should take it?</div><div style="display:grid;gap:8px">${[['Ray Dubois', 'Your maintenance · free today after 1 p.m.', 'Usual for AC at this address'], ['Coastal Air', 'Vendor · next morning', '$95 call-out']].map(([a, b, c], i) => `<button class="opt ${r === i ? 'on' : ''}" data-act="pick|${i}"><span style="width:16px;height:16px;border-radius:50%;border:${r === i ? '5px solid #1D1B19' : '1.5px solid #CFC5B5'};flex:none"></span><span style="flex:1"><b style="font-size:13.5px">${a}</b><div style="font-size:12.5px;color:#6E665C">${b}</div></span><span style="font-size:12px;color:#8A8276">${c}</span></button>`).join('')}</div></div>
  <div style="font-size:12.5px;color:#6E665C">Luis gets a text in Spanish at each step: received, assigned, scheduled, done.</div></div>
  <div class="qd-f"><button class="btn pri" data-act="route|q3|${r ? 'Coastal Air (vendor)' : 'Ray (your maintenance)'}">Send to ${r ? 'Coastal Air' : 'Ray'} <span class="kbd">1</span></button><span style="flex:1"></span><button class="btn" data-go="console:unit:kl1">Open unit</button></div>`; }
 if (q.id === 'q4') return `${head}<div class="qd-b">${incoming}<div class="callout co-plm"><b>The desk doesn't know this yet.</b> Your fact sheet covers dogs at this building, not cats. It told Sofía an agent will confirm.</div>
  <div><div class="lbl2">Your answer</div><input class="inp" value="Up to two cats are fine, same $300 pet fee."><label class="row" style="gap:8px;margin-top:8px;font-size:12.5px;color:#4A443D"><input type="checkbox" checked> Save as a fact for 2611 NW 9th Ave, in English and Spanish</label></div></div>
  <div class="qd-f"><button class="btn pri" data-act="approveFact">Answer Sofía <span class="kbd">1</span></button><button class="btn" data-act="voice">${ic('mic', 14, 1.8)} Answer by voice</button></div>`;
 if (q.kind === 'hold') return `${head}<div class="qd-b">${incoming}<div class="callout co-amb"><b>Why it's held</b><ul style="margin:6px 0 0;padding-left:18px">${q.why.map(w => `<li>${w}</li>`).join('')}</ul></div>
  <div style="font-size:12.5px;color:#6E665C">They already got the same first reply as everyone, and an agent-led showing was offered. Only the door code waits for proof.</div></div>
  <div class="qd-f"><button class="btn pri" data-act="resolve|${q.id}|Kept. The proof link was sent; an agent-led showing stays on offer.">Keep the proof rule</button><button class="btn" data-act="resolve|${q.id}|Restored. The evidence stays on record.">Restore</button></div>`;
 return `${head}<div class="qd-b"><div style="font-size:14px">${q.sum}</div>${q.area === 'lease' ? `<div class="callout co-amb">Lease at Coral Ridge #6 ends <b>Jan 31</b> (69 days). Rent $1,950. Andre has paid on time 9 of 10 months. Owner Helen Castro wants to renew at $2,000.</div>` : `<div class="callout" style="background:#F4F0E9">Camila accepted the hand-off 2 minutes after the office opened. Tour Saturday 1:00 p.m. · 2611 NW 9th Ave, Unit B.</div>`}</div>
  <div class="qd-f">${q.area === 'lease' ? `<button class="btn pri" data-act="resolve|${q.id}|Renewal offer drafted for Andre and a task added for Camila.">Start renewal</button><button class="btn" data-go="console:unit:cr6">Open unit</button>` : `<button class="btn" data-go="console:conv:sofia">Open receipt</button>`}<span style="flex:1"></span><button class="btn ghost" data-act="resolve|${q.id}|Dismissed.">Dismiss</button></div>`;
};
W.ACT.pick = (i) => { S.routePick = +i; S._keepY = true; W.render(); };

/* keyboard: J/K move, 1/2/3 act on the selected item */
if (!W._keys) { W._keys = 1; document.addEventListener('keydown', (e) => {
 if (S.surface !== 'console' || S.route !== 'today' || S.modal) return;
 if (/INPUT|TEXTAREA|SELECT/.test((e.target.tagName || ''))) return;
 const list = W.openQ().filter(q => S.qf === 'all' ? q.kind !== 'hold' : S.qf === 'hold' ? q.kind === 'hold' : S.qf === 'rent' ? ['rent', 'repair', 'lease'].includes(q.area) : q.kind === S.qf);
 const i = list.findIndex(q => q.id === S.sel);
 if (e.key === 'j' || e.key === 'ArrowDown') { S.sel = (list[Math.min(list.length - 1, i + 1)] || {}).id; S._keepY = true; W.render(); e.preventDefault(); }
 if (e.key === 'k' || e.key === 'ArrowUp') { S.sel = (list[Math.max(0, i - 1)] || {}).id; S._keepY = true; W.render(); e.preventDefault(); }
 if (['1', '2', '3'].includes(e.key)) { const b = document.querySelectorAll('.qd-f .btn')[+e.key - 1]; if (b) b.click(); }
}); }
})();
/* Today v3: one thing at a time. A focus card, a short "up next", and the day on the right. */
(function () {
const W = window.WyProto, S = W.S, ic = W.ic;
W.CSS2 += `
.tz{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:28px;max-width:1180px;margin:0 auto;align-items:start}
.tz-hi{font:600 30px/1.15 'Sora',sans-serif;letter-spacing:-.025em;margin:6px 0 0;color:#1D1B19}
.tz-sub{color:#6E665C;margin-top:6px;font-size:14.5px}
.tz-prog{display:flex;gap:4px;margin-top:16px;max-width:420px}
.tz-prog i{flex:1;height:5px;border-radius:3px;background:#E6DFD3;transition:background .5s cubic-bezier(.22,1,.36,1)}
.tz-prog i.d{background:#0B6F69}
.fc{margin-top:22px;background:#fff;border-radius:16px;border:1px solid #E8E2D8;box-shadow:0 1px 2px rgba(29,27,25,.04),0 18px 40px -24px rgba(29,27,25,.18);overflow:hidden;animation:fcIn .55s cubic-bezier(.22,1,.36,1) both}
@keyframes fcIn{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}
.fc .qd-h{padding:20px 24px 16px;border-bottom:0}
.fc .qd-b{padding:0 24px 20px}
.fc .qd-f{padding:14px 24px;background:#FBF9F6}
.fc .btn{height:38px;padding:0 15px;font-size:13.5px}
.fc .qd-h .kd{display:none}
.fc .lbl2 span[style*="font-weight:500"]{display:none}
.fc-top{display:flex;align-items:center;gap:8px;padding:14px 24px 0;font-size:12.5px;color:#8A8276}
.nx{margin-top:18px}
.nx-h{display:flex;align-items:center;font-size:12.5px;font-weight:600;color:#8A8276;margin-bottom:6px;padding:0 4px}
.nx-r{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:0;background:none;padding:9px 8px;border-radius:9px;font-size:13.5px}
.nx-r:hover{background:#EFEAE1}
.nx-r .av{width:26px;height:26px;font-size:10px}
.nx-r .t{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#3A342E}
.dy{position:sticky;top:120px;display:grid;gap:14px}
.dy-c{background:#fff;border:1px solid #E8E2D8;border-radius:14px;padding:16px}
.dy-t{font-size:12.5px;font-weight:600;color:#8A8276;display:flex;align-items:center;gap:6px}
.ag{display:grid;grid-template-columns:52px 1fr;gap:10px;padding:9px 0;border-top:1px solid #F2EDE5;font-size:13px}
.ag:first-of-type{border-top:0}
.ag .tm{font:600 12.5px 'Instrument Sans',sans-serif;color:#1D1B19}
.chk{width:18px;height:18px;border-radius:5px;border:1.5px solid #CFC5B5;flex:none;display:grid;place-items:center;background:#fff}
.chk.on{background:#0B6F69;border-color:#0B6F69;color:#fff}
.done-wrap{margin-top:22px;background:#fff;border:1px solid #E8E2D8;border-radius:16px;padding:44px 28px;text-align:center;animation:fcIn .6s cubic-bezier(.22,1,.36,1) both}
@media (max-width:1100px){.tz{grid-template-columns:minmax(0,1fr)}.dy{position:static}}
`;
S.tasks = S.tasks || { t1: false, t2: false };
const NAME = { rev: 'Reply to review', q: 'Question', fyi: 'FYI', hold: 'Held for proof' };
W.CR.today = () => {
 const all = W.openQ();
 const live = all.filter(q => q.kind !== 'hold');
 const held = all.filter(q => q.kind === 'hold');
 const total = W.queueSeed().filter(q => q.kind !== 'hold').length;
 const done = total - live.length;
 if (!live.find(q => q.id === S.sel)) S.sel = live[0] && live[0].id;
 const cur = live.find(q => q.id === S.sel);
 const rest = live.filter(q => q !== cur);
 const mins = Math.max(1, Math.ceil(live.length * 0.7));
 const left = `<div>
  <div style="font-size:13px;color:#8A8276">Monday, November 23</div>
  <h1 class="tz-hi">${live.length ? `${live.length === 1 ? 'One thing needs' : live.length + ' things need'} you, Dana.` : `You're all caught up, Dana.`}</h1>
  <div class="tz-sub">${live.length ? `About ${mins} minute${mins > 1 ? 's' : ''}. Everything else was handled overnight.` : 'Nothing is waiting on you. New items will show up here and on your phone.'}</div>
  <div class="tz-prog">${Array.from({ length: total }, (_, i) => `<i class="${i < done ? 'd' : ''}"></i>`).join('')}</div>
  <div style="font-size:12px;color:#8A8276;margin-top:6px">${done} of ${total} done today</div>
  ${cur ? `<div class="fc" key="${cur.id}"><div class="fc-top"><span>${NAME[cur.kind]}</span><span>·</span><span>${live.indexOf(cur) + 1} of ${live.length}</span><span style="flex:1"></span><span>waiting ${cur.wait}</span>${rest.length ? `<button class="btn ghost sm" style="height:26px" data-act="skip">Skip ${ic('right', 13, 2)}</button>` : ''}</div>${W.qDetail(cur)}</div>
  ${rest.length ? `<div class="nx"><div class="nx-h">Up next<span style="flex:1"></span><span style="font-weight:500"><span class="kbd" style="border-color:#D9D1C3;color:#8A8276">J</span> <span class="kbd" style="border-color:#D9D1C3;color:#8A8276">K</span> to move</span></div>${rest.map(q => `<button class="nx-r" data-act="qsel|${q.id}">${W.av(q.who, 26)}<b style="font-weight:600;white-space:nowrap">${W.pname(q.who)}</b><span class="t">${q.sum}</span><span style="font-size:12px;color:#8A8276;white-space:nowrap">${NAME[q.kind]} · ${q.wait}</span></button>`).join('')}</div>` : ''}`
  : `<div class="done-wrap"><div style="width:52px;height:52px;border-radius:50%;background:#E3F2F0;color:#0B6F69;display:grid;place-items:center;margin:0 auto">${ic('chk', 26, 2.6)}</div><div class="sora" style="font-size:20px;font-weight:600;margin-top:14px">Inbox zero, before 10 a.m.</div><p style="color:#6E665C;margin:6px 0 16px">You cleared ${total} items. The desk keeps answering; we'll ping you if something needs a person.</p><button class="btn" data-act="reset">Restore the demo</button></div>`}
  ${held.length ? `<button class="nx-r" style="margin-top:10px;color:#8A8276" data-act="qhold">${ic('shield', 15, 1.8)}<span class="t" style="color:#8A8276">${held.length} inquiry held for proof · nothing you need to do</span>${ic('right', 13, 2)}</button>` : ''}
 </div>`;
 const t = S.tasks;
 const right = `<aside class="dy">
  <div class="dy-c"><div class="dy-t">${ic('clock', 13, 2)} Your day</div><div style="margin-top:8px">
   ${[['11:00', 'Tour · 1520 NE 4th Ave', 'Marcus · Jordan Avery', 'console:person:jordan'], ['4:30', 'Tour · Coral Ridge #6', 'Camila · renewal walk-through', 'console:unit:cr6']].map(([a, b, c, g]) => `<button class="ag" style="border-left:0;border-right:0;border-bottom:0;background:none;width:100%;text-align:left" data-go="${g}"><span class="tm">${a}</span><span><span style="display:block;font-weight:600">${b}</span><span style="color:#8A8276;font-size:12.5px">${c}</span></span></button>`).join('')}
   ${[['t1', 'Call Jordan about price', 'Marcus'], ['t2', 'Send renewal to Andre', 'Camila']].map(([k, a, b]) => `<button class="ag" style="border-left:0;border-right:0;border-bottom:0;background:none;width:100%;text-align:left;align-items:center" data-act="task|${k}"><span><span class="chk ${t[k] ? 'on' : ''}">${t[k] ? ic('chk', 12, 3) : ''}</span></span><span style="${t[k] ? 'text-decoration:line-through;color:#8A8276' : ''}"><span style="display:block;font-weight:500">${a}</span><span style="color:#8A8276;font-size:12.5px">${b} · due today</span></span></button>`).join('')}
  </div></div>
  <div class="dy-c"><div class="dy-t">${ic('inbox', 13, 2)} Overnight</div><div style="margin-top:8px;font-size:13.5px;line-height:1.5"><b style="font-weight:600">14 inquiries, all answered.</b> 9 came after hours; the typical first reply took 41 seconds.</div>
   <div style="margin-top:10px;font-size:13px;color:#3A342E;display:flex;gap:8px">${ic('spark', 15, 1.8)}<span>Sofía H. booked a Saturday tour at 2:14 a.m., in Spanish.</span></div>
   <button class="link" style="margin-top:10px;font-size:12.5px" data-go="console:inbox">See conversations</button></div>
  ${!S.setup.calls ? `<button class="dy-c" style="text-align:left;background:#FDF5F2;border-color:#F3D5CC;display:block;width:100%" data-go="console:setup"><div class="dy-t" style="color:#B8392A">${ic('x', 13, 2.4)} Needs fixing</div><div style="margin-top:6px;font-size:13.5px"><b style="font-weight:600">Call forwarding is off.</b> This morning's test call rang out, so calls aren't reaching the desk.</div><div style="margin-top:8px;font-size:12.5px;font-weight:600;color:#B8392A">Fix in 2 minutes →</div></button>` : ''}
  <div style="display:flex;gap:14px;font-size:12.5px;padding:0 4px"><button class="link" style="color:#6E665C" data-go="phone:sms">Brief by text</button><button class="link" style="color:#6E665C" data-go="console:reports">Weekly letter</button></div>
 </aside>`;
 return `<div class="eyb scr">Screen 3 + 5 · one thing at a time</div><div class="up" style="margin-bottom:10px"><b>UPGRADE</b> Focus mode: one case at a time with the day on the side, so clearing the queue takes minutes and feels finished.</div><div class="tz">${left}${right}</div>`;
};
W.ACT.skip = () => { const live = W.openQ().filter(q => q.kind !== 'hold'); const i = live.findIndex(q => q.id === S.sel); S.sel = (live[(i + 1) % live.length] || {}).id; S._keepY = true; W.render(); };
W.ACT.qhold = () => { S.modal = { k: 'hold' }; S._keepY = true; W.render(); };
W.MODALS.hold = () => { const q = S.queue.find(x => x.id === 'q7'); return `<div class="row"><h3 class="h2">Held for proof</h3><button class="btn ghost sm" style="margin-left:auto" data-act="modalClose">${ic('x')}</button></div><p class="note">Someone asked for a self-tour door code from an unverified number. They got the same first reply as everyone, and an agent-led showing was offered.</p><ul style="font-size:13px;padding-left:18px">${q.why.map(w => `<li>${w}</li>`).join('')}</ul><div class="row" style="margin-top:12px"><button class="btn pri" data-act="holdKeep">Keep the proof rule</button><button class="btn" data-act="holdKeep">Restore</button></div>`; };
W.ACT.holdKeep = () => { if (!S.resolved.includes('q7')) S.resolved.push('q7'); S.modal = null; S._keepY = true; W.render(); W.toast('Done. The evidence stays on record.'); };
W.ACT.task = (k) => { S.tasks[k] = !S.tasks[k]; S._keepY = true; W.render(); if (S.tasks[k]) W.toast('Done. Logged on the record.'); };
})();
/* Console v4: photos and faces, a calmer colour system, collapsible responsive sidebar, Today with pull. */
(function () {
const W = window.WyProto, S = W.S, ic = W.ic;
W.faces = W.faces || {}; // id -> image url (drop real team photos into assets/team/<id>.jpg and list them here)
W.homes = { 'vp-list': 'assets/home-a.jpg', kl1: 'assets/home-b.jpg', kl2: 'assets/home-b.jpg', cr4: 'assets/home-d.jpg', cr6: 'assets/home-d.jpg', wm2: 'assets/home-e.jpg', se3: 'assets/home-c.jpg', vp7: 'assets/home-c.jpg' };
W.homeImg = (id) => W.homes[id] || 'assets/home-e.jpg';
S.side = S.side || 'auto'; // auto | open | rail
S.drawer = false;

/* colour system: neutrals carry the page; colour only means something */
W.CSS2 += `
.cs{--bg:#F7F5F1;--sf:#fff;--ln:#ECE7DF;--ln2:#F3EFE8;--t1:#1C1A17;--t2:#57514A;--t3:#8C857B;
 --sale:#5B47B5;--saleBg:#F1EEFB;--rent:#0F6E68;--rentBg:#E7F3F1;--money:#A9620E;--moneyBg:#FBF2E3;--bad:#C2412D;--badBg:#FCEEEA;--ok:#1E7A55;--okBg:#E6F4EC;--brand:#F0643F;
 grid-template-columns:var(--sw,248px) minmax(0,1fr);background:var(--bg);transition:grid-template-columns .35s cubic-bezier(.22,1,.36,1)}
.cs.rail{--sw:68px}
.cs-side{background:#FBFAF8;border-right:1px solid var(--ln);padding:12px 10px;overflow-x:hidden}
.cs.rail .cs-side .lbl-t,.cs.rail .cs-side .ct,.cs.rail .cs-grp,.cs.rail .sd-firm-t,.cs.rail .sd-me-t{display:none}
.cs.rail .cs-nav{justify-content:center;padding:0}
.cs.rail .cs-grp-sp{height:14px}
.sd-head{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.sd-firm{display:flex;align-items:center;gap:10px;flex:1;min-width:0;border:0;background:none;padding:6px;border-radius:10px;text-align:left}
.sd-firm:hover{background:#F1EDE6}
.sd-logo{width:30px;height:30px;border-radius:8px;flex:none;background:linear-gradient(135deg,#0E4F5C,#1F8C85);color:#fff;display:grid;place-items:center;font:700 11px 'Sora',sans-serif}
.sd-tg{width:30px;height:30px;border-radius:8px;border:0;background:none;color:var(--t3);display:grid;place-items:center;flex:none}
.sd-tg:hover{background:#F1EDE6;color:var(--t1)}
.cs.rail .sd-head{flex-direction:column}
.cs-nav{height:34px;font-size:13.5px;color:var(--t2);position:relative}
.cs-nav.on{background:#fff;color:var(--t1);box-shadow:0 1px 2px rgba(28,26,23,.06),inset 0 0 0 1px var(--ln)}
.cs-nav.on svg{color:var(--brand)}
.cs-nav .ct.hot{background:var(--brand)}
.cs.rail .cs-nav .dotc{position:absolute;top:6px;right:14px;width:7px;height:7px;border-radius:50%;background:var(--brand)}
.sd-me{display:flex;align-items:center;gap:10px;padding:8px 6px;border-top:1px solid var(--ln);margin-top:6px}
.cs-top{border-bottom:1px solid var(--ln);background:rgba(247,245,241,.88)}
.hb{display:none}
@media (max-width:900px){.hide-sm{display:none !important}}
@media (max-width:760px){.cs{grid-template-columns:minmax(0,1fr) !important}.cs-side{position:fixed !important;left:0;top:44px;bottom:0;width:280px;height:auto !important;z-index:60;transform:translateX(-102%);transition:transform .35s cubic-bezier(.22,1,.36,1);box-shadow:20px 0 60px -20px rgba(0,0,0,.25)}.cs.drawer .cs-side{transform:none}.cs.drawer .cs-side .lbl-t,.cs.drawer .cs-side .ct,.cs.drawer .cs-grp,.cs.drawer .sd-firm-t,.cs.drawer .sd-me-t{display:initial}.hb{display:grid}.cs-top{gap:8px !important}.cs-top .icb[title=Alerts]{display:none}.cs-search{min-width:0}.cs-scrim{position:fixed;inset:44px 0 0 0;background:rgba(28,26,23,.3);z-index:55}.cs-body{padding:16px 14px 60px !important}.cs-top{padding:0 14px !important}}
.av{background-size:cover;background-position:center}
/* today v4 */
.t4{display:grid;grid-template-columns:minmax(0,1fr) 316px;gap:24px;max-width:1220px;margin:0 auto;align-items:start}
.band{position:relative;border-radius:18px;overflow:hidden;min-height:188px;color:#fff;display:flex;flex-direction:column;justify-content:flex-end;padding:22px 24px;background:#1B3A4A url(assets/today-band.jpg) 50% 60%/cover}
.band:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,26,36,.78) 0%,rgba(14,26,36,.45) 48%,rgba(14,26,36,.05) 100%)}
.band>*{position:relative}
.band h1{font:600 30px/1.1 'Sora',sans-serif;letter-spacing:-.025em;margin:4px 0 0}
.band .pg{display:flex;gap:4px;margin-top:14px;width:min(360px,100%)}
.band .pg i{flex:1;height:4px;border-radius:2px;background:rgba(255,255,255,.28)}
.band .pg i.d{background:#fff}
.stack{display:flex;align-items:center}
.stack .av{box-shadow:0 0 0 2px rgba(255,255,255,.9);margin-left:-6px}
.stack .av:first-child{margin-left:0}
.fc4{margin-top:18px;background:#fff;border:1px solid var(--ln);border-radius:16px;overflow:hidden;box-shadow:0 1px 2px rgba(28,26,23,.04),0 22px 44px -30px rgba(28,26,23,.25);display:grid;grid-template-columns:minmax(0,1fr) 248px;animation:fcIn .55s cubic-bezier(.22,1,.36,1) both}
.fc4 .main{min-width:0;display:flex;flex-direction:column}
.fc4 .qd-h{padding:18px 22px 12px;border-bottom:0}
.fc4 .qd-h .kd{display:none}
.fc4 .qd-b{padding:0 22px 18px}
.fc4 .qd-f{padding:12px 22px;background:#FBFAF8;margin-top:auto}
.fc4 .lbl2 span[style*="font-weight:500"]{display:none}
.fc4 .btn{height:36px}
.ctx{border-left:1px solid var(--ln2);background:#FBFAF8;display:flex;flex-direction:column}
.ctx .hp{height:150px;background-size:cover;background-position:center}
.ctx .bd{padding:14px 16px;display:grid;gap:8px;font-size:13px}
.ftop{display:flex;align-items:center;gap:8px;padding:14px 22px 0;font-size:12.5px;color:var(--t3)}
.chip{display:inline-flex;align-items:center;gap:5px;padding:2px 9px;border-radius:999px;font-size:12px;font-weight:600;line-height:20px;white-space:nowrap}
.c-sale{background:var(--saleBg);color:var(--sale)}.c-rent{background:var(--rentBg);color:var(--rent)}.c-money{background:var(--moneyBg);color:var(--money)}.c-bad{background:var(--badBg);color:var(--bad)}.c-ok{background:var(--okBg);color:var(--ok)}.c-n{background:#F1EDE6;color:var(--t2)}
.nx4{margin-top:16px;background:#fff;border:1px solid var(--ln);border-radius:14px;padding:6px}
.nx4-r{display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:12px;align-items:center;width:100%;text-align:left;border:0;background:none;padding:8px;border-radius:10px}
.nx4-r:hover{background:#F7F5F1}
.nx4-r .th{width:44px;height:44px;border-radius:10px;background-size:cover;background-position:center;position:relative}
.nx4-r .th .av{position:absolute;right:-5px;bottom:-5px;box-shadow:0 0 0 2px #fff}
.rc{background:#fff;border:1px solid var(--ln);border-radius:14px;padding:16px}
.rc-t{font-size:12.5px;font-weight:600;color:var(--t3);display:flex;align-items:center;gap:6px;margin-bottom:10px}
.tl4{display:grid;grid-template-columns:44px 1fr;gap:10px;align-items:center;padding:8px 0;border-top:1px solid var(--ln2)}
.tl4:first-of-type{border-top:0;padding-top:0}
.tl4 .tm{font:600 12.5px 'Instrument Sans',sans-serif;color:var(--t1)}
.tm-card{display:flex;align-items:center;gap:10px;min-width:0}
.tm-card .th{width:40px;height:40px;border-radius:9px;background-size:cover;background-position:center;flex:none}
.who4{display:flex;align-items:center;gap:10px;padding:7px 0}
.who4 .st{width:8px;height:8px;border-radius:50%;flex:none}
@media (max-width:1180px){.t4{grid-template-columns:minmax(0,1fr)}.fc4{grid-template-columns:minmax(0,1fr)}.ctx{border-left:0;border-top:1px solid var(--ln2);flex-direction:row}.ctx .hp{width:160px;height:auto;flex:none}}
@media (max-width:760px){.fc4 .qd-f .btn.ghost{display:none}.ftop{flex-wrap:wrap}.band{min-height:160px;padding:18px}.band h1{font-size:24px}.ctx{flex-direction:column}.ctx .hp{width:100%;height:140px}}
`;

/* faces: photo when we have one, warm initials otherwise */
const pal = { dana: ['#1C1A17', '#fff'], camila: ['#F6DCCB', '#8A3D17'], marcus: ['#DCE3F5', '#2D4A8A'], tess: ['#DDEFE6', '#1E6B4A'], jo: ['#EFE6F7', '#5B3E8C'], jordan: ['#E8E1F5', '#5B3E8C'], marisol: ['#FDE3DC', '#A1362A'], luis: ['#DDEFEC', '#0B6F69'], sofia: ['#FCEBD3', '#8F5A00'], andre: ['#E6EEF7', '#2C5A8C'], robert: ['#EFE6DA', '#6B4E2E'] };
const staffName = { dana: 'Dana Ruiz', camila: 'Camila Reyes', marcus: 'Marcus Bell', tess: 'Tess Moreno', jo: 'Jo Alvarez' };
W.av = (id, size = 32) => {
 const n = staffName[id] || W.pname(id); const ini = id ? n.split(' ').map(x => x[0]).slice(0, 2).join('') : '?';
 const c = pal[id] || ['#EEE9E1', '#6E665C']; const img = W.faces[id];
 return `<span class="av" title="${n}" style="width:${size}px;height:${size}px;background-color:${c[0]};color:${c[1]};font-size:${Math.round(size * 0.36)}px;${img ? `background-image:url(${img});color:transparent` : ''}">${ini}</span>`;
};

/* sidebar: open / rail / drawer */
const wide = () => (window.innerWidth || 1440);
W.isRail = () => wide() > 760 && (S.side === 'rail' || (S.side === 'auto' && wide() < 1100));
W.side = (cur) => {
 const open = W.openQ().filter(q => q.kind !== 'hold').length;
 const left = ['profile', 'email', 'calls', 'chat', 'exports'].filter(k => !S.setup[k]).length + (S.setup.texting === 'todo' ? 1 : 0);
 const n = (r, l, i, ct, hot) => `<button class="cs-nav ${cur === r ? 'on' : ''}" title="${l}" data-go="console:${r}">${ic(i, 17, 1.8)}<span class="lbl-t">${l}</span>${ct ? `<span class="ct ${hot ? 'hot' : ''}" style="margin-left:auto">${ct}</span>${hot ? '<span class="dotc"></span>' : ''}` : ''}</button>`;
 const g = (t) => `<div class="cs-grp">${t}</div><div class="cs-grp-sp" style="display:none"></div>`;
 return `<aside class="cs-side">
 <div class="sd-head"><button class="sd-firm" data-act="firmSwitch" title="Palmetto & Tide Realty"><span class="sd-logo">P&amp;T</span><span class="sd-firm-t" style="min-width:0"><span style="display:block;font-weight:600;font-size:13.5px;white-space:nowrap">Palmetto &amp; Tide</span><span style="font-size:12px;color:var(--t3)">Realty · Fort Lauderdale</span></span></button>
  <button class="sd-tg" title="${W.isRail() ? 'Expand sidebar' : 'Collapse sidebar'} ([)" data-act="sideToggle">${ic('sidebar', 17, 1.8)}</button></div>
 ${n('today', 'Today', 'queue', open, true)}${n('inbox', 'Conversations', 'chat')}${n('people', 'People & homes', 'user')}${n('pipeline', 'Pipeline', 'pipe')}
 ${g('Rentals')}${n('rentals', 'Units & repairs', 'key')}${n('rent', 'Rent & payments', 'card', S.sc.stripe === 'test' ? 'Test' : '')}
 ${g('Desk')}${n('facts', 'Fact sheet', 'book', S.resolved.includes('q4') ? '' : '1')}${n('reports', 'Reports', 'report')}${n('site', 'Website & Google', 'globe')}
 ${g('Firm')}${n('setup', 'Set-up & health', 'plug', S.setup.live ? '' : (left ? left + ' left' : ''))}${n('team', 'Team & access', 'team')}
 <div style="flex:1"></div>
 <button class="cs-nav" title="iPhone app" data-go="phone:today">${ic('phone', 17, 1.8)}<span class="lbl-t">iPhone app</span></button>
 <div class="sd-me" title="Dana Ruiz · Owner">${W.av('dana', 30)}<span class="sd-me-t" style="min-width:0;flex:1"><span style="display:block;font-weight:600;font-size:13px">Dana Ruiz</span><span style="font-size:12px;color:var(--t3)">Owner</span></span></div>
 </aside>`;
};
W.CR.phone = () => { setTimeout(() => W.go('phone:today'), 0); return ''; };
W.ACT.sideToggle = () => { if (wide() <= 760) { S.drawer = !S.drawer; } else { S.side = W.isRail() ? 'open' : 'rail'; } S._keepY = true; W.render(); };
W.ACT.drawerClose = () => { S.drawer = false; S._keepY = true; W.render(); };
const baseConsole = W.consoleView;
W.consoleView = () => {
 const h = baseConsole();
 if (!h.startsWith('<div class="cs">')) return h;
 const cls = `cs${W.isRail() ? ' rail' : ''}${S.drawer && wide() <= 760 ? ' drawer' : ''}`;
 return h.replace('<div class="cs">', `<div class="${cls}">${S.drawer && wide() <= 760 ? '<div class="cs-scrim" data-act="drawerClose"></div>' : ''}`);
};
W.top = () => `<div class="cs-top"><button class="icb hb" data-act="sideToggle" title="Menu">${ic('queue', 17, 1.8)}</button><button class="cs-search" data-act="search">${ic('search', 15)}<span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Search people, homes, payments</span><span class="kbd" style="margin-left:auto;opacity:.7">⌘K</span></button><span style="flex:1"></span>
 <span class="row hide-sm" style="gap:6px;font-size:12.5px;color:var(--t2);margin-right:4px;white-space:nowrap"><span class="dot" style="background:${S.setup.live ? '#1E7A55' : '#D89A2B'}"></span>${S.setup.live ? 'Desk live' : 'Setting up'}</span>
 <button class="icb" title="Voice note" data-act="voice">${ic('mic', 16, 1.8)}</button><button class="icb" title="Alerts" data-go="phone:lock">${ic('bell', 16, 1.8)}</button></div>`;
if (!W._rs) { W._rs = 1; let last = W.isRail() + '' + (wide() <= 760); window.addEventListener('resize', () => { const now = W.isRail() + '' + (wide() <= 760); if (now !== last) { last = now; S._keepY = true; W.render(); } }); document.addEventListener('keydown', (e) => { if (e.key === '[' && S.surface === 'console' && !/INPUT|TEXTAREA/.test(e.target.tagName || '')) W.ACT.sideToggle(); }); }

/* ---------- Today v4 ---------- */
const AREA = { sales: ['Sales', 'c-sale'], rent: ['Rent', 'c-money'], repair: ['Repair', 'c-rent'], lease: ['Lease', 'c-rent'], facts: ['Leasing', 'c-rent'], hold: ['Held', 'c-n'] };
const NAME = { rev: 'Reply to approve', q: 'Your call', fyi: 'For your info', hold: 'Held for proof' };
const homeFacts = (q) => {
 if (q.prop === 'vp-list') return [W.listing.addr.split(',')[0], 'Victoria Park', `<b style="font:600 18px 'Sora',sans-serif">$689,000</b>`, '3 bd · 2 ba · 1,640 sq ft', '<span class="chip c-ok">Active</span> <span class="chip c-n">Our listing</span>'];
 const u = W.unit(q.prop); const py = W.pays[q.prop];
 if (!u) return ['', '', '', '', ''];
 return [u.addr.split(',')[0] + (u.unit ? ' · ' + u.unit : ''), u.addr.includes('Wilton') ? 'Wilton Manors' : 'Fort Lauderdale', `<b style="font:600 18px 'Sora',sans-serif">${W.money(u.rent)}</b><span style="color:var(--t3)">/mo</span>`, u.tenant ? 'Tenant: ' + W.pname(u.tenant) : 'Vacant · 2 bd · 1 ba', py ? W.payPill(py.st) : '<span class="chip c-n">Listed for rent</span>'];
};
W.CR.today = () => {
 const all = W.openQ(), live = all.filter(q => q.kind !== 'hold'), held = all.filter(q => q.kind === 'hold');
 const total = W.queueSeed().filter(q => q.kind !== 'hold').length, done = total - live.length;
 if (!live.find(q => q.id === S.sel)) S.sel = live[0] && live[0].id;
 const cur = live.find(q => q.id === S.sel), rest = live.filter(q => q !== cur);
 const mins = Math.max(1, Math.ceil(live.length * 0.7));
 const hf = cur ? homeFacts(cur) : null;
 const band = `<div class="band"><div style="font-size:13px;opacity:.85">Monday, November 23 · 72° and sunny in Fort Lauderdale</div>
  <h1>Good morning, Dana</h1>
  <div style="font-size:15px;margin-top:6px;opacity:.95">${live.length ? `${live.length} ${live.length === 1 ? 'thing needs' : 'things need'} you · about ${mins} min. The desk handled the rest overnight.` : 'Nothing needs you. The desk is handling everything.'}</div>
  <div style="display:flex;align-items:center;gap:12px;margin-top:16px;flex-wrap:wrap"><div class="pg" style="margin:0">${Array.from({ length: total }, (_, i) => `<i class="${i < done ? 'd' : ''}"></i>`).join('')}</div><span style="font-size:12.5px;opacity:.85;white-space:nowrap">${done} of ${total} done</span></div>
  <div style="position:absolute;right:22px;top:20px;display:flex;align-items:center;gap:10px;padding:5px 12px 5px 5px;border-radius:999px;background:rgba(14,26,36,.45);backdrop-filter:blur(8px)" class="hide-sm"><span class="stack">${['camila', 'marcus', 'tess'].map(i => W.av(i, 26)).join('')}</span><span style="font-size:12.5px">3 of your team are in</span></div></div>`;
 const card = cur ? `<div class="fc4" key="${cur.id}"><div class="main"><div class="ftop"><span class="chip ${AREA[cur.area][1]}">${AREA[cur.area][0]}</span><span>${NAME[cur.kind]}</span><span>·</span><span>${live.indexOf(cur) + 1} of ${live.length}</span><span style="flex:1"></span><span>waiting ${cur.wait}</span>${rest.length ? `<button class="btn ghost sm" style="height:26px" data-act="skip">Skip ${ic('right', 13, 2)}</button>` : ''}</div>${W.qDetail(cur)}</div>
   <div class="ctx"><div class="hp" style="background-image:url(${W.homeImg(cur.prop)})"></div><div class="bd"><div><b style="font-size:14px">${hf[0]}</b><div style="color:var(--t3);font-size:12.5px">${hf[1]}</div></div><div>${hf[2]}</div><div style="color:var(--t2)">${hf[3]}</div><div>${hf[4]}</div>
    <button class="link" style="justify-self:start;font-size:12.5px" data-go="${cur.prop === 'vp-list' ? 'console:conv:jordan' : 'console:unit:' + cur.prop}">Open home</button></div></div></div>`
  : `<div class="done-wrap" style="margin-top:18px"><div style="width:52px;height:52px;border-radius:50%;background:var(--okBg);color:var(--ok);display:grid;place-items:center;margin:0 auto">${ic('chk', 26, 2.6)}</div><div class="sora" style="font-size:20px;font-weight:600;margin-top:14px">Inbox zero, before 10 a.m.</div><p style="color:var(--t2);margin:6px 0 16px">You cleared ${total} items. We'll ping you if something needs a person.</p><button class="btn" data-act="reset">Restore the demo</button></div>`;
 const next = rest.length ? `<div class="nx4"><div style="font-size:12.5px;font-weight:600;color:var(--t3);padding:6px 8px 4px;display:flex">Up next<span style="flex:1"></span><span style="font-weight:500">J / K to move</span></div>${rest.map(q => `<button class="nx4-r" data-act="qsel|${q.id}"><span class="th" style="background-image:url(${W.homeImg(q.prop)})">${W.av(q.who, 22)}</span><span style="min-width:0"><span style="display:flex;gap:8px;align-items:center"><b style="font-size:13.5px;font-weight:600">${W.pname(q.who)}</b><span class="chip ${AREA[q.area][1]}" style="font-size:11px;line-height:18px;padding:0 7px">${AREA[q.area][0]}</span></span><span style="display:block;font-size:13px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${q.sum}</span></span><span style="font-size:12px;color:${/h|d/.test(q.wait) ? 'var(--bad)' : 'var(--t3)'};white-space:nowrap">${q.wait}</span></button>`).join('')}
  ${held.length ? `<button class="nx4-r" style="grid-template-columns:44px 1fr auto" data-act="qhold"><span style="width:44px;height:44px;border-radius:10px;background:#F1EDE6;display:grid;place-items:center;color:var(--t3)">${ic('shield', 18, 1.8)}</span><span style="font-size:13px;color:var(--t3)">${held.length} inquiry held for proof · nothing to do</span>${ic('right', 13, 2)}</button>` : ''}</div>` : '';
 const t = S.tasks;
 const rail = `<aside class="dy" style="top:112px">
  <div class="rc"><div class="rc-t">${ic('clock', 13, 2)} Your day</div>
   ${[['11:00', 'Showing · 1520 NE 4th Ave', 'Marcus with Jordan Avery', 'vp-list', 'marcus', 'console:person:jordan'], ['4:30', 'Walk-through · Coral Ridge #6', 'Camila with Andre Thompson', 'cr6', 'camila', 'console:unit:cr6']].map(([a, b, c, h, w, g]) => `<button class="tl4" style="border-left:0;border-right:0;border-bottom:0;background:none;width:100%;text-align:left" data-go="${g}"><span class="tm">${a}</span><span class="tm-card"><span class="th" style="background-image:url(${W.homeImg(h)})"></span><span style="min-width:0"><span style="display:block;font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${b}</span><span class="row" style="gap:6px;font-size:12px;color:var(--t3)">${W.av(w, 16)}${c}</span></span></span></button>`).join('')}
   ${[['t1', 'Call Jordan about price', 'marcus'], ['t2', 'Send renewal to Andre', 'camila']].map(([k, a, w]) => `<button class="tl4" style="border-left:0;border-right:0;border-bottom:0;background:none;width:100%;text-align:left" data-act="task|${k}"><span><span class="chk ${t[k] ? 'on' : ''}">${t[k] ? ic('chk', 12, 3) : ''}</span></span><span class="row" style="gap:8px;${t[k] ? 'text-decoration:line-through;color:var(--t3)' : ''}"><span style="flex:1;font-size:13px">${a}</span>${W.av(w, 20)}</span></button>`).join('')}</div>
  <div class="rc"><div class="rc-t">${ic('team', 13, 2)} Team today</div>
   ${[['camila', 'Camila Reyes', 'Leasing · walk-through at 4:30', '#1E7A55'], ['marcus', 'Marcus Bell', 'Sales · showing at 11:00', '#1E7A55'], ['tess', 'Tess Moreno', 'Bookkeeping · in the office', '#1E7A55'], ['jo', 'Jo Alvarez', 'Invited · hasn\'t joined yet', '#C8BFB1']].map(([i, a, b, c]) => `<div class="who4">${W.av(i, 32)}<span style="flex:1;min-width:0"><b style="display:block;font-size:13px;font-weight:600">${a}</b><span style="font-size:12px;color:var(--t3)">${b}</span></span><span class="st" style="background:${c}"></span></div>`).join('')}</div>
  <div class="rc"><div class="rc-t">${ic('inbox', 13, 2)} Overnight</div><div style="font-size:13.5px;line-height:1.5"><b style="font-weight:600">14 inquiries, all answered.</b> 9 after hours, typically in 41 seconds.</div><div class="row" style="gap:8px;margin-top:8px;font-size:13px;color:var(--t2)">${ic('spark', 14, 1.8)} Sofía booked a Saturday tour at 2:14 a.m.</div><button class="link" style="margin-top:8px;font-size:12.5px" data-go="console:inbox">See conversations</button></div>
  ${!S.setup.calls ? `<button class="rc" style="text-align:left;background:var(--badBg);border-color:#F3D5CC;display:block;width:100%" data-go="console:setup"><div class="rc-t" style="color:var(--bad);margin-bottom:6px">${ic('x', 13, 2.4)} Needs fixing</div><div style="font-size:13.5px"><b style="font-weight:600">Call forwarding is off.</b> Calls aren't reaching the desk.</div><div style="margin-top:6px;font-size:12.5px;font-weight:600;color:var(--bad)">Fix in 2 minutes →</div></button>` : ''}
 </aside>`;
 return `<div class="t4"><div>${band}${card}${next}</div>${rail}</div>`;
};
})();
window.WyProto.__loaded = 1; }
