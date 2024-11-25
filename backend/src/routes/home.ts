import { Context, Router } from "oak";

import { authenticate } from "@/middlewares/auth.ts";

const router = new Router();

router.get("/ping", authenticate, (ctx: Context) => {
    ctx.response.body = { message: "pong" };
});

export default router;
