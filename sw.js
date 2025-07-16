const CACHE_NAME = 'caiyan-cache-v7';

const urlsToCache = [
  './', // index.html
  './manifest.json',
  './icons/icon-128x128.png',
  './icons/icon-128x128.webp',
  './icons/icon-512x512.png',
  './icons/icon-512x512.webp',
  './icons/icon-512x512-maskable.png',
  './icons/icon-512x512-maskable.webp'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`[SW] Opened cache: ${CACHE_NAME}`);
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log(`[SW] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] New service worker claimed clients.');
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);

  const analyticsDomains = [
    'clarity.ms',
    'bing.com',
    'goatcounter.com',
    'zgo.at'
  ];

  if (analyticsDomains.some(domain => requestUrl.hostname.endsWith(domain))) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (requestUrl.href.startsWith('https://xiaoce.fun/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            // 使用 clone() 是因为 response body 只能被读取一次。
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(err => {
          console.error('[SW] Fetch failed; returning cached response if available.', err);
        });
        return cachedResponse || fetchPromise;
      });
    })
  );
});
