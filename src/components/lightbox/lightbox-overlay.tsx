"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import type { ImageRef } from "@/data/projects";
import { clampNumber, distance, type Point } from "./geometry";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_CLICK_SCALE = 2.5;
const ZOOM_STEP = 0.75;
// Tuned so a normal trackpad/mouse-wheel notch feels like a deliberate,
// gentle step rather than a jump — deltaY runs into the hundreds per notch.
const WHEEL_SENSITIVITY = 0.0022;
const ARROW_PAN_STEP = 48;

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  );
}

export function LightboxOverlay({
  image,
  onClose,
}: {
  image: ImageRef;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(MIN_SCALE);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });

  // Event handlers below are wired once (empty dep arrays) and read state
  // through this ref instead of closing over `scale` directly, so they
  // always see the latest value without needing to be re-attached.
  const scaleRef = useRef(scale);
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  const activePointers = useRef(new Map<number, Point>());
  const pinchStart = useRef<{ distance: number; scale: number } | null>(null);
  const panStart = useRef<{ pointerId: number; point: Point; offset: Point } | null>(null);

  // Lock page scroll and move focus into the dialog while it's open. Focus
  // is returned to the trigger by the provider's close(), after this
  // unmounts, so it isn't handled here.
  useEffect(() => {
    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      style.overflow = previousOverflow;
    };
  }, []);

  /** The image's current on-screen center, plus its *unscaled* rendered
   * size — derived by dividing the live (already-transformed) bounding box
   * back out by the current scale, so zoom/pan math always has a stable
   * base to work from regardless of how zoomed in we already are. */
  const currentImageBox = useCallback(() => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const liveScale = scaleRef.current;
    return {
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
      baseWidth: rect.width / liveScale,
      baseHeight: rect.height / liveScale,
    };
  }, []);

  const boundOffset = useCallback(
    (candidate: Point, targetScale: number, box: ReturnType<typeof currentImageBox>): Point => {
      if (!box || targetScale <= MIN_SCALE) return { x: 0, y: 0 };
      const maxX = (box.baseWidth * (targetScale - 1)) / 2;
      const maxY = (box.baseHeight * (targetScale - 1)) / 2;
      return {
        x: clampNumber(candidate.x, -maxX, maxX),
        y: clampNumber(candidate.y, -maxY, maxY),
      };
    },
    []
  );

  /** Zooms to `nextScaleRaw`, keeping `center` (viewport coordinates —
   * defaults to the image's own center, e.g. for the toolbar buttons)
   * visually anchored in place, the way pinch- and cursor-zoom are
   * expected to feel. */
  const applyZoom = useCallback(
    (nextScaleRaw: number, center?: Point) => {
      const box = currentImageBox();
      setScale((prevScale) => {
        const nextScale = clampNumber(nextScaleRaw, MIN_SCALE, MAX_SCALE);
        setOffset((prevOffset) => {
          if (nextScale === MIN_SCALE) return { x: 0, y: 0 };
          const anchor = box ? { x: box.centerX, y: box.centerY } : center ?? prevOffset;
          const target = center ?? anchor;
          const k = nextScale / prevScale;
          const raw: Point = {
            x: (target.x - anchor.x) * (1 - k) + prevOffset.x * k,
            y: (target.y - anchor.y) * (1 - k) + prevOffset.y * k,
          };
          return boundOffset(raw, nextScale, box);
        });
        return nextScale;
      });
    },
    [boundOffset, currentImageBox]
  );

  const resetView = useCallback(() => applyZoom(MIN_SCALE), [applyZoom]);

  // React makes onWheel passive by default, which silently ignores
  // preventDefault() — attaching natively with { passive: false } is the
  // documented workaround, and it's what lets us take over the gesture for
  // our own zoom instead of the browser trying to scroll or zoom the page.
  useEffect(() => {
    const node = imageRef.current?.parentElement;
    if (!node) return;
    function handleWheel(event: WheelEvent) {
      event.preventDefault();
      const factor = Math.exp(-event.deltaY * WHEEL_SENSITIVITY);
      applyZoom(scaleRef.current * factor, { x: event.clientX, y: event.clientY });
    }
    node.addEventListener("wheel", handleWheel, { passive: false });
    return () => node.removeEventListener("wheel", handleWheel);
  }, [applyZoom]);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    activePointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointers.current.size === 2) {
      const [a, b] = Array.from(activePointers.current.values());
      pinchStart.current = { distance: distance(a, b), scale: scaleRef.current };
      panStart.current = null;
    } else if (activePointers.current.size === 1 && scaleRef.current > MIN_SCALE) {
      panStart.current = {
        pointerId: event.pointerId,
        point: { x: event.clientX, y: event.clientY },
        offset,
      };
    }
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!activePointers.current.has(event.pointerId)) return;
    activePointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointers.current.size === 2 && pinchStart.current) {
      const [a, b] = Array.from(activePointers.current.values());
      const ratio = distance(a, b) / pinchStart.current.distance;
      applyZoom(pinchStart.current.scale * ratio, { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
      return;
    }

    if (panStart.current && panStart.current.pointerId === event.pointerId) {
      const dx = event.clientX - panStart.current.point.x;
      const dy = event.clientY - panStart.current.point.y;
      const next = { x: panStart.current.offset.x + dx, y: panStart.current.offset.y + dy };
      setOffset(boundOffset(next, scaleRef.current, currentImageBox()));
    }
  }

  function endPointer(event: PointerEvent<HTMLDivElement>) {
    activePointers.current.delete(event.pointerId);
    if (activePointers.current.size < 2) pinchStart.current = null;
    if (panStart.current?.pointerId === event.pointerId) panStart.current = null;

    // If one finger/cursor remains after a pinch or multi-touch ends, let
    // it keep panning smoothly instead of requiring a fresh press.
    const remaining = Array.from(activePointers.current.entries())[0];
    if (remaining && scaleRef.current > MIN_SCALE) {
      const [pointerId, point] = remaining;
      panStart.current = { pointerId, point, offset };
    }
  }

  function handleDoubleClick(event: MouseEvent<HTMLDivElement>) {
    const target = scaleRef.current > MIN_SCALE ? MIN_SCALE : DOUBLE_CLICK_SCALE;
    applyZoom(target, { x: event.clientX, y: event.clientY });
  }

  // Dismiss on any click that isn't on the image itself or a toolbar
  // button. Comparing target/currentTarget on the backdrop element alone
  // doesn't work here, since the centering wrappers between the backdrop
  // and the image are themselves valid click targets in the letterboxed
  // space around a non-full-bleed image — checking "did this land inside
  // the image or the toolbar" is correct regardless of how much of the
  // dialog's layout area the click actually falls in.
  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as Node;
    if (imageRef.current?.contains(target)) return;
    if (toolbarRef.current?.contains(target)) return;
    onClose();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key === "Tab") {
      if (!dialogRef.current) return;
      const focusable = getFocusable(dialogRef.current);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }

    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      applyZoom(scaleRef.current + ZOOM_STEP);
    } else if (event.key === "-" || event.key === "_") {
      event.preventDefault();
      applyZoom(scaleRef.current - ZOOM_STEP);
    } else if (event.key === "0") {
      event.preventDefault();
      resetView();
    } else if (scaleRef.current > MIN_SCALE && event.key.startsWith("Arrow")) {
      event.preventDefault();
      const next = { ...offset };
      if (event.key === "ArrowUp") next.y += ARROW_PAN_STEP;
      if (event.key === "ArrowDown") next.y -= ARROW_PAN_STEP;
      if (event.key === "ArrowLeft") next.x += ARROW_PAN_STEP;
      if (event.key === "ArrowRight") next.x -= ARROW_PAN_STEP;
      setOffset(boundOffset(next, scaleRef.current, currentImageBox()));
    }
  }

  const dialogLabel = image.alt ? `Expanded image: ${image.alt}` : "Expanded image";
  const zoomPercent = Math.round(scale * 100);

  return createPortal(
    <motion.div
      className="lightbox-surface fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={dialogLabel}
        onKeyDown={handleKeyDown}
        className="relative flex h-full w-full items-center justify-center outline-none"
      >
        <div
          className="flex h-full max-h-[85vh] w-full max-w-[92vw] touch-none select-none items-center justify-center"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onDoubleClick={handleDoubleClick}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- intentionally
              a plain <img>, not next/image: the whole point of this view is
              inspecting the original file at full resolution, and the pan/zoom
              math below reads its live, transformed bounding box directly. */}
          <img
            ref={imageRef}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            draggable={false}
            className="h-auto w-auto max-h-[85vh] max-w-[92vw] rounded-md object-contain shadow-2xl"
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
              cursor: scale > MIN_SCALE ? "grab" : "zoom-in",
            }}
          />
        </div>

        <div ref={toolbarRef} className="absolute right-3 top-3 flex items-center gap-2 sm:right-6 sm:top-6">
          <span
            aria-live="polite"
            className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium tabular-nums text-white/80"
          >
            {zoomPercent}%
          </span>
          <button
            type="button"
            onClick={() => applyZoom(scaleRef.current - ZOOM_STEP)}
            disabled={scale <= MIN_SCALE}
            aria-label="Zoom out"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-30"
          >
            <MinusIcon />
          </button>
          <button
            type="button"
            onClick={() => applyZoom(scaleRef.current + ZOOM_STEP)}
            disabled={scale >= MAX_SCALE}
            aria-label="Zoom in"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-30"
          >
            <PlusIcon />
          </button>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close expanded image"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <CloseIcon />
          </button>
        </div>

        <p className="pointer-events-none absolute bottom-4 left-1/2 w-max max-w-[90vw] -translate-x-1/2 text-center text-xs text-white/50 sm:bottom-6">
          Scroll or pinch to zoom · drag to pan · Esc to close
        </p>
      </div>
    </motion.div>,
    document.body
  );
}

function MinusIcon() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
