import { model, Schema } from "mongoose";

const projectSchema = new Schema({
    name: { type: String, required: true, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default model("Project", projectSchema);
