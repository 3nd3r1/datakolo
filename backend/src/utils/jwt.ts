import { create, verify } from "https://deno.land/x/djwt/mod.ts";

const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"]
);

export const generateUserToken = async (userId: string): Promise<string> => {
    return await create({ alg: "HS512", typ: "JWT" }, { userId }, key);
};

export const verifyUserToken = async (token: string): Promise<string> => {
    const payload = await verify(token, key);
    if (!payload.userId) {
        throw new Error("Invalid token");
    }

    return payload.userId as string;
};
