const CACHE_NAME = 'oku-cache-v7';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/vite.svg',
];

// SKIP_WAITING mesajını dinle
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Install service worker
self.addEventListener('install', event => {
  // Yeni service worker'ın hemen aktif olmasını sağla
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache açıldı');
      return cache.addAll(STATIC_CACHE_URLS);
    })
  );
});

// Fetch kaynakları
self.addEventListener('fetch', event => {
  // HTML istekleri için her zaman network-first stratejisi
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Başarılı network yanıtını cache'e kaydet
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Tüm istekler için network-first stratejisi kullan
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Başarılı network yanıtını cache'e kaydet
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Service worker'ı aktifleştir
self.addEventListener('activate', event => {
  // Yeni service worker'ın hemen kontrolü almasını sağla
  event.waitUntil(
    Promise.all([
      // Eski cache'leri temizle
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Eski cache siliniyor:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Yeni service worker'ın hemen kontrolü almasını sağla
      clients.claim(),
    ]).then(() => {
      console.log('Yeni service worker aktif ve sayfa kontrolünü aldı');
    })
  );
});
