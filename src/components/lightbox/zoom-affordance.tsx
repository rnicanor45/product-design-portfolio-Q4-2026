/** Hover/focus overlay shown on top of a zoomable image: a soft dark scrim
 * plus a magnifier badge, on `hover` and on `focus-visible` alike (the
 * acceptance criteria calls out both explicitly — the focus *ring* itself
 * comes for free from the site's global `:focus-visible` rule, this is the
 * extra affordance layered on top of it). Expects an ancestor with
 * `group/zoom` and `position: relative`. */
export function ZoomAffordance() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity duration-150 group-hover/zoom:bg-black/15 group-hover/zoom:opacity-100 group-focus-visible/zoom:bg-black/15 group-focus-visible/zoom:opacity-100"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-md">
        <svg
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
        </svg>
      </span>
    </span>
  );
}
