import mongoose from "mongoose";
import { hashPassword } from "@/utils/hash.ts";

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

export const seedDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }

    const seedUsers = [
        {
            username: "John",
            password: await hashPassword("password"),
        },
        {
            username: "Jane",
            password: await hashPassword("password1"),
        },
    ];

    await mongoose.connection.collection("users").insertMany(seedUsers);

    const user = await mongoose.connection.collection("users").findOne();
    if (!user) {
        throw new Error("Something went wrong");
    }

    const seedProject = [
        {
            name: "Project 1",
            createdBy: user._id,
        },
        {
            name: "Project 2",
            createdBy: user._id,
        },
    ];

    await mongoose.connection.collection("projects").insertMany(seedProject);
};
