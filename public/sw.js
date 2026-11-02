const CACHE = 'lgmb-v5';
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

const PUSH_DB = 'lgmb';
const PUSH_STORE = 'push';
const DAY_MS = 24 * 60 * 60 * 1000;

function readPushState() {
    return new Promise((resolve) => {
        const request = indexedDB.open(PUSH_DB, 1);
        request.onupgradeneeded = () =>
            request.result.createObjectStore(PUSH_STORE);
        request.onerror = () => resolve(null);
        request.onsuccess = () => {
            const db = request.result;
            const get = db
                .transaction(PUSH_STORE)
                .objectStore(PUSH_STORE)
                .get('state');
            get.onsuccess = () => resolve(get.result ?? null);
            get.onerror = () => resolve(null);
        };
    });
}

function currentWeek(lastPeriodDate) {
    const start = new Date(`${lastPeriodDate}T00:00:00`).getTime();
    return Math.floor(Math.floor((Date.now() - start) / DAY_MS) / 7);
}

self.addEventListener('push', (event) => {
    event.waitUntil(
        readPushState().then((state) => {
            if (!state) return;
            const week = currentWeek(state.lastPeriodDate);
            const text = state.weeks[week];
            if (!text) return;
            return self.registration.showNotification(text.title, {
                body: text.body,
                icon: '/icon-192.png',
                badge: '/icon-192.png',
                tag: `week-${week}`,
            });
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        self.clients
            .matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientsList) => {
                const client = clientsList.find((c) => 'focus' in c);
                if (client) return client.focus();
                return self.clients.openWindow('/');
            })
    );
});
