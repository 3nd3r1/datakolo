import { Application } from "oak";

import homeRouter from "@/routes/home.ts";
import authRouter from "@/routes/auth.ts";
import projectRouter from "@/routes/project.ts";
import repositoryRouter from "@/routes/repository.ts";
import contentRouter from "@/routes/content.ts";

import { errorHandler } from "@/middlewares/error.ts";
import { AppState } from "@/utils/oak.ts";

const app = new Application<AppState>();

app.use(async (context, next) => {
    console.log(`${context.request.method} ${context.request.url}`);
    await next();
});
app.use(errorHandler);

app.use(homeRouter.routes());
app.use(authRouter.routes());
app.use(projectRouter.routes());
app.use(repositoryRouter.routes());
app.use(contentRouter.routes());

app.use(homeRouter.allowedMethods());
app.use(authRouter.allowedMethods());
app.use(projectRouter.allowedMethods());
app.use(repositoryRouter.allowedMethods());
app.use(contentRouter.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
    if (secure) {
        console.log(`Listening on https://${hostname ?? "localhost"}:${port}`);
    } else {
        console.log(`Listening on http://${hostname ?? "localhost"}:${port}`);
    }
});

export default app;
