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

export const generateApiKey = (): string => {
    const randomBytes = crypto.getRandomValues(new Uint8Array(32));
    return Array.from(randomBytes)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
};
