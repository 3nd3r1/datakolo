"use server";

import { cookies } from "next/headers";

import { NewUser, User } from "@/validators/user";

import { config } from "@/lib/config";
import {
    ServerActionResult,
    createErrorResult,
    createSuccessResult,
} from "@/lib/utils";

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

export const getUser = async (): Promise<ServerActionResult<User>> => {
    const response = await fetch(config.apiUrl + "/user", {
        headers: {
            "Content-Type": "application/json",
            ...(await getAuthHeader()),
        },
        cache: "no-cache",
    });

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    return createSuccessResult((await response.json()) as User);
};

export const login = async (username: string, password: string) => {
    try {
        const response = await fetch(config.apiUrl + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error((await response.json()).error);
        }

        await setAuthToken((await response.json()).token);
    } catch (error: unknown) {
        throw error;
    }
};

export const register = async (newUser: NewUser) => {
    try {
        const response = await fetch(config.apiUrl + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            throw new Error((await response.json()).error);
        }

        await setAuthToken((await response.json()).token);
    } catch (error: unknown) {
        throw error;
    }
};

export const logout = async () => {
    (await cookies()).delete("token");
};
