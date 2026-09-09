import type { MetadataRoute } from "next";

// Deliberately NOT using `disallow` for protected case studies here: robots.txt
// disallow rules stop crawlers from ever visiting a URL, which means they
// never see the noindex tag — and a disallowed URL can still show up in
// search results (without a snippet) if something else links to it.
// Protected pages are instead kept out of search via the `noindex` metadata
// + `X-Robots-Tag` header set in src/proxy.ts and src/app/work/[slug]/page.tsx,
// which is the correct way to guarantee a page is never indexed.
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
