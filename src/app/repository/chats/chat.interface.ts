// Import modules
import { Document } from "mongoose";

export interface IChat {
     participates: string[];
     messages: string[];
     created_at?: number;
     updated_at?: number;
};

export interface IChatMongo extends Document {}
