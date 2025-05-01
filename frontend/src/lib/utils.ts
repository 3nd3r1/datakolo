import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Content } from "@/validators/content";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Function that returns an arbitary display value for content
export function getContentDisplayValue(content: Content): string {
    if (!content.data || typeof content.data !== "object") {
        return content.id;
    }

    for (const [_, value] of Object.entries(content.data)) {
        if (typeof value === "string" && value.trim() !== "") {
            return value;
        }
    }

    return content.id;
}

export type ServerActionResult<T = void> =
    | { success: true; data: T }
    | { success: false; error: string };

export function createSuccessResult<T>(data: T): ServerActionResult<T> {
    return { success: true, data };
}

export function createErrorResult(
    error: string = "An error occurred"
): ServerActionResult<never> {
    return { success: false, error: error };
}
