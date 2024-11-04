import { Router } from "https://deno.land/x/oak/mod.ts";

import { login, register } from "../controllers/auth.ts";

const router = new Router();

router.post("/api/login", login);
router.post("/api/register", register);

export default router;
