import { z } from "zod";

export const projectSchema = z.object({
    id: z.string(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    createdBy: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const newProjectSchema = projectSchema.omit({
    id: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true,
});

export const projectUpdateSchema = projectSchema
    .omit({
        id: true,
        createdBy: true,
        createdAt: true,
        updatedAt: true,
    })
    .partial();

export type Project = z.infer<typeof projectSchema>;
export type NewProject = z.infer<typeof newProjectSchema>;
export type ProjectUpdate = z.infer<typeof projectUpdateSchema>;
