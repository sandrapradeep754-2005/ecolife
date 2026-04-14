const CACHE = "ecolife-v1";

const FILES = [
  "/",
  "/index.html",
  "/src/main.jsx",
  "/src/App.jsx"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});