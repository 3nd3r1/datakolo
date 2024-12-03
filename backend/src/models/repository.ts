import { Document } from "mongoose";
import { model, Schema } from "mongoose";

export interface IRepository extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    contentSchema: Record<string, unknown>;
    createdBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const repositorySchema = new Schema<IRepository>(
    {
        _id: { type: Schema.Types.ObjectId, required: true, auto: true },
        name: { type: String, required: true },
        contentSchema: { type: Schema.Types.Mixed, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true },
);

export default model<IRepository>("Repository", repositorySchema);
