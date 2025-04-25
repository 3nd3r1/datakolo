import { fireEvent, render, screen } from "@testing-library/react";
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

    it("updates the preview when changing the repository", () => {
        render(<ProjectApiBuilder repositories={mockRepositories} />);

        // Open the select dropdown
        const repositorySelect = screen.getByRole("combobox", {
            name: "Repository",
        });
        expect(repositorySelect).toBeInTheDocument();
        fireEvent.click(repositorySelect);

        // Click repo-1 option
        const repo1Option = screen.getByRole("option", {
            name: "Users Repository",
        });
        expect(repo1Option).toBeInTheDocument();
        fireEvent.click(repo1Option);

        expect(
            screen.getByText(
                "http://localhost:8000/api/v1/projects/project-1/repositories/repo-1/contents"
            )
        ).toBeInTheDocument();

        // Open the select dropdown again
        expect(repositorySelect).toBeInTheDocument();
        fireEvent.click(repositorySelect);

        // Click repo-2 option
        const repo2Option = screen.getByRole("option", {
            name: "Products Repository",
        });
        expect(repo2Option).toBeInTheDocument();
        fireEvent.click(repo2Option);

        expect(
            screen.getByText(
                "http://localhost:8000/api/v1/projects/project-1/repositories/repo-2/contents"
            )
        ).toBeInTheDocument();
    });
});
