self.addEventListener("install", event => {
     console.log("Service worker installed successfully");
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
