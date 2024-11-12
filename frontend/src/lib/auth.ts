"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import axios from "axios";

import { config } from "@/lib/config";

export const getAuthHeader = async (): Promise<
    | {
          authorization: string;
      }
    | {} // eslint-disable-line @typescript-eslint/no-empty-object-type
> => {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return {};
    }

    return { authorization: `Bearer ${token}` };
};

export const setAuthToken = async (token: string) => {
    (await cookies()).set("token", token, { path: "/" });
};

export const getUser = cache(async () => {
    try {
        const response = await axios.get(config.apiUrl + "/user", {
            headers: await getAuthHeader(),
        });
        return response.data;
    } catch (error: unknown) {
        if (!axios.isAxiosError(error) || error.response === undefined) {
            throw error;
        }

        if (error.response.data.error) {
            throw new Error(error.response.data.error);
        }
    }
});

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(config.apiUrl + "/login", {
            username,
            password,
        });
        await setAuthToken(response.data.token);
    } catch (error: unknown) {
        if (!axios.isAxiosError(error) || error.response === undefined) {
            throw error;
        }

        if (error.response.data.error) {
            throw new Error(error.response.data.error);
        }
    }
};
