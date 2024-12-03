import { model, Schema } from "mongoose";

import { hashPassword, verifyPassword } from "@/utils/hash.ts";
import { Document } from "mongoose";
import { Model } from "mongoose";

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserMethods {
    comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        _id: { type: Schema.Types.ObjectId, required: true, auto: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true },
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    if (!this.password) return next();

    this.password = await hashPassword(this.password);
    next();
});

userSchema.methods.comparePassword = async function (password: string) {
    return await verifyPassword(password, this.password);
};

export default model<IUser, UserModel>("User", userSchema);
