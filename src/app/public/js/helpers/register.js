// Import publi key
import { PUBLIC_VAPID_KEY } from "../dump/items";

// Import convert
import { urlBase64ToUint8Array } from "./convert";;

export async function subscribe() {
     // Init register service worker.
     const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
     });

     // Subcriptions
     const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
     });

     // Send registration to server.
     if (!localStorage.getItem("VUOCHAT_NOTIFY_ENDPOINT")) {
          const res = await fetch("/notification/subscribe", {
               method: "POST",
               body: JSON.stringify(subscription),
               headers: {
                    "Content-Type": "application/json"
               }
          });
     
          const data = await res.json();
          localStorage.setItem("VUOCHAT_NOTIFY_ENDPOINT", JSON.stringify(data));
     }
}
