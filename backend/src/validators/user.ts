import { z } from "zod";

import type { NewUser, NonSensitiveUser } from "@/types/user.ts";

const newUserSchema = z.object({
    username: z
        .string()
        .min(2, { message: "Username must be at least 2 characters" })
        .max(100, { message: "Username must be at most 100 characters" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(100, { message: "Password must be at most 100 characters" }),
});

const nonSensitiveUserSchema = z.object({
    id: z.string(),
    username: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const toNewUser = (obj: unknown): NewUser => {
    return newUserSchema.parse(obj);
};

export const toNonSensitiveUser = (obj: unknown): NonSensitiveUser => {
    return nonSensitiveUserSchema.parse(obj);
};
