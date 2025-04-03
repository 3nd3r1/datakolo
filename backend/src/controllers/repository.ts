import { createHttpError } from "oak";

import { AppContext } from "@/utils/oak.ts";
import {
    toNewRepository,
    toRepositoryUpdate,
} from "@/validators/repository.ts";
import repositoryService from "@/services/repository.ts";

export const createRepository = async (
    ctx: AppContext<{ projectId: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const body = await ctx.request.body.json();
    const projectId = ctx.params.projectId;

    const newRepository = toNewRepository({
        createdBy: user.id,
        project: projectId,
        ...body,
    });
    const createdRepository = await repositoryService.createRepository(
        newRepository,
        user.id,
    );

    ctx.response.body = createdRepository;
};

export const getRepositories = async (
    ctx: AppContext<{ projectId: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const projectId = ctx.params.projectId;

    const repositories = await repositoryService.getRepositoriesByProject(
        projectId,
        user.id,
    );

    ctx.response.body = repositories;
};

export const getRepository = async (
    ctx: AppContext<{ projectId: string; id: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const id = ctx.params.id;

    const repository = await repositoryService.getRepositoryById(
        id,
        user.id,
    );

    if (repository.createdBy !== user.id) {
        throw createHttpError(500, "Not authorized");
    }

    ctx.response.body = repository;
};

export const updateRepository = async (
    ctx: AppContext<{ projectId: string; id: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const id = ctx.params.id;
    const body = await ctx.request.body.json();

    const repositoryUpdate = toRepositoryUpdate(body);
    const updatedRepository = await repositoryService.updateRepository(
        id,
        user.id,
        repositoryUpdate,
    );

    ctx.response.body = updatedRepository;
};
