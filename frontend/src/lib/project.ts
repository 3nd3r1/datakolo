"use server";

import { revalidateTag } from "next/cache";

import {
    NewProject,
    Project,
    ProjectApiKey,
    ProjectUpdate,
    projectApiKeySchema,
    projectSchema,
} from "@/validators/project";

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

    const data = await response.json();

    return data.map((project: unknown) => projectSchema.parse(project));
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

    return projectSchema.parse(await response.json());
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
    return projectSchema.parse(await response.json());
};

export const updateProject = async (
    id: string,
    projectUpdate: ProjectUpdate
): Promise<Project> => {
    const response = await fetch(`${config.apiUrl}/projects/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(await getAuthHeader()),
        },
        cache: "no-cache",
        body: JSON.stringify(projectUpdate),
    });

    if (!response.ok) {
        throw new Error(
            (await response.json()).error || "Something went wrong"
        );
    }

    revalidateTag("project");
    return projectSchema.parse(await response.json());
};

export const getProjectApiKey = async (
    id: string
): Promise<ProjectApiKey | undefined> => {
    const response = await fetch(`${config.apiUrl}/projects/${id}/api-key`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(await getAuthHeader()),
        },
        cache: "no-cache",
    });

    if (!response.ok) {
        throw new Error((await response.json()).error);
    }

    const data = await response.json();

    if (!data.apiKey || !data.apiKeyGeneratedAt) {
        return undefined;
    }

    return projectApiKeySchema.parse(data);
};

export const generateProjectApiKey = async (
    id: string
): Promise<ProjectApiKey> => {
    const response = await fetch(
        `${config.apiUrl}/projects/${id}/generate-api-key`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(await getAuthHeader()),
            },
            cache: "no-cache",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
    }

    return projectApiKeySchema.parse(data);
};

export const revokeProjectApiKey = async (id: string): Promise<void> => {
    const response = await fetch(
        `${config.apiUrl}/projects/${id}/revoke-api-key`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...(await getAuthHeader()),
            },
            cache: "no-cache",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
    }
};
