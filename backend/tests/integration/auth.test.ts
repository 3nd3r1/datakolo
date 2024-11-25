(globalThis as any).window = globalThis;
import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    it,
} from "@std/testing/bdd";
import { assertMatch, assertEquals } from "@std/assert";
import { superoak } from "superoak";

import { closeDatabase, connectDatabase, seedDatabase } from "./db.ts";
import app from "@/app.ts";

beforeAll(async () => await connectDatabase());
beforeEach(async () => await seedDatabase());
afterAll(async () => await closeDatabase());

describe("/api/login", () => {
    it("should work with correct credentials", async () => {
        const request = await superoak(app);
        await request
            .post("/api/login")
            .send({ username: "John", password: "password" })
            .expect(200);
    });
    it("should not work with incorrect password", async () => {
        const request = await superoak(app);
        await request
            .post("/api/login")
            .send({ username: "John", password: "wrong" })
            .expect(401)
            .expect({ error: "Invalid password" });
    });
    it("should not work with incorrect username", async () => {
        const request = await superoak(app);
        await request
            .post("/api/login")
            .send({ username: "Joh", password: "password" })
            .expect(404)
            .expect({ error: "Invalid username" });
    });
});

describe("/api/register", () => {
    it("should work with valid input", async () => {
        const request = await superoak(app);
        await request
            .post("/api/register")
            .send({ username: "Peter", password: "password" })
            .expect(200);
    });
    it("should not work with too short password", async () => {
        const request = await superoak(app);
        await request
            .post("/api/register")
            .send({ username: "Peter", password: "p" })
            .expect(400)
            .expect({ error: "Password must be at least 6 characters" });
    });
    it("should not work with duplicate username", async () => {
        const request = await superoak(app);
        await request
            .post("/api/register")
            .send({ username: "John", password: "password" })
            .expect(400)
            .expect({ error: "Username already exists" });
    });
});

describe("/api/user", () => {
    it("should work with valid token", async () => {
        const response = await (await superoak(app))
            .post("/api/login")
            .send({ username: "John", password: "password" });
        const token = response.body.token;

        await (
            await superoak(app)
        )
            .get("/api/user")
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .expect((res) => {
                const { id, username, createdAt, updatedAt } = res.body;

                assertMatch(id, /.+/);
                assertEquals(username, "John");
                assertMatch(createdAt, /.+/);
                assertMatch(updatedAt, /.+/);
            });
    });
    it("should not work with no token", async () => {
        const request = await superoak(app);
        await request
            .get("/api/user")
            .expect(401)
            .expect({ error: "Token is missing" });
    });
});
