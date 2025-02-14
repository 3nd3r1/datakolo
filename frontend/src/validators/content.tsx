import { z } from "zod";

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
