// Imports modules
import express from "express";

// Import >> User Repository <<
import { UserRepository } from "../../repository/user/user.repository";
const userRepository = new UserRepository();

// Import >> Message Repository <<
import { ChatRepository } from "../../repository/chats/chat.repository";
const chatRepository = new ChatRepository();

export class ProfileControllerComponent {
     /**
      * Controller in charge of displaying the user's dashboard.
      * @param req 
      * @param res 
      */
     public async dashboard(req: express.Request, res: express.Response) {
          const user: any = req.user;

          // Get chats
          const chats = await chatRepository.findChatsByParticipates([user._id], 1);

          res.render("profile/dashboard", {
               user: req.user,
               panels: chats,
               message: req.flash("text"),
               status: req.flash("status")
          });
     }

     /**
      * Controller in charge of displaying registered users.
      * @param req 
      * @param res 
      */
     public async users(req: express.Request, res: express.Response) {
          const user: any = req.user;
          const query: any = req.query;

          // Get chats
          const chats = await chatRepository.findChatsByParticipates([user._id], 1);

          // Get all users
          try {
               const users = await userRepository.getUsersLessTo(user._id, query.limit, query.page);
               res.render("profile/users", {
                    user,
                    users,
                    panels: chats
               });
          } catch (error) {
               res.redirect("/profile");
          }
     }

     /**
      * Controller in charge of displaying the chat.
      * @param req 
      * @param res 
      */
     public async chat(req: express.Request, res: express.Response) {
          try {
               const params = req.params.id;
               const user: any = req.user;

               // Get user
               const partner = await userRepository.findById(params);

               // Get chat
               const chats = await chatRepository.findChatsByParticipates([user._id, params], 25);

               // Get panels
               const panels = await chatRepository.findChatsByParticipates([user._id], 1);

               if (!partner) {
                    // Add flash message
                    req.flash("text", "El usuario con el que intentaste iniciar una conversacion no existe");
                    req.flash("status", "danger");

                    return res.redirect("/profile");
               }

               res.render("profile/chat", {
                    user,
                    partner,
                    chat: chats[0],
                    panels
               });
          } catch (error) {
               // Add flash message
               req.flash("text", "Sucedio un error durante la operacion, intentelo mas tarde");
               req.flash("status", "danger");

               res.redirect("/profile");
          }
     }
}
