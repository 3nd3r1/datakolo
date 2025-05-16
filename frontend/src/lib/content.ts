"use server";

import { revalidateTag } from "next/cache";

import { Content, NewContent, contentSchema } from "@/validators/content";

import {
    ServerActionResult,
    createErrorResult,
    createSuccessResult,
} from "@/lib/utils";

import { apiRequest } from "./api";

export const getContents = async (
    projectId: string,
    repositoryId: string
): Promise<ServerActionResult<Content[]>> => {
    const response = await apiRequest(
        `/projects/${projectId}/repositories/${repositoryId}/contents`,
        {
            tags: ["content"],
        }
    );

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    const contents = (await response.json()).map((content: unknown) =>
        contentSchema.parse(content)
    );

    return createSuccessResult<Content[]>(contents);
};

export const getContent = async (
    projectId: string,
    repositoryId: string,
    id: string
): Promise<ServerActionResult<Content>> => {
    const response = await apiRequest(
        `/projects/${projectId}/repositories/${repositoryId}/contents/${id}`,
        {
            tags: ["content"],
        }
    );
    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    return createSuccessResult<Content>(
        contentSchema.parse(await response.json())
    );
};

export const createContent = async (
    projectId: string,
    repositoryId: string,
    newContent: NewContent
): Promise<ServerActionResult<Content>> => {
    const response = await apiRequest(
        `/projects/${projectId}/repositories/${repositoryId}/contents`,
        {
            method: "POST",
            cache: "no-cache",
            body: newContent,
        }
    );

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    revalidateTag("content");
    return createSuccessResult<Content>(
        contentSchema.parse(await response.json())
    );
};

export const updateContent = async (
    projectId: string,
    repositoryId: string,
    id: string,
    contentUpdate: Partial<NewContent>
): Promise<ServerActionResult<Content>> => {
    const response = await apiRequest(
        `/projects/${projectId}/repositories/${repositoryId}/contents/${id}`,
        {
            method: "PUT",
            cache: "no-cache",
            body: contentUpdate,
        }
    );

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    revalidateTag("content");
    return createSuccessResult<Content>(
        contentSchema.parse(await response.json())
    );
};
