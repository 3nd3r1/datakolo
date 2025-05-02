"use server";

import { revalidateTag } from "next/cache";

import { Content, NewContent, contentSchema } from "@/validators/content";

import { getAuthHeader } from "@/lib/auth";
import { config } from "@/lib/config";
import {
    ServerActionResult,
    createErrorResult,
    createSuccessResult,
} from "@/lib/utils";

export const getContents = async (
    projectId: string,
    repositoryId: string
): Promise<ServerActionResult<Content[]>> => {
    const response = await fetch(
        `${config.apiUrl}/projects/${projectId}/repositories/${repositoryId}/contents`,
        {
            headers: {
                "Content-Type": "application/json",
                ...(await getAuthHeader()),
            },
            next: {
                tags: ["content"],
            },
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
    const response = await fetch(
        `${config.apiUrl}/projects/${projectId}/repositories/${repositoryId}/contents/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...(await getAuthHeader()),
            },
            next: {
                tags: ["content"],
            },
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
    const response = await fetch(
        `${config.apiUrl}/projects/${projectId}/repositories/${repositoryId}/contents`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(await getAuthHeader()),
            },
            cache: "no-cache",
            body: JSON.stringify(newContent),
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
    const response = await fetch(
        `${config.apiUrl}/projects/${projectId}/repositories/${repositoryId}/contents/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(await getAuthHeader()),
            },
            cache: "no-cache",
            body: JSON.stringify(contentUpdate),
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
