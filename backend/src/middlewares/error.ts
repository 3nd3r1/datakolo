import { Context, isHttpError, Next } from "oak";
import { AppError } from "@/utils/errors.ts";

export const errorHandler = async (ctx: Context, next: Next) => {
    try {
        await next();
    } catch (error: unknown) {
        let status = 500;
        let message = "Something went wrong";

        if (error instanceof AppError) {
            status = error.status;
            message = error.message;
        } else if (isHttpError(error)) {
            status = error.status;
            message = error.message;
        } else if (error instanceof Error) {
            console.error(error);
            status = 500;
            message = error.message;
        }

        ctx.response.status = status;
        ctx.response.body = {
            error: message,
        };
    }
};
