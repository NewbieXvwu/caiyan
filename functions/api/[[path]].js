export async function onRequest(context) {
  const { request } = context;

  const url = new URL(request.url);

  const targetApiBase = 'https://xiaoce.fun';

  const targetUrl = targetApiBase + url.pathname + url.search;

  const apiRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  });

  apiRequest.headers.set('Host', new URL(targetApiBase).hostname);
  
  apiRequest.headers.set('Referer', 'https://xiaoce.fun/');

  const response = await fetch(apiRequest);

  return response;
}
