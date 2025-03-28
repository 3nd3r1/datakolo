"use server";

import { revalidateTag } from "next/cache";

import { NewProject, Project } from "@/validators/project";

import { getAuthHeader } from "@/lib/auth";
import { config } from "@/lib/config";

export const getProjects = async (): Promise<Project[]> => {
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
};

export const getProject = async (id: string): Promise<Project> => {
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
};

export const createProject = async (
    newProject: NewProject
): Promise<Project> => {
    const response = await fetch(config.apiUrl + "/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(await getAuthHeader()),
        },
        cache: "no-cache",
        body: JSON.stringify(newProject),
    });

    if (!response.ok) {
        throw new Error((await response.json()).error);
    }

    revalidateTag("project");
    return (await response.json()) as Project;
};

export const generateApiKey = async (projectId: string): Promise<string> => {
    const response = await fetch(
        `${config.apiUrl}/projects/${projectId}/generate-api-key`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(await getAuthHeader()),
            },
            cache: "no-cache",
        }
    );

    if (!response.ok) {
        throw new Error((await response.json()).error);
    }

    const data = await response.json();
    if (!data.apiKey) {
        throw new Error("Something went wrong");
    }

    return data.apikey;
};
