// Import module
import express from "express";

// Import webpush
import { webpush } from "../../config/webpush";

// Imports user repository
import { UserRepository } from "../../repository/user/user.repository";
const userRepository = new UserRepository();

export class NotificationControllerComponent {
     /**
      * Controller in charge of subscribing the user to receive notifications.
      * @param req 
      * @param res 
      */
     public async subscribe(req: express.Request, res: express.Response) {
          const user: any = req.user;

          // Send notification server.
          webpush.sendNotification(req.body, JSON.stringify({
               title: `¡Bienvenido ${ user.name }!`,
               body: "Vuochat te da la bienvenida, ahora podras mantenerte al tanto de lo que acontece.",
               icon: user.picture,
               badge: "/icons/logo.svg"
          }));

          // Update field notification.
          userRepository.updateStatusNotification(user._id, JSON.stringify(req.body));

          res.status(200).json(req.body);
     }
}
