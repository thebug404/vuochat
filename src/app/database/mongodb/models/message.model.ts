// Import module
import mongoose from "mongoose";

// Import models
import { IMessageMongo } from "../../../repository/message/message.interface";

// Create >> Message Schema <<
const messageSchema = new mongoose.Schema({
     from: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
     to: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
     message: { type: String, required: true },
     created_at: { type: Number, default: () => Date.now() }
});

export const Message = mongoose.model<IMessageMongo>("messages", messageSchema);
