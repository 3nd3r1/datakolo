import { Context, createHttpError, Next } from "oak";

import { verifyUserToken } from "@/utils/jwt.ts";
import User, { IUser } from "@/models/user.ts";
import { toUserDTO } from "@/validators/user.ts";

export const authenticate = async (ctx: Context, next: Next) => {
    const token = ctx.request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        throw createHttpError(401, "Token is missing");
    }

    const userId = await verifyUserToken(token);
    const user: IUser | null = await User.findById(userId);

    if (!user) {
        throw createHttpError(401, "Invalid token");
    }

    ctx.state.user = toUserDTO(user);
    await next();
};
