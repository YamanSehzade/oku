const CACHE_NAME = 'oku-cache-v4';
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
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache açıldı');
      return cache.addAll(STATIC_CACHE_URLS);
    })
  );
  // skipWaiting'i kaldırdık, artık mesaj ile tetiklenecek
});

// Fetch kaynakları
self.addEventListener('fetch', event => {
  // HTML istekleri için network-first stratejisi
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Statik kaynaklar için cache-first stratejisi
  if (
    event.request.url.includes('/assets/') ||
    event.request.url.includes('/icons/') ||
    event.request.destination === 'style' ||
    event.request.destination === 'script'
  ) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          // Arka planda güncelleme yap
          fetch(event.request).then(response => {
            if (response.ok) {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, response);
              });
            }
          });
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
    return;
  }

  // Diğer tüm istekler için network-first
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Service worker'ı aktifleştir
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Eski cache siliniyor:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Yeni service worker aktif');
      })
  );
});
