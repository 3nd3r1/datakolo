import { z } from "zod";
import { IProject } from "@/models/project.ts";

export class ValidationError extends Error {}

const projectDTOSchema = z.object({
    id: z.string(),
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(100, { message: "Name must be at most 100 characters" }),
    createdBy: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const newProjectSchema = projectDTOSchema.omit({ id: true }).extend({
    createdAt: projectDTOSchema.shape.createdAt.optional(),
    updatedAt: projectDTOSchema.shape.updatedAt.optional(),
});

export type ProjectDTO = z.infer<typeof projectDTOSchema>;
export type NewProject = z.infer<typeof newProjectSchema>;

export const toProjectDTO = (project: IProject): ProjectDTO => {
    try {
        return projectDTOSchema.parse({
            ...project.toObject(),
            id: project._id.toString(),
            createdBy: project.createdBy.toString(),
        });
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            throw new ValidationError(
                error.issues.flatMap((e) => e.message).join(", "),
            );
        }
        throw error;
    }
};

export const toNewProject = (obj: unknown): NewProject => {
    try {
        return newProjectSchema.parse(obj);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            throw new ValidationError(
                error.issues.flatMap((e) => e.message).join(", "),
            );
        }
        throw error;
    }
};
