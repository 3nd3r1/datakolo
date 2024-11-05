import {
    createHttpError,
    HttpError,
    type Context,
} from "https://deno.land/x/oak/mod.ts";
import mongoose from "mongoose";

import { toNewUser, toNonSensitiveUser } from "../validators/user.ts";
import User from "../models/user.ts";
import { generateUserToken } from "../utils/jwt.ts";

export const register = async (ctx: Context) => {
    const body = await ctx.request.body.json();

    const newUser = toNewUser(body);

    if (await User.findOne({ username: newUser.username })) {
        throw createHttpError(400, "Username already exists");
    }

    const user = new User(newUser);

    try {
        const savedUser = (await user.save()).toObject();
        ctx.response.body = toNonSensitiveUser({
            id: savedUser._id.toString(),
            ...savedUser,
        });
    } catch (error: unknown) {
        if (error instanceof mongoose.Error.ValidationError) {
            throw createHttpError(400, error.message);
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
        password
    );

    if (!passwordValid) {
        throw createHttpError(401, "Invalid password");
    }

    const token = await generateUserToken(user._id.toString());
    ctx.response.body = { token };
};
