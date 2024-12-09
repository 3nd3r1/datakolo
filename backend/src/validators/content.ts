import { z } from "zod";

import { IContent } from "@/models/content.ts";
import { ContentSchema } from "@/validators/repository.ts";

export class ValidationError extends Error {}

const contentDataSchema = z.record(
    z.string(),
    z.union([z.string(), z.number(), z.boolean()]),
);

const contentDTOSchema = z.object({
    id: z.string(),
    data: contentDataSchema,
    repository: z.string(),
    createdBy: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const newContentSchema = contentDTOSchema.omit({ id: true }).extend({
    createdAt: contentDTOSchema.shape.createdAt.optional(),
    updatedAt: contentDTOSchema.shape.updatedAt.optional(),
});

export type ContentData = z.infer<typeof contentDataSchema>;

export type ContentDTO = z.infer<typeof contentDTOSchema>;
export type NewContent = z.infer<typeof newContentSchema>;

export const toContentDTO = (content: IContent): ContentDTO => {
    try {
        return contentDTOSchema.parse({
            ...content.toObject(),
            id: content._id.toString(),
            repository: content.repository.toString(),
            createdBy: content.createdBy.toString(),
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

export const toNewContent = (obj: NewContent): NewContent => {
    try {
        return newContentSchema.parse(obj);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            throw new ValidationError(
                error.issues.flatMap((e) => e.message).join(", "),
            );
        }
        throw error;
    }
};

export const validateContentData = (
    data: ContentData,
    schema: ContentSchema,
): void => {
    for (const [key, schemaDef] of Object.entries(schema)) {
        const value = data[key];

        if (schemaDef.required && (value === undefined || value === null)) {
            throw new ValidationError(`Field "${key}" is required`);
        }

        if (value !== undefined && value !== null) {
            const typeOfValue = typeof value;

            if (typeOfValue !== schemaDef.type) {
                throw new ValidationError(
                    `Field "${key}" must be of type "${schemaDef.type}"`,
                );
            }
        }
    }
};
