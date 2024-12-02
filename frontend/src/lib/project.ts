"use server";

import { cache } from "react";
import axios from "axios";

import { config } from "@/lib/config";
import { getAuthHeader } from "@/lib/auth";
import { Project } from "@/types/project";

export const getProjects = cache(async (): Promise<Project[]> => {
    try {
        const response = await axios.get(config.apiUrl + "/projects", {
            headers: await getAuthHeader(),
        });
        return response.data as Project[];
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.error) {
            throw new Error(error.response.data.error);
        }

        throw error;
    }
});
