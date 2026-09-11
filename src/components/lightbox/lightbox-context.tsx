"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence } from "framer-motion";
import type { ImageRef } from "@/data/projects";
import { LightboxOverlay } from "./lightbox-overlay";

type LightboxContextValue = {
  open: (image: ImageRef, trigger: HTMLElement | null) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

/**
 * Mounts a single shared overlay for the whole app so any image can open it
 * without each one carrying its own dialog/portal. Rendered inside
 * MotionRoot (see layout.tsx) so the overlay's Framer Motion transition
 * picks up the same `prefers-reduced-motion` handling as everything else.
 *
 * AnimatePresence lives here (around the conditional render) rather than
 * inside LightboxOverlay itself — that's what lets the overlay play its
 * exit fade before actually unmounting, instead of vanishing the instant
 * `close()` clears state.
 */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<ImageRef | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((nextImage: ImageRef, trigger: HTMLElement | null) => {
    triggerRef.current = trigger;
    setImage(nextImage);
  }, []);

  const close = useCallback(() => {
    setImage(null);
    // Standard dialog behavior: return focus to whatever opened it so
    // keyboard/screen-reader users land back where they were.
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {image ? <LightboxOverlay key={image.src} image={image} onClose={close} /> : null}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return ctx;
}
