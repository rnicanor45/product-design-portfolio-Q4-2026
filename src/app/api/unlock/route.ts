import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_UNLOCK_COOKIE, safeEqual, signSiteToken } from "@/lib/unlock-token";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  const correctPassword = process.env.SITE_PASSWORD;
  if (!correctPassword) {
    // Fails closed: an unconfigured env var should never mean "no password required".
    return NextResponse.json(
      { error: "This site has not been configured with a password yet." },
      { status: 500 }
    );
  }

  if (!password || !safeEqual(password, correctPassword)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SITE_UNLOCK_COOKIE, signSiteToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return response;
}
