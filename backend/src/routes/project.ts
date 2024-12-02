import { Router } from "oak";

import {
    createProject,
    getProject,
    getProjects,
} from "@/controllers/project.ts";
import { authenticate } from "@/middlewares/auth.ts";

const router = new Router();

router.get("/api/projects", authenticate, getProjects);
router.get("/api/projects/:id", authenticate, getProject);
router.post("/api/projects", authenticate, createProject);

export default router;
