import type { Context } from "https://deno.land/x/oak/mod.ts";

import { toNewUser, toNonSensitiveUser } from "../validators/user.ts";
import User from "../models/user.ts";
import { generateToken } from "../utils/jwt.ts";
import mongoose from "mongoose";

export const register = async (ctx: Context) => {
    try {
        const body = await ctx.request.body.json();

        const newUser = toNewUser(body);

        if (await User.findOne({ username: newUser.username })) {
            ctx.response.status = 400;
            ctx.response.body = { error: "Username is already used" };
            return;
        }

        const user = new User(newUser);

        const savedUser = (await user.save()).toObject();
        ctx.response.body = toNonSensitiveUser({
            id: savedUser._id.toString(),
            ...savedUser,
        });
    } catch (error: unknown) {
        if (error instanceof mongoose.Error.ValidationError) {
            ctx.response.status = 400;
            ctx.response.body = {
                error: error.message,
            };
            return;
        }

        console.error(error);
        ctx.response.status = 400;
        ctx.response.body = {
            error: "An error occurred",
        };
    }
};

export const login = async (ctx: Context) => {
    try {
        const body = await ctx.request.body.json();

        const { username, password } = body;

        const user = await User.findOne({ username });
        if (!user) {
            ctx.response.status = 404;
            ctx.response.body = { error: "Invalid username" };
            return;
        }

        // deno-lint-ignore no-explicit-any
        const passwordValid: boolean = await (user as any).comparePassword(
            password,
        );

        if (!passwordValid) {
            ctx.response.status = 401;
            ctx.response.body = { error: "Invalid password" };
            return;
        }

        const token = await generateToken(user.id);
        ctx.response.body = { token };
    } catch (_error: unknown) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "An error occurred",
        };
    }
};
