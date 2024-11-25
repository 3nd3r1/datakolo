import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Home from "@/app/(main)/page";

describe("Home Page", () => {
    it("renders the homepage with hello world", () => {
        render(<Home />);

        const welcomeMessage = screen.getByText("Hello, World!");
        expect(welcomeMessage).toBeInTheDocument();
    });
});
