import { redirect } from "next/navigation";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createProject } from "@/lib/project";

import { useToast } from "@/hooks/use-toast";

import ProjectCreateDialog from "@/components/projects/project-create-dialog";

vi.mock("@/hooks/use-toast", () => ({
    useToast: vi.fn().mockReturnValue({ toast: vi.fn() }),
}));

vi.mock("@/lib/project", () => ({
    createProject: vi.fn(),
}));
vi.mock("next/navigation", () => ({
    redirect: vi.fn(),
}));

describe("ProjectCreateDialog", () => {
    const mockRedirect = vi.mocked(redirect);
    const mockCreateProject = vi.mocked(createProject);
    const mockToast = vi.mocked(useToast().toast);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders all fields when opened", () => {
        render(<ProjectCreateDialog />);

        fireEvent.click(screen.getByRole("button", { name: "Create Project" }));

        expect(screen.getByLabelText("Name *")).toBeInTheDocument();
    });

    it("validates all fields", async () => {
        render(<ProjectCreateDialog />);

        fireEvent.click(screen.getByRole("button", { name: "Create Project" }));

        fireEvent.click(screen.getByRole("button", { name: "Add Project" }));

        await waitFor(() => {
            expect(
                screen.getByText("Name must be at least 2 characters")
            ).toBeInTheDocument();
        });

        expect(mockCreateProject).not.toHaveBeenCalled();
    });

    it("creates a valid project", async () => {
        mockCreateProject.mockResolvedValue({
            id: "123",
            name: "Test Project",
            createdBy: "345",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        render(<ProjectCreateDialog />);

        fireEvent.click(screen.getByRole("button", { name: "Create Project" }));

        fireEvent.input(screen.getByLabelText("Name *"), {
            target: { value: "Test Project" },
        });
        fireEvent.click(screen.getByRole("button", { name: "Add Project" }));

        await waitFor(() => {
            expect(mockCreateProject).toHaveBeenCalledWith({
                name: "Test Project",
            });
            expect(mockToast).toHaveBeenCalledWith({
                title: "Success",
                description: "Project created successfully",
            });
            expect(mockRedirect).toHaveBeenCalledWith("/projects/123");
        });
    });
});
