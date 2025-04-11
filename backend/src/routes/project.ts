import { Router } from "oak";

import {
    createProject,
    generateProjectApiKey,
    getProject,
    getProjectApiKey,
    getProjects,
    revokeProjectApiKey,
    updateProject,
} from "@/controllers/project.ts";
import { authenticate } from "@/middlewares/auth.ts";

const router = new Router();

router.get("/api/projects", authenticate, getProjects);
router.get("/api/projects/:id", authenticate, getProject);
router.get("/api/projects/:id/api-key", authenticate, getProjectApiKey);
router.post(
    "/api/projects/:id/generate-api-key",
    authenticate,
    generateProjectApiKey,
);
router.delete(
    "/api/projects/:id/revoke-api-key",
    authenticate,
    revokeProjectApiKey,
);
router.post("/api/projects", authenticate, createProject);
router.put("/api/projects/:id", authenticate, updateProject);

export default router;
