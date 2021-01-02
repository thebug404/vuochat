import { urlBase64ToUint8Array } from "../helpers/convert";
import { PUBLIC_VAPID_KEY } from "../dump/items";

export class SW {
     constructor() {
          this.registration = navigator.serviceWorker;
     }

     /**
      * Method in charge of registering the service worker.
      */
     async register() {
          try {
               const data = await this.registration.register("/sw.js", { scope: "/" });
               console.log(data.pushManager);
          } catch (error) {
               alert("Lo sentimos, actualmente su navegador no soporta PWA");
          }
     }

     /**
      * Method in charge of making the user's subscription so 
      * that they can receive notifications.
      */
     async susbcribe() {
          const registration = await this.registration.ready;
          
          return await registration.pushManager.subscribe({
               userVisibleOnly: true,
               applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
          });
     }

     /**
      * Method in charge of sending the subscription to the server.
      */
     async sendSubcriptionServer() {
          if (localStorage.getItem("VUOCHAT_NOTIFY_ENDPOINT")) return;
          
          if (this.registration.controller.state === "activated") {
               const subscription = await this.susbcribe();
               
               // Send subscription server.
               const res = await fetch("/notification/subscribe", {
                    method: "POST",
                    body: JSON.stringify(subscription),
                    headers: {
                         "Content-Type": "application/json"
                    }
               });
     
               // Storage data to LocalStorage
               const data = await res.json();
               localStorage.setItem("VUOCHAT_NOTIFY_ENDPOINT", JSON.stringify(data));
          }
     }
}