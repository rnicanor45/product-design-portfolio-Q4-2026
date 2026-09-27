import type { Metadata } from "next";
import { LockScreen } from "./lock-screen";

export const metadata: Metadata = {
  title: "Protected",
  robots: { index: false, follow: false },
};

export default async function LockedPage({
  searchParams,
}: PageProps<"/locked">) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/";

  return <LockScreen next={next} />;
}
