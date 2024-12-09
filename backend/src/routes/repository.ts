import { Router } from "oak";

import { authenticate } from "@/middlewares/auth.ts";
import {
    createRepository,
    getRepositories,
    getRepository,
} from "@/controllers/repository.ts";

const router = new Router();

router.post(
    "/api/projects/:projectId/repositories",
    authenticate,
    createRepository,
);
router.get(
    "/api/projects/:projectId/repositories",
    authenticate,
    getRepositories,
);
router.get(
    "/api/projects/:projectId/repositories/:id",
    authenticate,
    getRepository,
);

export default router;
