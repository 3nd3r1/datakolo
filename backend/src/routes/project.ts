import { Router } from "oak";

import { createProject, getProjects } from "@/controllers/project.ts";
import { authenticate } from "@/middlewares/auth.ts";

const router = new Router();

router.get("/api/projects", authenticate, getProjects);
router.post("/api/projects", authenticate, createProject);

export default router;
