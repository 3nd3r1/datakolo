import { Router } from "oak";

import { authenticateProjectApiKey } from "@/middlewares/projectApiKey.ts";
import publicApiContentController from "@/controllers/publicApi/content.ts";

const router = new Router();

router.get(
    "/api/v1/projects/:projectId/repositories/:repositoryId/contents",
    authenticateProjectApiKey,
    publicApiContentController.getContents,
);

router.get(
    "/api/v1/projects/:projectId/repositories/:repositoryId/contents/:id",
    authenticateProjectApiKey,
    publicApiContentController.getContent,
);

export default router;
