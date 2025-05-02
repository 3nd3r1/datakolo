import { Context, isHttpError, Next } from "oak";
import { AppError } from "@/utils/errors.ts";
import { config } from "@/utils/config.ts";

export const errorHandler = async (ctx: Context, next: Next) => {
    try {
        await next();
    } catch (error: unknown) {
        let status = 500;
        let message = "Something went wrong";
        let stack: string | undefined;

        if (error instanceof AppError) {
            status = error.status;
            message = error.message;
        } else if (isHttpError(error)) {
            status = error.status;
            message = error.message;
        } else if (error instanceof Error) {
            status = 500;
            message = error.message;
            stack = error.stack;
        }

        ctx.response.status = status;
        ctx.response.body = {
            error: status >= 500 && config.environment === "production"
                ? "Internal server error"
                : message,
            ...(config.environment === "development" && stack ? { stack } : {}),
        };
    }
};
