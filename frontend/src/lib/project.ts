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

import {
    ServerActionResult,
    createErrorResult,
    createSuccessResult,
} from "@/lib/utils";

import { apiRequest } from "./api";

export const getProjects = async (): Promise<ServerActionResult<Project[]>> => {
    const response = await apiRequest("/projects", {
        tags: ["project"],
    });

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    const projects = (await response.json()).map((project: unknown) =>
        projectSchema.parse(project)
    );
    return createSuccessResult<Project[]>(projects);
};

export const getProject = async (
    id: string
): Promise<ServerActionResult<Project>> => {
    const response = await apiRequest(`/projects/${id}`, {
        tags: ["project"],
    });

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    return createSuccessResult<Project>(
        projectSchema.parse(await response.json())
    );
};

export const createProject = async (
    newProject: NewProject
): Promise<ServerActionResult<Project>> => {
    const response = await apiRequest("/projects", {
        method: "POST",
        cache: "no-cache",
        body: newProject,
    });

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    revalidateTag("project");
    return createSuccessResult<Project>(
        projectSchema.parse(await response.json())
    );
};

export const updateProject = async (
    id: string,
    projectUpdate: ProjectUpdate
): Promise<ServerActionResult<Project>> => {
    const response = await apiRequest(`/projects/${id}`, {
        method: "PUT",
        cache: "no-cache",
        body: projectUpdate,
    });

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    revalidateTag("project");
    return createSuccessResult<Project>(
        projectSchema.parse(await response.json())
    );
};

export const getProjectApiKey = async (
    id: string
): Promise<ServerActionResult<ProjectApiKey | undefined>> => {
    const response = await apiRequest(`/projects/${id}/api-key`, {
        cache: "no-cache",
    });

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    const data = await response.json();

    if (!data.apiKey || !data.apiKeyGeneratedAt) {
        return createSuccessResult<ProjectApiKey | undefined>(undefined);
    }

    return createSuccessResult<ProjectApiKey | undefined>(
        projectApiKeySchema.parse(data)
    );
};

export const generateProjectApiKey = async (
    id: string
): Promise<ServerActionResult<ProjectApiKey>> => {
    const response = await apiRequest(`/projects/${id}/generate-api-key`, {
        method: "POST",
        cache: "no-cache",
    });

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    return createSuccessResult<ProjectApiKey>(
        projectApiKeySchema.parse(await response.json())
    );
};

export const revokeProjectApiKey = async (
    id: string
): Promise<ServerActionResult<void>> => {
    const response = await apiRequest(`/projects/${id}/revoke-api-key`, {
        method: "DELETE",
        cache: "no-cache",
    });

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    return createSuccessResult();
};
