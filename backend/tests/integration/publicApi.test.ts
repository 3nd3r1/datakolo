(globalThis as any).window = globalThis;
import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    it,
} from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { superoak } from "superoak";

import {
    closeDatabase,
    connectDatabase,
    getContentIdByTitleAndRepository,
    getProjectIdByName,
    getRepositoryIdByNameAndProject,
    seedDatabase,
} from "./db.ts";
import app from "@/app.ts";

let apiKey: string = "";
let projectId: string = "";
let repositoryId: string = "";

beforeAll(async () => await connectDatabase());
beforeEach(async () => {
    await seedDatabase();

    const token = (await (await superoak(app)).post("/api/login").send({
        username: "John",
        password: "password",
    })).body.token;

    projectId = await getProjectIdByName("Test Project 1");
    apiKey = (
        await (await superoak(app))
            .post(`/api/projects/${projectId}/generate-api-key`)
            .set("Authorization", `Bearer ${token}`)
    ).body.apiKey;
    repositoryId = await getRepositoryIdByNameAndProject(
        "Test Repository 1",
        projectId,
    );
});
afterAll(async () => await closeDatabase());

describe("/api/v1/projects/:projectId/repositories/:repositoryId/contents", () => {
    it("should return the contents of a repository with correct apiKey", async () => {
        await (
            await superoak(app)
        )
            .get(
                `/api/v1/projects/${projectId}/repositories/${repositoryId}/contents`,
            )
            .set("Authorization", `Bearer ${apiKey}`)
            .expect(200)
            .expect((res) => {
                assertEquals(res.body.length, 2);
            });
    });
    it("should not return the contents of a repository with incorrect apiKey", async () => {
        await (
            await superoak(app)
        )
            .get(
                `/api/v1/projects/${projectId}/repositories/${repositoryId}/contents`,
            )
            .set("Authorization", `Bearer wrongApiKey`)
            .expect(403)
            .expect((res) => {
                assertEquals(res.body.error, "Unauthorized");
            });
    });
    it("should return content by id with correct apiKey", async () => {
        const contentId = await getContentIdByTitleAndRepository(
            "Title 1",
            repositoryId,
        );

        await (
            await superoak(app)
        )
            .get(
                `/api/v1/projects/${projectId}/repositories/${repositoryId}/contents/${contentId}`,
            )
            .set("Authorization", `Bearer ${apiKey}`)
            .expect(200)
            .expect((res) => {
                const { id, data, repository } = res.body;
                assertEquals(id, contentId);
                assertEquals(data, {
                    title: "Title 1",
                    content: "Content 1",
                });
                assertEquals(repository, repositoryId);
            });
    });
});
