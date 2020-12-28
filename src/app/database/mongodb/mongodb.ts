// Import mongoose
import mongoose from "mongoose";

// Import environment
import { environments } from "../../config/environments";

// Import models
import { User } from "./models/user.model";
import { Message } from "./models/message.model";
import { Chat } from "./models/chat.model";

/**
 * Connect database
*/
mongoose.connect(environments.MONGODB_URI || "", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log("Connect db is successfully"))
.catch(console.error);

/**
 * Export all models in the database
*/
export const models = {
    User,
    Message,
    Chat
};
