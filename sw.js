const CACHE_NAME = 'caiyan-cache-v1';
// 定义需要缓存的核心文件
const urlsToCache = [
  './', // './' 代表根目录，也就是 index.html
  './manifest.json'
  // 注意：图标文件也会被自动缓存，无需在此列出
];

// 1. 安装 Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
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
            // 如果缓存名称不在白名单中，则删除它
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. 拦截网络请求
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // 对于 API 请求 (https://xiaoce.fun/api/...)，始终从网络获取，不进行缓存。
  if (requestUrl.href.startsWith('https://xiaoce.fun/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // 对于其他请求（如HTML, CSS, JS, 图标等），采用“缓存优先”策略
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果在缓存中找到了匹配的资源，则直接返回
        if (response) {
          return response;
        }
        // 如果缓存中没有，则从网络请求
        return fetch(event.request);
      })
  );
});