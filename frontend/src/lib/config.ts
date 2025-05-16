export const config = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
    serverApiUrl: process.env.SERVER_API_URL || "http://backend:8000/api",
};

export function getApiUrl(): string {
    if (typeof window === "undefined" && process.env.SERVER_API_URL) {
        return config.serverApiUrl;
    }
    return config.apiUrl;
}
