import { Context, createHttpError, Next } from "oak";

import publicApiProjectService from "@/services/publicApi/project.ts";

export const authenticateProjectApiKey = async (
    ctx: Context & { params: { projectId: string } },
    next: Next,
) => {
    const apiKey = ctx.request.headers.get("Authorization")?.split(" ")[1];
    if (!apiKey) {
        throw createHttpError(401, "ApiKey is missing");
    }

    const projectId = ctx.params.projectId;
    if (!projectId) {
        throw createHttpError(400, "Project ID is missing");
    }

    await publicApiProjectService.getProjectById(projectId, apiKey);

    ctx.state.projectApiKey = apiKey;
    await next();
};
