import { z } from "zod";

export const contentSchemaSchema = z.record(
    z.string(),
    z.union([
        z.object({
            type: z.literal("string"),
            required: z.boolean().optional(),
        }),
        z.object({
            type: z.literal("number"),
            required: z.boolean().optional(),
        }),
        z.object({
            type: z.literal("boolean"),
            required: z.boolean().optional(),
        }),
    ]),
    { message: "Content schema is required" }
);

export const repositorySchema = z.object({
    id: z.string(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    contentSchema: contentSchemaSchema,
    project: z.string(),
    createdBy: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const newRepositorySchema = repositorySchema.omit({
    id: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true,
});

export type Repository = z.infer<typeof repositorySchema>;
export type NewRepository = z.infer<typeof newRepositorySchema>;
