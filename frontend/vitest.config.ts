import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./tests/unit/testSetup.ts"],
        coverage: {
            provider: "v8",
            include: ["src/"],
            exclude: ["src/app", "src/components/ui"],
        },
    },
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
