import { createHttpError } from "oak";

import {
    toNewUser,
    toNonSensitiveUser,
    ValidationError,
} from "@/validators/user.ts";
import { generateUserToken } from "@/utils/jwt.ts";
import userService, { DuplicateUserError } from "@/services/user.ts";
import { AppContext } from "@/utils/oak.ts";

export const register = async (ctx: AppContext) => {
    const body = await ctx.request.body.json();

    try {
        const newUser = toNewUser(body);
        const createdUser = await userService.createUser(newUser);
        const token = await generateUserToken(createdUser.id);
        ctx.response.body = { token };
    } catch (error: unknown) {
        if (error instanceof ValidationError) {
            throw createHttpError(400, error.message);
        }

        if (error instanceof DuplicateUserError) {
            throw createHttpError(400, "Username is already in use");
        }

        throw error;
    }
};

export const login = async (ctx: AppContext) => {
    const body = await ctx.request.body.json();

    const { username, password } = body;

    if (!(await userService.verifyUserPassword(username, password))) {
        throw createHttpError(401, "Invalid credentials");
    }

    const user = await userService.getUserByUsername(username);
    if (!user) {
        throw createHttpError(401, "Invalid credentials");
    }

    const token = await generateUserToken(user.id);
    ctx.response.body = { token };
};

export const user = (ctx: AppContext) => {
    const user = ctx.state.user;
    if (!user) return;

    ctx.response.body = toNonSensitiveUser(user);
};
