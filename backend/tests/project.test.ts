(globalThis as any).window = globalThis;
import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    it,
} from "@std/testing/bdd";
import { superoak } from "superoak";

import { closeDatabase, connectDatabase, seedDatabase } from "./db.ts";
import app from "@/app.ts";
import { assertEquals } from "https://deno.land/std@0.213.0/assert/assert_equals.ts";

let token: string = "";

beforeAll(async () => await connectDatabase());
beforeEach(async () => {
    await seedDatabase();

    const response = await (await superoak(app))
        .post("/api/login")
        .send({ username: "John", password: "password" });

    token = response.body.token;
});
afterAll(async () => await closeDatabase());

describe("/api/projects", () => {
    it("should return your projects", async () => {
        await (
            await superoak(app)
        )
            .get("/api/projects")
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .expect((res) => {
                console.log(res.body);
                assertEquals(res.body.length, 2);
            });
    });
});
