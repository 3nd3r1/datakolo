import { Application } from "https://deno.land/x/oak@v17.1.2/mod.ts";

import homeRouter from "./routes/home.ts";

const app = new Application();

const hel = "hi";
console.log(hel);

app.use(async (context, next) => {
    console.log(`${context.request.method} ${context.request.url}`);
    await next();
});

app.use(homeRouter.routes());

app.use(homeRouter.allowedMethods());

app.addEventListener("listen", () => {
    console.log("Listening on http://localhost:8000");
});

await app.listen({ port: 8000 });
