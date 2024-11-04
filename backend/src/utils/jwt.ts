import { create } from "https://deno.land/x/djwt/mod.ts";

const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
);

export const generateToken = async (userId: string): Promise<string> => {
    return await create({ alg: "HS512", typ: "JWT" }, { userId }, key);
};
