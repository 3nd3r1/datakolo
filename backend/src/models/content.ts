import { Document } from "mongoose";
import { model, Schema } from "mongoose";

export interface IContent extends Document {
    _id: Schema.Types.ObjectId;
    data: Record<string, unknown>;
    repository: Schema.Types.ObjectId;
    createdBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const contentSchema = new Schema<IContent>(
    {
        _id: { type: Schema.Types.ObjectId, required: true, auto: true },
        data: { type: Schema.Types.Mixed, required: true },
        repository: {
            type: Schema.Types.ObjectId,
            ref: "Repository",
            required: true,
        },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true },
);

export default model<IContent>("Content", contentSchema);
