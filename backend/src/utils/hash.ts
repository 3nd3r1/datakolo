import { compare, hash } from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    return await hash(password);
};

export const verifyPassword = async (
    password: string,
    hash: string,
): Promise<boolean> => {
    return await compare(password, hash);
};
