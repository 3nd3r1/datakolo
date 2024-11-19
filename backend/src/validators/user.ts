import { z } from "zod";

const userSchema = z.object({
    id: z.string().uuid(),
    username: z
        .string()
        .min(2, { message: "Username must be at least 2 characters" })
        .max(100, { message: "Username must be at most 100 characters" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(100, { message: "Password must be at most 100 characters" }),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const newUserSchema = userSchema.omit({ id: true }).extend({
    createdAt: userSchema.shape.createdAt.optional(),
    updatedAt: userSchema.shape.updatedAt.optional(),
});

const nonSensitiveUserSchema = userSchema.omit({ password: true });

export type IUser = z.infer<typeof userSchema>;
export type NewUser = z.infer<typeof newUserSchema>;
export type NonSensitiveUser = z.infer<typeof nonSensitiveUserSchema>;

export const toUser = (obj: unknown): IUser => {
    return userSchema.parse(obj);
};

export const toNewUser = (obj: unknown): NewUser => {
    return newUserSchema.parse(obj);
};

export const toNonSensitiveUser = (obj: unknown): NonSensitiveUser => {
    return nonSensitiveUserSchema.parse(obj);
};
