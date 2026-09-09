import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { findProtectedRoute } from "@/lib/protected-routes";
import { cookieNameFor, verifyToken } from "@/lib/unlock-token";

// Gates any path listed in src/lib/protected-routes.ts behind a password,
// and marks matching responses noindex,nofollow so search engines skip them
// even if a link leaks. The matcher below is intentionally broad ("all of
// /work") because Next requires the matcher to be a static, analyzable
// value — the actual protected/not-protected decision happens at runtime
// via findProtectedRoute, driven by the `protected` flag in src/data/projects.ts.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const route = findProtectedRoute(pathname);

  if (!route) {
    return NextResponse.next();
  }

  const token = request.cookies.get(cookieNameFor(route.path))?.value;
  const unlocked = verifyToken(route.path, token);

  if (!unlocked) {
    const lockUrl = new URL("/locked", request.url);
    lockUrl.searchParams.set("next", pathname);
    lockUrl.searchParams.set("label", route.label);
    const response = NextResponse.rewrite(lockUrl);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/work/:path*"],
};
