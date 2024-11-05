import { Context, createHttpError, Next } from "https://deno.land/x/oak/mod.ts";

import { verifyUserToken } from "../utils/jwt.ts";
import User from "../models/user.ts";

export const authenticate = async (ctx: Context, next: Next) => {
    const token = ctx.request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        throw createHttpError(401, "Token is missing");
    }

    const userId = await verifyUserToken(token);
    const user = await User.findById(userId);

    if (!user) {
        throw createHttpError(401, "Invalid token");
    }

    ctx.state.user = user;
    await next();
};
