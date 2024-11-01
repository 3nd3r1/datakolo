import { model, Schema } from "npm:mongoose";

const userSchema = new Schema({
    id: String,
    name: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.path("name").required(true, "name is required");

export default model("User", userSchema);
