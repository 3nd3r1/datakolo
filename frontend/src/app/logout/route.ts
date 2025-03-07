import { NextRequest, NextResponse } from "next/server";

import { logout } from "@/lib/auth";

export async function GET(req: NextRequest) {
    await logout();
    return NextResponse.redirect(new URL("/login", req.nextUrl));
}
