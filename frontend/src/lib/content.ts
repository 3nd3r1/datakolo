"use server";

import { cache } from "react";

import axios from "axios";

import { Content, NewContent } from "@/validators/content";

import { getAuthHeader } from "@/lib/auth";
import { config } from "@/lib/config";

export const getContents = cache(
    async (projectId: string, repositoryId: string): Promise<Content[]> => {
        try {
            const response = await axios.get(
                `${config.apiUrl}/projects/${projectId}/repositories/${repositoryId}/contents`,
                {
                    headers: await getAuthHeader(),
                }
            );
            return response.data as Content[];
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                throw new Error(error.response.data.error);
            }

            throw error;
        }
    }
);

export const getContent = cache(
    async (
        projectId: string,
        repositoryId: string,
        id: string
    ): Promise<Content | undefined> => {
        try {
            const response = await axios.get(
                `${config.apiUrl}/projects/${projectId}/repositories/${repositoryId}/contents/${id}`,
                {
                    headers: await getAuthHeader(),
                }
            );
            return response.data as Content;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                throw new Error(error.response.data.error);
            }

            throw error;
        }
    }
);

export const createContent = async (
    projectId: string,
    repositoryId: string,
    newContent: NewContent
): Promise<Content> => {
    try {
        const response = await axios.post(
            `${config.apiUrl}/projects/${projectId}/repositories/${repositoryId}/contents`,
            newContent,
            {
                headers: await getAuthHeader(),
            }
        );
        return response.data as Content;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.error) {
            throw new Error(error.response.data.error);
        }

        throw error;
    }
};
