import { z } from "zod";

const EnvSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default(
        "development",
    ),
    DATABASE_URL: z.string().optional(),
    PORT: z.string().transform(Number).default("8000"),
    LOG_LEVEL: z.enum(["DEBUG", "INFO", "WARN", "ERROR"]).default("INFO"),
}).refine((data) => {
    return data.NODE_ENV === "test" || Boolean(data.DATABASE_URL);
}, {
    message: "DATABASE_URL is required",
    path: ["DATABASE_URL"],
});

function loadEnv() {
    try {
        const result = EnvSchema.safeParse(Deno.env.toObject());

        if (!result.success) {
            console.error(
                "Environment validation failed:",
                result.error.format(),
            );
            throw new Error("Invalid environment configuration");
        }

        return result.data;
    } catch (error) {
        console.error("Failed to load environment variables:", error);
        Deno.exit(1);
    }
}

const env = loadEnv();

export const config = {
    environment: env.NODE_ENV,
    db: {
        url: env.DATABASE_URL,
    },
    server: {
        port: env.PORT,
    },
    logging: {
        level: env.LOG_LEVEL,
    },
};
