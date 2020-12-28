// Import model
import { models } from "../../database/mongodb/mongodb";

// Import >> Interface <<
import { IChat, IChatMongo } from "./chat.interface";

export class ChatRepository {
     /**
      * Responsible method of saving a chat in the database
      * @param chat 
      */
     public async save(chat: IChat) {
          const newChat: IChatMongo = await new models.Chat(chat).save();
          return await this.populateChat(newChat, {});
     }

     public async findChatsByParticipates(participates: string[], limit: number = 50) {
          const chats = await models.Chat.find({
               participates: { $all: participates }
          }).sort({ updated_at: -1 });
          
          let conversations: IChatMongo[] = [];

          for (let chat of chats) {
               const data = await this.populateChat(chat, { limit });
               conversations.push(data);
          }

          return conversations;
     }

     public async findChatById(
          _id: string,
          limit: number = 50
     ) {
          const chat = await models.Chat.findById(_id);
          return chat ? await this.populateChat(chat, { limit }) : null;
     }

     public async updateChatById(_id: string, messageId: string) {
          // Update chat
          await models.Chat.updateOne(
               { _id },
               {
                    $push: { messages: messageId },
                    $set: { updated_at: Date.now() }
               }
          );

          // Get current chat
          const chat = await models.Chat.findById(_id).sort({ updated_at: -1 });

          return chat
          ? await this.populateChat(chat, { limit: 1 })
          : null;
     }

     /**
      * Responsible method of populating chats
      * @param chat 
      * @param options 
      */
     private async populateChat(chat: IChatMongo, options?: any) {
          return await chat
          .populate({
               path: "participates",
               select: { password: 0 }
          })
          .populate({
               path: "messages",
               options: {
                    limit: options.limit,
                    sort: { created_at: -1 }
               }
          })
          .execPopulate();
     }
}