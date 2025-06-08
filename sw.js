const CACHE_NAME = 'caiyan-cache-v2';
const urlsToCache = [
  './', // index.html
  './manifest.json',
  './icons/icon-192x192.avif',
  './icons/icon-192x192.webp',
  './icons/icon-192x192.jpg',
  './icons/icon-512x512.avif',
  './icons/icon-512x512.webp',
  './icons/icon-512x512.jpg',
  './icons/icon-512x512-maskable.avif',
  './icons/icon-512x512-maskable.webp',
  './icons/icon-512x512-maskable.jpg'
];

// 1. 安装 Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching assets for v2');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. 激活 Service Worker 并清理旧缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. 拦截网络请求 (逻辑保持不变)
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.href.startsWith('https://xiaoce.fun/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});