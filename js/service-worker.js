// service-worker.js
const CACHE_NAME = 'dynamic-cache-v1';
const BASE_PATH = '/props/bankapp';

self.addEventListener('install', event => {
    // This event happens once, so it's a good place to cache static assets
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                // List of URLs to cache
                '${BASE_PATH}/css/build.css',
                '${BASE_PATH}/js/alpinejs.3.x.x.min.js',
                '${BASE_PATH}/css/build.css',
                '${BASE_PATH}/images/icons/credit-card.svg',
                '${BASE_PATH}/images/icons/shopping-bag.svg',
                '${BASE_PATH}/images/icons/map-pin.svg',
                '${BASE_PATH}/images/logo.png',
                '${BASE_PATH}/images/top-menu-dots.png',
                '${BASE_PATH}/images/arrow-left.svg',
                '${BASE_PATH}/images/top-menu-lock.png',
                '${BASE_PATH}/images/logo-transparent.png',
                '${BASE_PATH}/images/icons/home-04.svg',
                '${BASE_PATH}/images/icons/bank-note-01.svg',
                '${BASE_PATH}/images/icons/piggy-bank-02.svg',
                '${BASE_PATH}/images/icons/credit-card-02.svg',
                '${BASE_PATH}/images/icons/receipt.svg',
                '${BASE_PATH}/images/icons/chevron-right.svg',
                '${BASE_PATH}/images/icons/bank-note-01-l.svg',
                '${BASE_PATH}/images/face-recognition.svg',
                '${BASE_PATH}/images/wallpaper.jpg',
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        // App shell (e.g., index.html) and pages fallback logic
        event.respondWith(
            fetch(event.request).then(networkResponse => {
                // Copy the response
                let responseClone = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
                return networkResponse;
            }).catch(() => {
                return caches.match(event.request).then(response => {
                    if (response) {
                        return response;
                    }
                    // Optionally return a default offline page for navigate requests
                });
            })
        );
    } else {
        // Cache, falling back to network strategy for non-navigate requests
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                return cachedResponse || fetch(event.request).then(networkResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    }
});