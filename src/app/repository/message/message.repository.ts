// Import models
import { models } from "../../database/mongodb/mongodb";
import { IMessage, IMessageMongo } from "./message.interface";

// Import interface

export class MessageRepository {
     /**
      * Responsible method of saving a message in the database
      * @param message
      * 
     */
     public async save(message: IMessage): Promise<IMessageMongo> {
          return await new models.Message(message).save();
     }
}
