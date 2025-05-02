import { z } from "zod";

export const contentSchemaFieldNameSchema = z
    .string()
    .min(2, "Field name must be at least 2 characters");

export const contentSchemaFieldTypeSchema = z.union([
    z.literal("string", { message: "Field type is invalid" }),
    z.literal("number"),
    z.literal("boolean"),
]);

export const contentSchemaFieldSchema = z.object({
    type: contentSchemaFieldTypeSchema,
    required: z.boolean().optional().default(false),
});

export const contentSchemaSchema = z.record(
    contentSchemaFieldNameSchema,
    contentSchemaFieldSchema,
    { message: "Content schema is required" }
);

export const repositorySchema = z.object({
    id: z.string(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    contentSchema: contentSchemaSchema,
    project: z.string(),
    createdBy: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const newRepositorySchema = repositorySchema.omit({
    id: true,
    project: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true,
    contentSchema: true,
});

export const repositoryUpdateSchema = repositorySchema
    .omit({
        id: true,
        project: true,
        createdBy: true,
        createdAt: true,
        updatedAt: true,
    })
    .partial();

export type RepositoryContentSchema = z.infer<typeof contentSchemaSchema>;
export type Repository = z.infer<typeof repositorySchema>;
export type NewRepository = z.infer<typeof newRepositorySchema>;
export type RepositoryUpdate = z.infer<typeof repositoryUpdateSchema>;
