"use server";

import { getAuthHeader } from "@/lib/auth";
import { getApiUrl } from "@/lib/config";

type ApiOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    headers?: Record<string, string>;
    cache?: RequestCache;
    tags?: string[];
};

export async function apiRequest(
    endpoint: string,
    options: ApiOptions = {}
): Promise<Response> {
    const { method = "GET", body, headers = {}, cache, tags } = options;

    const baseUrl = getApiUrl();

    return await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(await getAuthHeader()),
            ...headers,
        },
        ...(cache ? { cache } : {}),
        ...(body ? { body: JSON.stringify(body) } : {}),
        ...(tags?.length ? { next: { tags } } : {}),
    });
}
