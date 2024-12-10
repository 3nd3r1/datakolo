import mongoose from "mongoose";

import User from "@/models/user.ts";
import Project from "@/models/project.ts";
import Repository from "@/models/repository.ts";

import { NewUser } from "@/validators/user.ts";
import { NewProject } from "@/validators/project.ts";
import { NewRepository } from "@/validators/repository.ts";

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
    const johnId = await getUserIdByUsername("John");

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

const seedRepositories = async () => {
    const johnId = await getUserIdByUsername("John");
    const projectId = await getProjectIdByName("Test Project 1");

    const seedRepositories: NewRepository[] = [
        {
            name: "Test Repository 1",
            contentSchema: {
                title: { type: "string", required: true },
                content: { type: "string", required: true },
            },
            project: projectId,
            createdBy: johnId,
        },
        {
            name: "Test Repository 2",
            contentSchema: {
                name: { type: "string", required: true },
                price: { type: "number", required: true },
                isAvailable: { type: "boolean" },
            },
            project: projectId,
            createdBy: johnId,
        },
    ];

    await Repository.insertMany(seedRepositories);
};

export const seedDatabase = async () => {
    await clearDatabase();
    await seedUsers();
    await seedProjects();
    await seedRepositories();
};

export const getUserIdByUsername = async (username: string) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error("User not found");
    }
    return user._id.toString();
};

export const getProjectIdByName = async (name: string) => {
    const project = await Project.findOne({ name });
    if (!project) {
        throw new Error("Project not found");
    }
    return project._id.toString();
};

export const getRepositoryIdByNameAndProject = async (
    name: string,
    projectId: string,
) => {
    const repository = await Repository.findOne({ name, project: projectId });
    if (!repository) {
        throw new Error("Repository not found");
    }
    return repository._id.toString();
};
