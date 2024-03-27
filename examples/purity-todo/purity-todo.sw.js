const appScope = self.registration.scope;
const cacheName = `${appScope}@2.17`;
const contentToCache = [
    "./",
    "./index.html",
    // FIXME: wrong caching?
    "./assets/images/todo-icon-48.png",
    "./assets/images/todo-icon-192.png",
    "./assets/images/todo-icon-512.png",
    "./assets/images/preloader.gif",
    "./assets/images/icon-pack/idea.svg",
    "./assets/images/icon-pack/forbidden.svg",
    "manifest.json",
];
self.addEventListener("install", (e) => {
    console.log(`[purity-todo.sw.js] Install`);
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log(`[purity-todo.sw.js] Caching app shell`);
        await cache.addAll(contentToCache);
    })());
});
self.addEventListener("activate", (e) => {
    console.log(`[purity-todo.sw.js] Activate`);
    caches.keys().then(console.log);
    e.waitUntil(caches.keys().then(keyList => {
        Promise.all(keyList.map(key => {
            console.log(`[purity-todo.sw.js] cache key =`, key);
            if (key !== cacheName && key.startsWith(appScope)) {
                // Do not delete other caches since this app shares the same origin as others
                // (especially 'Lord of Passwords' which depends on the cached data).
                caches.delete(key);
            }
        }));
    }));
});
self.addEventListener("fetch", (e) => {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        console.log(`[purity-todo.sw.js] Fetching resource: ${e.request.url}`);
        if (r) {
            return r;
        }
        const response = await fetch(e.request);
        if (e.request.url.endsWith(".js")) {
            const cache = await caches.open(cacheName);
            console.log(`[purity-todo.sw.js] Caching new resource: ${e.request.url}`);
            cache.put(e.request, response.clone());
        }
        return response;
    })());
});
export {};
