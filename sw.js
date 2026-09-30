const CACHE = "keurdia-v20";
const CORE = [
  "./",
  "./index.html",
  "./appartements.html",
  "./experience.html",
  "./contact.html",
  "./baol.html",
  "./cayor.html",
  "./damel.html",
  "./djolof.html",
  "./farafina.html",
  "./foutahto.html",
  "./ndiambour.html",
  "./niani.html",
  "./saloum.html",
  "./sine.html",
  "./thiossane.html",
  "./waalo.html",
  "./wuri.html",
  "./style.css?v=16",
  "./script.js?v=19",
  "./amenities.js?v=1",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./keurdialogo2.webp"
];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("keurdia-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  const isImage = e.request.destination === "image";
  if (isImage) {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
      if (r.ok) caches.open(CACHE).then(c => c.put(e.request, r.clone()));
      return r;
    }).catch(() => new Response("", {status:503, headers:{"Content-Type":"image/svg+xml"}}))));
    return;
  }
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then(r => {
      if (r.ok) caches.open(CACHE).then(c => c.put(e.request, r.clone()));
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html"))));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
    if (r.ok) caches.open(CACHE).then(c => c.put(e.request, r.clone()));
    return r;
  })));
});
