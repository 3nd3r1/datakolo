import { z } from "zod";

const projectSchema = z.object({
    id: z.string().uuid(),
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(100, { message: "Name must be at most 100 characters" }),
    createdBy: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const newProjectSchema = projectSchema.omit({ id: true }).extend({
    createdAt: projectSchema.shape.createdAt.optional(),
    updatedAt: projectSchema.shape.updatedAt.optional(),
});

export type IProject = z.infer<typeof projectSchema>;
export type NewProject = z.infer<typeof newProjectSchema>;

export const toProject = (obj: unknown): IProject => {
    return projectSchema.parse(obj);
};

export const toNewProject = (obj: unknown): NewProject => {
    return newProjectSchema.parse(obj);
};
