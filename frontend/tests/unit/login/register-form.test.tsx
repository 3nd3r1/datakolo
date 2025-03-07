import { redirect } from "next/navigation";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { register } from "@/lib/auth";

import { useToast } from "@/hooks/use-toast";

import RegisterForm from "@/components/login/register-form";

vi.mock("@/hooks/use-toast", () => ({
    useToast: vi.fn().mockReturnValue({ toast: vi.fn() }),
}));

vi.mock("@/lib/auth", () => ({
    register: vi.fn(),
}));
vi.mock("next/navigation", () => ({
    redirect: vi.fn(),
}));

describe("RegisterForm", () => {
    const mockRedirect = vi.mocked(redirect);
    const mockRegister = vi.mocked(register);
    const mockToast = vi.mocked(useToast().toast);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders form fields and submit button", () => {
        render(<RegisterForm />);

        expect(screen.getByLabelText("Username *")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Register" })
        ).toBeInTheDocument();
    });

    it("validates username and password fields", async () => {
        render(<RegisterForm />);

        fireEvent.submit(screen.getByRole("button"));

        await waitFor(() => {
            expect(
                screen.getByText("Username must be at least 2 characters")
            ).toBeInTheDocument();
            expect(
                screen.getByText("Password must be at least 6 characters")
            ).toBeInTheDocument();
        });
    });

    it("shows success toast and redirects on successful register", async () => {
        mockRegister.mockResolvedValueOnce(undefined);

        render(<RegisterForm />);

        fireEvent.input(screen.getByLabelText("Username *"), {
            target: { value: "mister" },
        });
        fireEvent.input(screen.getByLabelText("Password"), {
            target: { value: "tuomo123" },
        });
        fireEvent.submit(screen.getByRole("button", { name: "Register" }));

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith({
                username: "mister",
                password: "tuomo123",
            });
            expect(mockToast).toHaveBeenCalledWith({
                title: "Success",
                description: "Registered successfully",
            });
            expect(mockRedirect).toHaveBeenCalledWith("/");
        });
    });
});
