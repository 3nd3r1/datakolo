import { Document } from "mongoose";
import { model, Schema } from "mongoose";

export interface IProject extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    apiKey?: string;
    createdBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
    {
        _id: { type: Schema.Types.ObjectId, required: true, auto: true },
        name: { type: String, required: true, unique: true },
        apiKey: { type: String, sparse: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true },
);

export default model<IProject>("Project", projectSchema);
