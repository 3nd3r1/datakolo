import mongoose from "mongoose";

import { seedDatabase } from "./tests/integration/db.ts";

const connectDatabase = async () => {
    const databaseUrl = Deno.env.get("DATABASE_URL");
    if (!databaseUrl) {
        console.error("DATABASE_URL is not set");
        Deno.exit(1);
    }

    console.log(`Connecting to ${databaseUrl}`);
    await mongoose.connect(databaseUrl);
};

async function seed() {
    await connectDatabase();
    await seedDatabase();

    console.log("Seeded successfully");
    await mongoose.disconnect();
}

seed().catch((error) => {
    console.error(error);
    mongoose.disconnect();
});
