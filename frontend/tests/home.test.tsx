import Home from "../src/app/(main)/page";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Home Page", () => {
    it("renders the homepage with hello world", () => {
        render(<Home />);

        const welcomeMessage = screen.getByText("Hello, World!");
        expect(welcomeMessage).toBeInTheDocument();
    });
});
