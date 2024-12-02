(globalThis as any).window = globalThis;
import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    it,
} from "@std/testing/bdd";
import { superoak } from "superoak";

import {
    closeDatabase,
    connectDatabase,
    getProjectIdByName,
    getUserIdByUsername,
    seedDatabase,
} from "./db.ts";
import app from "@/app.ts";
import { assertEquals } from "https://deno.land/std@0.213.0/assert/assert_equals.ts";
import { assertMatch } from "https://deno.land/std@0.213.0/assert/assert_match.ts";

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
    it("should return project by id if it exists", async () => {
        const projectId = await getProjectIdByName("Test Project 1");
        const johnId = await getUserIdByUsername("John");

        await (
            await superoak(app)
        )
            .get("/api/projects/" + projectId)
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .expect((res) => {
                const { id, name, createdBy, createdAt, updatedAt } = res.body;
                assertEquals(id, projectId);
                assertEquals(name, "Test Project 1");
                assertEquals(createdBy, johnId);
                assertMatch(createdAt, /.+/);
                assertMatch(updatedAt, /.+/);
            });
    });
    it("should create valid project", async () => {
        const johnId = await getUserIdByUsername("John");
        await (
            await superoak(app)
        )
            .post("/api/projects")
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "New Project" })
            .expect(200)
            .expect((res) => {
                const { id, name, createdBy, createdAt, updatedAt } = res.body;
                assertMatch(id, /.+/);
                assertEquals(name, "New Project");
                assertEquals(createdBy, johnId);
                assertMatch(createdAt, /.+/);
                assertMatch(updatedAt, /.+/);
            });
    });
    it("should not create project with too short name", async () => {
        await (await superoak(app))
            .post("/api/projects")
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "A" })
            .expect(400)
            .expect({ error: "Name must be at least 2 characters" });
    });
    it("should not create project with duplicate name", async () => {
        await (await superoak(app))
            .post("/api/projects")
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "Test Project 1" })
            .expect(400)
            .expect({ error: "Name already in use" });
    });
});
