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
    getContentIdByTitleAndRepository,
    getProjectIdByName,
    getRepositoryIdByNameAndProject,
    getUserIdByUsername,
    seedDatabase,
} from "./db.ts";
import app from "@/app.ts";

let token: string = "";
let projectId: string = "";
let repositoryId: string = "";
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
    repositoryId = await getRepositoryIdByNameAndProject(
        "Test Repository 1",
        projectId,
    );
    johnId = await getUserIdByUsername("John");
});
afterAll(async () => await closeDatabase());

describe("/api/projects/:projectId/repositories/:repositoryId/contents", () => {
    it("should return the contents of a repository", async () => {
        await (
            await superoak(app)
        )
            .get(
                `/api/projects/${projectId}/repositories/${repositoryId}/contents`,
            )
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .expect((res) => {
                console.log(res.body);
                assertEquals(res.body.length, 2);
            });
    });
    it("should return content by id if it exists", async () => {
        const contentId = await getContentIdByTitleAndRepository(
            "Title 1",
            repositoryId,
        );

        await (
            await superoak(app)
        )
            .get(
                `/api/projects/${projectId}/repositories/${repositoryId}/contents/${contentId}`,
            )
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .expect((res) => {
                const {
                    id,
                    data,
                    repository,
                    createdBy,
                    createdAt,
                    updatedAt,
                } = res.body;
                assertEquals(id, contentId);
                assertEquals(data, {
                    title: "Title 1",
                    content: "Content 1",
                });
                assertEquals(repository, repositoryId);
                assertEquals(createdBy, johnId);
                assertMatch(createdAt, /.+/);
                assertMatch(updatedAt, /.+/);
            });
    });
    it("should create a valid content", async () => {
        const contentData = {
            title: "New Content",
            content: "This is the content",
        };
        await (
            await superoak(app)
        )
            .post(
                `/api/projects/${projectId}/repositories/${repositoryId}/contents`,
            )
            .set("Authorization", `Bearer ${token}`)
            .send({ data: contentData })
            .expect(200)
            .expect((res) => {
                const {
                    id,
                    data,
                    repository,
                    createdBy,
                    createdAt,
                    updatedAt,
                } = res.body;
                assertMatch(id, /.+/);
                assertEquals(data, contentData);
                assertEquals(repository, repositoryId);
                assertEquals(createdBy, johnId);
                assertMatch(createdAt, /.+/);
                assertMatch(updatedAt, /.+/);
            });
    });

    it("should not create content with missing data field", async () => {
        const contentData = {
            content: "Hello",
        };

        await (await superoak(app))
            .post(
                `/api/projects/${projectId}/repositories/${repositoryId}/contents`,
            )
            .set("Authorization", `Bearer ${token}`)
            .send({ data: contentData })
            .expect(400)
            .expect({ error: 'Invalid data: Field "title" is required' });
    });
    it("should not create content with invalid data field", async () => {
        const contentData = {
            title: 1,
            content: "Hello",
        };

        await (await superoak(app))
            .post(
                `/api/projects/${projectId}/repositories/${repositoryId}/contents`,
            )
            .set("Authorization", `Bearer ${token}`)
            .send({ data: contentData })
            .expect(400)
            .expect({
                error: 'Invalid data: Field "title" must be of type "string"',
            });
    });
});
