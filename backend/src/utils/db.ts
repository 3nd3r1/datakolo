import mongoose from "mongoose";

import { config } from "@/utils/config.ts";
import { logger } from "@/utils/logger.ts";

const connectDatabase = async () => {
    if (config.environment === "test" || !config.db.url) return;

    try {
        await mongoose.connect(config.db.url);
        logger.info("MongoDB connected successfully");
    } catch (error) {
        logger.error("MongoDB connection failed", error);
        throw error;
    }
};

export default connectDatabase;
