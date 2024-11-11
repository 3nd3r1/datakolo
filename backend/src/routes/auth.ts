import { Router } from "https://deno.land/x/oak/mod.ts";

import { login, register, user } from "../controllers/auth.ts";
import { authenticate } from "../middlewares/auth.ts";

const router = new Router();

router.post("/api/login", login);
router.post("/api/register", register);
router.get("/api/user", authenticate, user);

export default router;
