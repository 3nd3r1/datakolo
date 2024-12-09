import { createHttpError } from "oak";

import { AppContext } from "@/utils/oak.ts";
import { toNewRepository, ValidationError } from "@/validators/repository.ts";
import repositoryService, {
    DuplicateRepositoryError,
} from "@/services/repository.ts";

export const createRepository = async (
    ctx: AppContext<{ projectId: string }>,
) => {
    const body = await ctx.request.body.json();

    const user = ctx.state.user;
    if (!user) return;

    const projectId = ctx.params.projectId;

    try {
        const newRepository = toNewRepository({
            createdBy: user.id,
            project: projectId,
            ...body,
        });
        const createdRepository = await repositoryService.createRepository(
            newRepository,
        );

        ctx.response.body = createdRepository;
    } catch (error: unknown) {
        if (error instanceof ValidationError) {
            throw createHttpError(400, error.message);
        }

        if (error instanceof DuplicateRepositoryError) {
            throw createHttpError(400, "Name already in use");
        }
        throw error;
    }
};

export const getRepositories = async (
    ctx: AppContext<{ projectId: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const projectId = ctx.params.projectId;

    const repositories = await repositoryService.getRepositoriesByProject(
        projectId,
    );

    ctx.response.body = repositories;
};

export const getRepository = async (
    ctx: AppContext<{ projectId: string; id: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const id = ctx.params.id;

    const repository = await repositoryService.getRepositoryById(id);

    if (!repository || repository.createdBy !== user.id) {
        throw createHttpError(404, "Repository not found");
    }

    ctx.response.body = repository;
};
