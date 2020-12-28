// Import modules
import express from "express";

// Import notification controller
import { NotificationControllerComponent } from "./notification.controller";
const notificationController = new NotificationControllerComponent();

export class NotificationRoutesComponent {
     constructor(public router: express.Router) {
          this.subscribe();
     }

     /**
      * Method that records subscription paths to receive notifications.
      */
     private subscribe(): void {
          this.router.post(
               "/notification/subscribe",
               notificationController.subscribe
          );
     }
}
