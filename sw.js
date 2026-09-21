const CACHE_NAME = "keurdia-cache-v10";
const BASE_URL = new URL("./", self.location.href);
const BASE_PATH = new URL("./", self.location.href).pathname;

const ASSETS = [
    "./",
    "./index.html",
    "./style.css?v=10",
    "./script.js?v=10",
    "./manifest.json",
    "./keurdialogo2.webp",
    "./logo-keur-dia.webp",
    "./icon-192.png",
    "./icon-512.png",
    "./images/baol/baol1.webp",
    "./images/cayor/cayor1.webp",
    "./images/damel/damel1.webp",
    "./images/djolof/djolof1.webp",
    "./images/farafina/farafina1.webp",
    "./images/foutahto/foutahto1.webp",
    "./images/ndiambour/ndiambour1.webp",
    "./images/niani/niani1.webp",
    "./images/saloum/saloum1.webp",
    "./images/sine/sine1.webp",
    "./images/thiossane/thiossane1.webp",
    "./images/waalo/waalo1.webp",
    "./images/wuri/wuri1.webp"
];

const toAbsoluteUrl = asset => new URL(asset, BASE_URL).href;

/* =========================================================
   INSTALLATION
========================================================= */
self.addEventListener("install", event => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(async cache => {
                // Ne pas bloquer l'installation entière si une image facultative
                // manque dans le dépôt.
                await Promise.all(
                    ASSETS.map(async asset => {
                        try {
                            const response = await fetch(toAbsoluteUrl(asset), {
                                cache: "no-cache"
                            });
                            if (response.ok) {
                                await cache.put(toAbsoluteUrl(asset), response);
                            }
                        } catch (_) {
                            // Ressource absente ou réseau indisponible : ignorée.
                        }
                    })
                );
            })
            .then(() => self.skipWaiting())
    );
});

/* =========================================================
   ACTIVATION
========================================================= */
self.addEventListener("activate", event => {
    event.waitUntil(
        caches
            .keys()
            .then(cacheNames =>
                Promise.all(
                    cacheNames.map(cacheName => {
                        if (
                            cacheName !== CACHE_NAME &&
                            cacheName.startsWith("keurdia-cache-")
                        ) {
                            return caches.delete(cacheName);
                        }
                        return null;
                    })
                )
            )
            .then(() => self.clients.claim())
    );
});

/* =========================================================
   FETCH
========================================================= */
self.addEventListener("fetch", event => {
    const request = event.request;

    if (request.method !== "GET") return;

    const url = new URL(request.url);

    // On ne gère que les ressources de ce dépôt / de ce scope.
    if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE_PATH)) {
        return;
    }

    /* =====================================================
       HTML : réseau d'abord, cache en secours
    ===================================================== */
    if (request.mode === "navigate" || request.destination === "document") {
        event.respondWith(
            fetch(request)
                .then(networkResponse => {
                    if (!networkResponse || networkResponse.status !== 200) {
                        throw new Error("Network response invalid");
                    }

                    const responseClone = networkResponse.clone();
                    caches
                        .open(CACHE_NAME)
                        .then(cache => cache.put(request, responseClone))
                        .catch(() => {});

                    return networkResponse;
                })
                .catch(() =>
                    caches.match(request).then(cached =>
                        cached || caches.match(toAbsoluteUrl("./index.html"))
                    )
                )
        );
        return;
    }

    /* =====================================================
       IMAGES / CSS / JS / MANIFEST : cache puis réseau
    ===================================================== */
    event.respondWith(
        caches.match(request).then(cachedResponse => {
            if (cachedResponse) return cachedResponse;

            return fetch(request)
                .then(networkResponse => {
                    if (!networkResponse || !networkResponse.ok) {
                        return networkResponse;
                    }

                    const responseClone = networkResponse.clone();
                    caches
                        .open(CACHE_NAME)
                        .then(cache => cache.put(request, responseClone))
                        .catch(() => {});

                    return networkResponse;
                })
                .catch(() =>
                    new Response("", {
                        status: 503,
                        statusText: "Resource unavailable"
                    })
                );
        })
    );
});

/* =========================================================
   MESSAGE
========================================================= */
self.addEventListener("message", event => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});
