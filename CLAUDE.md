# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Nahuel Daima's personal website and blog — a Nuxt 3 (Vue 3) site statically generated and deployed as prerendered HTML. Content (tech articles, travel stories, CV/about) is authored in Markdown via `@nuxt/content`, with English and Spanish translations maintained as parallel files.

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build (SSR-capable output)
- `npm run generate` — static site generation to `dist/` (this is how the site is actually deployed — see `nitro.output.publicDir: 'dist'` in `nuxt.config.ts`)
- `npm run preview` — preview a generated build
- `npm run lint` / `npm run lint:fix` — ESLint via `@antfu/eslint-config` (config in `.eslintrc`; `content/**` is excluded from linting)

There is no test suite in this repo.

## Architecture

**Routing & content are coupled.** Blog content lives at `content/<locale>/<section>/<slug>.md` where `locale` is `en` or `es` and `section` is `tech` or `travel`. The file path *is* the URL: `content/en/tech/my-post.md` → `/en/tech/my-post`. Pages under `pages/tech/[_slug].vue`, `pages/travel/[_slug].vue`, and the catch-all `pages/[_slug].vue` / `pages/[...slug].vue` resolve content via `queryContent(route.path).findOne()` — there's no separate slug-to-file mapping to maintain.

**i18n via `@nuxtjs/i18n`** with `strategy: 'prefix'` and locales `en`/`es` (default `en`). Route-level translated strings (UI copy, not blog content) live in `i18n.config.ts`. EN/ES blog posts are meant to be kept paired: same filename/slug in both `content/en/...` and `content/es/...`, cross-linked via the optional `equivalent` frontmatter field.

**Required blog post frontmatter** (see any file under `content/`): `title`, `date` (ISO `YYYY-MM-DD`), `description`, `image`, `alt`, `ogImage`, `tags` (array), `published` (boolean). Body content should start headings at `##` (the `#`-level title is rendered separately by the page template). Images (`image`/`ogImage`) are typically full S3 URLs provided by the site owner, not local paths — see `providers/s3-provider.ts`, a custom `@nuxt/image` provider that resolves images against `IMAGES_BASE_URL`.

**Full instructions for authoring/translating blog posts** (including required question flow and sitemap update steps) are in `.claude/AGENTS.md` — read it before creating or editing blog content.

**SEO/OG data flow**: each content page (`pages/[_slug].vue`, `pages/tech/[_slug].vue`, etc.) builds a `BlogPost`-shaped object (`types/blog.ts`) from the queried content, feeds it into `useHead()` for meta/OG/Twitter tags and canonical link, and also calls `defineOgImageComponent` (via `nuxt-og-image`, rendered through `components/OgImage/About.vue`) to generate a social preview image. `public/sitemap.xml` is hand-maintained (via `@nuxtjs/sitemap`/manual edits) with `xhtml:link` alternates pairing each EN/ES post — new posts must be added here manually (see AGENTS.md workflow).

**Legacy URL redirects** for old non-prefixed blog URLs are declared as `routeRules` in `nuxt.config.ts` (301 to the `/en/...` equivalent) — add new ones here if a post's path changes rather than breaking old links.

**Component organization** under `components/` is by domain, not by page: `blog/` (article rendering, cards, TOC, header), `main/` (homepage sections: hero, recent, trending), `archive/` (list/hero for tech & travel index pages), `content/` (Prose overrides — `ProseA`, `ProseCode`, `ProseImg` — used to customize how `@nuxt/content` renders Markdown elements), `general/` (shared atoms: buttons, tags, dates, 404, consent popup), `footer/`, `i18n/` (language switcher), `comunity/` (ConvertKit newsletter signup form, paired with `plugins/formik.client.ts`).

**Router scroll behavior** is customized in `app/router.options.ts` (smooth-scroll to hash anchors, e.g. `<NuxtLink to="#top">`).

**Markdown authoring shortcut**: to open a link in the same tab from within content, use `<ProseA href="..." target="_self">text</ProseA>` (default Prose link behavior otherwise opens new tabs).

## Notes

- `generateRSS.sh` is a standalone zsh script (not part of the npm scripts) that crawls the local sitemap output to regenerate `rss.xml` after content changes — run manually against a running `dev`/`preview` server if the RSS feed needs updating.
- `_redirects` at the repo root handles a small number of static path blocks (`/wp-includes/*`, `/xmlrpc.php`, `/*/license.txt` → 404) at the hosting layer.
