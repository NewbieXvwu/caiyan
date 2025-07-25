const CACHE_NAME = 'caiyan-cache-v9';

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
  // 我们只处理 GET 请求
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);

  // 对于分析类脚本，始终走网络请求
  const analyticsDomains = [
    'clarity.ms',
    'bing.com',
    'simpleanalyticscdn.com'
  ];

  if (analyticsDomains.some(domain => requestUrl.hostname.endsWith(domain))) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 对于所有通过代理的API请求，始终走网络请求
  if (requestUrl.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 对于其他所有静态资源，采用 "Cache first, then network" 策略
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
        
        // 优先返回缓存的响应，如果缓存没有，则返回网络请求的Promise
        return cachedResponse || fetchPromise;
      });
    })
  );
});
