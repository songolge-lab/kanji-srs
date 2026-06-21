// CACHE_NAME, web/index.html içindeki APP_VERSION ile senkron tutulur.
// Her yeni sürümde bu satır da güncellenmeli ki tarayıcı eski cache'i
// otomatik atıp yeni dosyaları çeksin (kullanıcı elle bir şey yapmasın).
const CACHE_NAME = 'kanji-srs-v1.3.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first: önce ağdan en güncel sürümü çekmeyi dener, başarılı
// olursa cache'i de günceller. Ağ erişilemezse (offline) cache'e düşer.
// Bu sayede yeni bir deploy olduğunda kullanıcı uygulamayı kapatıp
// açmadan da en güncel sürümü görür.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
  );
});
