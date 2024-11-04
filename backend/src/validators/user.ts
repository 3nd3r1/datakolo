import { z } from "https://deno.land/x/zod/mod.ts";
import type { NewUser, NonSensitiveUser } from "../types/user.ts";

const newUserSchema = z.object({
    username: z.string().min(2).max(100),
    password: z.string().min(6).max(100),
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
