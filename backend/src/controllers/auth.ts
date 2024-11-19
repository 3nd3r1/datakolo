import { type Context, createHttpError } from "oak";
import { z } from "zod";

import { IUser, toNewUser, toNonSensitiveUser } from "@/validators/user.ts";
import User from "@/models/user.ts";
import { generateUserToken } from "@/utils/jwt.ts";

export const register = async (ctx: Context) => {
    const body = await ctx.request.body.json();

    try {
        const newUser = toNewUser(body);

        if (await User.findOne({ username: newUser.username })) {
            throw createHttpError(400, "Username already exists");
        }

        const user = new User(newUser);

        const savedUser = (await user.save()).toObject();
        const token = await generateUserToken(savedUser._id.toString());

        ctx.response.body = { token };
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            throw createHttpError(
                400,
                error.issues.flatMap((i) => i.message).join(", "),
            );
        }
        throw error;
    }
};

export const login = async (ctx: Context) => {
    const body = await ctx.request.body.json();

    const { username, password } = body;

    const user = await User.findOne({ username });
    if (!user) {
        throw createHttpError(404, "Invalid username");
    }

    // deno-lint-ignore no-explicit-any
    const passwordValid: boolean = await (user as any).comparePassword(
        password,
    );

    if (!passwordValid) {
        throw createHttpError(401, "Invalid password");
    }

    const token = await generateUserToken(user._id.toString());
    ctx.response.body = { token };
};

export const user = (ctx: Context) => {
    const user: IUser = ctx.state.user;

    ctx.response.body = toNonSensitiveUser(user);
};
