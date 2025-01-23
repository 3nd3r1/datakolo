import { z } from "zod";

export const contentSchemaFieldTypeSchema = z.union([
    z.literal("string"),
    z.literal("number"),
    z.literal("boolean"),
]);

export const contentSchemaFieldSchema = z.object({
    type: contentSchemaFieldTypeSchema,
    required: z.boolean().optional().default(false),
});

export const contentSchemaSchema = z.record(
    z.string(),
    contentSchemaFieldSchema,
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
    project: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true,
});

export type Repository = z.infer<typeof repositorySchema>;
export type NewRepository = z.infer<typeof newRepositorySchema>;
