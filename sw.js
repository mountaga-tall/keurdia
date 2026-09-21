const CACHE_NAME = "keurdia-cache-v11";

const PRECACHE_URLS = [
    "/",
    "/index.html",

    "/en/",
    "/en/index.html",

    "/style.css?v=11",
    "/script.js?v=11",

    "/manifest.json",
    "/en/manifest.json",

    "/keurdialogo2.webp",
    "/icon-192.png",
    "/icon-512.png",

    "/robots.txt",
    "/sitemap.xml",

    /* Images principales */
    "/images/niani/niani1.webp",
    "/images/sine/sine1.webp",
    "/images/waalo/waalo1.webp",
    "/images/farafina/farafina2.webp",

    "/images/baol/baol1.webp",
    "/images/cayor/cayor1.webp",
    "/images/damel/damel1.webp",
    "/images/foutahto/foutahto1.webp",
    "/images/ndiambour/ndiambour1.webp",
    "/images/saloum/saloum1.webp",
    "/images/thiossane/thiossane1.webp",
    "/images/wuri/wuri1.webp",
    "/images/djolof/djolof1.webp"
];

/* ==========================================================
   INSTALLATION
========================================================== */

self.addEventListener("install", event => {

    event.waitUntil(

        caches
            .open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(
                    PRECACHE_URLS
                );

            })
            .then(() => {

                return self.skipWaiting();

            })
    );

});

/* ==========================================================
   ACTIVATION
========================================================== */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches
            .keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames.map(cacheName => {

                        if (
                            cacheName !== CACHE_NAME &&
                            cacheName.startsWith(
                                "keurdia-cache-"
                            )
                        ) {

                            return caches.delete(
                                cacheName
                            );
                        }

                        return null;
                    })
                );
            })
            .then(() => {

                return self.clients.claim();

            })
    );

});

/* ==========================================================
   FETCH
========================================================== */

self.addEventListener("fetch", event => {

    const request = event.request;

    /* Seulement les requêtes GET */
    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);

    /* Seulement notre propre domaine */
    if (
        url.origin !== self.location.origin
    ) {
        return;
    }

    /* ======================================================
       PAGES HTML
       Réseau d'abord
       Cache en secours pour le mode hors ligne
    ====================================================== */

    if (
        request.mode === "navigate" ||
        request.destination === "document"
    ) {

        event.respondWith(

            fetch(request)
                .then(response => {

                    if (
                        !response ||
                        response.status !== 200
                    ) {
                        throw new Error(
                            "Invalid network response"
                        );
                    }

                    const copy =
                        response.clone();

                    caches
                        .open(CACHE_NAME)
                        .then(cache => {

                            cache
                                .put(
                                    request,
                                    copy
                                )
                                .catch(() => {});

                        })
                        .catch(() => {});

                    return response;

                })
                .catch(() => {

                    return caches
                        .match(request)
                        .then(cached => {

                            if (cached) {
                                return cached;
                            }

                            /*
                             * Détection automatique FR / EN
                             */
                            const fallback =
                                url.pathname.startsWith(
                                    "/en/"
                                )
                                    ? "/en/index.html"
                                    : "/index.html";

                            return caches
                                .match(fallback)
                                .then(
                                    fallbackResponse => {

                                        if (
                                            fallbackResponse
                                        ) {
                                            return fallbackResponse;
                                        }

                                        return new Response(
                                            "Page indisponible hors ligne.",
                                            {
                                                status: 503,
                                                statusText:
                                                    "Service Unavailable",
                                                headers: {
                                                    "Content-Type":
                                                        "text/plain; charset=utf-8"
                                                }
                                            }
                                        );

                                    }
                                );

                        });

                })

        );

        return;
    }

    /* ======================================================
       IMAGES
       Cache d'abord
       Réseau ensuite
    ====================================================== */

    if (
        request.destination === "image" ||
        /\.(avif|jpg|jpeg|png|webp|gif|svg)$/i.test(
            url.pathname
        )
    ) {

        event.respondWith(

            caches
                .match(request)
                .then(cached => {

                    if (cached) {
                        return cached;
                    }

                    return fetch(request)
                        .then(response => {

                            if (
                                !response ||
                                response.status !== 200
                            ) {
                                return response;
                            }

                            const copy =
                                response.clone();

                            caches
                                .open(
                                    CACHE_NAME
                                )
                                .then(cache => {

                                    cache
                                        .put(
                                            request,
                                            copy
                                        )
                                        .catch(() => {});

                                })
                                .catch(() => {});

                            return response;

                        })
                        .catch(() => {

                            return new Response(
                                "",
                                {
                                    status: 503,
                                    statusText:
                                        "Image unavailable"
                                }
                            );

                        });

                })

        );

        return;
    }

    /* ======================================================
       CSS / JS / JSON / MANIFEST / AUTRES FICHIERS
       Cache d'abord puis réseau
    ====================================================== */

    event.respondWith(

        caches
            .match(request)
            .then(cached => {

                if (cached) {
                    return cached;
                }

                return fetch(request)
                    .then(response => {

                        if (
                            !response ||
                            response.status !== 200
                        ) {
                            return response;
                        }

                        const copy =
                            response.clone();

                        caches
                            .open(
                                CACHE_NAME
                            )
                            .then(cache => {

                                cache
                                    .put(
                                        request,
                                        copy
                                    )
                                    .catch(() => {});

                            })
                            .catch(() => {});

                        return response;

                    });

            })

    );

});

/* ==========================================================
   MESSAGES
========================================================== */

self.addEventListener("message", event => {

    if (
        event.data &&
        event.data.type === "SKIP_WAITING"
    ) {

        self.skipWaiting();

    }

});
