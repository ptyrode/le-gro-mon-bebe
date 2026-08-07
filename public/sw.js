// Service worker maison — cache l'app shell pour un fonctionnement hors-ligne.
// Stratégie : network-first pour les navigations, stale-while-revalidate sinon.
const CACHE = 'lgmb-v1';
const APP_SHELL = ['/'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
                )
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    // Navigations : réseau d'abord, cache "/" en secours (offline).
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((res) => {
                    const copy = res.clone();
                    caches.open(CACHE).then((cache) => cache.put('/', copy));
                    return res;
                })
                .catch(() =>
                    caches.match('/').then((r) => r || caches.match(request))
                )
        );
        return;
    }

    // Autres assets : stale-while-revalidate.
    event.respondWith(
        caches.match(request).then((cached) => {
            const network = fetch(request)
                .then((res) => {
                    if (res && res.status === 200) {
                        const copy = res.clone();
                        caches
                            .open(CACHE)
                            .then((cache) => cache.put(request, copy));
                    }
                    return res;
                })
                .catch(() => cached);
            return cached || network;
        })
    );
});
