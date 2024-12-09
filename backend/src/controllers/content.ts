import { createHttpError } from "oak";

import { AppContext } from "@/utils/oak.ts";
import { toNewContent, ValidationError } from "@/validators/content.ts";
import contentService from "@/services/content.ts";

export const createContent = async (
    ctx: AppContext<{ projectId: string; repositoryId: string }>,
) => {
    const body = await ctx.request.body.json();

    const user = ctx.state.user;
    if (!user) return;

    const repositoryId = ctx.params.repositoryId;

    try {
        const newContent = toNewContent({
            createdBy: user.id,
            repository: repositoryId,
            ...body,
        });
        const createdContent = await contentService.createContent(newContent);

        ctx.response.body = createdContent;
    } catch (error: unknown) {
        if (error instanceof ValidationError) {
            throw createHttpError(400, error.message);
        }

        throw error;
    }
};

export const getContents = async (
    ctx: AppContext<{ projectId: string; repositoryId: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const repositoryId = ctx.params.repositoryId;

    const contents = await contentService.getContentsByRepository(repositoryId);

    ctx.response.body = contents;
};

export const getContent = async (
    ctx: AppContext<{ projectId: string; repositoryId: string; id: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const id = ctx.params.id;

    const content = await contentService.getContentById(id);

    if (!content || content.createdBy !== user.id) {
        throw createHttpError(404, "Content not found");
    }

    ctx.response.body = content;
};
