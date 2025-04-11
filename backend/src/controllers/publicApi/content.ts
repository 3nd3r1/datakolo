import { AppContext } from "@/utils/oak.ts";
import publicApiContentService from "@/services/publicApi/content.ts";

const getContents = async (
    ctx: AppContext<{ projectId: string; repositoryId: string }>,
) => {
    const apiKey = ctx.state.projectApiKey;
    if (!apiKey) return;

    const repositoryId = ctx.params.repositoryId;
    const contents = await publicApiContentService.getContentsByRepository(
        repositoryId,
        apiKey,
    );

    ctx.response.body = contents;
};

const getContent = async (
    ctx: AppContext<{ projectId: string; repositoryId: string; id: string }>,
) => {
    const apiKey = ctx.state.projectApiKey;
    if (!apiKey) return;

    const id = ctx.params.id;
    const content = await publicApiContentService.getContentById(
        id,
        apiKey,
    );

    ctx.response.body = content;
};

const publicApiContentController = {
    getContents,
    getContent,
};

export default publicApiContentController;
