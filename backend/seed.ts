import mongoose from "npm:mongoose";

import User from "./src/models/user.ts";
import { hashPassword } from "./src/utils/hash.ts";

async function seed() {
    const databaseUrl = Deno.env.get("DATABASE_URL");
    if (!databaseUrl) {
        console.error("DATABASE_URL is not set");
        Deno.exit(1);
    }

    console.log(`Connecting to ${databaseUrl}`);
    await mongoose.connect(databaseUrl);

    const seedUsers = [
        {
            username: "John",
            password: await hashPassword("password"),
        },
        {
            username: "Jane",
            password: await hashPassword("password"),
        },
    ];

    await User.deleteMany({});

    console.log("Seeding users");
    await User.insertMany(seedUsers);

    console.log("Seeded successfully");
    await mongoose.disconnect();
}

seed().catch((error) => {
    console.error(error);
    mongoose.disconnect();
});
