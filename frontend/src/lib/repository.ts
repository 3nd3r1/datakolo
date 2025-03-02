"use server";

import { cache } from "react";
import axios from "axios";

import { config } from "@/lib/config";
import { getAuthHeader } from "@/lib/auth";
import { NewRepository, Repository } from "@/validators/repository";

//TODO: Revalidate tags and leave axios

export const getRepositories = cache(
    async (projectId: string): Promise<Repository[]> => {
        try {
            const response = await axios.get(
                `${config.apiUrl}/projects/${projectId}/repositories`,
                {
                    headers: await getAuthHeader(),
                }
            );
            return response.data as Repository[];
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                throw new Error(error.response.data.error);
            }

            throw error;
        }
    }
);

export const getRepository = cache(
    async (projectId: string, id: string): Promise<Repository | undefined> => {
        try {
            const response = await axios.get(
                `${config.apiUrl}/projects/${projectId}/repositories/${id}`,
                {
                    headers: await getAuthHeader(),
                }
            );
            return response.data as Repository;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                throw new Error(error.response.data.error);
            }

            throw error;
        }
    }
);

export const createRepository = async (
    projectId: string,
    newRepository: NewRepository
): Promise<Repository> => {
    try {
        const response = await axios.post(
            `${config.apiUrl}/projects/${projectId}/repositories`,
            newRepository,
            {
                headers: await getAuthHeader(),
            }
        );
        return response.data as Repository;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.error) {
            throw new Error(error.response.data.error);
        }

        throw error;
    }
};

export const updateRepository = async (
    projectId: string,
    id: string,
    repositoryUpdate: Partial<NewRepository>
): Promise<Repository> => {
    try {
        const response = await axios.put(
            `${config.apiUrl}/projects/${projectId}/repositories/${id}`,
            repositoryUpdate,
            {
                headers: await getAuthHeader(),
            }
        );
        return response.data as Repository;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.error) {
            throw new Error(error.response.data.error);
        }

        throw error;
    }
};
