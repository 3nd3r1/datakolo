import { Router } from "oak";

import {
    createProject,
    generateApiKey,
    getProject,
    getProjects,
} from "@/controllers/project.ts";
import { authenticate } from "@/middlewares/auth.ts";

const router = new Router();

router.get("/api/projects", authenticate, getProjects);
router.get("/api/projects/:id", authenticate, getProject);
router.post("/api/projects/:id/generate-api-key", authenticate, generateApiKey);
router.post("/api/projects", authenticate, createProject);

export default router;
