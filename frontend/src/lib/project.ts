"use server";

import { revalidateTag } from "next/cache";

import { NewProject, Project } from "@/validators/project";

import { getAuthHeader } from "@/lib/auth";
import { config } from "@/lib/config";

export const getProjects = async (): Promise<Project[]> => {
    try {
        const response = await fetch(config.apiUrl + "/projects", {
            headers: {
                "Content-Type": "application/json",
                ...(await getAuthHeader()),
            },
            next: {
                tags: ["project"],
            },
        });

        if (!response.ok) {
            throw new Error((await response.json()).error);
        }

        return (await response.json()) as Project[];
    } catch (error: unknown) {
        throw error;
    }
};

export const getProject = async (id: string): Promise<Project> => {
    try {
        const response = await fetch(config.apiUrl + "/projects/" + id, {
            headers: {
                "Content-Type": "application/json",
                ...(await getAuthHeader()),
            },
            next: {
                tags: ["project"],
            },
        });

        if (!response.ok) {
            throw new Error((await response.json()).error);
        }

        return (await response.json()) as Project;
    } catch (error: unknown) {
        throw error;
    }
};

export const createProject = async (
    newProject: NewProject
): Promise<Project> => {
    try {
        const response = await fetch(config.apiUrl + "/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(await getAuthHeader()),
            },
            body: JSON.stringify(newProject),
        });

        if (!response.ok) {
            throw new Error((await response.json()).error);
        }

        revalidateTag("project");
        return (await response.json()) as Project;
    } catch (error: unknown) {
        throw error;
    }
};
