import { createHttpError } from "oak";

import { toNewProject, ValidationError } from "@/validators/project.ts";
import projectService, {
    DuplicateProjectError,
    ProjectNotFoundError,
} from "@/services/project.ts";
import { AppContext } from "@/utils/oak.ts";

export const createProject = async (ctx: AppContext) => {
    const body = await ctx.request.body.json();

    const user = ctx.state.user;
    if (!user) return;

    try {
        const newProject = toNewProject({ createdBy: user.id, ...body });
        const createdProject = await projectService.createProject(newProject);

        ctx.response.body = createdProject;
    } catch (error: unknown) {
        if (error instanceof ValidationError) {
            throw createHttpError(400, error.message);
        }

        if (error instanceof DuplicateProjectError) {
            throw createHttpError(400, "Name already in use");
        }
        throw error;
    }
};

export const getProjects = async (ctx: AppContext) => {
    const user = ctx.state.user;
    if (!user) return;

    const projects = await projectService.getProjectsByCreator(user.id);

    ctx.response.body = projects;
};

export const getProject = async (ctx: AppContext<{ id: string }>) => {
    const user = ctx.state.user;
    if (!user) return;

    const id = ctx.params.id;

    try {
        const project = await projectService.getProjectById(id);

        if (project.createdBy !== user.id) {
            throw createHttpError(500, "Not authorized");
        }

        ctx.response.body = project;
    } catch (error: unknown) {
        if (error instanceof ProjectNotFoundError) {
            throw createHttpError(404, "Project not found");
        }
    }
};
