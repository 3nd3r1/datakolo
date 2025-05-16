"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { NewUser, User, userSchema } from "@/validators/user";

import {
    ServerActionResult,
    createErrorResult,
    createSuccessResult,
} from "@/lib/utils";

import { apiRequest } from "./api";

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

export const deleteAuthToken = async () => {
    (await cookies()).delete("token");
};

export const getUser = async (): Promise<ServerActionResult<User>> => {
    const response = await apiRequest("/user", {
        cache: "no-cache",
    });

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    return createSuccessResult<User>(userSchema.parse(await response.json()));
};

export const login = async (
    username: string,
    password: string
): Promise<ServerActionResult<void>> => {
    const response = await apiRequest("/login", {
        method: "POST",
        cache: "no-cache",
        body: { username, password },
    });

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    await setAuthToken((await response.json()).token);
    return createSuccessResult();
};

export const register = async (
    newUser: NewUser
): Promise<ServerActionResult<void>> => {
    const response = await apiRequest("/register", {
        method: "POST",
        cache: "no-cache",
        body: newUser,
    });

    if (!response.ok) {
        return createErrorResult((await response.json()).error);
    }

    await setAuthToken((await response.json()).token);
    return createSuccessResult();
};

export const logout = async () => {
    await deleteAuthToken();
    redirect("/login");
};
