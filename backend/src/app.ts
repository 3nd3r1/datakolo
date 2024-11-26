import { Application } from "oak";

import homeRouter from "@/routes/home.ts";
import authRouter from "@/routes/auth.ts";
import projectRouter from "@/routes/project.ts";

import { errorHandler } from "@/middlewares/error.ts";
import { UserDTO } from "@/validators/user.ts";

interface State {
    user?: UserDTO;
}

const app = new Application<State>();

app.use(async (context, next) => {
    console.log(`${context.request.method} ${context.request.url}`);
    await next();
});
app.use(errorHandler);

app.use(homeRouter.routes());
app.use(authRouter.routes());
app.use(projectRouter.routes());

app.use(homeRouter.allowedMethods());
app.use(authRouter.allowedMethods());
app.use(projectRouter.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
    if (secure) {
        console.log(
            `Listening on https://${hostname ?? "localhost"}:${port}`,
        );
    } else {
        console.log(
            `Listening on http://${hostname ?? "localhost"}:${port}`,
        );
    }
});

export default app;
