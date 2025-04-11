import { Router } from "oak";

import { authenticate } from "@/middlewares/auth.ts";
import {
    createRepository,
    getRepositories,
    getRepository,
    updateRepository,
} from "@/controllers/repository.ts";

// TODO: Make all controllers a struct like with publicApiContentController

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

router.put(
    "/api/projects/:projectId/repositories/:id",
    authenticate,
    updateRepository,
);

export default router;
