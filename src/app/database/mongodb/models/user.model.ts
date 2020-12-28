// Import module
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Create >> User schema <<
const schema = new mongoose.Schema({
    name: { type: String, required: true },
    provider: { type: String, required: true },
    username: { type: String, required: true },
    picture: { type: String, required: true },
    oauthId: { type: String, required: true },
    notification: { type: String, required: false },
    password: { type: String, required: false },
    created_at: { type: Number, default: () => Date.now() },
    updated_at: { type: Number, default: () => Date.now() }
});

// Add paginate
schema.plugin(mongoosePaginate);

export const User = mongoose.model("users", schema);
