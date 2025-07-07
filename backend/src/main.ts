import { app } from "@/app.ts";
import connectDatabase from "@/utils/db.ts";
import { config } from "@/utils/config.ts";

await connectDatabase();

await app.listen({ port: config.server.port });
