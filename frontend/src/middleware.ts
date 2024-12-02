import { NextRequest, NextResponse } from "next/server";
import { getUser, logout } from "@/lib/auth";

const notLoggedRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isLoggedRoute = !notLoggedRoutes.includes(path);
    const isNotLoggedRoute = notLoggedRoutes.includes(path);

    const user = await getUser().catch(async () => {
        await logout();
        return undefined;
    });

    if (isLoggedRoute && !user) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (isNotLoggedRoute && user) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
