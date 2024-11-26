import app from "@/app.ts";
import connectDatabase from "@/utils/db.ts";

await connectDatabase();

await app.listen({ port: 8000 });
