"use server";

import { revalidateTag } from "next/cache";

import {
    NewRepository,
    Repository,
    RepositoryUpdate,
} from "@/validators/repository";

import { getAuthHeader } from "@/lib/auth";
import { config } from "@/lib/config";

export const getRepositories = async (
    projectId: string
): Promise<Repository[]> => {
    try {
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
            throw new Error((await response.json()).error);
        }

        return (await response.json()) as Repository[];
    } catch (error: unknown) {
        throw error;
    }
};

export const getRepository = async (
    projectId: string,
    id: string
): Promise<Repository> => {
    try {
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
            throw new Error((await response.json()).error);
        }

        return (await response.json()) as Repository;
    } catch (error: unknown) {
        throw error;
    }
};

export const createRepository = async (
    projectId: string,
    newRepository: NewRepository
): Promise<Repository> => {
    try {
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
            throw new Error((await response.json()).error);
        }

        revalidateTag("repository");
        return (await response.json()) as Repository;
    } catch (error: unknown) {
        throw error;
    }
};

export const updateRepository = async (
    projectId: string,
    id: string,
    repositoryUpdate: RepositoryUpdate
): Promise<Repository> => {
    try {
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
            throw new Error((await response.json()).error);
        }

        revalidateTag("repository");
        return (await response.json()) as Repository;
    } catch (error: unknown) {
        throw error;
    }
};
