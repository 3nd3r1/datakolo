import { createHttpError } from "oak";

import { AppContext } from "@/utils/oak.ts";
import {
    toContentData,
    toNewContent,
    ValidationError,
} from "@/validators/content.ts";
import contentService, { ContentNotFoundError } from "@/services/content.ts";
import { RepositoryNotFoundError } from "@/services/repository.ts";

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
        if (error instanceof RepositoryNotFoundError) {
            throw createHttpError(404, "Repository not found");
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

    try {
        const content = await contentService.getContentById(id);

        // TODO: Service should handle this
        if (content.createdBy !== user.id) {
            throw createHttpError(500, "Not authorized");
        }

        ctx.response.body = content;
    } catch (error: unknown) {
        if (error instanceof ContentNotFoundError) {
            throw createHttpError(404, "Content not found");
        }
    }
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
        // TODO: Update should not be allowed if content is not owned
        const updatedContent = await contentService.updateContentData(
            id,
            newContentData,
        );

        ctx.response.body = updatedContent;
    } catch (error: unknown) {
        if (error instanceof ValidationError) {
            throw createHttpError(400, error.message);
        }
        if (error instanceof RepositoryNotFoundError) {
            throw createHttpError(400, "Invalid repository");
        }
        if (error instanceof ContentNotFoundError) {
            throw createHttpError(404, "Content not found");
        }
    }
};
