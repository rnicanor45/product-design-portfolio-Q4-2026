"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Wraps the app so every Framer Motion animation automatically respects the
// visitor's OS-level "reduce motion" setting — no per-component opt-in needed.
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
