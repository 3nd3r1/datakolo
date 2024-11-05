import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    it,
} from "jsr:@std/testing/bdd";
import { superoak } from "https://deno.land/x/superoak/mod.ts";

import { closeDatabase, connectDatabase, seedDatabase } from "./db.ts";
import app from "../src/app.ts";

const request = await superoak(app);

beforeAll(async () => await connectDatabase());
beforeEach(async () => await seedDatabase());
afterAll(async () => await closeDatabase());

describe("Login path", () => {
    it("should work", () => {
        request
            .post("/api/login")
            .send({ username: "John", password: "password" })
            .expect(200);
    });
});
