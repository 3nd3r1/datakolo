import {
    Context,
    isHttpError,
    Next,
} from "https://deno.land/x/oak@v17.1.2/mod.ts";

export const errorHandler = async (ctx: Context, next: Next) => {
    try {
        await next();
    } catch (error: unknown) {
        if (isHttpError(error)) {
            ctx.response.status = error.status;
        } else {
            ctx.response.status = 500;
        }

        if (error instanceof Error) {
            ctx.response.body = { error: error.message };
        } else {
            ctx.response.body = { error: "Something went wrong" };
        }
    }
};
