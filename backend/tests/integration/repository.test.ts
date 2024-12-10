(globalThis as any).window = globalThis;
import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    it,
} from "@std/testing/bdd";
import { assertEquals, assertMatch } from "@std/assert";
import { superoak } from "superoak";

import {
    closeDatabase,
    connectDatabase,
    getProjectIdByName,
    getRepositoryIdByNameAndProject,
    getUserIdByUsername,
    seedDatabase,
} from "./db.ts";
import app from "@/app.ts";

let token: string = "";
let projectId: string = "";
let johnId: string = "";

beforeAll(async () => await connectDatabase());
beforeEach(async () => {
    await seedDatabase();

    token = (
        await (await superoak(app))
            .post("/api/login")
            .send({ username: "John", password: "password" })
    ).body.token;

    projectId = await getProjectIdByName("Test Project 1");
    johnId = await getUserIdByUsername("John");
});
afterAll(async () => await closeDatabase());

describe("/api/projects/:id/repositories", () => {
    it("should return the repositories of a project", async () => {
        await (
            await superoak(app)
        )
            .get(`/api/projects/${projectId}/repositories`)
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .expect((res) => {
                console.log(res.body);
                assertEquals(res.body.length, 2);
            });
    });
    it("should return repository by id if it exists", async () => {
        const repositoryId = await getRepositoryIdByNameAndProject(
            "Test Repository 1",
            projectId,
        );

        await (
            await superoak(app)
        )
            .get(`/api/projects/${projectId}/repositories/${repositoryId}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .expect((res) => {
                const { id, name, project, createdBy, createdAt, updatedAt } =
                    res.body;
                assertEquals(id, repositoryId);
                assertEquals(name, "Test Repository 1");
                assertEquals(project, projectId);
                assertEquals(createdBy, johnId);
                assertMatch(createdAt, /.+/);
                assertMatch(updatedAt, /.+/);
            });
    });
    it("should create valid repository", async () => {
        const contentSchema = {
            title: { type: "string", required: true },
            content: { type: "string", required: true },
        };

        await (
            await superoak(app)
        )
            .post(`/api/projects/${projectId}/repositories`)
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "New Repository", contentSchema })
            .expect(200)
            .expect((res) => {
                const { id, name, project, createdBy, createdAt, updatedAt } =
                    res.body;
                assertMatch(id, /.+/);
                assertEquals(name, "New Repository");
                assertEquals(project, projectId);
                assertEquals(createdBy, johnId);
                assertMatch(createdAt, /.+/);
                assertMatch(updatedAt, /.+/);
            });
    });
    it("should not create repository with too short name", async () => {
        const contentSchema = {
            title: { type: "string", required: true },
            content: { type: "string", required: true },
        };

        await (await superoak(app))
            .post(`/api/projects/${projectId}/repositories`)
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "A", contentSchema })
            .expect(400)
            .expect({ error: "Name must be at least 2 characters" });
    });
    it("should not create repository with invalid schema", async () => {
        const invalidContentSchema = {
            title: { type: "cheese", requred: true },
            content: { type: "string", required: true },
        };

        await (await superoak(app))
            .post(`/api/projects/${projectId}/repositories`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "New repository",
                contentSchema: invalidContentSchema,
            })
            .expect(400)
            .expect({ error: "Invalid input" });
    });
    it("should not create repository with duplicate name", async () => {
        const contentSchema = {
            title: { type: "string", required: true },
            content: { type: "string", required: true },
        };

        await (await superoak(app))
            .post(`/api/projects/${projectId}/repositories`)
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "Test Repository 1", contentSchema })
            .expect(400)
            .expect({ error: "Name already in use" });
    });
});
