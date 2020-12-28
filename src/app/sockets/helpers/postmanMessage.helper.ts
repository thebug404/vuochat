// Import modules
import SocketIO from "socket.io";

// Import webpush
import { webpush } from "../../config/webpush";

// Import >> Interfaces <<
import { IMessageParams } from "../interfaces/sockets.interface";

// Import >> Message Service <<
import { MessageService } from "./messageService.helper";

import { UserRepository } from "../../repository/user/user.repository";
const userRepository = new UserRepository();

export class PostmanMessage extends MessageService {
     /**
      * Method in charge of notifying users 
      * of a new message.
     */
     public async deliverMessage(socket: SocketIO.Server, message: IMessageParams) {
          // Save chat
          const chat = await super.saveChat(message);

          // Send notification.
          this.sendNotification(message);
          
          // Send message to clients
          for (let participate of message.participates) {
               socket.to(participate).emit("received-message", chat);
          }
     }

     private async sendNotification(message: IMessageParams) {
          const sender = await userRepository.findById(message.from);
          const receiver = await userRepository.findById(message.to);

          const notification = JSON.parse(receiver.notification);
          const payload = JSON.stringify({
               title: sender.name,
               body: message.message,
               icon: sender.picture,
               badge: "/icons/logo.svg"
          });
          
          webpush.sendNotification(notification, payload);
     }
}
