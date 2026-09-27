import { createHmac, timingSafeEqual } from "crypto";

// Signs a single site-wide "unlocked" cookie so the raw password is never
// stored client-side. Set a real UNLOCK_SECRET in production (see
// .env.local.example) — the fallback below is only for local dev.
const SECRET = process.env.UNLOCK_SECRET || "dev-secret-change-me";

// Fixed marker rather than a per-path value: the whole site shares one gate,
// so there's nothing route-specific to bind the signature to.
const MARKER = "site-unlocked";

/** Cookie that records a visitor has entered the site-wide password. */
export const SITE_UNLOCK_COOKIE = "site_unlock";

export function signSiteToken() {
  return createHmac("sha256", SECRET).update(MARKER).digest("base64url");
}

export function verifySiteToken(token: string | undefined | null) {
  if (!token) return false;
  const expected = signSiteToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Constant-time string compare, for checking the submitted password. */
export function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
