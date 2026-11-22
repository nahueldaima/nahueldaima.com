# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Nahuel Daima's personal website and blog. It's a Next.js 15 (App Router, React 19, TypeScript, Tailwind 3) site where every page is prerendered to static HTML at build time and served by `next start`. Tech articles live as Markdown in `content/`, and the site keeps English and Spanish versions in parallel files. (The site was a Nuxt 3 app until the 2026-11 rewrite; that history is in git.)

## Commands

- `npm run dev` starts the dev server at http://localhost:3000.
- `npm run build` creates the production build. All routes must show as ○/● (static/SSG) in the output; a ƒ route means something became dynamic.
- `npm start` runs the production server (`next start`, on `$PORT` or 3000).
- `npm run lint` / `npm run lint:fix` run ESLint via `@antfu/eslint-config` (React). `content/**` and `lib/icons.generated.ts` are excluded.
- `npm run icons` regenerates `lib/icons.generated.ts` after editing the icon list in `scripts/build-icons.mjs`.

There is no test suite. Verify changes by running `npm run build`, then `npm start` and curl or the browser.

## Deployment

Pushing to `main` on GitHub auto-deploys to production through **Coolify**.

- **Build pack:** Nixpacks. It runs `npm ci`, then `npm run build`; the Start Command is `npm run start`, on port 3000.
- **Domains:** nahueldaima.com and www.nahueldaima.com.
- **Env vars** (set in Coolify, available at build and runtime):
  - `IMAGES_BASE_URL`: the S3 bucket base for post images.
  - `GOOGLE_ANALYTICS_ID`.
- **Node version:** `engines.node` (22.x) pins it for Nixpacks.
- **Downtime:** Coolify can't do rolling updates for this app, so each deploy has a few seconds of downtime.
- **Before pushing:** run `npm run build` locally, because every push to `main` goes live.

## Architecture

- **Routing:** everything lives under `app/[locale]/` (`en` | `es`), and `generateStaticParams` with `dynamicParams = false` makes every page static.
  - `middleware.ts` redirects un-prefixed page URLs (`/`, `/about`…) to the visitor's language, using the `i18n_redirected` cookie and then `Accept-Language`.
  - Unknown URLs render `app/global-not-found.tsx`, which shows the site layout and returns a real 404 status.
- **Content:** files live at `content/<locale>/tech/<slug>.md`, and the file path is the URL (`/en/tech/<slug>`).
  - `lib/content.ts` reads the files with gray-matter and renders them with unified (remark → rehype) at build time.
  - Only `published: true` posts are built. Travel posts are kept in the repo but never built, and their old URLs redirect to /about.
  - The custom rehype step ports the old Prose components:
    - Links open in a new tab unless they set `target` (`<ProseA href="..." target="_self">` still works).
    - Relative image paths resolve against `IMAGES_BASE_URL`.
    - h2 headings feed the table of contents.
- **EN/ES pairing:** use the same slug in both locales. The language switcher swaps `/en` ↔ `/es`, and hreflang alternates only list locales where the post exists.
- **UI strings:** `messages/en.ts` and `messages/es.ts` hold them (es is typed against en, so keys must match). Read them with `getMessages(locale)` from `lib/i18n.ts`. Dates go through `formatDate()`, which outputs en `5/25/2019` and es `25/5/2019`.
- **SEO:** each page's `generateMetadata` calls `pageMetadata()` in `lib/seo.ts`, which sets the title template "Nahuel Daima - %s", the canonical URL, hreflang, and OG/Twitter tags. Posts without `ogImage`/`image` get no og:image and a `summary` twitter card.
  - `app/sitemap.ts` and `app/rss.xml/route.ts` are generated from the content at build time, so there's nothing to hand-edit.
- **Redirects:** legacy URLs are 301s in `next.config.ts` `redirects()`. Add new ones there if a post's path changes.
- **Components** are organized by domain:
  - `layout/`: the `SiteShell` document, `Header`, theme, language switcher, consent and GA, ConvertKit.
  - `home/`, `archive/` (cards), `blog/` (list, header, TOC), `footer/`, and `general/` (`Icon`, `Button`).
  - Client components are marked `'use client'`; everything else renders on the server at build time.
- **Images:** plain `<img>`. Local images live in `public/`, post images come from S3 via `imageUrl()` in `lib/images.ts`, and post cards without an image show a zinc gradient.
- **Theme:** `next-themes` with the class strategy, dark by default. It keeps the old `nuxt-color-mode` storage key.

## Blog posts

Full instructions for authoring and translating posts are in `.claude/AGENTS.md`; read it before creating or editing blog content. The owner's post text and title must be used **verbatim**, with no corrections and no added headings.
