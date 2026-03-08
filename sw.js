const CACHE_NAME = 'matek-kaland-v1';
const ASSETS = [
    './index.html',
    './manifest.json',
    './icon.svg'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => {
            return caches.match(e.request).then((response) => {
                if (response) {
                    return response;
                }
                return new Response('Matek Kaland - Offline mód. Kérlek csatlakozz az internethez!', {
                    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
                });
            });
        })
    );
});
