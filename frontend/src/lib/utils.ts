import { Content } from "@/validators/content";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
