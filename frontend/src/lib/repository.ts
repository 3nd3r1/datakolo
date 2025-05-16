"use server";

import { revalidateTag } from "next/cache";

import {
    NewRepository,
    Repository,
    RepositoryUpdate,
    repositorySchema,
} from "@/validators/repository";

import { apiRequest } from "./api";
import {
    ServerActionResult,
    createErrorResult,
    createSuccessResult,
} from "./utils";

export const getRepositories = async (
    projectId: string
): Promise<ServerActionResult<Repository[]>> => {
    const response = await apiRequest(`/projects/${projectId}/repositories`, {
        tags: ["repository"],
    });

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
    const response = await apiRequest(
        `/projects/${projectId}/repositories/${id}`,
        {
            tags: ["repository"],
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
    const response = await apiRequest(`/projects/${projectId}/repositories`, {
        method: "POST",
        cache: "no-cache",
        body: newRepository,
    });

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
    const response = await apiRequest(
        `/projects/${projectId}/repositories/${id}`,
        {
            method: "PUT",
            cache: "no-cache",
            body: repositoryUpdate,
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
