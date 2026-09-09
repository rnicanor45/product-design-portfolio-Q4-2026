import { RotatingBadge } from "@/components/rotating-badge";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-muted">Say hello!</p>
            <a
              href="mailto:rnicanor45@gmail.com"
              className="mt-1 block text-2xl font-semibold tracking-tight text-fg transition-colors hover:text-link sm:text-3xl"
            >
              rnicanor45@gmail.com
            </a>
          </div>
          <RotatingBadge />
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ryan Nicanor. All rights reserved.</p>
          <a
            href="https://www.linkedin.com/in/ryan-nicanor"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-link"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
