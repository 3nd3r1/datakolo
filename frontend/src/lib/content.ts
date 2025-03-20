"use server";

import { revalidateTag } from "next/cache";

import { Content, NewContent } from "@/validators/content";

import { getAuthHeader } from "@/lib/auth";
import { config } from "@/lib/config";

export const getContents = async (
    projectId: string,
    repositoryId: string
): Promise<Content[]> => {
    try {
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
            throw new Error((await response.json()).error);
        }

        return (await response.json()) as Content[];
    } catch (error: unknown) {
        throw error;
    }
};

export const getContent = async (
    projectId: string,
    repositoryId: string,
    id: string
): Promise<Content> => {
    try {
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
            throw new Error(
                (await response.json()).error || "An error occurred"
            );
        }

        return (await response.json()) as Content;
    } catch (error: unknown) {
        throw error;
    }
};

export const createContent = async (
    projectId: string,
    repositoryId: string,
    newContent: NewContent
): Promise<Content> => {
    try {
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
            throw new Error(
                (await response.json()).error || "An error occurred"
            );
        }

        revalidateTag("content");
        return (await response.json()) as Content;
    } catch (error: unknown) {
        throw error;
    }
};

export const updateContent = async (
    projectId: string,
    repositoryId: string,
    id: string,
    contentUpdate: Partial<NewContent>
): Promise<Content> => {
    try {
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
            throw new Error(
                (await response.json()).error || "An error occurred"
            );
        }

        revalidateTag("content");
        return (await response.json()) as Content;
    } catch (error: unknown) {
        throw error;
    }
};
