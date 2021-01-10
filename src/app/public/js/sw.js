self.addEventListener("install", event => {
     event.waitUntil(
          caches.open("VUOCHAT_CACHE_STATIC").then(cache => {
               cache.addAll([
                    "/",
                    "/css/styles.css",
                    "/js/index.js",
                    "/images/banner-1.svg",
                    "/icons/logo.svg",
                    "/icons/error.svg",
                    "/manifest.json",
                    "/pages/offline.html"
               ]);
          })
     );
});

self.addEventListener("fetch", event => {
     event.respondWith(
          caches.match(event.request).then(res => {
               return res || fetch(event.request);
          }).catch(() => caches.match("/pages/offline.html"))
     );
});

self.addEventListener("push", event => {
     const data = event.data.json();

     self.registration.showNotification(data.title, {
          body: data.body,
          badge: "https://res.cloudinary.com/dlkfpx8lb/image/upload/v1610243107/vuochat/logo_hwaumf.svg",
          icon: data.icon,
     });
});
