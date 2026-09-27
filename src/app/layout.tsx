import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { MotionRoot } from "@/components/motion-root";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

// Satoshi (Fontshare, ITF Free Font License — self-hosting for a personal
// site is explicitly permitted, see src/fonts/SATOSHI-LICENSE.txt). Using
// the variable font files means one file covers the whole weight range.
const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
    { path: "../fonts/Satoshi-VariableItalic.woff2", weight: "300 900", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

// Runs before paint (next/script's beforeInteractive) so the correct theme
// applies immediately — no flash of the wrong theme while React hydrates.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark" ? stored : "system";
    if (theme !== "system") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  title: {
    default: "Ryan Nicanor — Digital Product Designer",
    template: "%s · Ryan Nicanor",
  },
  description:
    "Ryan Nicanor designs digital products with a deep understanding of people, a daring to be creative, and a collaborative spirit.",
  // The whole site sits behind a password (see src/proxy.ts), so nothing on
  // it should be indexed. This is the belt; src/proxy.ts's X-Robots-Tag
  // header on every response is the suspenders.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-fg">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionRoot>
          <Nav />
          <div id="main" className="flex flex-1 flex-col">
            {children}
          </div>
          <Footer />
        </MotionRoot>
      </body>
    </html>
  );
}
