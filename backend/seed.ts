import mongoose from "npm:mongoose";

import User from "./src/models/user.ts";

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
            name: "John",
            password: "password",
        },
        {
            name: "Jane",
            password: "password",
        },
    ];

    console.log("Seeding users");
    await User.insertMany(seedUsers);

    console.log("Seeded successfully");
    await mongoose.disconnect();
}

seed().catch((error) => {
    console.error(error);
    mongoose.disconnect();
});
