// Import module
import mongoose from "mongoose";

// Import >> Chat interface <<
import { IChatMongo } from "../../../repository/chats/chat.interface";

// Create >> Chat Schema <<
const chatSchema = new mongoose.Schema({
     participates: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
     messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "messages" }],
     created_at: { type: Number, default: () => Date.now() },
     updated_at: { type: Number, default: () => Date.now() }
});

// Export model
export const Chat = mongoose.model<IChatMongo>("chats", chatSchema);
