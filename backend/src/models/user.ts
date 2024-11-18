import { model, Schema } from "mongoose";

import { hashPassword, verifyPassword } from "../utils/hash.ts";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    if (!this.password) return next();

    this.password = await hashPassword(this.password);
    next();
});

userSchema.methods.comparePassword = async function (password: string) {
    return await verifyPassword(password, this.password);
};

export default model("User", userSchema);
