const CACHE_NAME = 'oku-cache-v3';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/vite.svg',
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache açıldı');
      return cache.addAll(STATIC_CACHE_URLS);
    })
  );
  // Worker'ı hemen aktifleştir
  self.skipWaiting();
});

// Fetch kaynakları
self.addEventListener('fetch', event => {
  // Assets için stale-while-revalidate stratejisi
  if (event.request.url.includes('/assets/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          const fetchedResponse = fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });

          return cachedResponse || fetchedResponse;
        });
      })
    );
  } else {
    // Diğer kaynaklar için network-first stratejisi
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Başarılı yanıtı önbelleğe al
          if (response.ok) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Ağ hatası durumunda önbellekten sun
          return caches.match(event.request);
        })
    );
  }
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
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Yeni service worker'ın hemen kontrolü almasını sağla
        clients.claim();
      })
  );
});
