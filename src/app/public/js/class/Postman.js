// Import ChatUI
import { ChatUI } from "./Chat-UI";
import { PanelUI } from "./Panel-UI";

export class Postman {
     /**
      * 
      * @param {string} user_id 
      */
     constructor(user_id) {
          this.socket = io();
          this.user_id = user_id;

          this.connect();
          this.listenNewMessage();
     }

     /**
      * Method that joins us to the session.
      */
     connect() {
          this.socket.emit("join", {
               id: this.user_id
          });
     }

     /**
      * Responsible method of listening to new messages.
      */
     listenNewMessage() {
          this.socket.on("received-message", data => {
               const participate = data.participates.find(participate => participate._id != this.user_id);
               const message = data.messages[0];

               // Write new message in the panel chat.
               const panelUI = new PanelUI();
               panelUI.writeElementDOM(participate, message);

               // Write new message in the current chat.
               const chatUI = new ChatUI(this.user_id);
               chatUI.writeElementDOM(message);
          });
     }

     /**
      * Responsible method of sending the message to the server.
      * @param {string} from 
      * @param {string} to 
      * @param {string} message 
      */
     send(from, to, message) {
          const participates = [from, to];
          this.socket.emit("send-message", {
               participates,
               from,
               to,
               message
          });
     }
}
