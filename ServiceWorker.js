const cacheName = "Agrupamento Dr. Ginestal Machado-Zé Phyr in The City-0.1";
const contentToCache = [
    "Build/Zé Phyr and the City.loader.js",
    "Build/Zé Phyr and the City.framework.js.gz",
    "Build/Zé Phyr and the City.data.gz",
    "Build/Zé Phyr and the City.wasm.gz",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
