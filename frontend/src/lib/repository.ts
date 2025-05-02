"use server";

import { revalidateTag } from "next/cache";

import {
    NewRepository,
    Repository,
    RepositoryUpdate,
    repositorySchema,
} from "@/validators/repository";

import { getAuthHeader } from "@/lib/auth";
import { config } from "@/lib/config";

import {
    ServerActionResult,
    createErrorResult,
    createSuccessResult,
} from "./utils";

export const getRepositories = async (
    projectId: string
): Promise<ServerActionResult<Repository[]>> => {
    const response = await fetch(
        `${config.apiUrl}/projects/${projectId}/repositories`,
        {
            headers: {
                "Content-Type": "application/json",
                ...(await getAuthHeader()),
            },
            next: {
                tags: ["repository"],
            },
        }
    );

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    const repositories = (await response.json()).map((repository: unknown) =>
        repositorySchema.parse(repository)
    );

    return createSuccessResult<Repository[]>(repositories);
};

export const getRepository = async (
    projectId: string,
    id: string
): Promise<ServerActionResult<Repository>> => {
    const response = await fetch(
        `${config.apiUrl}/projects/${projectId}/repositories/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...(await getAuthHeader()),
            },
            next: {
                tags: ["repository"],
            },
        }
    );

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    return createSuccessResult<Repository>(
        repositorySchema.parse(await response.json())
    );
};

export const createRepository = async (
    projectId: string,
    newRepository: NewRepository
): Promise<ServerActionResult<Repository>> => {
    const response = await fetch(
        `${config.apiUrl}/projects/${projectId}/repositories`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(await getAuthHeader()),
            },
            cache: "no-cache",
            body: JSON.stringify(newRepository),
        }
    );

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    revalidateTag("repository");
    return createSuccessResult<Repository>(
        repositorySchema.parse(await response.json())
    );
};

export const updateRepository = async (
    projectId: string,
    id: string,
    repositoryUpdate: RepositoryUpdate
): Promise<ServerActionResult<Repository>> => {
    const response = await fetch(
        `${config.apiUrl}/projects/${projectId}/repositories/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(await getAuthHeader()),
            },
            cache: "no-cache",
            body: JSON.stringify(repositoryUpdate),
        }
    );

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    revalidateTag("repository");
    return createSuccessResult<Repository>(
        repositorySchema.parse(await response.json())
    );
};
