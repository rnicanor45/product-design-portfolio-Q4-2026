"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import type { ImageRef } from "@/data/projects";
import { useLightbox } from "./lightbox-context";
import { ZoomAffordance } from "./zoom-affordance";

/** Two variants mirroring the two ways `next/image` is already used across
 * the site (fixed width/height vs. an absolutely-positioned `fill`) rather
 * than one prop-juggling component — next/image's props are a discriminated
 * union between those modes, and writing each out plainly keeps that union
 * intact instead of fighting it through `Omit`/spreads. */
type BaseProps = {
  image: ImageRef;
  /** Frame styling (border/rounded/overflow-hidden/bg-surface) — put it
   * here, on the trigger `<button>` itself, rather than on a separate
   * wrapping element. An element's own `overflow: hidden` never clips its
   * own focus outline, only a *parent's* does, so keeping the button as
   * the one bordered/clipped element is what keeps the focus ring intact. */
  wrapperClassName: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

function Trigger({ image, wrapperClassName, children }: { image: ImageRef; wrapperClassName: string; children: ReactNode }) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { open } = useLightbox();

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => open(image, triggerRef.current)}
      aria-label={`Expand image: ${image.alt}`}
      className={`group/zoom relative block cursor-zoom-in text-left ${wrapperClassName}`}
    >
      {children}
      <ZoomAffordance />
    </button>
  );
}

/** For a fixed-size image rendered at its real width/height (SingleImage's
 * case). */
export function ZoomableImage({ image, wrapperClassName, imageClassName, sizes, priority }: BaseProps) {
  return (
    <Trigger image={image} wrapperClassName={wrapperClassName}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className={`transition-transform duration-300 group-hover/zoom:scale-[1.03] ${imageClassName ?? ""}`}
      />
    </Trigger>
  );
}

/** For a next/image `fill` container (Gallery items, the About page profile
 * portrait) — the parent must already be sized/positioned exactly as a
 * plain `fill` Image would need. */
export function ZoomableFillImage({ image, wrapperClassName, imageClassName, sizes, priority }: BaseProps) {
  return (
    <Trigger image={image} wrapperClassName={wrapperClassName}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`transition-transform duration-300 group-hover/zoom:scale-[1.03] ${imageClassName ?? ""}`}
      />
    </Trigger>
  );
}
