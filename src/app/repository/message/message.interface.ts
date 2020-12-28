import { Document } from "mongoose";

export interface IMessage {
     to: string;
     from: string;
     message: string;
     created_at?: number;
};

export interface IMessageMongo extends IMessage, Document {}
