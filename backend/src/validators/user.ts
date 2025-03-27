import { z } from "zod";
import { IUser } from "@/models/user.ts";
import { ValidationError } from "@/utils/errors.ts";

const userDTOSchema = z.object({
    id: z.string(),
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

const newUserSchema = userDTOSchema.omit({ id: true }).extend({
    createdAt: userDTOSchema.shape.createdAt.optional(),
    updatedAt: userDTOSchema.shape.updatedAt.optional(),
});

const nonSensitiveUserSchema = userDTOSchema.omit({ password: true });

export type UserDTO = z.infer<typeof userDTOSchema>;
export type NewUser = z.infer<typeof newUserSchema>;
export type NonSensitiveUser = z.infer<typeof nonSensitiveUserSchema>;

export const toUserDTO = (user: IUser): UserDTO => {
    try {
        return userDTOSchema.parse({
            ...user.toObject(),
            id: user._id.toString(),
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

export const toNewUser = (obj: NewUser): NewUser => {
    try {
        return newUserSchema.parse(obj);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            throw new ValidationError(
                error.issues.flatMap((e) => e.message).join(", "),
            );
        }
        throw error;
    }
};

export const toNonSensitiveUser = (user: UserDTO): NonSensitiveUser => {
    try {
        return nonSensitiveUserSchema.parse(user);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            throw new ValidationError(
                error.issues.flatMap((e) => e.message).join(", "),
            );
        }
        throw error;
    }
};
