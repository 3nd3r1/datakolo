import { Document, Model, model, Schema } from "mongoose";

export interface IProject extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    apiKey?: string;
    apiKeyGeneratedAt?: Date;
    createdBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProjectMethods {
    verifyApiKey(apiKey: string): boolean;
}

type ProjectModel = Model<IProject, Record<string, never>, IProjectMethods>;

const projectSchema = new Schema<IProject, ProjectModel, IProjectMethods>(
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

projectSchema.methods.verifyApiKey = function (apiKey: string) {
    return this.apiKey === apiKey;
};

export default model<IProject, ProjectModel>("Project", projectSchema);
