import mongoose from "mongoose";

import User from "@/models/user.ts";
import Project from "@/models/project.ts";
import { hashPassword } from "@/utils/hash.ts";
import { NewUser } from "@/validators/user.ts";
import { NewProject } from "@/validators/project.ts";

export const connectDatabase = async () => {
    const dbUrl = Deno.env.get("TEST_DATABASE_URL");
    if (!dbUrl) {
        throw new Error(
            "TEST_DATABASE_URL is not set in the environment variables",
        );
    }

    await mongoose.connect(dbUrl);
};

export const closeDatabase = async () => {
    await mongoose.disconnect();
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
            password: await hashPassword("password1"),
        },
    ];

    await User.insertMany(seedUsers);
};

const seedProjects = async () => {
    const john = await mongoose.connection
        .collection("users")
        .findOne({ username: "John" });
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

    await Project.insertMany(seedProjects);
};

export const seedDatabase = async () => {
    await clearDatabase();
    await seedUsers();
    await seedProjects();
};
