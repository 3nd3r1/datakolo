import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    username: z
        .string()
        .min(2, { message: "Username must be at least 2 characters" })
        .max(100, { message: "Username must be at most 100 characters" }),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const newUserSchema = userSchema
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
    })
    .extend({
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters" })
            .max(100, { message: "Password must be at most 100 characters" }),
    });

export const loginSchema = newUserSchema.pick({
    username: true,
    password: true,
});

export type User = z.infer<typeof userSchema>;
export type NewUser = z.infer<typeof newUserSchema>;
