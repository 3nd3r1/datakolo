import { z } from "zod";

import { RepositoryContentSchema } from "@/validators/repository";

export const createContentDataSchema = (schema: RepositoryContentSchema) => {
    // TODO: Improve the type safety of this function
    const schemaFields: Record<string, z.ZodType> = {};

    Object.entries(schema).forEach(([fieldName, fieldSchema]) => {
        let zodField: z.ZodType;

        switch (fieldSchema.type) {
            case "string":
                zodField = z.string();
                if (fieldSchema.required) {
                    zodField = z.string().min(1, "Field is required");
                }
                break;
            case "number":
                zodField = z.number();
                break;
            case "boolean":
                zodField = z.boolean();
                break;
            default:
                throw new Error(`Unsupported field type: ${fieldSchema.type}`);
        }

        schemaFields[fieldName] = fieldSchema.required
            ? zodField
            : zodField.optional();
    });

    return z.object(schemaFields);
};

const contentDataSchema = z.record(
    z.string(),
    z.union([z.string(), z.number(), z.boolean()])
);

const contentSchema = z.object({
    id: z.string(),
    data: contentDataSchema,
    repository: z.string(),
    createdBy: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const newContentSchema = contentSchema.omit({
    id: true,
    repository: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true,
});

export type ContentData = z.infer<typeof contentDataSchema>;
export type Content = z.infer<typeof contentSchema>;
export type NewContent = z.infer<typeof newContentSchema>;
