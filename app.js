/* CoFFeeNet — a marketplace for take-out coffee in TLV.
   Single-page prototype built from the Figma file; hash-routed, no build step. */
(() => {
  "use strict";

  const IMG = "assets/img/";
  const app = document.getElementById("app");
  const overlayRoot = document.getElementById("overlay-root");

  /* ---------------- icons ---------------- */
  const I = {
    search: `<svg width="34" height="36" viewBox="0 0 34 36" fill="none" stroke="#60032E" stroke-width="2.1" stroke-linecap="round"><ellipse cx="16" cy="16.7" rx="15" ry="15.7" fill="#FFF3F3"/><path d="M26.5 27.9 33 34.6M15.9 8.2c3.8 0 6.9 3.2 6.9 7.2"/></svg>`,
    searchSm: `<svg width="22" height="22" viewBox="0 0 34 36" fill="none" stroke="#60032E" stroke-width="2.4" stroke-linecap="round"><ellipse cx="16" cy="16.7" rx="15" ry="15.7"/><path d="M26.5 27.9 33 34.6M15.9 8.2c3.8 0 6.9 3.2 6.9 7.2"/></svg>`,
    heart: `<svg width="33" height="29" viewBox="0 0 33 29" fill="#FFF3F3" stroke="#60032E" stroke-width="2.1"><path d="M32 8.7c0 1.9-.7 3.9-2.2 5.4l-2.5 2.5-10.7 10.6-.1.1-.1-.1L3.3 14.1C1.8 12.6 1 10.6 1 8.7s.8-3.9 2.3-5.4a7.6 7.6 0 0 1 10.8 0l2.4 2.5L19 3.3a7.6 7.6 0 0 1 10.8 0C31.3 4.8 32 6.7 32 8.7Z"/></svg>`,
    heartSm: (on) => `<svg width="22" height="20" viewBox="0 0 33 29" fill="${on ? "#FF006B" : "none"}" stroke="#FF006B" stroke-width="2.4"><path d="M32 8.7c0 1.9-.7 3.9-2.2 5.4l-2.5 2.5-10.7 10.6-.1.1-.1-.1L3.3 14.1C1.8 12.6 1 10.6 1 8.7s.8-3.9 2.3-5.4a7.6 7.6 0 0 1 10.8 0l2.4 2.5L19 3.3a7.6 7.6 0 0 1 10.8 0C31.3 4.8 32 6.7 32 8.7Z"/></svg>`,
    chat: `<svg width="39" height="37" viewBox="0 0 39 37" fill="#FFF3F3" stroke="#60032E" stroke-width="2" stroke-linejoin="round"><path d="M14.6 30.3v5.2l7.4-5.9a6.2 6.2 0 0 1 3.9-1.3h8c2.3 0 4.1-1.9 4.1-4.2v-19C38 2.8 36.2 1 33.9 1H5.1C2.8 1 1 2.8 1 5.1v19c0 2.3 1.8 4.2 4.1 4.2h7.4c1.2 0 2.1.9 2.1 2Z"/><circle cx="11.8" cy="14.6" r="1.6" fill="#60032E"/><circle cx="19.5" cy="14.6" r="1.6" fill="#60032E"/><circle cx="27.2" cy="14.6" r="1.6" fill="#60032E"/></svg>`,
    user: `<svg width="35" height="35" viewBox="0 0 34.4 34.4" fill="none" stroke="#60032E" stroke-width="2.2" stroke-linecap="round"><circle cx="17.2" cy="17.2" r="15.6" fill="#FFF3F3"/><path d="M29.8 27.1c-3-2.7-7.6-4.5-12.6-4.5s-9.5 1.8-12.6 4.5"/><circle cx="17.2" cy="12.7" r="4.5" fill="#FFF3F3"/></svg>`,
    bell: `<svg width="26" height="28" viewBox="0 0 26 28" fill="none" stroke="#60032E" stroke-width="2" stroke-linejoin="round"><path d="M13 3a7.5 7.5 0 0 0-7.5 7.5v6L2.5 21h21l-3-4.5v-6A7.5 7.5 0 0 0 13 3Z"/><path d="M10 24.5a3 3 0 0 0 6 0"/></svg>`,
    gear: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#60032E" stroke-width="1.8" stroke-linejoin="round"><path d="m9 2.6-.6 2.3a7.5 7.5 0 0 0-1.9 1.1L4.3 5.3 1.6 9.9l1.8 1.6a7.6 7.6 0 0 0 0 2.2l-1.8 1.6 2.7 4.6 2.2-.7a7.5 7.5 0 0 0 1.9 1.1l.6 2.3h5.4l.6-2.3a7.5 7.5 0 0 0 1.9-1.1l2.2.7 2.7-4.6-1.8-1.6a7.6 7.6 0 0 0 0-2.2l1.8-1.6-2.7-4.6-2.2.7a7.5 7.5 0 0 0-1.9-1.1L14.4 2.6Z"/><circle cx="12" cy="12" r="3.4"/></svg>`,
    menu: `<svg width="30" height="30" viewBox="0 0 30 30" stroke="#60032E" stroke-width="2" stroke-linecap="round"><path d="M6.25 7.5h17.5M6.25 15h17.5M6.25 22.5h17.5"/></svg>`,
    star: `<svg viewBox="0 0 24 24"><path d="m12 17.3-5 3 1.3-5.7L4 10.8l5.8-.5L12 5l2.2 5.3 5.8.5-4.3 3.8 1.3 5.7Z"/></svg>`,
    starC: (fill) => `<svg viewBox="0 0 24 24"><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8Z" fill="${fill}" stroke="#E8C200" stroke-width=".6"/></svg>`,
    pinCup: `<svg width="22" height="26" viewBox="0 0 22 26" fill="none" stroke="#fff" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><path d="M5 4.6 6 1.5h10l1 3.1M2 4.8h18v3H2zM3.6 8l1.6 16.4h11.6L18.4 8"/><circle cx="11" cy="15.6" r="3.7"/><path d="m9.3 17.3 3.4-3.4"/></svg>`,
    cupSm: `<svg width="18" height="20" viewBox="0 0 22 26" fill="none" stroke="#60032E" stroke-width="2" stroke-linejoin="round"><path d="M5 4.6 6 1.5h10l1 3.1M2 4.8h18v3H2zM3.6 8l1.6 16.4h11.6L18.4 8"/><circle cx="11" cy="15.6" r="3.4"/></svg>`,
    pinSm: `<svg width="18" height="20" viewBox="0 0 18 22" fill="#FF006B"><path d="M9 0a9 9 0 0 0-9 9c0 6.4 9 13 9 13s9-6.6 9-13a9 9 0 0 0-9-9Zm0 12.2A3.2 3.2 0 1 1 9 5.8a3.2 3.2 0 0 1 0 6.4Z"/></svg>`,
    walk: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="13.2" cy="3.6" r="2.1"/><path d="M9.6 8.9 7.2 22h2.2l1.8-7.6 2.2 2.1V22h2v-7l-2.2-2.1.6-3.1a6 6 0 0 0 4.4 2v-2a3.9 3.9 0 0 1-3.4-1.9l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.2L6 7.8v4.6h2V9.1l1.6-.2Z"/></svg>`,
    car: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 6c-.2-.6-.8-1-1.4-1h-11c-.6 0-1.2.4-1.4 1L3 12v8c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-1h12v1c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-8l-2.1-6ZM6.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM5 11l1.5-4.5h11L19 11H5Z"/></svg>`,
    bus: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 16c0 .9.4 1.7 1 2.2V20c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-1h8v1c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-1.8c.6-.5 1-1.3 1-2.2V6c0-3.5-3.6-4-8-4s-8 .5-8 4v10Zm3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM18 11H6V6h12v5Z"/></svg>`,
    nav: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M3 10.6 21 3l-7.6 18-2.3-8.1Z"/></svg>`,
    stop: `<svg width="16" height="16" viewBox="0 0 16 16" fill="#fff"><rect x="2" y="2" width="12" height="12" rx="2"/></svg>`,
    mapIcon: `<svg width="24" height="23" viewBox="0 0 24 23" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"><path d="M8 1.5 1.5 4v17.5L8 19l8 3 6.5-2.5V2L16 4.5Z"/><path d="M8 1.5V19M16 4.5V22"/></svg>`,
    back: `<svg width="14" height="22" viewBox="0 0 14 22" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M11 3 3 11l8 8"/></svg>`,
    next: `<svg width="8" height="15" viewBox="0 0 8 15" fill="none" stroke="currentColor" stroke-width="1.4"><path d="m1 1 6 6.5L1 14"/></svg>`,
    prev: `<svg width="8" height="15" viewBox="0 0 8 15" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M7 1 1 7.5 7 14"/></svg>`,
    chev: `<svg width="9" height="14" viewBox="0 0 9 14" fill="none" stroke="#111" stroke-width="2.2"><path d="m1.5 1.5 5.5 5.5-5.5 5.5"/></svg>`,
    close: `<svg width="18" height="18" viewBox="0 0 18 18" stroke="#111" stroke-width="2" stroke-linecap="round"><path d="M2 2l14 14M16 2 2 16"/></svg>`,
    trash: `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 4.5h16M6.5 4.5V2h5v2.5M3 4.5l1 14h10l1-14M7 8v7M11 8v7"/></svg>`,
    edit: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#111" stroke-width="2.2" stroke-linejoin="round"><path d="M16 26H5V4h11l6 6v4"/><path d="M15 4v7h7"/><path d="m17 25 1-4 8-8 3 3-8 8Z"/></svg>`,
    plusC: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#111" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="10"/><path d="M11 6v10M6 11h10"/></svg>`,
    minusC: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#111" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="10"/><path d="M6 11h10"/></svg>`,
    clock: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#111" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="9.5"/><path d="M11 5.5V11l3.5 2.5"/></svg>`,
    apple: `<svg viewBox="0 0 24 24"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9a4.8 4.8 0 0 0-3.8-2c-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9a5 5 0 0 0-4.2 2.6c-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.5 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4a10 10 0 0 0 1.4-2.8 4.3 4.3 0 0 1-2.1-4.2ZM14 5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4Z"/></svg>`,
    fb: `<svg viewBox="0 0 24 24"><path d="M14 8V6.2c0-.8.2-1.2 1.4-1.2H17V2h-2.6C11.3 2 10.5 3.5 10.5 6v2H8v3h2.5v11H14V11h2.6l.4-3Z"/></svg>`,
    google: `<svg viewBox="0 0 24 24"><path d="M21.6 10.2H12v3.9h5.5c-.5 2.5-2.7 3.9-5.5 3.9a6 6 0 0 1 0-12c1.5 0 2.8.5 3.8 1.4l2.9-2.9A10 10 0 1 0 12 22c5 0 9.6-3.6 9.6-10 0-.6 0-1.2-.1-1.8Z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24"><path d="M22 5.9a8 8 0 0 1-2.4.6 4.1 4.1 0 0 0 1.8-2.2 8.2 8.2 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.8a4.1 4.1 0 0 0 1.3 5.5 4 4 0 0 1-1.9-.5 4.1 4.1 0 0 0 3.3 4 4.1 4.1 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.9A8.2 8.2 0 0 1 2 18.4 11.6 11.6 0 0 0 8.3 20c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2Z"/></svg>`,
  };

  /* ---------------- data ---------------- */
  const BASE_MENU = {
    hot: [["Espresso", 5], ["Double Espresso", 7], ["Cappucino", 12], ["Coffee with milk", 10], ["Black Coffee", 8], ["Americano", 10], ["Mint Tea", 6]],
    cold: [["Iced Coffee", 10], ["Iced Tea", 6]],
  };
  const CAFES = [
    { id: "kef", name: "Kef Cafe", addr: "Dizengof 12", km: 1.2, rating: 5.0, open: false, best: true, img: "av-kef.png", near: [32.0739,34.7785], orders: 41 },
    { id: "cup", name: "Cup Coffee", addr: "Arlozorov 44", km: 0.4, rating: 4.9, open: true, img: "av-cup.png", near: [32.0862,34.7715], orders: 33 },
    { id: "avi", name: "Avi’s", addr: "Arlozorov 44", km: 0.7, rating: 4.9, open: false, img: "av-avi.png", near: [32.087,34.779], orders: 28 },
    { id: "liat", name: "Liat’s Cafe", addr: "Spinoza 8", km: 0.3, rating: 4.7, open: true, img: "av-liat.png", near: [32.0825,34.7765], orders: 15,
      hours: ["Sunday -Thursday 16:00-21:00", "Friday&Saturday -10:00-21:00"],
      note: "Hi, to pick up your order please ring the entrance door of apt number 6, there is a CoffeeNet mark." },
    { id: "dan", name: "Dan’s", addr: "Dizengof 62", km: 1.4, rating: 4.7, open: false, img: "av-dan.png", near: [32.0758,34.7752], orders: 19 },
    { id: "decafe", name: "DeCafe", addr: "Dizengof 44", km: 1.5, rating: 4.7, open: true, img: "av-decafe.png", near: [32.0747,34.7765], orders: 22 },
    { id: "rock", name: "Rock Cafe", addr: "Zait 81", km: 1.6, rating: 3.5, open: true, img: "av-cupicon.svg", near: [32.0806,34.792], orders: 7 },
    { id: "ron", name: "Cafe Ron", addr: "Rabin 33", km: 0.8, rating: 3.5, open: false, img: "av-ron.png", near: [32.0805,34.781], orders: 9 },
    { id: "ola", name: "Cafe Ola", addr: "Gordon 15", km: 0.5, rating: 3.8, open: true, img: "av-cupicon.svg", near: [32.0822,34.7705], orders: 12 },
    { id: "cofifi", name: "CoFiFi", addr: "Rachel 44", km: 0.6, rating: 3.5, open: true, img: "av-cofifi.png", near: [32.0856,34.777], orders: 11 },
    { id: "fun", name: "Fun Cafe", addr: "Eshkol 13", km: 1.1, rating: 3.5, open: true, img: "av-fun.png", near: [32.0783,34.7799], orders: 6 },
  ];
  CAFES.forEach((c) => { c.baseRating = c.rating; });
  // Eshkol isn't a street in this part of town, so Fun Cafe keeps its spot from the design
  const placeCafe = (c) => { const s = c.id === "fun" ? null : CNMap.findStreet(c.addr); c.ll = (s && CNMap.streetPoint(s, c.near || HOME)) || CNMap.snap(c.near || HOME).ll; };
  const HOME = [32.0846, 34.7738]; // where the design puts the user
  const REVIEWERS = ["av-cup.png", "av-avi.png", "av-dan.png", "av-fun.png"];

  const allCafes = () => (S.myShop ? [...CAFES, S.myShop] : CAFES);
  function refreshKm() {
    allCafes().forEach((c) => {
      if (!c.ll) placeCafe(c);
      const r = CNMap.route(session.me.ll, c.ll, "walk");
      if (r) c.km = Math.max(0.1, Math.round(r.km * 10) / 10);
      if (c.id !== "mine") c.rating = ratingOf(c);
    });
  }
  const cafeById = (id) => allCafes().find((c) => c.id === id);
  const orderByNo = (no) => S.orders.find((o) => String(o.no) === String(no));
  const menuOf = (cafe) => cafe.menu || BASE_MENU;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ils = (n) => `₪${Number(n).toFixed(2)}`;
  const fmtDate = (d) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const today = () => new Date().toISOString().slice(0, 10);
  const go = (h) => { location.hash = h; };

  /* ---------------- state: one saved record per account, on this device only ---------------- */
  const KEY = "coffeenet:v2", DEMO = "demo@coffeenet.app";
  const blank = (name, email) => ({
    user: name ? { name, email, phone: "", photo: "", receipts: true, promo: false } : null,
    favourites: [], orders: [], sales: [], myShop: null, card: null, credit: 30,
    ledger: [{ d: today(), text: "Welcome gift", amount: 30 }], notes: [], threads: {}, carts: {}, reviews: {}, nextSale: 0,
  });
  const demoData = () => Object.assign(blank("Liat Inbar", DEMO), {
    favourites: ["ola"],
    orders: [
      { no: 10226, cafe: "liat", date: "2023-07-12", items: [{ name: "Cappucino", price: 12, qty: 1, sugar: 1, milk: "Thin Milk 1%" }, { name: "Americano", price: 10, qty: 1, sugar: 0, milk: "" }], total: 22, status: "ready", t: {}, paidWith: "card" },
      { no: 10343, cafe: "kef", date: "2023-06-26", items: [{ name: "Espresso", price: 5, qty: 2 }], total: 10, status: "completed", t: {} },
      { no: 10236, cafe: "avi", date: "2023-06-26", items: [{ name: "Americano", price: 10, qty: 1 }], total: 10, status: "completed", t: {} },
      { no: 10215, cafe: "cofifi", date: "2023-06-26", items: [{ name: "Iced Coffee", price: 10, qty: 1 }], total: 10, status: "completed", t: {} },
      { no: 10143, cafe: "ola", date: "2023-06-26", items: [{ name: "Mint Tea", price: 6, qty: 1 }], total: 6, status: "completed", t: {} },
    ],
    notes: [{ id: 1, from: "Liat’s Cafe", text: "Your order #10226 is ready", href: "#/pickup/10226", d: "2023-07-12", read: false }],
  });
  const DB = loadDB();
  let S = DB.current && DB.accounts[DB.current] ? DB.accounts[DB.current].data : blank();
  // per-session, not persisted
  const session = { cartCafe: null, introStep: 0, wizard: null, tips: { rate: true, choose: true }, me: { ll: HOME, label: "" }, get cart() { return (S.carts[session.cartCafe] = S.carts[session.cartCafe] || {}); } };

  function loadDB() {
    const fresh = { current: null, intent: "buyer", accounts: {} };
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(fresh, JSON.parse(raw));
      const old = JSON.parse(localStorage.getItem("coffeenet:v1") || "null"); // first version kept a single account
      if (old && old.user) {
        const d = Object.assign(demoData(), old, { user: { ...demoData().user, ...old.user } });
        d.orders.forEach((o) => { o.t = o.t || {}; if (o.status === "paid") o.status = "ready"; });
        fresh.accounts[DEMO] = { hash: null, data: d }; fresh.current = DEMO;
      }
    } catch (e) { /* storage unavailable */ }
    return fresh;
  }
  function save() {
    if (DB.current) DB.accounts[DB.current].data = S;
    try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) { /* ignore */ }
  }
  async function digest(email, pw) {
    const txt = email + ":" + pw;
    if (window.crypto && crypto.subtle) {
      const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(txt));
      return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, "0")).join("");
    }
    let h = 2166136261; for (const ch of txt) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    return "f" + (h >>> 0).toString(16);
  }
  function openAccount(email) {
    DB.current = email; S = DB.accounts[email].data; session.wizard = null; session.cartCafe = null;
    if (S.myShop) { delete S.myShop.ll; }
    refreshKm(); save();
    go(DB.intent === "seller" ? (S.myShop ? "#/manage" : "#/seller") : "#/home");
  }
  function openDemo() {
    if (!DB.accounts[DEMO]) DB.accounts[DEMO] = { hash: null, data: demoData() };
    openAccount(DEMO);
  }

  const reviewCount = (c) => (c.id === "mine" ? (c.reviews || []).length : Math.max(1, Math.round(c.orders / 4)) + (S.reviews[c.id] || []).length);
  const ratingOf = (c) => {
    const extra = S.reviews[c.id] || [];
    if (c.id === "mine") { const r = c.reviews || []; return r.length ? r.reduce((s, x) => s + x.stars, 0) / r.length : 5; }
    const n = Math.max(1, Math.round(c.orders / 4));
    return (c.baseRating * n + extra.reduce((s, x) => s + x.stars, 0)) / (n + extra.length);
  };
  const QUOTES = ["Great coffee", "Super friendly", "Nice guy", "Nice vibe", "Exactly how I like it", "Ready on time, every time", "Feels like a friend made it for me", "Best price on the street", "Lovely balcony, lovely people", "My new morning stop"];
  const PEOPLE = ["Ofer", "Shira", "Nir", "Talia", "Keren", "Oded", "Lilach", "Yaron", "Maya", "Dana"];
  function reviewsOf(c) {
    if (c.id === "mine") return c.reviews || [];
    const seed = CAFES.findIndex((x) => x.id === c.id), n = Math.min(10, Math.max(1, Math.round(c.orders / 4)));
    const base = Array.from({ length: n }, (_, i) => ({ by: PEOPLE[(seed * 3 + i) % 10], text: QUOTES[(seed + i) % 10], stars: Math.max(1, Math.min(5, Math.round(c.baseRating - (i % 3 === 2 ? 0.6 : 0)))) }));
    return [...(S.reviews[c.id] || []).map((r) => ({ ...r, by: "You" })), ...base];
  }
  const quoteOf = (c) => (reviewsOf(c).find((r) => r.text) || {}).text || "";

  /* ---------------- shared chrome ---------------- */
  const logo = (size = "") => `<span class="logo ${size}"><img class="beans" src="${IMG}logo-beans.png" alt=""><span class="word">CoFFee<b>Net</b></span></span>`;

  const appbar = () => `
    <header class="appbar">
      <a href="#/home" aria-label="CoFFeeNet home">${logo()}</a>
      <div class="actions">
        <button class="icon-btn" data-act="bell" aria-label="Notifications">${I.bell}${S.notes.some((n) => !n.read) ? '<span class="dot"></span>' : ""}</button>
        <a class="icon-btn" href="#/account" aria-label="Settings">${I.gear}</a>
        <button class="icon-btn" data-act="drawer" aria-label="Open menu">${I.menu}</button>
      </div>
    </header>`;

  const tabbar = (cur) => {
    const t = (href, key, label, inner, cls = "") =>
      `<a href="${href}" class="${cls}" aria-label="${label}" ${cur === key ? 'aria-current="page"' : ""}>${inner}</a>`;
    return `<nav class="tabbar" aria-label="Main">
      ${t("#/map", "map", "Find coffee", I.search)}
      ${t("#/favourites", "fav", "Favourites", I.heart)}
      ${t("#/home", "home", "Home", `<img src="${IMG}cup-tab.png" alt="">`, "cup")}
      ${t("#/inbox", "inbox", "Inbox", I.chat)}
      ${t("#/profile", "profile", "Profile", I.user)}
    </nav>`;
  };

  const screen = (cls, inner) => `<section class="screen ${cls}">${inner}</section>`;
  const titlebar = (title, { back, close, left } = {}) => `
    <header class="titlebar ${left ? "left" : ""}">
      ${left ? "" : back ? `<a class="back" href="${back}" aria-label="Back">${I.back}</a>` : "<span></span>"}
      <h1>${title}</h1>
      ${close ? `<a class="back" href="${close}" aria-label="Close">${I.close}</a>` : "<span></span>"}
    </header>`;

  const avatar = (c, size = 60) =>
    `<span class="av-wrap ${c.open ? "" : "closed"}"><img class="avatar" style="width:${size}px;height:${size}px" src="${c.photo || IMG + c.img}" alt=""></span>`;

  const venueRow = (c, extra = "") => `
    <a class="venue" href="#/cafe/${c.id}">
      ${extra}
      ${c.best ? `<img class="badge-best" src="${IMG}btn-best.png" alt="Top rated">` : ""}
      ${avatar(c)}
      <div class="info">
        <div class="name">${esc(c.name)} | ${esc(c.addr)}</div>
        <div class="meta"><span>${c.km} km</span><span class="stars">${c.rating.toFixed(1)} ${I.star}</span></div>
      </div>
    </a>`;

  /* ---------------- feedback ---------------- */
  let snackTimer;
  function snack(msg) {
    document.querySelectorAll(".snack").forEach((n) => n.remove());
    const n = document.createElement("div");
    n.className = "snack"; n.setAttribute("role", "status"); n.textContent = msg;
    document.querySelector(".device").appendChild(n);
    clearTimeout(snackTimer); snackTimer = setTimeout(() => n.remove(), 2400);
  }

  function pushNotification(title, text, href) {
    document.querySelectorAll(".toast").forEach((n) => n.remove());
    const n = document.createElement("button");
    n.className = "toast";
    n.innerHTML = `<span class="ic"><img src="${IMG}logo-beans.png" alt=""></span><span><span class="t">${esc(title)}</span><br><span class="d">${esc(text)}</span></span><time>now</time>`;
    n.addEventListener("click", () => { n.remove(); go(href); });
    document.querySelector(".device").appendChild(n);
    setTimeout(() => n.remove(), 7000);
  }

  function modal(html, onMount) {
    overlayRoot.innerHTML = `<div class="modal-wrap" data-act="modal-bg">${html}</div>`;
    const wrap = overlayRoot.firstElementChild;
    wrap.addEventListener("click", (e) => { if (e.target === wrap) closeModal(); });
    onMount && onMount(wrap);
    const f = wrap.querySelector("button, input"); f && f.focus();
  }
  function closeModal() { overlayRoot.innerHTML = ""; }

  function openDrawer() {
    overlayRoot.innerHTML = `
      <div class="scrim" data-act="close-overlay"></div>
      <aside class="drawer" role="dialog" aria-label="Menu">
        <button class="x" data-act="close-overlay" aria-label="Close menu">${I.close}</button>
        ${logo()}
        <nav>
          <a href="#/about" data-act="close-overlay">About this app</a>
          <a href="#/profile" data-act="close-overlay">My profile</a>
          <a href="#/orders" data-act="close-overlay">Orders history</a>
          <a href="#/inbox/notifications" data-act="close-overlay">Notifications</a>
          <a href="#/page/terms" data-act="close-overlay">Terms &amp; policy</a>
        </nav>
        <a href="#" class="invite" data-act="invite">Invite your friends<br>and get free coupon</a>
      </aside>`;
  }

  /* ---------------- screens ---------------- */
  const R = {};

  R.splash = () => {
    setTimeout(() => { if (location.hash === "" || location.hash === "#/" || location.hash === "#/splash") go("#/welcome"); }, 2200); // always walk through welcome + the 3 onboarding steps
    return screen("splash", `
      <img class="pt top" src="${IMG}splash-top.png" alt="">
      <img class="pt moka" src="${IMG}splash-moka.png" alt="">
      <img class="pt cup1" src="${IMG}splash-cup.png" alt="">
      <img class="pt bottom" src="${IMG}splash-bottom.png" alt="">
      <a class="center" href="${S.user ? "#/home" : "#/welcome"}" aria-label="Enter CoFFeeNet">${logo("xl")}</a>`);
  };

  R.welcome = () => screen("welcome", `
    <div class="body">
      ${logo("lg")}
      <p class="tagline">A community for people who love coffee with a taste of friendship</p>
      <img class="hero-cup" src="${IMG}hero-cup.png" alt="CoFFeeNet take-away cup">
      <div class="cta">
        <button class="btn btn-primary btn-lg" data-act="start" data-intent="buyer">Get Coffee</button>
        <button class="btn btn-outline btn-lg" data-act="start" data-intent="seller">Become a Seller</button>
      </div>
    </div>`);

  const INTRO = [
    { art: "onb-cup.png", w: 185, h: "What do we do?", p: ["CoFFeNet is a coffee marketplace that empowers its community members to create an alternative to the high cost of coffee in TLV."] },
    { art: "onb-machine.png", w: 140, h: "How can I do it?", p: ["Weather you own a fancy coffee machine, a brilliant Makineta or only a kettle - It doesn’t matter...", "As long as you can make a cup of coffee, and willing to make one for another coffee lover - You are welcome to join CoFFeeNet’s community !"] },
    { art: "onb-moka.png", w: 165, h: "Why should I do it?", p: ["Take part in creating an affordable coffee experience so that you and other coffee lovers can enjoy coffee anywhere, for a fraction of the price."] },
  ];
  R.intro = (i) => {
    i = Math.max(0, Math.min(2, Number(i) || 0));
    const s = INTRO[i];
    const after = S.user ? (DB.intent === "seller" ? "#/seller" : "#/home") : "#/signin";
    return screen("intro", `
      ${titlebar("Sign up", { back: i > 0 ? `#/intro/${i - 1}` : null })}
      <div class="body">
        <div class="art"><img src="${IMG}${s.art}" width="${s.w}" alt=""></div>
        <h2>${s.h}</h2>
        ${s.p.map((p) => `<p>${p}</p>`).join("")}
        <div class="dots" aria-label="Step ${i + 1} of 3">${[0, 1, 2].map((d) => `<span class="${d === i ? "on" : ""}"></span>`).join("")}</div>
        <a class="btn btn-primary cta" href="${i < 2 ? `#/intro/${i + 1}` : after}">Cool, I’m ready</a>
        ${i < 2 ? `<a class="link-btn skip" href="${after}">Skip ${I.next}</a>` : `<span class="link-btn skip ghost" aria-hidden="true">Skip</span>`}
      </div>`);
  };

  const field = (id, label, ph, attrs = "") => `<label class="form-label" for="${id}">${label}</label><input class="input" id="${id}" name="${id}" placeholder="${ph}" ${attrs}>`;
  R.signin = (mode) => {
    if (mode === "join") return screen("join", `
      <div class="body">
        <div class="join-head">
          <h1><span>Welcome to</span> ${logo()}</h1>
          <p class="a">Sign up as a community member</p>
          <p class="b">Sure! You can register both as a seller &amp; a user</p>
        </div>
        <div class="wave-up join-form">
          <h2 class="step-title">New Member</h2>
          <form id="join" novalidate>
            ${field("first", "First Name", "Enter your first name", 'autocomplete="given-name"')}
            ${field("last", "Last Name", "Enter your last name", 'autocomplete="family-name"')}
            ${field("email", "Your e-mail", "Enter e-mail address", 'type="email" autocomplete="email"')}
            ${field("pw", "Choose a password", "Enter password", 'type="password" autocomplete="new-password"')}
            ${field("pw2", "Confirm your password", "Re-enter password", 'type="password" autocomplete="new-password"')}
            <p class="err" id="auth-err" role="alert"></p>
            <button class="btn btn-primary" type="submit">Done</button>
          </form>
          <p class="center"><a href="#/signin">Have an account? <b>Sign in</b></a></p>
        </div>
      </div>`);
    if (mode === "welcome") return screen("beige", `
      <div class="body center-col" style="display:flex;flex-direction:column;justify-content:center;padding:0 40px;text-align:center">
        ${logo()}
        <h1 class="big-msg" style="margin:34px 0 22px">Congratulations!</h1>
        <p class="mid-msg" style="margin:0 0 14px">You’re now a member of the CoFFeeNet community.</p>
        <p style="font:500 16px/1.5 var(--f-head);color:var(--ink);margin:0 0 36px">We added ${ils(30)} to your account credit. Your first coffees are on us.</p>
        <a class="btn btn-primary btn-lg" href="${DB.intent === "seller" ? "#/seller" : "#/home"}">${DB.intent === "seller" ? "Open my shop" : "Find coffee"}</a>
      </div>`);
    if (mode === "forgot") return screen("signin", `
      <div class="body">
        ${logo("lg")}
        <h1>Choose a new password</h1>
        <form id="forgot" novalidate style="width:100%">
          <input class="field-line" name="email" type="email" placeholder="Your e-mail" aria-label="Your e-mail" autocomplete="username">
          <input class="field-line" name="pw" type="password" placeholder="New password" aria-label="New password" autocomplete="new-password">
          <p class="err" id="auth-err" role="alert"></p>
          <button class="btn btn-primary btn-block" type="submit">Save and sign in</button>
        </form>
        <div class="row"><a href="#/signin">Back to sign in</a><span></span></div>
        <p class="demo-note">This is a portfolio demo, so no e-mail is sent. Accounts live only on this device.</p>
      </div>`);
    return screen("signin", `
      <div class="body">
        ${logo("lg")}
        <h1>Sign in to your account</h1>
        <form id="auth" novalidate style="width:100%">
          <input class="field-line" name="email" placeholder="E-mail address" aria-label="E-mail address" autocomplete="username">
          <input class="field-line" name="password" type="password" placeholder="Password" aria-label="Password" autocomplete="current-password">
          <p class="err" id="auth-err" role="alert"></p>
          <button class="btn btn-primary btn-block" type="submit">Sign in</button>
        </form>
        <div class="row"><a href="#/signin/forgot">Forgot password?</a><a href="#/signin/join">No account? <b>Join</b></a></div>
        <p class="or">or continue with</p>
        <div class="socials">
          <button data-act="social" aria-label="Continue with Apple (demo account)">${I.apple}</button>
          <button data-act="social" aria-label="Continue with Facebook (demo account)">${I.fb}</button>
          <button data-act="social" aria-label="Continue with Google (demo account)">${I.google}</button>
          <button data-act="social" aria-label="Continue with Twitter (demo account)">${I.twitter}</button>
        </div>
        <button class="link-btn demo-btn" data-act="social">Try the demo account ${I.next}</button>
      </div>`);
  };

  R.home = () => {
    const popular = [...allCafes()].sort((a, b) => b.rating - a.rating);
    const live = [...S.orders].reverse().find((o) => ["pending", "confirmed", "paid", "ready"].includes(o.status));
    return screen("home has-tabs", `
      ${appbar()}
      <div class="body">
        <h1 class="h-title">How about some coffee?</h1>
        ${live ? `<a class="active-order" href="#/summary/${live.no}"><span><b>${ST[live.status]}</b>Order ${live.no} · ${esc(cafeById(live.cafe)?.name)}</span>${I.chev}</a>` : ""}
        <div class="tiles">
          <a class="tile big" href="#/map">Get<br>coffee<img src="${IMG}cup-card.png" alt=""></a>
          <a class="tile big" href="${S.myShop ? "#/manage" : "#/seller"}">${S.myShop ? "Your<br>shop" : "Become<br>a seller"}<img src="${IMG}seller-shop.png" alt=""></a>
          <a class="tile wide" href="#/map/list">See nearby venues</a>
          <a class="tile wide" href="#/orders">See your orders</a>
        </div>
        <h2 class="section-title">Most popular</h2>
        <div class="venue-list">${popular.map((c) => venueRow(c)).join("")}</div>
      </div>
      <a class="btn btn-primary btn-lg float-map" href="#/map">Map ${I.mapIcon}</a>
      ${tabbar("home")}`);
  };

  R.map = (view) => screen("has-tabs", `
    ${appbar()}
    <div class="map-wrap" id="map-screen">
      <div id="map" role="application" aria-label="Map of coffee shops in Tel Aviv. Drag to move, scroll or pinch to zoom."></div>
      <form class="map-search" role="search" id="map-search" autocomplete="off">
        <input id="q" placeholder="Near ${esc(session.me.label || "your location")}" aria-label="Search coffee shops or streets" role="combobox" aria-expanded="false" aria-controls="map-sug">
        <button type="submit" aria-label="Search">${I.searchSm}</button>
        <div class="map-sug" id="map-sug" hidden></div>
      </form>
      <div class="seg" role="group" aria-label="View">
        <button data-act="view" data-v="map" aria-pressed="${view !== "list"}">Map</button>
        <button data-act="view" data-v="list" aria-pressed="${view === "list"}">List</button>
      </div>
      <div class="map-veil" id="map-veil" hidden></div>
      <div class="map-fabs">
        <button data-act="best" aria-pressed="false" aria-label="Show top-rated only"><img src="${IMG}btn-best.png" alt=""></button>
        <button data-act="locate" aria-label="Go to my location"><img src="${IMG}btn-locate.png" alt=""></button>
      </div>
      <div class="map-sheet" id="map-sheet" hidden></div>
      <a class="map-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a>
    </div>
    <div class="map-list" id="map-list" ${view === "list" ? "" : "hidden"}>
      <header class="titlebar left"><h1>Venues list</h1><button class="back" data-act="view" data-v="map" aria-label="Close list">${I.close}</button></header>
      <div class="rows" id="venue-rows"></div>
      <button class="btn btn-primary btn-lg to-map" data-act="view" data-v="map">Map ${I.mapIcon}</button>
    </div>
    ${tabbar("map")}`);

  R.cafe = (id) => {
    const c = cafeById(id);
    if (!c) return R.notfound();
    const fav = S.favourites.includes(c.id);
    const hours = c.hours || ["Sunday -Thursday 07:00-12:00", "Friday 08:00-13:00"];
    const menu = menuOf(c);
    const line = ([n, p]) => `<div class="menu-line"><span>${esc(n)}</span><span class="dots-fill"></span><span class="price">₪${p}</span></div>`;
    const stars = [1, 2, 3, 4, 5].map((k) => I.starC(c.rating >= k ? "#F7D21E" : c.rating >= k - 0.5 ? "url(#half)" : "#e3e3e3")).join("");
    return screen("has-tabs", `
      ${appbar()}
      <div class="body">
        <svg width="0" height="0" style="position:absolute"><defs><linearGradient id="half"><stop offset="50%" stop-color="#F7D21E"/><stop offset="50%" stop-color="#e3e3e3"/></linearGradient></defs></svg>
        <div class="cafe-head">
          <img class="photo" src="${c.photo || IMG + c.img}" alt="">
          <div>
            <h1>${esc(c.name)}</h1>
            <div class="on">on CoFFeeNet</div>
            <div class="addr">${esc(c.addr)}, Tel-Aviv</div>
            <div class="status ${c.open ? "open" : "closed"}" style="margin-top:6px">${c.open ? "Open now" : "Closed now"}</div>
          </div>
          <button class="fav-btn" data-act="fav" data-id="${c.id}" aria-pressed="${fav}" aria-label="${fav ? "Remove from" : "Add to"} favourites">${I.heartSm(fav)}</button>
        </div>
        <p class="cafe-blurb">${esc(c.blurb || "HI! Welcome to my CoFFeNet shop.")}<b>Can’t wait to get you a coffee.</b></p>
        <div class="cafe-facts">
          <div class="row">${I.clock}<div>${hours.map(esc).join("<br>")}</div></div>
          <div class="row" style="align-items:center"><span class="rating-stars">${stars}</span><span>${c.rating.toFixed(1)} / ${c.orders} Previous orders</span></div>
          <div class="reviewers">${REVIEWERS.slice(0, c.id === "mine" ? 0 : reviewCount(c)).map((r) => `<img src="${IMG}${r}" alt="">`).join("")}<a href="#/reviews/${c.id}">(${reviewCount(c)} Reviews )</a></div>
        </div>
        <div class="cafe-menu">
          <h2>${esc(c.name)} Menu</h2>
          <span class="menu-cat">Hot drinks</span>
          ${menu.hot.map(line).join("")}
          ${menu.cold.length ? `<span class="menu-cat">Cold drinks</span>${menu.cold.map(line).join("")}` : ""}
          ${(menu.food || []).length ? `<span class="menu-cat">Food &amp; desserts</span>${menu.food.map(line).join("")}` : ""}
          ${c.id === "mine" ? "" : `<a class="link-btn" style="font-size:15px;margin-top:18px" href="#/chat/${c.id}">Message the seller ${I.next}</a>`}
        </div>
        <div class="sticky-cta">
          ${c.id === "mine"
            ? `<a class="btn btn-primary btn-lg" style="width:232px" href="#/manage">Manage orders</a>`
            : c.open
            ? `<a class="btn btn-primary btn-lg" style="width:232px" href="#/order/${c.id}">Place your order</a>`
            : `<button class="btn btn-primary btn-lg" style="width:232px" disabled>Closed right now</button>`}
        </div>
      </div>
      ${tabbar("")}`);
  };

  R.order = (id) => {
    const c = cafeById(id);
    if (!c || id === "mine") return R.notfound();
    if (!c.open) return R.cafe(id);
    session.cartCafe = S.lastCart = id;
    const menu = menuOf(c);
    const row = ([n, p]) => `
      <div class="qty-row"><span>${esc(n)}/₪${p}</span>
        <span class="stepper" data-item="${esc(n)}" data-price="${p}">
          <button data-act="qty" data-d="-1" aria-label="Remove one ${esc(n)}">−</button>
          <output aria-label="${esc(n)} quantity">${session.cart[n]?.qty || ""}</output>
          <button data-act="qty" data-d="1" aria-label="Add one ${esc(n)}">+</button>
        </span>
      </div>`;
    return screen("has-tabs", `
      <header class="appbar" style="background:var(--beige)">
        <a href="#/home" aria-label="CoFFeeNet home">${logo()}</a>
        <div class="actions"><a class="icon-btn" href="#/cafe/${c.id}" aria-label="Close">${I.close}</a></div>
      </header>
      <div class="body">
        <div class="wave-top">
          <div class="lead">Thanks for choosing <em>${esc(c.name)}</em><br>on <strong>CoFFee<b>Net</b></strong></div>
          <h1>Ready to place your order?</h1>
        </div>
        <div class="order-list">
          <h2>Hot Drinks</h2>${menu.hot.map(row).join("")}
          ${menu.cold.length ? `<h2>Cold Drinks</h2>${menu.cold.map(row).join("")}` : ""}
          ${(menu.food || []).length ? `<h2>Food &amp; Desserts</h2>${menu.food.map(row).join("")}` : ""}
        </div>
        <div class="sticky-cta" style="flex-direction:column;align-items:center">
          <button class="btn btn-primary btn-lg" style="width:232px" data-act="to-review" id="place" ${cartCount() ? "" : "disabled"}>Place your order${cartCount() ? ` · ${ils(cartTotal())}` : ""}</button>
        </div>
      </div>
      ${tabbar("")}`);
  };
  const cartItems = () => Object.values(session.cartCafe ? session.cart : {}).filter((i) => i.qty > 0);
  const cartCount = () => cartItems().reduce((s, i) => s + i.qty, 0);
  const cartTotal = () => cartItems().reduce((s, i) => s + i.qty * i.price, 0);

  R.review = () => {
    if (!session.cartCafe && S.lastCart) session.cartCafe = S.lastCart;
    const items = cartItems();
    if (!items.length) { setTimeout(() => go(session.cartCafe ? `#/order/${session.cartCafe}` : "#/map")); return ""; }
    const custom = (i) => [i.sugar ? `With ${i.sugar} sugar` : "", i.milk].filter(Boolean).map(esc).join("<br>");
    return screen("review-bg", `
      ${titlebar("Review your order", { left: true, close: `#/order/${session.cartCafe}` })}
      <div class="body">
        <div class="review-card">
          <div class="items">
            <div class="count">(${cartCount()})&nbsp; Order items</div>
            ${items.map((i) => `
              <div class="r-item">
                <div class="t"><span>${esc(i.name)}</span><button class="trash" data-act="rm" data-item="${esc(i.name)}" aria-label="Remove ${esc(i.name)}">${I.trash}</button></div>
                <div class="row">
                  <button data-act="customize" data-item="${esc(i.name)}" aria-label="Customize ${esc(i.name)}">${I.edit}</button>
                  <span class="custom">${custom(i)}</span>
                  <span class="stepper" data-item="${esc(i.name)}" data-price="${i.price}">
                    <button data-act="qty" data-d="-1" aria-label="Remove one">−</button><output>${i.qty}</output><button data-act="qty" data-d="1" aria-label="Add one">+</button>
                  </span>
                  <span class="price">${ils(i.qty * i.price)}</span>
                </div>
              </div>`).join("")}
          </div>
          <div class="foot">
            <div class="total">Total&nbsp; ${ils(cartTotal())}</div>
            <div class="btns">
              <a class="btn btn-outline pink" href="#/order/${session.cartCafe}">Change Order</a>
              <button class="btn btn-primary" data-act="submit-order">Submit Order</button>
            </div>
          </div>
        </div>
      </div>`);
  };

  R.thanks = (no) => screen("has-tabs", `
    <div class="body center-col" style="display:flex;flex-direction:column">
      <div style="margin-top:72px">${logo()}</div>
      <h1 class="big-msg" style="margin-top:14px">Thank you&nbsp; for<br>placing your order!</h1>
      <p class="mid-msg" style="text-align:left;padding:0 30px;margin:30px 0 60px">Order confirmation will be sent to you shortly....</p>
      <div class="wave-up" style="flex:1;text-align:left;width:100%">
        <h2 class="big-msg" style="font-size:24px">What’s next?</h2>
        <p style="font:500 16px/1.75 var(--f-head);color:var(--plum)">Once the <b>seller</b> confirms your order, you can proceed to complete the payment.</p>
        <a class="btn btn-primary btn-block" style="margin-top:44px;font-size:15px;height:37px" href="#/summary/${no}">View Order</a>
      </div>
    </div>
    ${tabbar("")}`);

  R.pay = (no) => {
    const o = orderByNo(no);
    if (!o) return R.notfound();
    if (o.status !== "confirmed") return R.summary(no);
    const credit = Math.min(S.credit, o.total);
    return screen("has-tabs", `
      ${appbar()}
      <div class="body">
        <h1 style="font:700 28px/1.2 var(--f-head);color:var(--plum);text-align:center;margin:26px 24px 40px"><span style="color:var(--pink)">Great!</span> The seller has confirmed your order.</h1>
        <div class="wave-up" style="padding-top:30px">
          <h2 class="big-msg" style="font-size:24px">Complete Your Order</h2>
          <p class="demo-note" style="text-align:left;margin:12px 0 0">Demo payment: nothing is charged. Please don’t enter a real card.</p>
          ${credit ? `<label class="check credit-line"><input type="checkbox" id="use-credit"> Use ${ils(credit)} of my account credit</label>` : ""}
          <div style="font:500 16px/1 var(--f-head);color:#111;padding:18px 0 12px;border-bottom:1px solid #bbb">Payment</div>
          <form id="pay-form" novalidate>
            <div id="methods">
            <p style="font:500 13px/1 var(--f-head);color:#111;margin:22px 0 14px">Pay With:</p>
            <div style="display:flex;justify-content:space-between;align-items:center" role="radiogroup" aria-label="Payment method">
              <label class="radio"><input type="radio" name="method" value="card" checked> Card</label>
              <label class="radio"><input type="radio" name="method" value="bit"> <img src="${IMG}pay-bit.png" style="width:36px;height:18px;object-fit:cover;object-position:right" alt="bit"></label>
              <label class="radio"><input type="radio" name="method" value="apple"> <img src="${IMG}pay-apple.png" width="46" alt="Apple Pay"></label>
              <label class="radio"><input type="radio" name="method" value="paypal"> <img src="${IMG}pay-paypal.png" width="56" alt="PayPal"></label>
            </div>
            <div id="card-fields">
              ${S.card ? `<label class="check" style="margin-top:22px"><input type="checkbox" id="saved" checked> Use saved card ending ${esc(S.card.last4)}</label>` : ""}
              <div id="new-card" ${S.card ? "hidden" : ""}>
                <label class="form-label" for="cc" style="margin-top:24px">Card Number</label>
                <input class="input plain" id="cc" inputmode="numeric" autocomplete="off" placeholder="1234  5678  9101  1121" maxlength="23">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                  <div><label class="form-label" for="exp">Expiration Date</label><input class="input plain" id="exp" autocomplete="off" inputmode="numeric" placeholder="MM/YY" maxlength="5"></div>
                  <div><label class="form-label" for="cvv">CVV</label><input class="input plain" id="cvv" inputmode="numeric" autocomplete="off" placeholder="123" maxlength="4"></div>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
                  <label class="check" style="font-size:12px"><input type="checkbox" id="keep"> Save card details</label>
                  <button type="button" class="link-btn" style="font-size:13px" id="fill-demo">Fill demo card</button>
                </div>
              </div>
            </div>
            </div>
            <p class="err" id="pay-err" role="alert" style="margin-top:8px"></p>
            <button class="btn btn-primary btn-block" style="font-size:15px" id="pay-btn">Pay NIS&nbsp; ${o.total.toFixed(2)}</button>
            <button type="button" class="btn btn-outline btn-block" style="font-size:15px;margin-top:10px" data-act="cancel-order" data-no="${o.no}">Cancel order</button>
          </form>
        </div>
      </div>
      ${tabbar("")}`);
  };

  R.pin = (no) => {
    const o = orderByNo(no);
    if (!o || o.status !== "confirmed" || !session.pay || session.pay.no !== String(no)) return R.pay(no);
    return screen("has-tabs", `
      ${titlebar("Payment", { left: true, close: `#/pay/${no}` })}
      <div class="body">
        <div class="pad center" style="padding-top:60px">
          <p class="mid-msg" style="margin:0 0 30px">Enter your 4-digit card pin to confirm this payment</p>
          <form id="pin-form" novalidate>
            <div class="pin-row">${[0, 1, 2, 3].map((k) => `<input class="input plain" inputmode="numeric" type="password" maxlength="1" aria-label="Digit ${k + 1}" autocomplete="off">`).join("")}</div>
            <p class="err" id="pin-err" role="alert" style="text-align:center;margin:14px 0"></p>
            <button class="btn btn-primary btn-lg" style="width:232px">Confirm Payment</button>
          </form>
          <p class="demo-note">Any four digits work in this demo.</p>
        </div>
      </div>
      ${tabbar("")}`);
  };

  R.processing = () => screen("", `
    <div class="body center-col" style="display:grid;place-content:center;justify-items:center;gap:26px" role="status">
      <svg class="spin" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#FF006B" stroke-width="6" stroke-linecap="round"><path d="M32 6a26 26 0 1 1-26 26" /></svg>
      <p class="big-msg">Processing…</p>
    </div>`);

  R.confirmed = (no) => {
    const o = orderByNo(no);
    if (!o) return R.notfound();
    const c = cafeById(o.cafe) || {};
    return screen("has-tabs", `
      <div class="body center-col" style="display:flex;flex-direction:column;text-align:center">
        <div style="margin-top:56px">${logo()}</div>
        <h1 class="big-msg" style="margin:20px 0 34px">Thank you for your order</h1>
        <div class="wave-up" style="flex:1;text-align:left;width:100%">
          <p style="font:400 19px/1.4 var(--f-head);color:#111;text-align:center;margin:0 0 26px">Order <b>#${o.no}</b> is fully confirmed</p>
          <a class="btn btn-primary btn-block" style="font-size:15px" href="#/summary/${o.no}">View Order</a>
          <p class="center" style="margin:14px 0 40px"><a class="plain-link" href="#/receipt/${o.no}">Generate Receipt</a></p>
          <h2 class="big-msg" style="font-size:26px">What’s next?</h2>
          <p style="font:500 17px/1.65 var(--f-head);color:var(--plum);margin:10px 0 30px">The seller is preparing your order. Once it’s ready, you will receive a notification to pick up.</p>
          <p style="font:500 14px/1 var(--f-head);margin:0 0 10px">See directions to the coffee shop</p>
          <a class="link-btn" href="#/map/focus/${c.id}">Link to map ${I.next}</a>
        </div>
      </div>
      ${tabbar("")}`);
  };

  const ST = { pending: "Waiting for seller", confirmed: "Confirmed · pay now", paid: "Being prepared", ready: "Ready for pick up", completed: "Completed", cancelled: "Cancelled" };
  const itemLines = (o) => o.items.map((i) => `<div class="sum-item"><div><b>${i.qty > 1 ? i.qty + " × " : ""}${esc(i.name)}</b>${[i.sugar ? `With ${i.sugar} sugar` : "", i.milk].filter(Boolean).map((x) => `<span>${esc(x)}</span>`).join("")}</div><span>${ils(i.price * i.qty)}</span></div>`).join("");

  R.summary = (no) => {
    const o = orderByNo(no);
    if (!o) return R.notfound();
    const c = cafeById(o.cafe) || { name: "Coffee shop", addr: "" };
    const steps = ["pending", "confirmed", "paid", "ready", "completed"], at = steps.indexOf(o.status);
    const names = ["Order sent", "Confirmed by seller", "Paid, being prepared", "Ready for pick up", "Picked up"];
    return screen("has-tabs", `
      ${titlebar("Your Order", { left: true, close: "#/orders" })}
      <div class="body">
        <div class="pad sum">
          <a class="sum-shop" href="#/cafe/${c.id}">${avatar({ ...c, open: true }, 64)}<span><b>${esc(c.name)}</b><i>on CoFFeeNet</i><small>${esc(c.addr)}, Tel-Aviv</small></span></a>
          <p class="sum-meta"><b>Order No. ${o.no}</b><span>${fmtDate(o.date)}</span></p>
          ${itemLines(o)}
          <div class="sum-total"><span>Total</span><span>${ils(o.total)}</span></div>
          ${o.creditUsed ? `<div class="sum-sub"><span>Account credit</span><span>−${ils(o.creditUsed)}</span></div>` : ""}
          ${o.status === "cancelled"
            ? `<p class="status closed" style="margin:22px 0">This order was cancelled.</p>`
            : `<ol class="track">${names.map((n, k) => `<li class="${k < at || o.status === "completed" ? "done" : k === at ? "now" : ""}" ${k === at ? 'aria-current="step"' : ""}>${n}</li>`).join("")}</ol>`}
          <div class="sum-acts">
            ${o.status === "confirmed" ? `<a class="btn btn-primary btn-block" href="#/pay/${o.no}">Pay ${ils(o.total)}</a>` : ""}
            ${o.status === "ready" ? `<a class="btn btn-primary btn-block" href="#/pickup/${o.no}">Pick up instructions</a>` : ""}
            ${o.status === "completed" && !o.review ? `<button class="btn btn-primary btn-block" data-act="review" data-no="${o.no}">Leave your review</button>` : ""}
            ${["completed", "cancelled"].includes(o.status) ? `<button class="btn btn-outline btn-block" data-act="reorder" data-no="${o.no}">Order again</button>` : ""}
            ${["paid", "ready", "completed"].includes(o.status) ? `<a class="btn btn-outline btn-block" href="#/receipt/${o.no}">Receipt</a>` : ""}
            ${["paid", "ready"].includes(o.status) ? `<a class="btn btn-outline btn-block" href="#/map/focus/${c.id}">Directions to the shop</a>` : ""}
            <a class="btn btn-outline btn-block" href="#/chat/${c.id}">Message ${esc(c.name)}</a>
            ${["pending", "confirmed"].includes(o.status) ? `<button class="link-btn center" data-act="cancel-order" data-no="${o.no}">Cancel order</button>` : ""}
          </div>
        </div>
      </div>
      ${tabbar("")}`);
  };

  R.receipt = (no) => {
    const o = orderByNo(no);
    if (!o || !["paid", "ready", "completed"].includes(o.status)) return R.notfound();
    const c = cafeById(o.cafe) || { name: "Coffee shop", addr: "" };
    return screen("has-tabs", `
      ${titlebar("Receipt", { left: true, close: `#/summary/${no}` })}
      <div class="body"><div class="pad"><div class="receipt">
        ${logo()}
        <p><b>${esc(c.name)}</b><br>${esc(c.addr)}, Tel-Aviv</p>
        <p class="sum-meta"><b>Order No. ${o.no}</b><span>${fmtDate(o.date)}</span></p>
        ${itemLines(o)}
        <div class="sum-total"><span>Total</span><span>${ils(o.total)}</span></div>
        ${o.creditUsed ? `<div class="sum-sub"><span>Account credit</span><span>−${ils(o.creditUsed)}</span></div>` : ""}
        <div class="sum-sub"><span>Paid with</span><span>${payName(o)}</span></div>
        <small>Demo receipt. No payment was made.</small>
      </div>
      <button class="btn btn-primary btn-block" data-act="save-receipt" data-no="${o.no}">Save receipt</button></div></div>
      ${tabbar("")}`);
  };
  const payName = (o) => ({ card: "Card" + (o.last4 ? ` ending ${esc(o.last4)}` : ""), bit: "bit", apple: "Apple Pay", paypal: "PayPal", credit: "Account credit" }[o.paidWith] || "Card");

  R.pickup = (no) => {
    const o = orderByNo(no);
    if (!o) return R.notfound();
    const c = cafeById(o.cafe) || {};
    if (!["ready", "completed"].includes(o.status)) return R.summary(no);
    const done = !!o.review;
    return screen("", `
      ${titlebar("Pick up instructions", { left: true, close: "#/orders" })}
      <div class="body">
        <div style="background:var(--beige);padding:30px 28px 46px;position:relative" class="wave-top">
          <h1 style="font:600 22px/1.4 var(--f-head);color:var(--ink);margin:0;text-align:left">Hi there,<br><span style="color:var(--pink)">Your order No. ${o.no} is ready!</span></h1>
          <p style="font:400 14px/1.5 var(--f-head);text-align:left;margin:18px 0 6px">Please pick up your order at this address:</p>
          <p style="font:500 16px/1.5 var(--f-head);text-align:left;margin:0">${esc(c.addr)}, Tel-Aviv&nbsp; <a href="#/map/focus/${c.id}" style="color:var(--pink);font-size:15px">(Link to map)</a></p>
          <p style="font:400 14px/1 var(--f-head);text-align:left;margin:22px 0 8px">Seller’s note:</p>
          <p style="text-align:left;border:1px solid #333;padding:8px;font:400 14px/1.45 var(--f-head);margin:0">${esc(c.note || "Hi! Ring the bell and I’ll bring your coffee down. Enjoy!")}</p>
        </div>
        <div class="pad" style="padding-top:20px;padding-bottom:30px">
          <h2 class="big-msg" style="font-size:21px">Thank you&nbsp; for your order</h2>
          <p style="font:400 14px/1.5 var(--f-head);color:var(--ink);margin:12px 0 14px">We hope you enjoyed your coffee, and will truly appreciate it if you take the time to leave a review about your experience at <span style="color:var(--pink)">${esc(c.name)}</span>.</p>
          ${o.status === "ready" ? `<button class="btn btn-primary btn-sm" style="margin:0 10px 10px 0" data-act="picked" data-no="${o.no}">I picked it up</button>` : ""}${done ? `<p class="status open">Thanks! Your review was sent.</p>` : `<button class="btn btn-outline btn-sm" data-act="review" data-no="${o.no}">Leave your review</button>`}
          <p style="font:600 19px/1 var(--f-head);color:var(--ink);margin:24px 0 0">See you next time!</p>
        </div>
      </div>
      ${tabbar("")}`);
  };

  R.orders = (focus) => {
    const list = [...S.orders].sort((a, b) => b.no - a.no || (b.date > a.date ? 1 : -1));
    return screen("has-tabs", `
      ${titlebar("Your Orders", { left: true, close: "#/home" })}
      <div class="body">
        ${list.length ? list.map((o) => {
          const c = cafeById(o.cafe) || { name: "—" };
          const cur = focus ? String(o.no) === String(focus) : o === list[0];
          return `<a class="order-row ${cur ? "current" : ""}" href="#/summary/${o.no}">
              <span>Order No. ${o.no}<br>${esc(c.name)}<br><span class="st ${o.status === "completed" ? "done" : ""}">${ST[o.status]}</span></span>
              <span style="display:flex;gap:12px;align-items:center">${fmtDate(o.date)} ${I.chev}</span>
            </a>`;
        }).join("") : `<p class="empty">No orders yet.<br><br><a class="btn btn-primary btn-sm" href="#/map">Find coffee near you</a></p>`}
      </div>
      ${tabbar("")}`);
  };

  const myPhoto = () => S.user.photo || `${IMG}${DB.current === DEMO ? "av-liat.png" : "av-cupicon.svg"}`;
  R.profile = () => {
    const u = S.user;
    const favs = S.favourites.map(cafeById).filter(Boolean);
    return screen("profile has-tabs", `
      ${appbar()}
      <div class="body">
        <h1>Hi ${esc(u.name.split(" ")[0])}!</h1>
        <a class="p-row" href="#/orders"><img src="${myPhoto()}" alt=""><span><span class="nm">${esc(u.name)}</span><br><span class="sub">${S.orders.length} order${S.orders.length === 1 ? "" : "s"}</span></span><span class="chev">${I.chev}</span></a>
        <a class="p-line" href="#/credit"><span>Account Credit</span><span style="display:flex;gap:14px;align-items:center;color:#111">${ils(S.credit)} ${I.chev}</span></a>
        <a class="p-shop" href="${S.myShop ? "#/manage" : "#/seller"}"><span>${S.myShop ? `Manage <b>${esc(S.myShop.name)}</b><br>your CoFFeeNet shop` : "Open your own coffee shop<br>on CoFFeeNet"}</span><img src="${IMG}seller-shop.png" alt=""></a>
        <h2 style="font:600 18px/1 var(--f-head);color:#111;margin:0 0 12px">Your Favourite</h2>
        <div class="fav-row">
          <p>Add a venue to your favourites by tapping the heart icon in the menu view. Your favourites will be displayed here.</p>
          <div class="fav-cards">
            ${favs.map((c) => `<a class="fav-card" href="#/cafe/${c.id}"><div class="top"><div class="nm">${esc(c.name)}</div><span class="h">${I.heartSm(true)}</span><img src="${c.photo || IMG + c.img}" alt=""></div><div class="bt"><span>${esc(c.addr)}</span><span class="stars">${I.star}${c.rating.toFixed(1)}</span></div></a>`).join("")}
          </div>
        </div>
        <div class="quick">
          <h2>Quick&nbsp; links</h2>
          <a href="#/account">Account Setting ${I.chev}</a>
          <a href="#/payments">Payment methods ${I.chev}</a>
          <a href="#/orders">Orders history ${I.chev}</a>
          <a href="#/favourites">Your favourites ${I.chev}</a>
          <a href="#" data-act="logout">Log out ${I.chev}</a>
        </div>
      </div>
      ${tabbar("profile")}`);
  };

  R.account = () => {
    const u = S.user, row = (k, l, v) => `<button class="acc-row" data-act="edit-acc" data-k="${k}"><span>${l}</span><span>${v} ${I.chev}</span></button>`;
    return screen("beige has-tabs", `
      ${titlebar("Your Account", { left: true, close: "#/profile" })}
      <div class="body acc">
        ${row("name", "Name", esc(u.name))}
        <label class="acc-row"><span>Profile Picture</span><span><img src="${myPhoto()}" alt="">${I.chev}</span><input type="file" id="photo" accept="image/*" class="vh"></label>
        ${row("email", "E-mail", esc(u.email || DEMO))}
        ${row("phone", "Mobile Number", esc(u.phone || "Add a number"))}
        <label class="acc-row"><span>Send receipts to email</span><input type="checkbox" class="switch" data-pref="receipts" ${u.receipts ? "checked" : ""}></label>
        <label class="acc-check"><input type="checkbox" data-pref="promo" ${u.promo ? "checked" : ""}> I want to receive updates about community events and promotions from CoFFeeNet via emails and push messages</label>
        <h2>Legal</h2>
        <a class="acc-row thin" href="#/page/terms"><span>Terms and Services</span>${I.chev}</a>
        <a class="acc-row thin" href="#/page/privacy"><span>Privacy Statement</span>${I.chev}</a>
        <button class="acc-row thin danger" data-act="delete-acc"><span>Delete account</span>${I.chev}</button>
      </div>
      ${tabbar("profile")}`);
  };

  R.payments = () => screen("beige has-tabs", `
    ${titlebar("Payment methods", { left: true, close: "#/profile" })}
    <div class="body acc">
      ${S.card ? `<div class="acc-row"><span>Card ending ${esc(S.card.last4)}<br><small>Expires ${esc(S.card.exp)}</small></span><button class="link-btn" style="font-size:15px" data-act="rm-card">Remove</button></div>` : `<p class="empty">No saved card.<br>Tick “Save card details” the next time you pay and it will appear here.</p>`}
      <a class="acc-row" href="#/credit"><span>Account credit</span><span>${ils(S.credit)} ${I.chev}</span></a>
    </div>
    ${tabbar("profile")}`);

  R.credit = () => screen("beige has-tabs", `
    ${titlebar("Account Credit", { left: true, close: "#/profile" })}
    <div class="body acc">
      <p class="credit-big">${ils(S.credit)}<small>to spend on coffee</small></p>
      <h2>Activity</h2>
      ${[...S.ledger].reverse().map((l) => `<div class="acc-row thin"><span>${esc(l.text)}<br><small>${fmtDate(l.d)}</small></span><b class="${l.amount < 0 ? "" : "plus"}">${l.amount < 0 ? "−" : "+"}${ils(Math.abs(l.amount))}</b></div>`).join("")}
    </div>
    ${tabbar("profile")}`);

  const unread = () => S.notes.filter((n) => !n.read).length;
  R.inbox = (tab) => {
    if (tab === "notifications" || tab === "messages") {
      const ids = [...new Set([...Object.keys(S.threads), ...S.orders.map((o) => o.cafe)])].filter((id) => id !== "mine" && cafeById(id));
      const last = (id) => { const t = S.threads[id] || []; return t[t.length - 1]; };
      return screen("has-tabs", `
        ${titlebar("Your inbox", { left: true, close: "#/inbox" })}
        <div class="tabs in" role="tablist">
          <button role="tab" aria-selected="${tab === "notifications"}" data-act="go" data-href="#/inbox/notifications">Notifications${unread() ? ` (${unread()})` : ""}</button>
          <button role="tab" aria-selected="${tab === "messages"}" data-act="go" data-href="#/inbox/messages">Messages</button>
        </div>
        <div class="body">
          ${tab === "notifications"
            ? (S.notes.length ? S.notes.map((n) => `<button class="note ${n.read ? "" : "new"}" data-act="note" data-id="${n.id}"><span><i>${esc(n.from)}</i><i>${fmtDate(n.d)}</i></span><span>Subject: ${esc(n.text)} ${I.chev}</span></button>`).join("") : `<p class="empty">No notifications yet.<br>You’ll hear from us when an order moves.</p>`)
            : (ids.length ? ids.map((id) => { const c = cafeById(id), m = last(id); return `<a class="note" href="#/chat/${id}"><span><i>${esc(c.name)}</i><i>${m ? m.at : ""}</i></span><span>${m ? (m.me ? "You: " : "") + esc(m.text) : "Say hello to your seller"} ${I.chev}</span></a>`; }).join("") : `<p class="empty">No messages yet.<br>Open a shop to write to its seller.</p>`)}
        </div>
        ${tabbar("inbox")}`);
    }
    const seller = tab === "seller", fresh = S.sales.filter((x) => x.status === "new").length;
    const user = [["#/map", "See Near By Coffee Shops"], ["#/orders", "Your Orders"], ["#/inbox/notifications", `Your Inbox${unread() ? ` (${unread()})` : ""}`], ["#/profile", "Your Account"], ["#/popular", "Most Popular Coffee Shops"]];
    const sell = S.myShop
      ? [["#/manage", `Manage Orders${fresh ? ` (${fresh} new)` : ""}`], ["#/cafe/mine", "Your CoFFeeNet Shop"], ["#/open/3", "Edit Your Menu"], ["#/open/5", "Opening Hours"], ["#/open/6", "Pick up Instructions"]]
      : [["#/seller", "Become a Seller"], ["#/about", "How does it work?"]];
    return screen("has-tabs", `
      ${appbar()}
      <div class="tabs" role="tablist">
        <button role="tab" aria-selected="${!seller}" data-act="go" data-href="#/inbox">I’m a user</button>
        <button role="tab" aria-selected="${seller}" data-act="go" data-href="#/inbox/seller">I’m a seller</button>
      </div>
      <div class="body"><div class="link-list">${(seller ? sell : user).map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}</div></div>
      ${tabbar("inbox")}`);
  };

  R.popular = () => screen("has-tabs", `
    ${titlebar("Most popular", { left: true, close: "#/home" })}
    <div class="body"><div class="venue-list" style="margin:0">${[...allCafes()].sort((a, b) => b.rating - a.rating).map((c) => venueRow(c)).join("")}</div></div>
    ${tabbar("")}`);

  R.chat = (id) => {
    const c = cafeById(id);
    if (!c || id === "mine") return R.notfound();
    const t = S.threads[id] || [];
    return screen("has-tabs", `
      ${titlebar(esc(c.name), { left: true, close: "#/inbox/messages" })}
      <div class="body chat" id="chat" aria-live="polite">
        ${t.length ? t.map((m) => `<div class="msg ${m.me ? "me" : ""}">${esc(m.text)}<time>${m.at}</time></div>`).join("") : `<p class="empty">Ask ${esc(c.name)} about your order, opening hours or how to find the door.</p>`}
      </div>
      <form class="chat-form" id="chat-form"><input id="chat-in" aria-label="Message" placeholder="Write a message" autocomplete="off" maxlength="240"><button class="btn btn-primary btn-sm">Send</button></form>
      ${tabbar("inbox")}`);
  };

  R.reviews = (id) => {
    const c = cafeById(id);
    if (!c) return R.notfound();
    const list = reviewsOf(c), can = S.orders.find((o) => o.cafe === id && ["ready", "completed"].includes(o.status) && !o.review);
    return screen("has-tabs", `
      ${titlebar("Reviews", { left: true, close: `#/cafe/${id}` })}
      <div class="body"><div class="pad">
        <p class="rev-head"><b>${c.rating.toFixed(1)}</b><span>${esc(c.name)}<br>${reviewCount(c)} review${reviewCount(c) === 1 ? "" : "s"}</span></p>
        ${can ? `<button class="btn btn-primary btn-block" data-act="review" data-no="${can.no}">Review your order</button>` : ""}
        ${list.length ? list.map((r) => `<div class="rev"><p><b>${esc(r.by)}</b><span aria-label="${r.stars} out of 5">${[1, 2, 3, 4, 5].map((k) => I.starC(k <= r.stars ? "#F7D21E" : "#e3e3e3")).join("")}</span></p>${r.text ? `<p>“${esc(r.text)}”</p>` : ""}</div>`).join("") : `<p class="empty">No reviews yet.</p>`}
      </div></div>
      ${tabbar("")}`);
  };

  /* ---------- seller: manage orders ---------- */
  R.manage = () => {
    if (!S.myShop) return R.seller();
    const by = (...st) => S.sales.filter((x) => st.includes(x.status)), head = (t, n) => `<h2 class="mo-head">${t}${n ? ` (${n})` : ""}</h2>`;
    const nw = by("new"), st = by("await", "standing", "ready"), done = by("done", "declined");
    const earned = S.sales.filter((x) => x.status === "done").reduce((s, x) => s + x.total, 0);
    return screen("has-tabs", `
      ${titlebar("Manage orders", { left: true, close: "#/inbox/seller" })}
      <div class="body">
        <label class="mo-open"><span><b>${esc(S.myShop.name)}</b><br>${S.myShop.open ? "Open, taking orders" : "Closed, not taking orders"}</span><input type="checkbox" class="switch" id="shop-open" ${S.myShop.open ? "checked" : ""} aria-label="Shop is open"></label>
        ${head("New Orders", nw.length)}
        ${nw.length ? nw.map((x) => `<div class="mo"><span>Order #${x.no}</span><span>${x.who}</span><a href="#/sale/${x.no}">View</a><button class="go-pink" data-act="sale-confirm" data-no="${x.no}">Confirm</button></div>`).join("") : `<p class="mo-none">${S.myShop.open ? "Nothing new right now. Orders appear here as customers find you." : "Open your shop to receive orders."}</p>`}
        ${head("Standing Orders", st.length)}
        ${st.length ? st.map((x) => `<div class="mo"><span>Order #${x.no}</span><span>${x.who}</span><a href="#/sale/${x.no}">View</a>${x.status === "standing" ? `<button data-act="sale-fulfil" data-no="${x.no}">Fulfil Order</button>` : `<em>${x.status === "await" ? "Awaiting payment" : "Awaiting pick up"}</em>`}</div>`).join("") : `<p class="mo-none">No orders in progress.</p>`}
        ${head("Previous Orders", done.length)}
        ${done.length ? `<p class="mo-sum">Earned so far: <b>${ils(earned)}</b></p>` + [...done].reverse().map((x) => `<a class="mo" href="#/sale/${x.no}"><span>${fmtDate(x.date).replace(/, \d+$/, "")}</span><span>#${x.no}</span><span>${x.who}</span><em>${x.status === "declined" ? "Declined" : ils(x.total)}</em></a>`).join("") : `<p class="mo-none">Completed orders will be listed here.</p>`}
      </div>
      ${tabbar("")}`);
  };
  R.sale = (no) => {
    const x = S.sales.find((s) => String(s.no) === String(no));
    if (!x) return R.notfound();
    const label = { new: "New order", await: "Waiting for the customer to pay", standing: "Paid. Make the coffee!", ready: "Ready, waiting for pick up", done: "Picked up", declined: "Declined" };
    return screen("has-tabs", `
      ${titlebar(`Order #${x.no}`, { left: true, close: "#/manage" })}
      <div class="body"><div class="pad sum">
        <p class="sum-meta"><b>${x.who}</b><span>${fmtDate(x.date)}</span></p>
        ${itemLines(x)}
        <div class="sum-total"><span>Total</span><span>${ils(x.total)}</span></div>
        <p class="status ${x.status === "declined" ? "closed" : "open"}" style="margin:18px 0">${label[x.status]}</p>
        <div class="sum-acts">
          ${x.status === "new" ? `<button class="btn btn-primary btn-block" data-act="sale-confirm" data-no="${x.no}">Confirm</button><button class="btn btn-outline btn-block" data-act="sale-decline" data-no="${x.no}">Decline</button>` : ""}
          ${x.status === "standing" ? `<button class="btn btn-primary btn-block" data-act="sale-fulfil" data-no="${x.no}">Fulfil Order</button>` : ""}
        </div>
      </div></div>
      ${tabbar("")}`);
  };

  /* ---------- information pages ---------- */
  R.about = () => screen("has-tabs", `
    ${titlebar("About", { left: true, close: S.user ? "#/home" : "#/welcome" })}
    <div class="body about"><div class="pad">
      ${logo()}
      <p>Welcome to CoFFeeNet, Tel Aviv’s first coffee marketplace that empowers its community members to create an alternative to the high cost of coffee.</p>
      <h2>How it works</h2>
      <ol>
        <li><b>Choose a seller</b>See who’s brewing near you on the map, with ratings and walking time.</li>
        <li><b>Place your order</b>Pick your drinks and tell the seller how you like them.</li>
        <li><b>Receive order confirmation</b>The seller confirms, usually within seconds.</li>
        <li><b>Complete order</b>Pay by card, bit, Apple Pay, PayPal or your account credit.</li>
        <li><b>Seller fulfils order</b>You get a notification the moment it’s ready.</li>
        <li><b>Pick-up order</b>Follow the directions and the seller’s note.</li>
      </ol>
      <p class="mid-msg" style="color:var(--pink);text-align:center">Enjoy your coffee!</p>
      ${["Such a friendly coffee experience! It’s like having a friend make you a coffee.", "Love the fact I don’t have to queue up and waste my valuable lunch break time.", "Couldn’t be easier! Few clicks and bang, coffee in hand."].map((q) => `<blockquote>“${q}”</blockquote>`).join("")}
      <p class="demo-note">These quotes are sample content from the prototype.</p>
      ${S.user ? "" : `<a class="btn btn-primary btn-block" href="#/signin/join">Join Us!</a>`}
      <p class="foot-links"><a href="#/page/faq">FAQ</a><a href="#/page/terms">Terms</a><a href="#/page/privacy">Privacy</a></p>
    </div></div>
    ${S.user ? tabbar("") : ""}`);
  const PAGES = {
    terms: ["Terms and Services", [["What CoFFeeNet is", "A community marketplace that connects people who make coffee with people nearby who’d like one."], ["Orders", "An order is final once the seller confirms it and you pay. Until then you can cancel at no cost."], ["Sellers", "Sellers set their own menu, prices and hours, and are responsible for what they serve."], ["This version", "This is a portfolio prototype. Shops, customers and payments are simulated."]]],
    privacy: ["Privacy Statement", [["Where your data lives", "Everything you enter is kept in this browser on this device. Nothing is sent to a server."], ["Location", "If you allow it, your position is used only to work out distances on the map. It isn’t saved."], ["Cards", "Only the last four digits and expiry of a saved demo card are kept."], ["Removing it", "Delete your account from Account Setting and everything is erased from this device."]]],
    faq: ["FAQ", [["Can I be a buyer and a seller?", "Yes. One account does both. Switch between them in the inbox tab."], ["How do I cancel?", "Open the order and choose Cancel order. It’s available until you pay."], ["What is account credit?", "Money you earn as a seller, plus gifts. Use it on any order."], ["Why is a shop closed?", "Sellers open when it suits them. Save a favourite and check back later."]]],
  };
  R.page = (k) => {
    const p = PAGES[k];
    if (!p) return R.notfound();
    return screen("has-tabs", `${titlebar(p[0], { left: true, close: "#/about" })}<div class="body about"><div class="pad">${p[1].map(([h, t]) => `<h3>${h}</h3><p>${t}</p>`).join("")}</div></div>${S.user ? tabbar("") : ""}`);
  };

  R.favourites = () => {
    const favs = S.favourites.map(cafeById).filter(Boolean);
    const edit = session.favEdit;
    return screen("has-tabs", `
      ${appbar()}
      <div class="fav-tools">
        <h1>Your favourite pick</h1>
        ${favs.length ? `<button class="link-btn" style="font-size:15px" data-act="fav-edit">${edit ? "Done" : "Edit"}</button>` : ""}
      </div>
      <div class="body">
        ${favs.length
          ? `<div class="venue-list" style="margin:0">${favs.map((c) => edit
              ? `<label class="venue" style="cursor:pointer"><input type="checkbox" class="sel" data-id="${c.id}" ${session.favSel?.has(c.id) ? "checked" : ""}>${avatar(c)}<div class="info"><div class="name">${esc(c.name)} | ${esc(c.addr)}</div><div class="meta"><span>${c.km} km</span><span class="stars">${c.rating.toFixed(1)} ${I.star}</span></div></div></label>`
              : venueRow(c)).join("")}</div>`
          : `<p class="empty">No favourites yet.<br>Tap the heart on a shop page to save it here.<br><br><a class="btn btn-primary btn-sm" href="#/map">Explore coffee shops</a></p>`}
      </div>
      ${edit && favs.length ? `<div class="bulk-bar"><button class="link-btn" style="font-size:15px" data-act="fav-all">Mark all</button><button class="btn btn-primary btn-sm" data-act="fav-delete">Delete</button></div>` : ""}
      ${tabbar("fav")}`);
  };

  /* ---------- seller flow ---------- */
  R.seller = () => screen("beige has-tabs", `
    <div class="body center-col" style="display:flex;flex-direction:column;justify-content:center;padding:0 40px">
      ${logo()}
      <h1 style="font:700 23px/1.45 var(--f-head);color:var(--plum);margin:30px 0 44px">Thank you&nbsp; for choosing to become a Seller on CoFFee<span style="color:var(--pink)">Net</span> !</h1>
      <p style="font:600 18px/1.55 var(--f-head);color:var(--plum);margin:0 0 30px">Just a few quick steps before you’ll be set up and ready to receive orders</p>
      <button class="btn btn-primary" style="font-size:17px" data-act="wizard-start">Open your own CoFFeeNet shop</button>
    </div>
    ${tabbar("")}`);

  const STEPS = 6;
  function wizardDraft() {
    if (!session.wizard) {
      const m = S.myShop;
      session.wizard = m
        ? JSON.parse(JSON.stringify({ name: m.name, addr: m.addr, blurb: m.blurb, menuSel: m.menuSel, others: m.others, food: m.food || { "Today’s cake": { on: false, price: 10 }, Croissant: { on: false, price: 15 } }, pick: m.pick || "other", apt: m.apt || "", sugar: m.sugar, milks: m.milks, days: m.days, dayList: m.dayList || [], slots: m.slots, otherHours: m.otherHours, note: m.note }))
        : {
            name: "", addr: "", blurb: "HI! Welcome to my CoFFeNet shop.",
            menuSel: Object.fromEntries([...BASE_MENU.hot, ...BASE_MENU.cold].map(([n, p]) => [n, { on: false, price: p }])),
            others: [{ name: "", price: "" }, { name: "", price: "" }, { name: "", price: "" }],
            food: { "Today’s cake": { on: false, price: 10 }, Croissant: { on: false, price: 15 } }, pick: "door", apt: "",
            sugar: true, milks: ["Thin Milk 1%"], days: "everyday", dayList: [], slots: ["8:00-20:00"], otherHours: "", note: "",
          };
    }
    return session.wizard;
  }

  R.open = (step) => {
    step = Math.max(1, Math.min(STEPS, Number(step) || 1));
    const w = wizardDraft();
    const bar = `<div class="progress" aria-label="Step ${step} of ${STEPS}">${Array.from({ length: STEPS }, (_, k) => `<span class="${k + 1 === step ? "on" : ""}"></span>`).join("")}</div>`;
    let body = "";
    if (step === 1) {
      body = `<h2 class="step-title">Shop Details</h2>
        <label class="form-label" for="w-name">Shop Name</label><input class="input" id="w-name" data-w="name" value="${esc(w.name)}" placeholder="Enter your shop name">
        <label class="form-label" for="w-addr">Shop Address</label><input class="input" id="w-addr" data-w="addr" value="${esc(w.addr)}" placeholder="Enter your shop address, e.g. Gordon 15" list="streets"><datalist id="streets">${CNMap.searchStreets("", 800).map((s) => `<option value="${esc(s)} ">`).join("")}</datalist>`;
    } else if (step === 2) {
      body = `<h2 class="step-title">About your shop</h2>
        <p class="step-sub">Say hello to the coffee lovers who’ll visit your <b>CoFFeeNet</b> shop</p>
        <label class="form-label" for="w-blurb">Welcome message</label>
        <textarea class="input" id="w-blurb" data-w="blurb" maxlength="140">${esc(w.blurb)}</textarea>`;
    } else if (step === 3) {
      const row = ([n]) => `<div class="mc-row">
          <input type="checkbox" data-ms="${esc(n)}" ${w.menuSel[n].on ? "checked" : ""} aria-label="Serve ${esc(n)}">
          <span class="nm">${esc(n)}</span><span class="ils">₪</span>
          <input class="rate" data-mp="${esc(n)}" value="${w.menuSel[n].price}" inputmode="numeric" aria-label="${esc(n)} price"></div>`;
      body = `<h2 class="step-title" style="margin-top:30px">Shop Menu</h2>
        <p class="step-sub">What will you serve at your <b>CoFFeeNet</b> shop?</p>
        <div class="menu-card" style="position:relative">
          ${session.tips.rate ? `<div class="tip" style="right:4px;top:-6px"><button data-act="tip" data-t="rate" aria-label="Dismiss tip">✕</button>You can edit the rates</div>` : ""}
          ${session.tips.choose ? `<div class="tip" style="left:56px;top:150px"><button data-act="tip" data-t="choose" aria-label="Dismiss tip">✕</button>Choose items on your menu</div>` : ""}
          <h3>Hot Drinks</h3>${BASE_MENU.hot.map(row).join("")}
          ${w.others.map((o, k) => `<div class="mc-row"><input type="checkbox" data-oo="${k}" ${o.name ? "checked" : ""} aria-label="Serve other drink ${k + 1}"><span class="nm" style="gap:0"><input class="other" data-on="${k}" value="${esc(o.name)}" placeholder="Write drink name here"></span><span class="ils">₪</span><input class="rate" data-op="${k}" value="${esc(o.price)}" inputmode="numeric" aria-label="Other drink ${k + 1} price"></div>`).join("")}
        </div>`;
    } else if (step === 4) {
      body = `<h2 class="step-title" style="margin-top:30px">Shop Menu</h2>
        <p class="step-sub">Cold drinks &amp; extras</p>
        <div class="menu-card">
          <h3>Cold Drinks</h3>
          ${BASE_MENU.cold.map(([n]) => `<div class="mc-row"><input type="checkbox" data-ms="${esc(n)}" ${w.menuSel[n].on ? "checked" : ""} aria-label="Serve ${esc(n)}"><span class="nm">${esc(n)}</span><span class="ils">₪</span><input class="rate" data-mp="${esc(n)}" value="${w.menuSel[n].price}" inputmode="numeric" aria-label="${esc(n)} price"></div>`).join("")}
          <h3 style="margin-top:22px">Food &amp; Desserts</h3>
          ${Object.keys(w.food).map((n) => `<div class="mc-row"><input type="checkbox" data-fs="${esc(n)}" ${w.food[n].on ? "checked" : ""} aria-label="Serve ${esc(n)}"><span class="nm">${esc(n)}</span><span class="ils">₪</span><input class="rate" data-fp="${esc(n)}" value="${w.food[n].price}" inputmode="numeric" aria-label="${esc(n)} price"></div>`).join("")}
          <h3 style="margin-top:22px">Customizations</h3>
          <div class="check-col">
            <label class="check"><input type="checkbox" data-wsugar ${w.sugar ? "checked" : ""}> Sugar on request</label>
            ${["No Milk", "Thin Milk 1%", "Fat Milk 3%", "Soy Milk"].map((m) => `<label class="check"><input type="checkbox" data-milk="${m}" ${w.milks.includes(m) ? "checked" : ""}> ${m}</label>`).join("")}
          </div>
        </div>`;
    } else if (step === 5) {
      const day = (d) => `<label class="check"><input type="checkbox" data-day="${d}" ${w.dayList.includes(d) ? "checked" : ""} ${w.days !== "few" ? "disabled" : ""}> ${d}</label>`;
      body = `<h2 class="step-title">Opening hours</h2>
        <p style="font:500 15px/1 var(--f-head);margin:18px 0 12px">The shop will be open:</p>
        <div class="check-col">
          <label class="check"><input type="radio" name="days" value="everyday" ${w.days === "everyday" ? "checked" : ""}> Every day (Weekdays &amp; Weekend)</label>
          <label class="check"><input type="radio" name="days" value="weekdays" ${w.days === "weekdays" ? "checked" : ""}> Weekdays only</label>
          <label class="check"><input type="radio" name="days" value="few" ${w.days === "few" ? "checked" : ""}> Few days a week</label>
        </div>
        <div class="days">${["Sunday", "Tuesday", "Thursday", "Monday", "Wednesday", "Friday", "Saturday"].map(day).join("")}</div>
        <p style="font:500 15px/1 var(--f-head);margin:24px 0 12px">Opening hours:</p>
        <div class="hours">${["8:00-20:00", "8:00-12:00", "12:00-20:00"].map((h) => `<label class="check"><input type="checkbox" data-slot="${h}" ${w.slots.includes(h) ? "checked" : ""}> ${h}</label>`).join("")}</div>
        <div style="display:flex;gap:10px;align-items:center;margin-top:14px"><span class="check" style="cursor:default">Other</span><input class="input plain" data-w="otherHours" value="${esc(w.otherHours)}" placeholder="Set your shop’s opening hours"></div>`;
    } else {
      body = `<h2 class="step-title">Pick up instructions</h2>
        <p class="step-sub">How will customers collect their coffee?</p>
        <div class="check-col" style="margin-top:20px">
          <label class="check"><input type="radio" name="pick" value="door" ${w.pick === "door" ? "checked" : ""}> Pick up at my door</label>
          <input class="input plain" data-w="apt" value="${esc(w.apt)}" placeholder="Add apartment number here" aria-label="Apartment number">
          <label class="check"><input type="radio" name="pick" value="shop" ${w.pick === "shop" ? "checked" : ""}> Pick up at the shop address</label>
          <label class="check"><input type="radio" name="pick" value="other" ${w.pick === "other" ? "checked" : ""}> Other pick up instructions</label>
          <textarea class="input" id="w-note" data-w="note" placeholder="Write instructions here" aria-label="Pick up instructions">${esc(w.note)}</textarea>
        </div>`;
    }
    return screen("has-tabs", `
      ${titlebar("Open shop", { back: step > 1 ? `#/open/${step - 1}` : "#/seller" })}
      <div class="body" style="background:var(--beige)">
        ${bar}
        <div class="pad" style="padding-bottom:40px">${body}<p class="err" id="w-err" style="margin-top:10px"></p></div>
      </div>
      <div class="wizard-nav">
        ${step > 1 ? `<a class="link-btn" href="#/open/${step - 1}">${I.prev} Back</a>` : "<span></span>"}
        <button class="link-btn" data-act="wizard-next" data-step="${step}">${step === STEPS ? "Finish" : "Next"} ${I.next}</button>
      </div>
      ${tabbar("")}`);
  };

  R.congrats = () => screen("beige has-tabs", `
    <div class="body" style="display:flex;flex-direction:column;padding-bottom:0">
      <div class="pad" style="padding-top:110px;padding-left:40px;padding-right:40px">
        <h1 class="big-msg" style="font-size:26px">Congratulations!</h1>
        <p style="font:600 18px/1.55 var(--f-head);color:var(--ink);margin:30px 0 56px">You have successfully completed your registration as a Seller.</p>
        <p class="mid-msg" style="text-align:center;font-size:21px;margin:0 0 30px">Go ahead! Check out your new shop at <span style="color:var(--pink)">CoFFeeNet</span></p>
        <div style="text-align:center"><a class="btn btn-primary" style="font-size:16px;width:290px" href="#/cafe/mine">Go to your CoFFeeNet shop</a></div>
      </div>
      <div class="wave-down" style="flex:1;background:var(--white);margin-top:60px;position:relative">
        <svg viewBox="0 0 390 30" preserveAspectRatio="none" style="position:absolute;top:-29px;left:0;width:100%;height:30px"><path d="M0 14C60-4 110 2 160 12s110 14 170 4 50-12 60-10v30H0Z" fill="#fff"/></svg>
      </div>
    </div>
    ${tabbar("")}`);

  R.notfound = () => screen("has-tabs", `${appbar()}<div class="body"><p class="empty">We couldn’t find that page.<br><a href="#/home">Back home</a></p></div>${tabbar("")}`);

  /* ---------------- router ---------------- */
  function route() {
    closeModal(); stopMap();
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    const [name, a, b] = parts;
    const needsUser = !["", "splash", "welcome", "intro", "signin", "about", "page"].includes(name || "") || (name === "signin" && a === "welcome");
    if (needsUser && !S.user) { go("#/welcome"); return; }
    let html;
    switch (name) {
      case undefined: case "splash": html = R.splash(); break;
      case "welcome": html = R.welcome(); break;
      case "intro": html = R.intro(a); break;
      case "signin": html = R.signin(a); break;
      case "home": html = R.home(); break;
      case "map": html = R.map(a); break;
      case "cafe": html = R.cafe(a); break;
      case "order": html = R.order(a); break;
      case "review": html = R.review(); break;
      case "thanks": html = R.thanks(a); break;
      case "pay": html = R.pay(a); break;
      case "pickup": html = R.pickup(a); break;
      case "pin": html = R.pin(a); break;
      case "confirmed": html = R.confirmed(a); break;
      case "summary": html = R.summary(a); break;
      case "receipt": html = R.receipt(a); break;
      case "chat": html = R.chat(a); break;
      case "reviews": html = R.reviews(a); break;
      case "sale": html = R.sale(a); break;
      case "page": html = R.page(a); break;
      case "processing": html = session.paying === a ? R.processing() : R.summary(a); break;
      case "account": html = R.account(); break;
      case "payments": html = R.payments(); break;
      case "credit": html = R.credit(); break;
      case "popular": html = R.popular(); break;
      case "manage": html = R.manage(); break;
      case "about": html = R.about(); break;
      case "orders": html = R.orders(a); break;
      case "profile": html = R.profile(); break;
      case "inbox": html = R.inbox(a); break;
      case "favourites": html = R.favourites(); break;
      case "seller": html = R.seller(); break;
      case "open": html = R.open(a); break;
      case "congrats": html = R.congrats(); break;
      default: html = R.notfound();
    }
    app.innerHTML = html;
    const body = app.querySelector(".body"); if (body) body.scrollTop = 0;
    mount(name, a, b);
  }

  /* per-screen wiring that can't be done with click delegation */
  function mount(name, a, b) {
    if (name === "signin") mountAuth(a);
    if (name === "chat") mountChat(a);
    if (name === "account") mountAccount();
    if (name === "pin") mountPin(a);
    if (name === "manage" && S.myShop) document.getElementById("shop-open").addEventListener("change", (e) => { S.myShop.open = e.target.checked; if (S.myShop.open) S.nextSale = Date.now() + 8000; save(); refresh(); });
    if (name === "map") mountMap(a === "list" ? "list" : "map", a === "focus" ? b : null);
    if (name === "pay") mountPay(a);
    if (name === "open") mountWizard();
  }

  /* ---------- map ---------- */
  let liveMap = null, tripRaf = 0;
  const stopMap = () => { cancelAnimationFrame(tripRaf); if (liveMap) { liveMap.remove(); liveMap = null; } };

  function mountMap(view, focusId) {
    const st = { view, q: "", best: false, sel: cafeById(focusId) ? focusId : null, sheet: !!cafeById(focusId), mode: "walk", trip: null };
    const $ = (id) => document.getElementById(id);
    const sheet = $("map-sheet"), list = $("map-list"), q = $("q"), sug = $("map-sug"), veil = $("map-veil");
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const map = liveMap = CNMap.create($("map"), session.me.ll, 15);
    const matches = (c) => (!st.best || c.rating >= 4.7) && (!st.q || (c.name + " " + c.addr).toLowerCase().includes(st.q));
    const routeTo = (c) => CNMap.route(session.me.ll, c.ll, st.mode);

    const me = L.marker(session.me.ll, { icon: L.divIcon({ className: "me", html: `<img src="${IMG}pin-me.png" alt="">`, iconSize: [46, 68], iconAnchor: [23, 60] }), keyboard: false, interactive: false, zIndexOffset: 500 }).addTo(map);
    const line = L.polyline([], { className: "route", color: "#1d1d1f", weight: 2.5, dashArray: "5 5", interactive: false }).addTo(map);
    const pins = new Map();
    let callout = null;

    allCafes().forEach((c) => {
      const m = L.marker(c.ll, { icon: L.divIcon({ className: "pin", html: I.pinCup, iconSize: [40, 40] }), keyboard: true, riseOnHover: true }).addTo(map);
      const el = m.getElement();
      el.setAttribute("role", "button");
      const press = () => { if (st.trip) return; if (st.sel === c.id) { st.sheet = true; draw(true); } else pick(c.id); };
      m.on("click", press);
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); press(); } });
      pins.set(c.id, m);
    });

    function pick(id, sheetToo) { st.sel = id; st.sheet = !!sheetToo; st.mode = "walk"; hideSug(); draw(true); }
    function clear() { if (st.trip) return; if (st.sheet) st.sheet = false; else st.sel = null; draw(false); }

    function frame(r) {
      const b = L.latLngBounds(r.pts);
      const small = map.getSize().y < 560, opt = { paddingTopLeft: [small ? 30 : 46, small ? 118 : 140], paddingBottomRight: [small ? 70 : 84, st.sheet ? (small ? 150 : 220) : 64], maxZoom: 17, animate: !calm };
      map.fitBounds(b, opt);
    }

    const modeBtn = (k, label) => `<button data-mode="${k}" aria-pressed="${st.mode === k}" aria-label="${label}">${I[k]}</button>`;

    function draw(reframe) {
      if (liveMap !== map) return;
      const sel = st.sel && cafeById(st.sel);
      const r = sel ? routeTo(sel) : null;
      pins.forEach((m, id) => {
        const c = cafeById(id), el = m.getElement();
        el.classList.toggle("active", st.sel === id);
        el.classList.toggle("dim", !matches(c));
        el.classList.toggle("is-closed", !c.open);
        el.setAttribute("aria-label", `${c.name}, ${c.addr}, ${c.km} km, ${c.open ? "open" : "closed"}`);
        m.setZIndexOffset(st.sel === id ? 400 : 0);
      });
      line.setLatLngs(r ? r.pts : []);
      if (callout) { callout.remove(); callout = null; }
      if (sel && !st.sheet) {
        callout = L.marker(sel.ll, {
          icon: L.divIcon({ className: "callout", iconSize: [150, 48], iconAnchor: [75, 76],
            html: `<button type="button" aria-label="${esc(sel.name)}: open details">${sel.best ? `<img src="${IMG}btn-best.png" alt="">` : ""}<span class="n"><b>${esc(sel.name)}</b><i>${sel.km} km</i></span><span class="s">${I.star}<i>${sel.rating.toFixed(1)}</i></span></button>` }),
          keyboard: false, zIndexOffset: 900,
        }).addTo(map);
        callout.on("click", () => { st.sheet = true; draw(true); });
      }
      veil.hidden = !(sel && st.sheet && !st.trip);
      $("map-screen").classList.toggle("has-sheet", !!(sel && st.sheet));
      if (sel && st.sheet && r) {
        const est = r.mode === "walk" ? "" : "about ";
        sheet.hidden = false;
        sheet.innerHTML = `
          <div class="modes" role="group" aria-label="How are you getting there?" ${st.trip ? "hidden" : ""}>${modeBtn("walk", "Walk")}${modeBtn("car", "Drive")}${modeBtn("bus", "Bus")}</div>
          <div class="eta">
            <span class="ic">${I[r.mode]}</span>
            <span class="v" id="eta-min">${est}<b>${r.min}</b> min</span>
            <span class="v" id="eta-km"><b>${r.km.toFixed(1)}</b> km</span>
            <button id="trip" aria-label="${st.trip ? "Stop" : "Preview the route"}">${st.trip ? I.stop : I.nav}</button>
          </div>
          <div class="shop">
            ${avatar(sel, 52)}
            <div class="a"><b>${esc(sel.name)}</b><span>${esc(sel.addr)}</span><span>${sel.km} km</span></div>
            <div class="b"><span class="rt">${sel.rating.toFixed(1)} ${[1, 2, 3, 4, 5].map((k) => I.starC(sel.rating >= k - 0.25 ? "#60032E" : "#dcd5d5")).join("")}</span>${reviewCount(sel) ? `<i>${reviewCount(sel)} Reviews</i>${quoteOf(sel) ? `<i class="q">“${esc(quoteOf(sel))}”</i>` : ""}` : "<i>No reviews yet</i>"}</div>
            <a class="go" href="#/cafe/${sel.id}">Go to<br>shop</a>
          </div>`;
        sheet.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => {
          st.mode = b.dataset.mode; draw(true);
          const again = sheet.querySelector(`[data-mode="${st.mode}"]`); if (again) again.focus();
        }));
        $("trip").addEventListener("click", () => (st.trip ? endTrip() : startTrip(sel, r)));
      } else { sheet.hidden = true; sheet.innerHTML = ""; }
      if (r && reframe && st.view === "map") frame(r);

      const rows = allCafes().filter(matches).sort((x, y) => x.km - y.km);
      list.hidden = st.view !== "list";
      $("venue-rows").innerHTML = rows.length
        ? rows.map((c) => `<div class="venue row">${c.best ? `<img class="badge-best" src="${IMG}btn-best.png" alt="Top rated">` : ""}${avatar(c)}<div class="info"><div class="name">${esc(c.name)} <span>| ${esc(c.addr)}</span></div><div class="meta"><span>${c.km} km</span><span class="stars">${c.rating.toFixed(1)} ${I.star}</span></div></div><a class="go" href="#/cafe/${c.id}" aria-label="Go to ${esc(c.name)}">Go to<br>shop</a></div>`).join("")
        : `<p class="empty">No coffee shops match${st.q ? ` “${esc(st.q)}”` : " this filter"}.<br><br><button class="btn btn-primary btn-sm" id="clear-f">Show all shops</button></p>`;
      const cf = $("clear-f"); if (cf) cf.addEventListener("click", () => { st.q = ""; q.value = ""; st.best = false; draw(); });
      app.querySelectorAll('[data-act="view"]').forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === st.view)));
      app.querySelector('[data-act="best"]').setAttribute("aria-pressed", String(st.best));
    }

    /* walk the pin along the route so people can see the way before they leave */
    function startTrip(sel, r) {
      st.trip = { home: session.me.ll };
      draw(false);
      const seg = [0]; for (let i = 1; i < r.pts.length; i++) seg.push(seg[i - 1] + CNMap.dist(r.pts[i - 1], r.pts[i]));
      const total = seg[seg.length - 1], dur = calm ? 0 : Math.min(9000, Math.max(3500, total * 6)), t0 = performance.now();
      const step = (now) => {
        if (liveMap !== map || !st.trip) return;
        const f = dur ? Math.min(1, (now - t0) / dur) : 1, d = f * total;
        let i = 1; while (i < seg.length - 1 && seg[i] < d) i++;
        const a = r.pts[i - 1], b = r.pts[i] || a, k = seg[i] > seg[i - 1] ? (d - seg[i - 1]) / (seg[i] - seg[i - 1]) : 1, p = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
        me.setLatLng(p); line.setLatLngs([p, ...r.pts.slice(i)]);
        $("eta-min").innerHTML = `<b>${Math.max(f < 1 ? 1 : 0, Math.ceil(r.min * (1 - f)))}</b> min`;
        $("eta-km").innerHTML = `<b>${(r.km * (1 - f)).toFixed(1)}</b> km`;
        if (f < 1) tripRaf = requestAnimationFrame(step);
        else { snack(`You’ve arrived at ${sel.name}`); tripRaf = 0; setTimeout(() => { if (st.trip && liveMap === map) endTrip(); }, 1800); }
      };
      tripRaf = requestAnimationFrame(step);
    }
    function endTrip() { cancelAnimationFrame(tripRaf); me.setLatLng(st.trip.home); st.trip = null; draw(true); }

    function setMe(ll, label) {
      session.me = { ll, label }; refreshKm();
      me.setLatLng(ll); q.placeholder = label ? `Near ${label}` : "Near your location";
      draw(!!st.sel);
      if (!st.sel) map.setView(ll, Math.max(map.getZoom(), 15.5), { animate: !calm });
    }

    /* ---- search: shops first, then streets ---- */
    const hideSug = () => { sug.hidden = true; sug.innerHTML = ""; q.setAttribute("aria-expanded", "false"); };
    function suggest() {
      const s = q.value.trim().toLowerCase();
      if (s.length < 2) return hideSug();
      const shops = allCafes().filter((c) => (c.name + " " + c.addr).toLowerCase().includes(s)).sort((x, y) => x.km - y.km).slice(0, 3);
      const streets = CNMap.searchStreets(s, 4);
      sug.innerHTML = shops.map((c) => `<button type="button" data-shop="${c.id}">${I.cupSm}<span><b>${esc(c.name)}</b> ${esc(c.addr)}</span><i>${c.km} km</i></button>`).join("")
        + streets.map((n) => `<button type="button" data-street="${esc(n)}">${I.pinSm}<span>${esc(n)}</span><i>Street</i></button>`).join("")
        || `<p>No shop or street called “${esc(q.value.trim())}” around here.</p>`;
      sug.hidden = false; q.setAttribute("aria-expanded", "true");
    }
    function choose(b) {
      if (b.dataset.shop) { st.q = ""; q.value = ""; if (st.view === "list") setView("map"); pick(b.dataset.shop); }
      else {
        const n = b.dataset.street, p = CNMap.streetPoint(n, session.me.ll);
        st.q = ""; q.value = ""; hideSug();
        if (p) { st.sel = null; st.sheet = false; setMe(p, n.replace(/^Sderot /, "")); snack(`Showing coffee near ${n.replace(/^Sderot /, "")}`); }
      }
      q.blur();
    }
    q.addEventListener("input", () => { st.q = allCafes().some((c) => (c.name + " " + c.addr).toLowerCase().includes(q.value.trim().toLowerCase())) ? q.value.trim().toLowerCase() : ""; suggest(); draw(); });
    q.addEventListener("keydown", (e) => { if (e.key === "Escape") { hideSug(); } else if (e.key === "ArrowDown" && !sug.hidden) { e.preventDefault(); const f = sug.querySelector("button"); f && f.focus(); } });
    sug.addEventListener("keydown", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      if (e.key === "ArrowDown") { e.preventDefault(); (b.nextElementSibling || b).focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); (b.previousElementSibling || q).focus(); }
      if (e.key === "Escape") { hideSug(); q.focus(); }
    });
    sug.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) choose(b); });
    $("map-search").addEventListener("submit", (e) => { e.preventDefault(); if (q.value.trim().length >= 2) { suggest(); const f = sug.querySelector("button"); if (f) choose(f); } else q.focus(); });

    map.on("click", () => { if (!sug.hidden) hideSug(); else clear(); });
    veil.addEventListener("click", clear);

    const setView = (v) => { st.view = v; history.replaceState(null, "", v === "list" ? "#/map/list" : "#/map"); draw(); if (v === "map") map.invalidateSize(); };
    app.querySelectorAll('[data-act="view"]').forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); hideSug(); setView(b.dataset.v); }));
    app.querySelector('[data-act="best"]').addEventListener("click", (e) => {
      e.stopPropagation(); st.best = !st.best;
      if (st.best && st.sel && !matches(cafeById(st.sel))) { st.sel = null; st.sheet = false; }
      snack(st.best ? "Showing top-rated shops (4.7★+)" : "Showing all shops"); draw();
      if (st.best && !st.sel) map.fitBounds(L.latLngBounds([session.me.ll, ...allCafes().filter(matches).map((c) => c.ll)]), { paddingTopLeft: [46, 130], paddingBottomRight: [84, 50], animate: !calm });
    });
    app.querySelector('[data-act="locate"]').addEventListener("click", (e) => {
      e.stopPropagation(); if (st.trip) return;
      const demo = (msg) => { if (liveMap !== map) return; setMe(HOME, ""); map.setView(HOME, 15.5, { animate: !calm }); snack(msg); };
      if (!navigator.geolocation) return demo("Location is off. Using central Tel Aviv");
      navigator.geolocation.getCurrentPosition(
        (p) => { const ll = [p.coords.latitude, p.coords.longitude]; if (!CNMap.inside(ll)) return demo("You’re not in Tel Aviv. Showing a demo spot"); if (liveMap !== map) return; setMe(ll, ""); map.setView(ll, 16, { animate: !calm }); },
        () => demo("Location is off. Using central Tel Aviv"), { timeout: 6000, maximumAge: 60000 });
    });

    draw(!!st.sel);
    requestAnimationFrame(() => { if (liveMap === map) { map.invalidateSize(); draw(!!st.sel); } });
  }

  /* ---------- payment ---------- */
  function mountPay(no) {
    const form = document.getElementById("pay-form"), o = orderByNo(no);
    if (!form || !o) return;
    const $ = (id) => document.getElementById(id), fields = $("card-fields"), err = $("pay-err"), cc = $("cc"), exp = $("exp"), credit = $("use-credit"), saved = $("saved");
    const due = () => Math.max(0, o.total - (credit && credit.checked ? Math.min(S.credit, o.total) : 0));
    const paint = () => {
      const d = due();
      fields.hidden = form.method.value !== "card"; $("methods").hidden = d === 0; err.textContent = "";
      if (saved) $("new-card").hidden = saved.checked;
      $("pay-btn").textContent = d === 0 ? "Pay with account credit" : `Pay NIS  ${d.toFixed(2)}`;
    };
    form.addEventListener("change", paint); if (credit) credit.addEventListener("change", paint);
    cc.addEventListener("input", () => { cc.value = cc.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1  "); });
    exp.addEventListener("input", () => { const d = exp.value.replace(/\D/g, "").slice(0, 4); exp.value = d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; });
    $("fill-demo").addEventListener("click", () => { cc.value = "1234  5678  9101  1121"; exp.value = "12/30"; $("cvv").value = "123"; err.textContent = ""; });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const used = Math.round((o.total - due()) * 100) / 100;
      if (due() === 0) return pay(no, "credit", { credit: used });
      const m = form.method.value;
      if (m !== "card") return pay(no, m, { credit: used });
      if (saved && saved.checked) { session.pay = { no: String(no), credit: used, last4: S.card.last4 }; go(`#/pin/${no}`); return; }
      const digits = cc.value.replace(/\D/g, ""), [mm, yy] = exp.value.split("/").map(Number), end = new Date(2000 + (yy || 0), mm || 0, 1);
      if (digits.length < 12) { err.textContent = "Please enter a valid card number."; cc.focus(); return; }
      if (!mm || mm > 12 || !yy) { err.textContent = "Please enter the expiration date as MM/YY."; exp.focus(); return; }
      if (end <= new Date()) { err.textContent = "This card has expired."; exp.focus(); return; }
      if (!/^\d{3,4}$/.test($("cvv").value)) { err.textContent = "Please enter the 3-digit CVV."; $("cvv").focus(); return; }
      session.pay = { no: String(no), credit: used, last4: digits.slice(-4), keep: $("keep").checked ? { last4: digits.slice(-4), exp: exp.value } : null };
      go(`#/pin/${no}`);
    });
  }

  /* ---------- seller wizard ---------- */
  function mountWizard() {
    const w = wizardDraft();
    app.addEventListener("input", onW); app.addEventListener("change", onW);
    function onW(e) {
      const t = e.target;
      if (!t.closest || !t.closest(".screen")) return;
      if (t.dataset.w) w[t.dataset.w] = t.value;
      if (t.dataset.ms) w.menuSel[t.dataset.ms].on = t.checked;
      if (t.dataset.mp) { w.menuSel[t.dataset.mp].price = t.value.replace(/\D/g, ""); }
      if (t.dataset.fs) w.food[t.dataset.fs].on = t.checked;
      if (t.dataset.fp) w.food[t.dataset.fp].price = t.value.replace(/\D/g, "");
      if (t.name === "pick") w.pick = t.value;
      if (t.dataset.on !== undefined) { w.others[t.dataset.on].name = t.value; const box = app.querySelector(`[data-oo="${t.dataset.on}"]`); if (box) box.checked = !!t.value.trim(); }
      if (t.dataset.op !== undefined) w.others[t.dataset.op].price = t.value.replace(/\D/g, "");
      if (t.dataset.oo !== undefined && !t.checked) { w.others[t.dataset.oo].name = ""; const inp = app.querySelector(`[data-on="${t.dataset.oo}"]`); if (inp) inp.value = ""; }
      if ("wsugar" in t.dataset) w.sugar = t.checked;
      if (t.dataset.milk) w.milks = t.checked ? [...new Set([...w.milks, t.dataset.milk])] : w.milks.filter((m) => m !== t.dataset.milk);
      if (t.name === "days") { w.days = t.value; app.querySelectorAll("[data-day]").forEach((d) => (d.disabled = t.value !== "few")); }
      if (t.dataset.day) w.dayList = t.checked ? [...new Set([...w.dayList, t.dataset.day])] : w.dayList.filter((d) => d !== t.dataset.day);
      if (t.dataset.slot) w.slots = t.checked ? [...new Set([...w.slots, t.dataset.slot])] : w.slots.filter((s) => s !== t.dataset.slot);
    }
    // listeners are attached to #app, so drop them on the next navigation
    window.addEventListener("hashchange", () => { app.removeEventListener("input", onW); app.removeEventListener("change", onW); }, { once: true });
  }

  function wizardNext(step) {
    const w = wizardDraft(), err = document.getElementById("w-err");
    const fail = (m) => { err.textContent = m; return false; };
    if (step === 1 && (!w.name.trim() || !w.addr.trim())) return fail("Please fill in your shop name and address.");
    if (step === 1 && !CNMap.findStreet(w.addr)) return fail("We couldn’t find that street in central Tel Aviv. Try one like Gordon 15.");
    if (step === 3) {
      const any = BASE_MENU.hot.some(([n]) => w.menuSel[n].on) || w.others.some((o) => o.name.trim());
      if (!any) return fail("Choose at least one drink for your menu.");
      if (w.others.some((o) => o.name.trim() && !Number(o.price))) return fail("Please add a price for your custom drinks.");
    }
    if (step === 5) {
      if (w.days === "few" && !w.dayList.length) return fail("Pick the days your shop will be open.");
      if (!w.slots.length && !w.otherHours.trim()) return fail("Choose your opening hours.");
    }
    if (step === STEPS && w.pick === "door" && !w.apt.trim()) return fail("Add your apartment number so customers can find you.");
    if (step === STEPS && w.pick === "other" && !w.note.trim()) return fail("Write your pick up instructions.");
    if (step < STEPS) { go(`#/open/${step + 1}`); return true; }
    publishShop(w);
    return true;
  }

  function publishShop(w) {
    const hot = [...BASE_MENU.hot.filter(([n]) => w.menuSel[n].on).map(([n]) => [n, Number(w.menuSel[n].price) || 0]), ...w.others.filter((o) => o.name.trim()).map((o) => [o.name.trim(), Number(o.price) || 0])];
    const cold = BASE_MENU.cold.filter(([n]) => w.menuSel[n].on).map(([n]) => [n, Number(w.menuSel[n].price) || 0]);
    const dayTxt = w.days === "everyday" ? "Every day" : w.days === "weekdays" ? "Sunday - Thursday" : w.dayList.join(", ");
    const hrs = [...w.slots, w.otherHours.trim()].filter(Boolean).join(", ");
    const was = S.myShop;
    S.myShop = {
      ...w, id: "mine", name: w.name.trim(), addr: w.addr.trim(), km: 0.1, rating: 5.0, open: true, img: DB.current === DEMO ? "av-liat.png" : "av-cupicon.svg", photo: S.user.photo || undefined, orders: 0, reviews: [],
      menu: { hot, cold, food: Object.entries(w.food).filter(([, f]) => f.on).map(([n, f]) => [n, Number(f.price) || 0]) }, hours: [`${dayTxt} ${hrs}`],
      note: w.pick === "door" ? `Hi! Please pick up your order at my door, apartment ${w.apt.trim()}.` : w.pick === "shop" ? `Hi! Please pick up your order at ${w.addr.trim()}.` : w.note.trim(), blurb: w.blurb.trim(),
    };
    if (was) Object.assign(S.myShop, { orders: was.orders || 0, reviews: was.reviews || [], rating: was.rating, open: was.open });
    placeCafe(S.myShop); refreshKm();
    session.wizard = null;
    save();
    if (was) { go("#/cafe/mine"); snack("Your shop was updated"); } else go("#/congrats");
  }

  /* ---------- order lifecycle ----------
     Other people are simulated. Every step is time-stamped, so orders keep moving after a reload. */
  const T = { confirm: 4500, prepare: 9000, pay: 4000, pickup: 7000 };
  function note(from, text, href, popup) {
    S.notes.unshift({ id: Date.now() + Math.random(), from, text, href, d: today(), read: false });
    S.notes = S.notes.slice(0, 40);
    if (popup) pushNotification(popup[0], popup[1], href);
  }
  function submitOrder() {
    const items = cartItems().map((i) => ({ ...i }));
    if (!items.length) return;
    const no = Math.max(10343, ...S.orders.map((o) => o.no), ...S.sales.map((o) => o.no)) + 1;
    S.orders.push({ no, cafe: session.cartCafe, date: today(), items, total: cartTotal(), status: "pending", t: { pending: Date.now() } });
    S.carts[session.cartCafe] = {}; session.cartCafe = null; save();
    go(`#/thanks/${no}`);
  }
  function cancelOrder(no) {
    confirmBox("Cancel this order?", "The seller will be told right away.", "Cancel it", () => {
      const o = orderByNo(no);
      if (!o || !["pending", "confirmed"].includes(o.status)) return;
      o.status = "cancelled"; note(cafeById(o.cafe)?.name || "CoFFeeNet", `Your order #${no} was cancelled`, `#/summary/${no}`); save();
      if (location.hash === `#/summary/${no}`) route(); else go(`#/summary/${no}`);
    }, "Keep it");
  }
  function reorder(no) {
    const o = orderByNo(no), c = o && cafeById(o.cafe);
    if (!c) return;
    if (!c.open) { snack(`${c.name} is closed right now`); return; }
    const menu = menuOf(c), price = Object.fromEntries([...menu.hot, ...menu.cold, ...(menu.food || [])]);
    session.cartCafe = c.id;
    S.carts[c.id] = Object.fromEntries(o.items.filter((i) => price[i.name] != null).map((i) => [i.name, { ...i, price: price[i.name] }]));
    save(); go(cartItems().length ? "#/review" : `#/order/${c.id}`);
  }
  function pay(no, method, opt) {
    const o = orderByNo(no);
    if (!o || o.status !== "confirmed") return;
    session.paying = String(no); go(`#/processing/${no}`);
    setTimeout(() => {
      session.paying = null; session.pay = null;
      if (o.status !== "confirmed") return;
      if (opt.credit) { o.creditUsed = opt.credit; S.credit = Math.round((S.credit - opt.credit) * 100) / 100; S.ledger.push({ d: today(), text: `Order #${no}`, amount: -opt.credit }); }
      o.status = "paid"; o.t.paid = Date.now(); o.paidWith = method; o.last4 = opt.last4 || "";
      if (opt.keep) S.card = opt.keep;
      const c = cafeById(o.cafe);
      note(c?.name || "CoFFeeNet", `Your order #${no} is confirmed`, `#/summary/${no}`);
      save(); location.replace(`#/confirmed/${no}`);
    }, 1900);
  }
  const FAKE = ["Ofer", "Shira", "Nir", "Talia", "Keren", "Oded", "Lilach", "Yaron"];
  function newSale() {
    const m = S.myShop.menu, all = [...m.hot, ...m.cold, ...(m.food || [])];
    if (!all.length) return;
    const n = S.sales.length, picks = [all[n % all.length], ...(n % 2 && all.length > 1 ? [all[(n + 1) % all.length]] : [])];
    const items = picks.map(([name, price], k) => ({ name, price, qty: k ? 1 : 1 + (n % 3 === 2 ? 1 : 0), sugar: k ? 0 : n % 3, milk: "" }));
    const no = Math.max(10343, ...S.orders.map((o) => o.no), ...S.sales.map((o) => o.no)) + 1, who = FAKE[n % FAKE.length];
    S.sales.push({ no, who, date: today(), items, total: items.reduce((s, i) => s + i.qty * i.price, 0), status: "new", t: { new: Date.now() } });
    note(who, `You have a new order #${no}`, `#/sale/${no}`, ["You have a new order!", `${who} is waiting for you to confirm`]);
  }
  function tick() {
    if (!S.user) return;
    const now = Date.now(); let moved = false;
    for (const o of S.orders) {
      const c = cafeById(o.cafe), nm = c ? c.name : "CoFFeeNet";
      if (o.status === "pending" && now - (o.t.pending || 0) > T.confirm) {
        o.status = "confirmed"; o.t.confirmed = now; moved = true;
        note(nm, `Your order #${o.no} was accepted, complete the payment`, `#/pay/${o.no}`, ["Great! Your order has been confirmed.", "Go ahead and complete the payment"]);
      } else if (o.status === "paid" && now - (o.t.paid || 0) > T.prepare) {
        o.status = "ready"; o.t.ready = now; moved = true;
        note(nm, `Your order #${o.no} is ready`, `#/pickup/${o.no}`, ["Your order is ready!", "See instructions for pick up"]);
      }
    }
    if (S.myShop) {
      for (const x of S.sales) {
        if (x.status === "await" && now - x.t.await > T.pay) {
          x.status = "standing"; x.t.standing = now; moved = true;
          note(x.who, `Paid for order #${x.no}`, `#/sale/${x.no}`, [`${x.who} paid for order #${x.no}`, "Time to make the coffee"]);
        } else if (x.status === "ready" && now - x.t.ready > T.pickup) {
          x.status = "done"; moved = true;
          S.credit = Math.round((S.credit + x.total) * 100) / 100; S.ledger.push({ d: today(), text: `Sale #${x.no} to ${x.who}`, amount: x.total });
          S.myShop.orders = (S.myShop.orders || 0) + 1;
          if (S.myShop.orders % 2 === 1) {
            (S.myShop.reviews = S.myShop.reviews || []).unshift({ by: x.who, stars: S.myShop.orders % 4 === 3 ? 4 : 5, text: QUOTES[S.myShop.orders % QUOTES.length] });
            note(x.who, `${x.who} left a shop review`, "#/reviews/mine");
          }
          S.myShop.rating = ratingOf(S.myShop);
          pushNotification(`${x.who} picked up order #${x.no}`, `${ils(x.total)} added to your account credit`, "#/credit");
        }
      }
      if (S.myShop.open) {
        if (!S.nextSale) { S.nextSale = now + 12000; moved = true; }
        else if (now > S.nextSale && S.sales.filter((x) => x.status === "new").length < 3) { newSale(); S.nextSale = now + 50000; moved = true; }
      }
    }
    if (moved) { save(); refresh(); }
  }
  // redraw screens that show live status, without stealing focus or scroll position
  function refresh() {
    if (!/^#\/(orders|home|inbox|summary|manage|sale|profile|credit)/.test(location.hash) || overlayRoot.innerHTML) return;
    const b = app.querySelector(".body"), top = b ? b.scrollTop : 0;
    route();
    const s = app.querySelector(".screen"), n = app.querySelector(".body");
    if (s) s.style.animation = "none";
    if (n) n.scrollTop = top;
  }

  function confirmBox(title, text, yes, fn, no = "Cancel") {
    modal(`<div class="sheet wide" role="alertdialog" aria-label="${esc(title)}">
        <h3 style="margin-top:6px">${title}</h3><p style="font:400 14px/1.5 var(--f-head);margin:0 0 18px">${text}</p>
        <div class="btns"><button class="btn btn-outline" style="width:110px" data-c="no">${no}</button><button class="btn btn-primary" style="width:110px" data-c="yes">${yes}</button></div>
      </div>`, (wrap) => wrap.addEventListener("click", (e) => {
      const c = e.target.closest("[data-c]")?.dataset.c;
      if (c) closeModal();
      if (c === "yes") fn();
    }));
  }
  function editAccount(k) {
    const label = { name: "Name", email: "E-mail", phone: "Mobile Number" }[k];
    modal(`<form class="sheet wide" role="dialog" aria-label="Edit ${label}" novalidate>
        <h3 style="margin-top:6px">${label}</h3><input class="input plain" name="v" value="${esc(S.user[k] || "")}" aria-label="${label}" ${k === "email" ? 'type="email"' : k === "phone" ? 'type="tel"' : ""}>
        <p class="err" role="alert"></p><div class="btns"><button type="button" class="btn btn-outline" data-c="no">Cancel</button><button class="btn btn-primary">Save</button></div>
      </form>`, (wrap) => {
      const f = wrap.querySelector("form"), err = wrap.querySelector(".err");
      wrap.querySelector('[data-c="no"]').addEventListener("click", closeModal);
      f.addEventListener("submit", (e) => {
        e.preventDefault();
        const v = f.v.value.trim();
        if (k === "name" && v.length < 2) { err.textContent = "Please enter your name."; return; }
        if (k === "email" && !isEmail(v)) { err.textContent = "Please enter a valid e-mail."; return; }
        if (k === "phone" && v && !/^[+\d][\d\s-]{7,}$/.test(v)) { err.textContent = "Please enter a valid number."; return; }
        if (k === "email" && DB.current !== DEMO) {
          const ne = v.toLowerCase();
          if (ne !== DB.current && DB.accounts[ne]) { err.textContent = "That e-mail already has an account."; return; }
          if (ne !== DB.current) { err.textContent = ""; DB.accounts[ne] = { ...DB.accounts[DB.current], rehash: true }; delete DB.accounts[DB.current]; DB.current = ne; snack("Saved. Choose a new password next time you sign in"); }
        }
        S.user[k] = v; save(); closeModal(); route();
      });
      f.v.focus();
    });
  }
  function saveReceipt(no) {
    const o = orderByNo(no), c = cafeById(o.cafe) || { name: "Coffee shop", addr: "" };
    const txt = ["CoFFeeNet receipt (demo, no payment was made)", "", c.name, c.addr + ", Tel-Aviv", `Order No. ${o.no}   ${fmtDate(o.date)}`, "", ...o.items.map((i) => `${i.qty} x ${i.name}   ${ils(i.price * i.qty)}`), "", `Total   ${ils(o.total)}`].join("\n");
    if (window.self !== window.top) {
      const done = () => snack("Receipt copied"), no2 = () => snack("Copying is blocked here. Open the app on its own page");
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, no2); else no2();
      return;
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([txt], { type: "text/plain" })); a.download = `CoFFeeNet-receipt-${o.no}.txt`;
    a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); snack("Receipt saved");
  }
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  function mountAuth(mode) {
    const err = document.getElementById("auth-err"), $ = (id) => document.getElementById(id);
    if (mode === "join") $("join").addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = e.target, v = (k) => f[k].value.trim(), bad = (m, k) => { err.textContent = m; f[k].focus(); };
      if (!v("first")) return bad("Please enter your first name.", "first");
      if (!v("last")) return bad("Please enter your last name.", "last");
      const email = v("email").toLowerCase();
      if (!isEmail(email)) return bad("Please enter a valid e-mail address.", "email");
      if (DB.accounts[email]) return bad("That e-mail already has an account. Sign in instead.", "email");
      if (f.pw.value.length < 6) return bad("Choose a password with at least 6 characters.", "pw");
      if (f.pw.value !== f.pw2.value) return bad("The passwords don’t match.", "pw2");
      DB.accounts[email] = { hash: await digest(email, f.pw.value), data: blank(`${v("first")} ${v("last")}`, email) };
      DB.current = email; S = DB.accounts[email].data; session.cartCafe = null; session.wizard = null;
      S.notes.push({ id: 1, from: "CoFFeeNet", text: "Welcome! We added ₪30.00 to your credit", href: "#/credit", d: today(), read: false });
      refreshKm(); save(); go("#/signin/welcome");
    });
    else if (mode === "forgot") $("forgot").addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = e.target, email = f.email.value.trim().toLowerCase(), acc = DB.accounts[email];
      if (!acc || email === DEMO) { err.textContent = "We don’t have an account with that e-mail on this device."; return; }
      if (f.pw.value.length < 6) { err.textContent = "Choose a password with at least 6 characters."; return; }
      acc.hash = await digest(email, f.pw.value); delete acc.rehash; openAccount(email);
    });
    else if ($("auth")) $("auth").addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = e.target, email = f.email.value.trim().toLowerCase(), pw = f.password.value;
      if (!email || !pw) { err.textContent = "Please enter your e-mail and password."; return; }
      const acc = DB.accounts[email];
      if (email === DEMO) return openDemo();
      if (!acc) { err.textContent = "No account with that e-mail yet. Join, or try the demo account."; return; }
      if (acc.rehash) { go("#/signin/forgot"); return; }
      if (acc.hash !== await digest(email, pw)) { err.textContent = "That password isn’t right. Try again or reset it."; return; }
      openAccount(email);
    });
  }

  function mountChat(id) {
    const c = cafeById(id), box = document.getElementById("chat"), form = document.getElementById("chat-form");
    if (!form) return;
    box.scrollTop = box.scrollHeight;
    const at = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const add = (m) => { (S.threads[id] = S.threads[id] || []).push(m); S.threads[id] = S.threads[id].slice(-60); save(); };
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inp = document.getElementById("chat-in"), text = inp.value.trim();
      if (!text) return;
      add({ me: true, text, at: at() });
      const who = S;
      setTimeout(() => {
        if (S !== who) return;
        const q = text.toLowerCase(), o = [...S.orders].reverse().find((x) => x.cafe === id && !["completed", "cancelled"].includes(x.status));
        const reply = /where|address|find|door|floor|apt/.test(q) ? (c.note || `We’re at ${c.addr}. Ring the bell and I’ll come down.`)
          : /hour|open|close|when.*open|until/.test(q) ? `${c.open ? "We’re open now." : "We’re closed right now."} ${(c.hours || ["Sunday - Thursday 07:00-12:00", "Friday 08:00-13:00"]).join(". ")}`
          : /ready|order|long|status|wait/.test(q) ? (o ? `Order #${o.no}: ${ST[o.status].toLowerCase()}.` : "You don’t have an open order with me. Want to place one?")
          : /milk|soy|sugar|oat/.test(q) ? "Sure, choose milk and sugar when you review your order and I’ll make it that way."
          : /thank|great|love|delicious/.test(q) ? "So glad! See you next time." : /^(hi|hey|hello|shalom)/.test(q) ? "Hi! What can I make you today?" : "Got it, thanks for letting me know!";
        add({ me: false, text: reply, at: at() });
        if (location.hash === `#/chat/${id}`) { route(); const s = app.querySelector(".screen"); if (s) s.style.animation = "none"; document.getElementById("chat-in").focus(); }
        else { note(c.name, "You have a new message", `#/chat/${id}`, [c.name, reply]); save(); }
      }, 1400);
      route(); const s = app.querySelector(".screen"); if (s) s.style.animation = "none";
      document.getElementById("chat-in").focus();
    });
  }

  function mountAccount() {
    app.querySelectorAll("[data-pref]").forEach((b) => b.addEventListener("change", () => { S.user[b.dataset.pref] = b.checked; save(); snack("Saved"); }));
    document.getElementById("photo").addEventListener("change", (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const img = new Image();
      img.onload = () => {
        const n = 160, k = Math.min(img.width, img.height), cv = document.createElement("canvas"); cv.width = cv.height = n;
        cv.getContext("2d").drawImage(img, (img.width - k) / 2, (img.height - k) / 2, k, k, 0, 0, n, n);
        S.user.photo = cv.toDataURL("image/jpeg", 0.82); if (S.myShop) S.myShop.photo = S.user.photo;
        URL.revokeObjectURL(img.src); save(); route();
      };
      img.onerror = () => snack("That file isn’t a picture we can read");
      img.src = URL.createObjectURL(f);
    });
  }

  function mountPin(no) {
    const form = document.getElementById("pin-form");
    if (!form) return;
    const b = [...form.querySelectorAll("input")];
    b.forEach((x, i) => {
      x.addEventListener("input", () => { x.value = x.value.replace(/\D/g, ""); if (x.value && b[i + 1]) b[i + 1].focus(); });
      x.addEventListener("keydown", (e) => { if (e.key === "Backspace" && !x.value && b[i - 1]) b[i - 1].focus(); });
      x.addEventListener("paste", (e) => { const t = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 4); if (t.length > 1) { e.preventDefault(); [...t].forEach((d, k) => { if (b[k]) b[k].value = d; }); (b[t.length] || b[3]).focus(); } });
    });
    b[0].focus();
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (b.some((x) => !x.value)) { document.getElementById("pin-err").textContent = "Enter all four digits."; b.find((x) => !x.value).focus(); return; }
      const p = session.pay; pay(no, "card", p);
    });
  }

  function customize(name) {
    const it = session.cart[name];
    const draft = { sugar: it.sugar || 0, milk: it.milk || "" };
    const milks = ["No Milk", "Thin Milk 1%", "Fat Milk 3%", "Soy Milk"];
    const paint = (wrap) => {
      wrap.querySelector("#sg").textContent = draft.sugar;
      wrap.querySelectorAll("[data-m]").forEach((x) => (x.checked = x.dataset.m === draft.milk));
    };
    modal(`
      <div class="sheet" role="dialog" aria-label="Customizations for ${esc(name)}">
        <button class="x" data-c="close" aria-label="Close">✕</button>
        <h3>Customizations</h3>
        <div class="line"><span>Add Sugar</span><span style="display:flex;gap:8px;align-items:center"><button data-c="s-" aria-label="Less sugar">${I.minusC}</button><b id="sg">0</b><button data-c="s+" aria-label="More sugar">${I.plusC}</button></span></div>
        <div class="line" style="margin:0">Choose Milk :</div>
        <div class="opts">${milks.map((m) => `<label class="check"><input type="checkbox" data-m="${m}"> ${m}</label>`).join("")}</div>
        <div class="btns"><button class="btn btn-outline" data-c="reset">Reset</button><button class="btn btn-primary" data-c="done">Done</button></div>
      </div>`, (wrap) => {
      paint(wrap);
      wrap.addEventListener("click", (e) => {
        const c = e.target.closest("[data-c]")?.dataset.c;
        if (!c) return; // milk checkboxes are handled on "change"
        if (c === "close") closeModal();
        if (c === "s-") draft.sugar = Math.max(0, draft.sugar - 1);
        if (c === "s+") draft.sugar = Math.min(5, draft.sugar + 1);
        if (c === "reset") { draft.sugar = 0; draft.milk = ""; }
        if (c === "done") { it.sugar = draft.sugar; it.milk = draft.milk; save(); closeModal(); route(); return; }
        paint(wrap);
      });
      wrap.addEventListener("change", (e) => { if (e.target.dataset.m) { draft.milk = e.target.checked ? e.target.dataset.m : ""; paint(wrap); } });
    });
  }

  function leaveReview(no) {
    let stars = 5;
    const paint = (wrap) => wrap.querySelectorAll("[data-s]").forEach((b) => { b.innerHTML = I.starC(Number(b.dataset.s) <= stars ? "#F7D21E" : "#e3e3e3"); b.setAttribute("aria-pressed", String(Number(b.dataset.s) <= stars)); });
    modal(`
      <div class="sheet wide" role="dialog" aria-label="Leave your review">
        <button class="x" data-c="close" aria-label="Close">✕</button>
        <h3 style="text-align:center">How was your coffee?</h3>
        <div class="star-pick">${[1, 2, 3, 4, 5].map((s) => `<button data-s="${s}" aria-label="${s} star${s > 1 ? "s" : ""}"></button>`).join("")}</div>
        <textarea class="input" placeholder="Tell other coffee lovers about it (optional)" style="border-color:#ccc"></textarea>
        <div class="btns" style="margin-top:14px"><button class="btn btn-primary" style="width:96px" data-c="send">Send</button></div>
      </div>`, (wrap) => {
      paint(wrap);
      wrap.addEventListener("click", (e) => {
        const s = e.target.closest("[data-s]"); if (s) { stars = Number(s.dataset.s); paint(wrap); return; }
        const c = e.target.closest("[data-c]")?.dataset.c;
        if (c === "close") closeModal();
        if (c === "send") {
          const o = orderByNo(no); const text = wrap.querySelector("textarea").value.trim();
          o.status = "completed"; o.review = stars; (S.reviews[o.cafe] = S.reviews[o.cafe] || []).unshift({ stars, text }); refreshKm(); save();
          closeModal(); route(); snack("Thanks for your review!");
        }
      });
    });
  }

  /* ---------------- click delegation ---------------- */
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const act = el.dataset.act;
    const prevent = () => e.preventDefault();
    switch (act) {
      case "start": DB.intent = el.dataset.intent; save(); go("#/intro/0"); break;
      case "social": openDemo(); break;
      case "drawer": openDrawer(); break;
      case "close-overlay": overlayRoot.innerHTML = ""; break;
      case "bell": prevent(); overlayRoot.innerHTML = ""; go("#/inbox/notifications"); break;
      case "note": { const n = S.notes.find((x) => String(x.id) === el.dataset.id); if (n) { n.read = true; save(); go(n.href); } break; }
      case "invite": {
        prevent(); overlayRoot.innerHTML = "";
        const link = location.href.split("#")[0];
        try { navigator.clipboard.writeText(link).then(() => snack("Invite link copied!"), () => snack("Share: " + link)); } catch (_) { snack("Share: " + link); }
        break;
      }
      case "fav": {
        const id = el.dataset.id;
        S.favourites = S.favourites.includes(id) ? S.favourites.filter((f) => f !== id) : [...S.favourites, id];
        save(); route(); snack(S.favourites.includes(id) ? "Added to your favourites" : "Removed from favourites");
        break;
      }
      case "qty": {
        const st = el.closest(".stepper"); const n = st.dataset.item; const p = Number(st.dataset.price);
        const it = (session.cart[n] = session.cart[n] || { name: n, price: p, qty: 0, sugar: 0, milk: "" });
        it.qty = Math.max(0, Math.min(9, it.qty + Number(el.dataset.d))); save();
        if (location.hash.startsWith("#/review")) { route(); break; }
        st.querySelector("output").textContent = it.qty || "";
        const place = document.getElementById("place");
        if (place) { place.disabled = !cartCount(); place.textContent = cartCount() ? `Place your order · ${ils(cartTotal())}` : "Place your order"; }
        break;
      }
      case "to-review": go("#/review"); break;
      case "rm": delete session.cart[el.dataset.item]; save(); route(); break;
      case "customize": customize(el.dataset.item); break;
      case "submit-order": submitOrder(); break;
      case "cancel-order": cancelOrder(el.dataset.no); break;
      case "reorder": reorder(el.dataset.no); break;
      case "save-receipt": saveReceipt(el.dataset.no); break;
      case "picked": { const o = orderByNo(el.dataset.no); o.status = "completed"; save(); route(); snack("Enjoy your coffee!"); break; }
      case "sale-confirm": { const x = S.sales.find((s) => String(s.no) === el.dataset.no); if (x && x.status === "new") { x.status = "await"; x.t.await = Date.now(); save(); refresh(); snack(`Confirmed. ${x.who} will pay now`); } break; }
      case "sale-decline": { const x = S.sales.find((s) => String(s.no) === el.dataset.no); if (x) { x.status = "declined"; save(); go("#/manage"); } break; }
      case "sale-fulfil": { const x = S.sales.find((s) => String(s.no) === el.dataset.no); if (x && x.status === "standing") { x.status = "ready"; x.t.ready = Date.now(); save(); refresh(); snack(`${x.who} was told the order is ready`); } break; }
      case "edit-acc": editAccount(el.dataset.k); break;
      case "rm-card": S.card = null; save(); route(); snack("Card removed"); break;
      case "delete-acc": confirmBox("Delete your account?", "Orders, shop, messages and credit will be erased from this device.", "Delete", () => { delete DB.accounts[DB.current]; DB.current = null; S = blank(); refreshKm(); save(); go("#/welcome"); }); break;
      case "review": leaveReview(el.dataset.no); break;
      case "logout": prevent(); save(); DB.current = null; S = blank(); session.wizard = null; session.cartCafe = null; refreshKm(); save(); go("#/welcome"); break;
      case "go": go(el.dataset.href); break;
      case "fav-edit": session.favEdit = !session.favEdit; session.favSel = new Set(); route(); break;
      case "fav-all": {
        const all = S.favourites.length && session.favSel.size === S.favourites.length;
        session.favSel = new Set(all ? [] : S.favourites);
        app.querySelectorAll(".sel").forEach((c) => (c.checked = !all));
        break;
      }
      case "fav-delete": {
        app.querySelectorAll(".sel").forEach((c) => c.checked ? session.favSel.add(c.dataset.id) : session.favSel.delete(c.dataset.id));
        const n = session.favSel.size;
        if (!n) { snack("Select the listings you want to delete"); break; }
        modal(`<div class="sheet wide" role="alertdialog" aria-label="Delete listings">
            <h3 style="margin-top:6px">Delete ${n} listing${n > 1 ? "s" : ""}?</h3>
            <p style="font:400 14px/1.5 var(--f-head);margin:0 0 18px">They’ll be removed from your favourite pick.</p>
            <div class="btns"><button class="btn btn-outline" data-c="no">Cancel</button><button class="btn btn-primary" data-c="yes">Delete</button></div>
          </div>`, (wrap) => wrap.addEventListener("click", (ev) => {
            const c = ev.target.closest("[data-c]")?.dataset.c;
            if (c === "no") closeModal();
            if (c === "yes") { S.favourites = S.favourites.filter((f) => !session.favSel.has(f)); save(); session.favSel = new Set(); session.favEdit = false; route(); snack("Deleted"); }
          }));
        break;
      }
      case "tip": session.tips[el.dataset.t] = false; el.closest(".tip").remove(); break;
      case "wizard-start": session.wizard = null; go("#/open/1"); break;
      case "wizard-next": wizardNext(Number(el.dataset.step)); break;
    }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && overlayRoot.innerHTML) overlayRoot.innerHTML = ""; });

  if (S.myShop) delete S.myShop.ll;
  refreshKm();
  // Every page load starts from the splash, so visitors always see welcome + onboarding
  if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  window.addEventListener("hashchange", () => { document.querySelectorAll(".toast").forEach((n) => n.remove()); route(); });
  route();
  setInterval(tick, 1000);

  // offline support + installability (service workers only run over http/https)
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
