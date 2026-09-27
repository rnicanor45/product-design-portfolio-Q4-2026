import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_UNLOCK_COOKIE, verifySiteToken } from "@/lib/unlock-token";

// Gates the entire site behind a single password, and marks every response
// noindex,nofollow so search engines skip the whole thing even if a link
// leaks. The matcher below excludes Next internals, the public/images
// folder, and the lock screen + unlock API themselves — those three would
// otherwise break the lock screen (its own assets) or create a redirect
// loop (locking /locked or /api/unlock).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(SITE_UNLOCK_COOKIE)?.value;
  const unlocked = verifySiteToken(token);

  if (!unlocked) {
    const lockUrl = new URL("/locked", request.url);
    lockUrl.searchParams.set("next", pathname);
    const response = NextResponse.rewrite(lockUrl);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|api/unlock|locked).*)",
  ],
};
