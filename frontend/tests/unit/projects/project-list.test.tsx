import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProjectList from "@/components/projects/project-list";
import { Project } from "@/types/project";

const dummyProjects: Project[] = [
    {
        id: "123",
        name: "Test Project 1",
        createdBy: "345",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "124",
        name: "Test Project 2",
        createdBy: "345",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

describe("ProjectList", () => {
    it("renders all projects", () => {
        render(<ProjectList projects={dummyProjects} />);

        expect(screen.getByText("Test Project 1")).toBeInTheDocument();
        expect(screen.getByText("Test Project 2")).toBeInTheDocument();
    });
});
