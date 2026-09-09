const text = "DESIGN CREATES CULTURE • ";
const repeated = text.repeat(2);

/** Slowly-rotating circular badge — a small signature detail in the footer. */
export function RotatingBadge() {
  return (
    <div aria-hidden className="rotate-slow h-16 w-16 shrink-0 text-fg">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path
            id="badge-circle"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text fontSize="8.2" letterSpacing="1" fill="currentColor">
          <textPath href="#badge-circle" startOffset="0%">
            {repeated}
          </textPath>
        </text>
        <circle cx="50" cy="50" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}
