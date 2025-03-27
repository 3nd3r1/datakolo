import { toNewUser, toNonSensitiveUser } from "@/validators/user.ts";
import { generateUserToken } from "@/utils/jwt.ts";
import userService from "@/services/user.ts";
import { AppContext } from "@/utils/oak.ts";
import { AuthenticationError } from "@/utils/errors.ts";

export const register = async (ctx: AppContext) => {
    const body = await ctx.request.body.json();

    const newUser = toNewUser(body);
    const createdUser = await userService.createUser(newUser);
    const token = await generateUserToken(createdUser.id);
    ctx.response.body = { token };
};

export const login = async (ctx: AppContext) => {
    const body = await ctx.request.body.json();

    const { username, password } = body;

    if (!(await userService.verifyUserPassword(username, password))) {
        throw new AuthenticationError("Invalid credentials");
    }

    const user = await userService.getUserByUsername(username);
    const token = await generateUserToken(user.id);

    ctx.response.body = { token };
};

export const user = (ctx: AppContext) => {
    const user = ctx.state.user;
    if (!user) return;

    ctx.response.body = toNonSensitiveUser(user);
};
