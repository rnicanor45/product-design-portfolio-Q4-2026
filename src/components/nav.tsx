import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
];

export function Nav() {
  return (
    <header className="border-b border-border">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5"
      >
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Ryan Nicanor
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
