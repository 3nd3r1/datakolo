import { redirect } from "next/navigation";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { login } from "@/lib/auth";
import { createErrorResult, createSuccessResult } from "@/lib/utils";

import { useToast } from "@/hooks/use-toast";

import LoginForm from "@/components/login/login-form";

vi.mock("@/hooks/use-toast", () => ({
    useToast: vi.fn().mockReturnValue({ toast: vi.fn() }),
}));

vi.mock("@/lib/auth", () => ({
    login: vi.fn(),
}));
vi.mock("next/navigation", () => ({
    redirect: vi.fn(),
}));

describe("LoginForm", () => {
    const mockRedirect = vi.mocked(redirect);
    const mockLogin = vi.mocked(login);
    const mockToast = vi.mocked(useToast().toast);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders form fields and submit button", () => {
        render(<LoginForm />);

        expect(screen.getByLabelText("Username *")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Login" })
        ).toBeInTheDocument();
    });

    it("validates username and password fields", async () => {
        render(<LoginForm />);

        fireEvent.click(screen.getByRole("button", { name: "Login" }));

        await waitFor(() => {
            expect(
                screen.getByText("Username must be at least 2 characters")
            ).toBeInTheDocument();
            expect(
                screen.getByText("Password must be at least 6 characters")
            ).toBeInTheDocument();
        });
    });

    it("shows success toast and redirects on successful login", async () => {
        mockLogin.mockResolvedValueOnce(createSuccessResult());

        render(<LoginForm />);

        fireEvent.input(screen.getByLabelText("Username *"), {
            target: { value: "john" },
        });
        fireEvent.input(screen.getByLabelText("Password"), {
            target: { value: "password" },
        });
        fireEvent.submit(screen.getByRole("button", { name: "Login" }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith("john", "password");
            expect(mockToast).toHaveBeenCalledWith({
                title: "Success",
                description: "Logged in successfully",
            });
            expect(mockRedirect).toHaveBeenCalledWith("/");
        });
    });

    it("shows error toast on failed login", async () => {
        mockLogin.mockResolvedValueOnce(createErrorResult("Invalid password"));

        render(<LoginForm />);

        fireEvent.input(screen.getByLabelText("Username *"), {
            target: { value: "john" },
        });
        fireEvent.input(screen.getByLabelText("Password"), {
            target: { value: "wrong123" },
        });
        fireEvent.submit(screen.getByRole("button", { name: "Login" }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith("john", "wrong123");
            expect(mockToast).toHaveBeenCalledWith({
                variant: "destructive",
                title: "Error",
                description: "Invalid password",
            });
            expect(mockRedirect).toHaveBeenCalledTimes(0);
        });
    });
});
