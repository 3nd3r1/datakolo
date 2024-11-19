import { z } from "zod";
import { Context, createHttpError } from "oak";

import { toNewProject, toProject } from "@/validators/project.ts";
import Project from "@/models/project.ts";
import { IUser } from "@/validators/user.ts";

export const createProject = async (ctx: Context) => {
    const body = await ctx.request.body.json();
    const user: IUser = ctx.state.user;

    try {
        const newProject = toNewProject({ createdBy: user.id, ...body });

        if (await Project.findOne({ name: newProject.name })) {
            throw createHttpError(400, "Project name already used");
        }

        const project = new Project(newProject);

        const savedProject = (await project.save()).toObject();

        ctx.response.body = savedProject;
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            throw createHttpError(
                400,
                error.issues.flatMap((i) => i.message).join(", "),
            );
        }
    }
};

export const getProjects = async (ctx: Context) => {
    const user: IUser = ctx.state.user;
    const projects = await Project.find({ createdBy: user.id });

    ctx.response.body = projects.map((project) =>
        toProject(project.toObject())
    );
};
