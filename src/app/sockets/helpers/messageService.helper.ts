// Import >> Interfaces <<
import { IMessageMongo } from "../../repository/message/message.interface";
import { IMessageParams } from "../interfaces/sockets.interface";

// Import >> Chat Repository <<
import { ChatRepository } from "../../repository/chats/chat.repository";
const chatRepository = new ChatRepository();

// Import >> Message Repository <<
import { MessageRepository } from "../../repository/message/message.repository";
const messageRepository = new MessageRepository();

export class MessageService {
     /**
      * Method in charge of creating a conversation or 
      * updating it according to its status.
      * @param {IMessageParams} message 
      */
     public async saveChat(message: IMessageParams) {
          // Save message in the database
          const newMessage = await this.createMessage(message);

          // Verify existence chat
          const chats = await chatRepository.findChatsByParticipates(message.participates);

          // Create or update chat if...
          return !chats.length
          ? await this.createChat(message.participates, newMessage.id)
          : await this.updateChat(chats[0].id, newMessage.id);
     }

     /**
      * Method in charge of creating a conversation and 
      * saving it in the database.
      * @param {string[]} participates 
      * @param {string} messageId 
      */
     private async createChat(participates: string[], messageId: string) {
          return await chatRepository.save({
               participates,
               messages: [messageId]
          });
     }

     /**
      * Method responsible for creating a message.
      * @param {IMessageParams} message 
      */
     private async createMessage(message: IMessageParams): Promise<IMessageMongo> {
          return await messageRepository.save(message);
     }

     /**
      * Method in charge of updating the conversation.
      * @param {string} _id 
      * @param {string} messageId 
      */
     private async updateChat(_id: string, messageId: string) {
          return await chatRepository.updateChatById(_id, messageId);
     }
}
