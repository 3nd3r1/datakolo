import mongoose from "mongoose";

import User from "@/models/user.ts";
import Project from "@/models/project.ts";
import { hashPassword } from "@/utils/hash.ts";
import { NewProject } from "@/validators/project.ts";
import { NewUser } from "@/validators/user.ts";

const connectDatabase = async () => {
    const databaseUrl = Deno.env.get("DATABASE_URL");
    if (!databaseUrl) {
        console.error("DATABASE_URL is not set");
        Deno.exit(1);
    }

    console.log(`Connecting to ${databaseUrl}`);
    await mongoose.connect(databaseUrl);
};

const clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};

const seedUsers = async () => {
    const seedUsers: NewUser[] = [
        {
            username: "John",
            password: await hashPassword("password"),
        },
        {
            username: "Jane",
            password: await hashPassword("password"),
        },
    ];

    console.log("Seeding users");
    await User.insertMany(seedUsers);
};

const seedProjects = async () => {
    const john = await User.findOne({ username: "John" });
    if (!john) {
        throw new Error("John user didn't exist");
    }
    const johnId = john._id.toString();

    const seedProjects: NewProject[] = [
        {
            name: "Test Project 1",
            createdBy: johnId,
        },
        {
            name: "Test Project 2",
            createdBy: johnId,
        },
    ];

    console.log("Seeding projects");
    await Project.insertMany(seedProjects);
};

async function seed() {
    await connectDatabase();
    await clearDatabase();
    await seedUsers();
    await seedProjects();

    console.log("Seeded successfully");
    await mongoose.disconnect();
}

seed().catch((error) => {
    console.error(error);
    mongoose.disconnect();
});
