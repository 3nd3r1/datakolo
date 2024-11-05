import { Context, Router } from "https://deno.land/x/oak/mod.ts";

import { authenticate } from "../middlewares/auth.ts";

const router = new Router();

router.get("/", authenticate, (ctx: Context) => {
    ctx.response.body = { message: "Hello, World!" };
});

router.get("/ping", authenticate, (ctx: Context) => {
    ctx.response.body = { message: "pong" };
});

export default router;
