import { createHttpError } from "oak";

import {
    toNewProject,
    toNonSensitiveProject,
    toProjectUpdate,
} from "@/validators/project.ts";
import projectService from "@/services/project.ts";
import { AppContext } from "@/utils/oak.ts";

export const createProject = async (ctx: AppContext) => {
    const body = await ctx.request.body.json();

    const user = ctx.state.user;
    if (!user) return;

    const newProject = toNewProject({ createdBy: user.id, ...body });
    const createdProject = await projectService.createProject(newProject);

    ctx.response.body = toNonSensitiveProject(createdProject);
};

export const getProjects = async (ctx: AppContext) => {
    const user = ctx.state.user;
    if (!user) return;

    const projects = await projectService.getProjectsByCreator(user.id);

    ctx.response.body = projects.map((project) =>
        toNonSensitiveProject(project)
    );
};

export const getProject = async (ctx: AppContext<{ id: string }>) => {
    const user = ctx.state.user;
    if (!user) return;

    const id = ctx.params.id;

    const project = await projectService.getProjectById(id, user.id);
    ctx.response.body = toNonSensitiveProject(project);
};

export const updateProject = async (ctx: AppContext<{ id: string }>) => {
    const user = ctx.state.user;
    if (!user) return;

    const id = ctx.params.id;
    const body = await ctx.request.body.json();

    const projectUpdate = toProjectUpdate(body);
    const updatedProject = await projectService.updateProject(
        id,
        user.id,
        projectUpdate,
    );

    ctx.response.body = toNonSensitiveProject(updatedProject);
};

export const generateProjectApiKey = async (
    ctx: AppContext<{ id: string }>,
) => {
    const user = ctx.state.user;
    if (!user) return;

    const id = ctx.params.id;

    const project = await projectService.generateProjectApiKey(id, user.id);
    if (!project.apiKey || !project.apiKeyGeneratedAt) {
        throw createHttpError(500, "Something went wrong");
    }

    ctx.response.body = {
        apiKey: project.apiKey,
        apiKeyGeneratedAt: project.apiKeyGeneratedAt,
    };
};

export const revokeProjectApiKey = async (ctx: AppContext<{ id: string }>) => {
    const user = ctx.state.user;
    if (!user) return;

    const id = ctx.params.id;

    await projectService.removeProjectApiKey(id, user.id);

    ctx.response.body = {};
};

export const getProjectApiKey = async (ctx: AppContext<{ id: string }>) => {
    const user = ctx.state.user;
    if (!user) return;

    const id = ctx.params.id;

    const project = await projectService.getProjectById(id, user.id);

    ctx.response.body = {
        apiKey: project.apiKey,
        apiKeyGeneratedAt: project.apiKeyGeneratedAt,
    };
};
