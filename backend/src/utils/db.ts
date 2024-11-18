import mongoose from "mongoose";

import { config } from "@/utils/config.ts";

const connectDatabase = async () => {
    if (config.environment === "test") return;

    try {
        await mongoose.connect(config.db.url);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed", error);
        Deno.exit(1); // Exit the process with an error code
    }
};

export default connectDatabase;
