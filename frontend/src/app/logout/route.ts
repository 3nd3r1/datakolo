import { logout } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await logout();
    return NextResponse.redirect(new URL("/login", req.nextUrl));
}
