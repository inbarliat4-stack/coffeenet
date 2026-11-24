/* CoFFeeNet map engine: draws Tel Aviv from local street data and finds routes on it. Works offline. */
window.CNMap = (() => {
  "use strict";
  const D = window.TLV, K = Math.cos((32.08 * Math.PI) / 180), M = 111320;
  const dist = (a, b) => Math.hypot((a[0] - b[0]) * M, (a[1] - b[1]) * M * K);
  const dec = (f) => { const o = []; let y = 0, x = 0; for (let i = 0; i < f.length; i += 2) { y += f[i]; x += f[i + 1]; o.push([y / 1e5, x / 1e5]); } return o; };
  const roads = D.roads.map(([c, n, one, f]) => ({ c, name: n < 0 ? "" : D.names[n], one, pts: dec(f) }));

  /* ---- street graph ---- */
  const nodes = [], idx = new Map(), adj = [], edges = [];
  const nodeOf = (p) => {
    const k = Math.round(p[0] * 1e5) + "," + Math.round(p[1] * 1e5);
    let i = idx.get(k);
    if (i === undefined) { i = nodes.length; idx.set(k, i); nodes.push(p); adj.push([]); }
    return i;
  };
  for (const r of roads) for (let i = 1; i < r.pts.length; i++) {
    const a = nodeOf(r.pts[i - 1]), b = nodeOf(r.pts[i]);
    if (a === b) continue;
    const e = { a, b, len: dist(r.pts[i - 1], r.pts[i]), c: r.c, one: r.one, name: r.name };
    edges.push(e); adj[a].push([b, e, 1]); adj[b].push([a, e, -1]);
  }
  // keep only the main connected network, so nothing snaps to an isolated stub
  const comp = new Int32Array(nodes.length).fill(-1);
  let best = 0, bestN = 0, cn = 0;
  for (let s = 0; s < nodes.length; s++) if (comp[s] < 0) {
    const st = [s]; comp[s] = cn; let n = 0;
    while (st.length) { const u = st.pop(); n++; for (const [v, e] of adj[u]) if (comp[v] < 0 && e.c > 0) { comp[v] = cn; st.push(v); } }
    if (n > bestN) { bestN = n; best = cn; }
    cn++;
  }
  const main = edges.filter((e) => e.c > 0 && e.c < 4 && comp[e.a] === best && comp[e.b] === best);

  function snap(p, name) {
    let r = null, rd = Infinity;
    for (const e of main) {
      if (name && e.name !== name) continue;
      const A = nodes[e.a], B = nodes[e.b], dx = (B[1] - A[1]) * K, dy = B[0] - A[0];
      const t = Math.max(0, Math.min(1, ((p[1] - A[1]) * K * dx + (p[0] - A[0]) * dy) / (dx * dx + dy * dy || 1e-18)));
      const q = [A[0] + t * (B[0] - A[0]), A[1] + t * (B[1] - A[1])], d = dist(p, q);
      if (d < rd) { rd = d; r = { e, t, ll: q }; }
    }
    return r;
  }

  // seconds to travel one metre, per mode and street class
  const pace = (kmh) => 3.6 / kmh;
  const MODES = {
    walk: { base: 0, unit: pace(4.8), cost: (e) => (e.c === 0 ? null : pace(4.8)) },
    car: { base: 120, unit: pace(15), cost: (e, dir) => (e.c === 4 || (e.one && e.one !== dir) ? null : pace([50, 26, 22, 15][e.c])) },
    bus: { base: 300, unit: pace(4.8), cost: (e) => (e.c === 0 ? null : pace(e.c === 1 ? 16 : e.c === 2 ? 14 : 4.8)) },
  };

  const cache = new Map();
  function tree(from, mode) {
    const id = mode + from.ll.join();
    if (cache.has(id)) return cache.get(id);
    const N = nodes.length, t = new Float64Array(N).fill(Infinity), prev = new Int32Array(N).fill(-1), done = new Uint8Array(N), h = [];
    const push = (k, n) => {
      let i = h.push([k, n]) - 1;
      while (i) { const p = (i - 1) >> 1; if (h[p][0] <= h[i][0]) break; [h[p], h[i]] = [h[i], h[p]]; i = p; }
    };
    const pop = () => {
      const top = h[0], l = h.pop();
      if (h.length) {
        h[0] = l; let i = 0;
        for (;;) {
          let c = 2 * i + 1; if (c >= h.length) break;
          if (c + 1 < h.length && h[c + 1][0] < h[c][0]) c++;
          if (h[i][0] <= h[c][0]) break;
          [h[c], h[i]] = [h[i], h[c]]; i = c;
        }
      }
      return top;
    };
    const { unit, cost } = MODES[mode];
    t[from.e.a] = from.t * from.e.len * unit; t[from.e.b] = (1 - from.t) * from.e.len * unit;
    push(t[from.e.a], from.e.a); push(t[from.e.b], from.e.b);
    while (h.length) {
      const [k, u] = pop(); if (done[u]) continue; done[u] = 1;
      for (const [v, e, dir] of adj[u]) {
        const c = cost(e, dir); if (c === null) continue;
        const nk = k + c * e.len;
        if (nk < t[v]) { t[v] = nk; prev[v] = u; push(nk, v); }
      }
    }
    const r = { t, prev, unit };
    if (cache.size > 12) cache.clear();
    cache.set(id, r);
    return r;
  }

  // a route is { pts, km, min, mode }; car falls back to walking when no drivable path exists
  function route(fromLL, toLL, mode = "walk") {
    const a = snap(fromLL), b = snap(toLL), { t, prev, unit } = tree(a, mode);
    let pts, secs;
    if (a.e === b.e) { pts = [a.ll, b.ll]; secs = dist(a.ll, b.ll) * unit; }
    else {
      const ka = t[b.e.a] + b.t * b.e.len * unit, kb = t[b.e.b] + (1 - b.t) * b.e.len * unit;
      secs = Math.min(ka, kb);
      if (!isFinite(secs)) return mode === "walk" ? null : route(fromLL, toLL, "walk");
      pts = [b.ll];
      for (let n = ka <= kb ? b.e.a : b.e.b; n >= 0; n = prev[n]) pts.push(nodes[n]);
      pts.push(a.ll); pts.reverse();
    }
    let len = 0;
    for (let i = 1; i < pts.length; i++) len += dist(pts[i - 1], pts[i]);
    return { pts, km: len / 1000, min: Math.max(1, Math.round((secs + MODES[mode].base) / 60)), mode };
  }

  /* ---- addresses ---- */
  const ALIAS = { dizengof: "Dizengoff", dizingof: "Dizengoff", arlozorov: "Arlosoroff", arlosorov: "Arlosoroff", gordon: "J. L. Gordon", zait: "HaZayit", "ben gurion": "Sderot David Ben Gurion", "ibn gvirol": "Ibn Gabirol" };
  const streets = [...new Set(roads.filter((r) => r.c > 0 && r.c < 4).map((r) => r.name).filter(Boolean))].sort();
  function findStreet(text) {
    const s = String(text || "").replace(/[0-9]+/g, "").replace(/[,.]/g, " ").replace(/ +/g, " ").trim().toLowerCase();
    if (s.length < 3) return null;
    return ALIAS[s] || streets.find((n) => n.toLowerCase() === s) || streets.find((n) => n.toLowerCase().startsWith(s)) || streets.find((n) => n.toLowerCase().includes(s)) || null;
  }
  const streetPoint = (name, near) => { const s = snap(near, name); return s ? s.ll : null; };
  const searchStreets = (q, n) => {
    q = q.toLowerCase();
    const al = Object.keys(ALIAS).filter((k) => k.startsWith(q)).map((k) => ALIAS[k]);
    return [...new Set([...al, ...streets.filter((s) => s.toLowerCase().startsWith(q)), ...streets.filter((s) => s.toLowerCase().includes(q))])].slice(0, n);
  };
  const inside = ([y, x]) => y > D.box[0] + 0.002 && y < D.box[2] - 0.002 && x > D.box[1] + 0.002 && x < D.box[3] - 0.002;

  /* ---- drawing ---- */
  function create(el, center, zoom) {
    const map = L.map(el, {
      center, zoom, minZoom: 13.5, maxZoom: 18, zoomSnap: 0.5, zoomControl: false, attributionControl: false,
      maxBounds: L.latLngBounds([D.box[0], D.box[1]], [D.box[2], D.box[3]]), maxBoundsViscosity: 0.9,
    });
    const pane = (n, z) => { map.createPane(n).style.zIndex = z; return L.canvas({ pane: n, padding: 0.4 }); };
    const rLand = pane("land", 200), rRoad = pane("roads", 210);
    const fill = (polys, color) => L.polygon(polys.map((p) => [dec(p)]), { renderer: rLand, stroke: false, fillColor: color, fillOpacity: 1, interactive: false }).addTo(map);
    fill([D.sea], "#cbd2d5"); fill(D.beach, "#ece7dd"); fill(D.parks, "#dce1d6"); fill(D.water, "#cbd2d5");
    L.polyline(D.river.map(dec), { renderer: rLand, color: "#cbd2d5", weight: 14, interactive: false }).addTo(map);
    const line = (cls, color) => L.polyline(roads.filter((r) => cls.includes(r.c)).map((r) => r.pts), { renderer: rRoad, color, weight: 1, interactive: false, smoothFactor: 0.8 }).addTo(map);
    const sets = [[line([4], "#f1efec"), 0.5], [line([3], "#fbfbfb"), 0.75], [line([0, 1], "#d2cfcc"), 1.95], [line([2], "#ffffff"), 1.15], [line([0, 1], "#ffffff"), 1.55]];
    const weigh = () => { const z = Math.pow(1.62, map.getZoom() - 15); sets.forEach(([l, k]) => l.setStyle({ weight: Math.max(0.6, 4.6 * k * z) })); };
    weigh(); map.on("zoomend", weigh);

    // labels: street names follow their street, area names sit above; overlapping ones are dropped
    const lp = map.createPane("labels"); lp.style.zIndex = 400; lp.style.pointerEvents = "none"; lp.setAttribute("aria-hidden", "true");
    const cand = [];
    for (const r of roads) {
      if (!r.name || r.c === 0) continue;
      let bi = 0, bl = 0;
      for (let i = 1; i < r.pts.length; i++) { const d = dist(r.pts[i - 1], r.pts[i]); if (d > bl) { bl = d; bi = i; } }
      if (!bi) continue;
      const a = r.pts[bi - 1], b = r.pts[bi];
      let ang = (Math.atan2(-(b[0] - a[0]), (b[1] - a[1]) * K) * 180) / Math.PI;
      if (ang > 90) ang -= 180; if (ang < -90) ang += 180;
      cand.push({ name: r.name.replace(/^Sderot /, "").replace(/ *[(].*[)]/, ""), ll: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], ang, c: r.c, len: bl });
    }
    cand.sort((x, y) => x.c - y.c || y.len - x.len);
    function labels() {
      lp.textContent = "";
      const z = map.getZoom(), size = map.getSize(), taken = [], seen = [];
      const place = (text, ll, ang, cls, w, h) => {
        const p = map.latLngToContainerPoint(ll);
        if (p.x < -20 || p.y < -20 || p.x > size.x + 20 || p.y > size.y + 20) return false;
        const c = Math.abs(Math.cos((ang * Math.PI) / 180)), s = Math.abs(Math.sin((ang * Math.PI) / 180)), bw = (w * c + h * s) / 2 + 5, bh = (w * s + h * c) / 2 + 5;
        if (taken.some((t) => Math.abs(t.x - p.x) < t.w + bw && Math.abs(t.y - p.y) < t.h + bh)) return false;
        taken.push({ x: p.x, y: p.y, w: bw, h: bh });
        const n = document.createElement("span"); n.className = "lbl " + cls; n.textContent = text;
        const q = map.latLngToLayerPoint(ll);
        n.style.transform = `translate(${q.x}px,${q.y}px) translate(-50%,-50%) rotate(${ang.toFixed(1)}deg)`;
        lp.appendChild(n);
        return true;
      };
      if (z < 16) for (const [n, y, x, big] of D.places) if (big || z >= 14.5) place(n, [y / 1e5, x / 1e5], 0, big ? "area big" : "area", n.length * (big ? 10 : 8.5), 18);
      if (z >= 14.5) for (const k of cand) {
        if (k.c > (z >= 16 ? 4 : z >= 15.5 ? 3 : 2)) continue;
        if (seen.some((s) => s[0] === k.name && dist(s[1], k.ll) < 60000 / Math.pow(2, z - 8.4))) continue;
        if (place(k.name, k.ll, k.ang, "st", k.name.length * 6, 13)) seen.push([k.name, k.ll]);
      }
    }
    labels();
    map.on("moveend resize", labels);
    map.on("zoomstart", () => { lp.textContent = ""; });
    return map;
  }
  return { create, route, snap, dist, findStreet, streetPoint, searchStreets, inside };
})();
