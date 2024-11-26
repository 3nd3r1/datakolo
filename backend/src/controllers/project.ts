import { Context, createHttpError } from "oak";

import { toNewProject, ValidationError } from "@/validators/project.ts";
import { UserDTO } from "@/validators/user.ts";
import projectService, { DuplicateProjectError } from "@/services/project.ts";

export const createProject = async (ctx: Context) => {
    const body = await ctx.request.body.json();
    const user: UserDTO = ctx.state.user;

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

export const getProjects = async (ctx: Context) => {
    const user: UserDTO = ctx.state.user;
    const projects = await projectService.getProjectsByCreator(user.id);

    ctx.response.body = projects;
};
