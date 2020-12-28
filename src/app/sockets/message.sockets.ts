// Import modules
import SocketIO from "socket.io";

// Import >> Postman Message <<
import { PostmanMessage } from "./helpers/postmanMessage.helper";
const postmanMessage = new PostmanMessage();

export function messageSocket(socket: SocketIO.Server) {
     socket.on("connection", (io: SocketIO.Socket) => {
          // Event responsible for joining the session to the user when authenticated.
          io.on("join", (data: { id: string }) => {
               io.join(data.id);
          });

          // Event responsible for issuing the messages to the corresponding sockets.
          io.on("send-message", (payload: any) => {
               postmanMessage.deliverMessage(socket, payload);
          });
     });
}
