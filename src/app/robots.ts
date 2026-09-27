import type { MetadataRoute } from "next";

// Deliberately NOT using `disallow` here, even though the entire site is
// password-protected: robots.txt disallow rules stop crawlers from ever
// visiting a URL, which means they never see the noindex tag — and a
// disallowed URL can still show up in search results (without a snippet) if
// something else links to it. The site is instead kept out of search via the
// `noindex` metadata (src/app/layout.tsx) + `X-Robots-Tag` header (set on
// every response in src/proxy.ts), which is the correct way to guarantee a
// page is never indexed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // TODO: set once the site has a real domain
    // sitemap: "https://yourdomain.com/sitemap.xml",
  };
}
