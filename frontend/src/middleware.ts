import { NextRequest, NextResponse } from "next/server";

import { User } from "@/validators/user";

import { deleteAuthToken, getUser } from "@/lib/auth";

const notLoggedRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isLoggedRoute = !notLoggedRoutes.includes(path);

    let user: User | undefined = undefined;
    const result = await getUser();
    if (!result.success) {
        await deleteAuthToken();
    } else {
        user = result.data;
    }

    if (isLoggedRoute && !user) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (!isLoggedRoute && user) {
        return NextResponse.redirect(new URL("/projects", req.nextUrl));
    }

    if (path === "/") {
        return NextResponse.redirect(new URL("/projects", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|.*\\.png$).*)",
    ],
};
