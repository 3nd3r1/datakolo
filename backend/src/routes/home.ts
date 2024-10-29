import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";

const router = new Router();

router.get("/", (context) => {
    context.response.body = { message: "Hello, World!" };
});

router.get("/ping", (context) => {
    context.response.body = { message: "pong" };
});

export default router;
