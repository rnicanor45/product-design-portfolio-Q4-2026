import { createHmac, timingSafeEqual } from "crypto";

// Used to sign a per-route "unlocked" cookie so the raw password is never
// stored client-side. Set a real UNLOCK_SECRET in production (see
// .env.local.example) — the fallback below is only for local dev.
const SECRET = process.env.UNLOCK_SECRET || "dev-secret-change-me";

/** Deterministic, filesystem/cookie-safe cookie name for a protected path. */
export function cookieNameFor(path: string) {
  return `unlock_${Buffer.from(path).toString("base64url")}`;
}

export function signToken(path: string) {
  return createHmac("sha256", SECRET).update(path).digest("base64url");
}

export function verifyToken(path: string, token: string | undefined | null) {
  if (!token) return false;
  const expected = signToken(path);
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Constant-time string compare, for checking submitted passwords. */
export function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
