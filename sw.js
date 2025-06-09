const CACHE_NAME = 'caiyan-cache-v6';

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

// 安装 Service Worker
self.addEventListener('install', event => {
  // 强制新的 Service Worker 跳过等待，立即进入激活状态
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`[SW] Opened cache: ${CACHE_NAME}`);
        return cache.addAll(urlsToCache);
      })
  );
});

// 激活 Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; // 定义白名单，只有当前版本的缓存被保留

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // 如果缓存名不在白名单中，则将其删除
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log(`[SW] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // 让新的 Service Worker 立即控制所有当前打开的页面
      // 配合 skipWaiting() 使用，确保更新立即生效。
      console.log('[SW] New service worker claimed clients.');
      return self.clients.claim();
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
  // 只处理 GET 请求
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);

  // 策略1: API 请求，总是从网络获取，保证数据实时性。
  if (requestUrl.href.startsWith('https://xiaoce.fun/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 策略2: 其他所有请求，采用 Stale-While-Revalidate 策略。
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        // [Revalidate] 无论缓存是否存在，都发起网络请求获取最新资源。
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // 确保我们拿到的是一个有效的响应
          if (networkResponse && networkResponse.status === 200) {
            // 将新资源存入缓存，以备下次使用。
            // 使用 clone() 是因为 response body 只能被读取一次。
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(err => {
          // 网络请求失败时，如果缓存存在，用户不会察觉。
          // 如果缓存也不存在，则请求会失败。
          console.error('[SW] Fetch failed; returning cached response if available.', err);
        });

        // [Stale] 如果缓存中存在匹配的资源，立即返回它（实现秒开）。
        // 如果缓存中没有，则等待网络请求（fetchPromise）的结果。
        return cachedResponse || fetchPromise;
      });
    })
  );
});
