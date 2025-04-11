import { Document, model, Schema } from "mongoose";

export interface IProject extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    apiKey?: string;
    apiKeyGeneratedAt?: Date;
    createdBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
    {
        _id: { type: Schema.Types.ObjectId, required: true, auto: true },
        name: { type: String, required: true, unique: true },
        apiKey: { type: String, sparse: true },
        apiKeyGeneratedAt: { type: Date },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true },
);

projectSchema.pre("save", function (next) {
    if (!this.isModified("apiKey")) return next();
    if (!this.apiKey) return next();

    this.apiKeyGeneratedAt = new Date();
    next();
});

projectSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();

    if (!update || !("apiKey" in update)) return next();

    if (!update.apiKey && update.$unset && "apiKey" in update.$unset) {
        update.$unset = {
            ...update.$unset,
            apiKeyGeneratedAt: "",
        };
        next();
    }

    if (update.apiKey) {
        update.apiKeyGeneratedAt = new Date();
    }

    next();
});

export default model<IProject>("Project", projectSchema);
