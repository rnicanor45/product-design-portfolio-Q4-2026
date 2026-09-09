import { projects } from "@/data/projects";

export type ProtectedRoute = {
  /** URL path that requires a password, e.g. "/work/confidential-project" */
  path: string;
  /** Human-readable label shown on the lock screen */
  label: string;
  /** Name of the env var holding the password for this route */
  passwordEnv: string;
};

function envNameFor(slug: string) {
  return `PROJECT_PASSWORD_${slug.toUpperCase().replace(/-/g, "_")}`;
}

export const protectedRoutes: ProtectedRoute[] = projects
  .filter((p) => p.protected)
  .map((p) => ({
    path: `/work/${p.slug}`,
    label: p.title,
    passwordEnv: envNameFor(p.slug),
  }));

export function findProtectedRoute(pathname: string): ProtectedRoute | undefined {
  return protectedRoutes.find(
    (r) => pathname === r.path || pathname.startsWith(`${r.path}/`)
  );
}
