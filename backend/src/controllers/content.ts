import { createHttpError } from "oak";

import { AppContext } from "@/utils/oak.ts";
import {
    toContentData,
    toNewContent,
    ValidationError,
} from "@/validators/content.ts";
import contentService, {
    ContentNotFound,
    RepositoryNotFound,
} from "@/services/content.ts";

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
        if (error instanceof RepositoryNotFound) {
            throw createHttpError(404, error.message);
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

export const updateContent = async (
    ctx: AppContext<{ projectId: string; repositoryId: string; id: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const body = await ctx.request.body.json();
    const id = ctx.params.id;

    try {
        const newContentData = toContentData(body.data);
        const updatedContent = await contentService.updateContentData(
            id,
            newContentData,
        );

        ctx.response.body = updatedContent;
    } catch (error: unknown) {
        if (error instanceof ValidationError) {
            throw createHttpError(400, error.message);
        }
        if (error instanceof RepositoryNotFound) {
            throw createHttpError(404, error.message);
        }
        if (error instanceof ContentNotFound) {
            throw createHttpError(404, error.message);
        }
    }
};
