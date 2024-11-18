import { Application } from "https://deno.land/x/oak@v17.1.2/mod.ts";

import homeRouter from "./routes/home.ts";
import authRouter from "./routes/auth.ts";
import { errorHandler } from "./middlewares/error.ts";

const app = new Application();

app.use(async (context, next) => {
    console.log(`${context.request.method} ${context.request.url}`);
    await next();
});
app.use(errorHandler);

app.use(homeRouter.routes());
app.use(authRouter.routes());

app.use(homeRouter.allowedMethods());
app.use(authRouter.allowedMethods());

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
