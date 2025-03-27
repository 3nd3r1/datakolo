import { AppContext } from "@/utils/oak.ts";
import { toContentData, toNewContent } from "@/validators/content.ts";
import contentService from "@/services/content.ts";

export const createContent = async (
    ctx: AppContext<{ projectId: string; repositoryId: string }>,
) => {
    const body = await ctx.request.body.json();

    const user = ctx.state.user;
    if (!user) return;

    const repositoryId = ctx.params.repositoryId;

    const newContent = toNewContent({
        createdBy: user.id,
        repository: repositoryId,
        ...body,
    });
    const createdContent = await contentService.createContent(
        newContent,
        user.id,
    );

    ctx.response.body = createdContent;
};

export const getContents = async (
    ctx: AppContext<{ projectId: string; repositoryId: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const repositoryId = ctx.params.repositoryId;

    const contents = await contentService.getContentsByRepository(
        repositoryId,
        user.id,
    );

    ctx.response.body = contents;
};

export const getContent = async (
    ctx: AppContext<{ projectId: string; repositoryId: string; id: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const id = ctx.params.id;

    const content = await contentService.getContentById(id, user.id);

    ctx.response.body = content;
};

export const updateContent = async (
    ctx: AppContext<{ projectId: string; repositoryId: string; id: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const body = await ctx.request.body.json();
    const id = ctx.params.id;

    const newContentData = toContentData(body.data);
    const updatedContent = await contentService.updateContentData(
        id,
        newContentData,
        user.id,
    );

    ctx.response.body = updatedContent;
};
