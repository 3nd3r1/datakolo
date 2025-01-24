import { z } from "zod";
import { IRepository } from "@/models/repository.ts";

export class ValidationError extends Error {}

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
    { message: "Content schema is required" },
);

const repositoryDTOSchema = z.object({
    id: z.string(),
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(100, { message: "Name must be at most 100 characters" }),
    contentSchema: contentSchemaSchema,
    project: z.string(),
    createdBy: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const newRepositorySchema = repositoryDTOSchema.omit({ id: true }).extend({
    createdAt: repositoryDTOSchema.shape.createdAt.optional(),
    updatedAt: repositoryDTOSchema.shape.updatedAt.optional(),
});

export type ContentSchema = z.infer<typeof contentSchemaSchema>;

export type RepositoryDTO = z.infer<typeof repositoryDTOSchema>;
export type NewRepository = z.infer<typeof newRepositorySchema>;

export const toRepositoryDTO = (repository: IRepository): RepositoryDTO => {
    try {
        return repositoryDTOSchema.parse({
            ...repository.toObject(),
            id: repository._id.toString(),
            project: repository.project.toString(),
            createdBy: repository.createdBy.toString(),
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

export const toNewRepository = (obj: NewRepository): NewRepository => {
    try {
        return newRepositorySchema.parse(obj);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            throw new ValidationError(
                error.issues.flatMap((e) => e.message).join(", "),
            );
        }
        throw error;
    }
};

export const toRepositoryUpdate = (
    obj: Partial<NewRepository>,
): Partial<NewRepository> => {
    try {
        return newRepositorySchema.partial().parse(obj);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            throw new ValidationError(
                error.issues.flatMap((e) => e.message).join(", "),
            );
        }
        throw error;
    }
};
