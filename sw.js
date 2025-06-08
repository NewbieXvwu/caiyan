const CACHE_NAME = 'caiyan-cache-v4';
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

// 安装 Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching assets for v4');
        return cache.addAll(urlsToCache);
      })
  );
});

// 激活 Service Worker 并清理旧缓存
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

// 拦截网络请求 (Stale-While-Revalidate 策略)
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // API 请求仍然采用网络优先策略，保证数据实时性
  if (requestUrl.href.startsWith('https://xiaoce.fun/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // 对所有其他请求应用 Stale-While-Revalidate 策略
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        // [Revalidate] 无论缓存是否存在，都发起网络请求获取最新资源
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // 确保我们拿到的是一个有效的响应
          if (networkResponse && networkResponse.status === 200) {
            // 将新资源存入缓存，覆盖旧的
            // 使用 clone() 是因为 response body 只能被读取一次
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(err => {
          // 网络请求失败时，可以什么都不做，或者返回一个自定义的离线页面
          console.error('Fetch failed:', err);
          // 如果有缓存，即使网络失败，用户也不会看到错误
          // 如果连缓存都没有，这里才会真正抛出错误
        });

        // [Stale] 如果缓存中存在匹配的资源，立即返回它
        // 如果缓存中没有，则等待网络请求（fetchPromise）的结果
        return cachedResponse || fetchPromise;
      });
    })
  );
});
