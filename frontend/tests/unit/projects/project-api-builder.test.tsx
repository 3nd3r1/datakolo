import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Repository } from "@/validators/repository";

import ProjectApiBuilder from "@/components/projects/api-builder/project-api-builder";

const mockRepositories: Repository[] = [
    {
        id: "repo-1",
        name: "Users Repository",
        contentSchema: {
            name: { type: "string", required: true },
            age: { type: "number", required: false },
        },
        project: "project-1",
        createdBy: "user-1",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "repo-2",
        name: "Products Repository",
        contentSchema: {
            title: { type: "string", required: true },
            price: { type: "number", required: true },
        },
        project: "project-1",
        createdBy: "user-1",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

describe("ProjectApiBuilder", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the component", () => {
        render(<ProjectApiBuilder repositories={mockRepositories} />);
        expect(screen.getByText("API Builder")).toBeInTheDocument();
        expect(
            screen.getByText("Build API requests to access your content")
        ).toBeInTheDocument();
    });

    it("handles empty repositories", () => {
        render(<ProjectApiBuilder repositories={[]} />);
        expect(screen.getByText("API Builder")).toBeInTheDocument();
        expect(
            screen.getByText(
                "Please select a repository to see the API request"
            )
        ).toBeInTheDocument();
    });
});
