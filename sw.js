/* CoFFeeNet offline cache. Bump VERSION whenever app files change so phones pick up the update. */
const VERSION = "coffeenet-v8";
const IMGS = [
  "av-avi.png", "av-cofifi.png", "av-cup.png", "av-cupicon.svg", "av-dan.png", "av-decafe.png", "av-fun.png", "av-kef.png",
  "av-liat.png", "av-ron.png", "btn-best.png", "btn-locate.png", "cup-card.png", "cup-tab.png", "hero-cup.png", "logo-beans.png",
  "onb-cup.png", "onb-machine.png", "onb-moka.png", "pay-apple.png", "pay-bit.png", "pay-paypal.png", "pin-me.png",
  "seller-shop.png", "splash-bottom.png", "splash-cup.png", "splash-moka.png", "splash-top.png",
  "icon.svg", "icon-192.png", "icon-512.png", "apple-touch-icon.png",
];
const PRECACHE = ["./", "index.html", "styles.css", "app.js", "map.js", "assets/tlv-map.js", "vendor/leaflet.js", "vendor/leaflet.css", "manifest.webmanifest", ...IMGS.map((f) => "assets/img/" + f)];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache first for app files; network first (falling back to cache) for Google Fonts.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
  } else if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req))
    );
  }
});
