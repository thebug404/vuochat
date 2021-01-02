self.addEventListener("fetch", event => {
     event.respondWith(
          caches.match(event.request).then(res => {
               return res || fetch(event.request).then(result => {
                    return caches.open("VUOCHAT_CACHE").then(cache => {
                         cache.put(event.request, result.clone());
                         return result;
                    })
               })
          })
     );
});

self.addEventListener("push", event => {
     const data = event.data.json();
     const origin = event.currentTarget.location.origin;

     self.registration.showNotification(data.title, {
          body: data.body,
          badge: `${ origin }${ data.badge }`,
          icon: data.icon,
     });
});
