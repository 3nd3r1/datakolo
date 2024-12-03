import { z } from "zod";
import { IRepository } from "@/models/repository.ts";

export class ValidationError extends Error {}

const contentSchemaValidator = z.record(
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
);

const repositoryDTOSchema = z.object({
    id: z.string(),
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(100, { message: "Name must be at most 100 characters" }),
    contentSchema: contentSchemaValidator,
    createdBy: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type RepositoryDTO = z.infer<typeof repositoryDTOSchema>;

export const toRepositoryDTO = (repository: IRepository): RepositoryDTO => {
    try {
        return repositoryDTOSchema.parse({
            ...repository.toObject(),
            id: repository._id.toString(),
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
