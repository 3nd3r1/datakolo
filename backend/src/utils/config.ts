if (!Deno.env.get("DATABASE_URL")) {
    throw new Error("DATABASE_URL is not set in the environment variables");
}

export const config = {
    environment: Deno.env.get("NODE_ENV") || "development",
    db: {
        url: Deno.env.get("DATABASE_URL") || "",
    },
    server: {
        port: Number(Deno.env.get("PORT")) || 8000,
    },
};
