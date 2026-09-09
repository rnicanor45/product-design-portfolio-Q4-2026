import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { findProtectedRoute } from "@/lib/protected-routes";
import { cookieNameFor, safeEqual, signToken } from "@/lib/unlock-token";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const path = typeof body?.path === "string" ? body.path : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const route = findProtectedRoute(path);
  if (!route) {
    return NextResponse.json({ error: "Unknown protected route." }, { status: 400 });
  }

  const correctPassword = process.env[route.passwordEnv];
  if (!correctPassword) {
    // Fails closed: an unconfigured env var should never mean "no password required".
    return NextResponse.json(
      { error: "This page has not been configured with a password yet." },
      { status: 500 }
    );
  }

  if (!password || !safeEqual(password, correctPassword)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieNameFor(route.path), signToken(route.path), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return response;
}
