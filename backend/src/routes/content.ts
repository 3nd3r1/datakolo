import { Router } from "oak";

import { authenticate } from "@/middlewares/auth.ts";
import {
    createContent,
    getContent,
    getContents,
} from "@/controllers/content.ts";

const router = new Router();

router.post(
    "/api/projects/:projectId/repositories/:repositoryId/contents",
    authenticate,
    createContent,
);
router.get(
    "/api/projects/:projectId/repositories/:repositoryId/contents",
    authenticate,
    getContents,
);
router.get(
    "/api/projects/:projectId/repositories/:repositoryId/contents/:id",
    authenticate,
    getContent,
);

export default router;
