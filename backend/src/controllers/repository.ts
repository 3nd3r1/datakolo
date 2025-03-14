import { createHttpError } from "oak";

import { AppContext } from "@/utils/oak.ts";
import {
    toNewRepository,
    toRepositoryUpdate,
    ValidationError,
} from "@/validators/repository.ts";
import repositoryService, {
    DuplicateRepositoryError,
    RepositoryNotFoundError,
} from "@/services/repository.ts";
import { ProjectNotFoundError } from "@/services/project.ts";

export const createRepository = async (
    ctx: AppContext<{ projectId: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const body = await ctx.request.body.json();
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

        if (error instanceof ProjectNotFoundError) {
            throw createHttpError(500, "Invalid project");
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

    try {
        const repository = await repositoryService.getRepositoryById(id);

        if (repository.createdBy !== user.id) {
            throw createHttpError(500, "Not authorized");
        }

        ctx.response.body = repository;
    } catch (error: unknown) {
        if (error instanceof RepositoryNotFoundError) {
            throw createHttpError(404, "Repository not found");
        }
    }
};

export const updateRepository = async (
    ctx: AppContext<{ projectId: string; id: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const id = ctx.params.id;
    const body = await ctx.request.body.json();

    try {
        const repositoryUpdate = toRepositoryUpdate(body);
        const updatedRepository = await repositoryService.updateRepository(
            id,
            repositoryUpdate,
        );

        ctx.response.body = updatedRepository;
    } catch (error: unknown) {
        if (error instanceof ValidationError) {
            throw createHttpError(400, error.message);
        }

        throw error;
    }
};
