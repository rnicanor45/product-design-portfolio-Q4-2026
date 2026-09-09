# Portfolio site

Next.js (App Router) + Tailwind + Framer Motion, deployed on Vercel.

## Stack decisions, and why

- **Next.js on Vercel** — per-route password protection via `proxy.ts` (Vercel's
  edge/server layer), zero-config git-push deploys with preview URLs per commit.
- **Framer Motion**, wrapped in `<MotionConfig reducedMotion="user">`
  (`src/components/motion-root.tsx`) — every animation in the site
  automatically respects a visitor's OS-level "reduce motion" setting with no
  per-component opt-in.
- **Tailwind v4** with design tokens in `src/app/globals.css` — colors,
  borders, etc. are CSS variables consumed as Tailwind utilities (`bg-bg`,
  `text-fg`, `border-border`, ...), so re-skinning the site once style
  direction is locked in is mostly edits to that one file.

## Password-protected / no-index pages

To make any case study private:

1. In `src/data/projects.ts`, set `protected: true` on that project.
2. Set an env var named `PROJECT_PASSWORD_<SLUG_UPPERCASED_WITH_UNDERSCORES>`
   (e.g. a project with slug `confidential-project` reads
   `PROJECT_PASSWORD_CONFIDENTIAL_PROJECT`). Locally, copy
   `.env.local.example` to `.env.local` and fill it in; on Vercel, add it
   under Project Settings → Environment Variables.
3. Also set `UNLOCK_SECRET` (any long random string —
   `openssl rand -base64 32` works) — it signs the "unlocked" cookie so the
   real password is never stored client-side.

That's it — no code changes needed per project. This automatically:

- Shows a password gate (`/locked`, see `src/app/locked/`) instead of the
  page content until the correct password is entered.
- Sends `X-Robots-Tag: noindex, nofollow` on every response for that route
  (`src/proxy.ts`), and sets `noindex` page metadata as a second layer
  (`src/app/work/[slug]/page.tsx`) — so it's excluded from search results
  even once someone has the password.
- Leaves the case study off the public `/work` index (`src/app/work/page.tsx`)
  while still reachable at its direct URL.

How it works: `src/proxy.ts` runs before every request under `/work/*`,
checks `src/lib/protected-routes.ts` (derived from the `protected` flag in
`src/data/projects.ts`) to see if the path needs a password, and if the
request doesn't carry a valid signed cookie, rewrites to the lock screen.
`src/app/api/unlock/route.ts` checks a submitted password against the env
var and, if correct, sets that signed cookie.

## Content

`src/data/projects.ts` is the single source of truth for case studies —
title, summary, role, year, tags, `meta` (duration/team/platforms/scope),
the `protected` flag, and a `body` of typed content blocks (heading,
paragraph, list, stats, quote) that `src/app/work/[slug]/page.tsx` renders
with consistent styling — add a project by adding data, no markup needed.
Real content has been ported from the old Framer site: the myMedidata
patient portal and Anime Expo App case studies, the About page bio/values,
and all 7 testimonials (`src/data/testimonials.ts`). One example
password-protected project (`confidential-project`) is still in there as a
reference for the pattern — replace or delete it.

Note: the original Framer case studies included diagrams, illustrations,
and screenshots that a text export can't capture. Those case studies are
currently text-only pending real visuals from Ryan.

## Style direction

Design tokens in `src/app/globals.css` were set from three references
(Cosmos, Duna, Base): a warm cream/near-black ground instead of stark
white, one confident accent color (terracotta) instead of a generic blue,
pill-shaped buttons, bold display type, and generous whitespace. A skills
marquee and a slowly-rotating footer badge (both pausing under
`prefers-reduced-motion`) are ported from small interaction details on the
original site.

## Local development

```bash
npm install
cp .env.local.example .env.local   # fill in UNLOCK_SECRET + any project passwords
npm run dev
```

## Deploying

Push this repo to GitHub, then import it on [vercel.com/new](https://vercel.com/new).
Add the env vars from `.env.local.example` under Project Settings →
Environment Variables before the first deploy that needs a password gate to
work. Every push gets its own preview URL; pushes to the production branch
deploy to the live domain.
