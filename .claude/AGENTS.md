# AGENTS

This file contains copy/paste instructions for LLM agents used with this repo/workflow.

## Blog post agent (Next.js, Markdown content): create post, translate

```text
You are adding a new blog post to a Next.js blog repo whose posts are Markdown files.

## Repo rules (MUST follow)
- Content lives in `content/<locale>/tech/<slug>.md`
  - locale: `en` or `es`
  - section: `tech` (the only published section; `travel` posts are kept in the repo but never built)
- The URL is the same as the path:
  - `content/en/tech/my-post.md` => `/en/tech/my-post`
- Keep EN+ES paired by using the SAME filename/slug in both languages.
- Frontmatter fields:
  - `title` (string, required)
  - `date` (string, ISO `YYYY-MM-DD`, required)
  - `description` (string, short summary for cards/SEO, required)
  - `tags` (array of strings, required)
  - `published` (boolean, required; only `true` posts are built)
  - `image` (string, S3 URL I provide; optional)
  - `ogImage` (string, S3 URL I provide; optional)
  - `alt` (string, image alt text; only when there is an image)
- A post without images is fine: its card shows a gradient and its social preview has no image.
- The page renders the title itself, so the body must not contain a `#` heading.

## The author's text is final (MUST follow)
- Use my title and my post text EXACTLY as I wrote them: no typo fixes, no rewording, no added headings, no restructuring.
- If something looks like a mistake, mention it in chat and let me decide; never change it yourself.
- The translation is a faithful translation of my text, keeping its structure.

## Workflow (IMPORTANT)
- Draft in ONE language first (whichever I choose), using my text verbatim.
- Iterate with me until I confirm the post is final.
- ONLY after it's final: translate and create the other language version as a second file (same slug, same images, natural translation).
- Nothing else to update: the sitemap, RSS feed, post list and language alternates are all generated from the content at build time.
- Before committing, run `npm run build` and check the new post appears as a prerendered route.

## Images (S3 rule)
- If I provide images, they are full S3 URLs.
- Set BOTH `image` and `ogImage` to the exact S3 URL(s) I provide.
- Do not invent filenames or local `/...` paths.
- If I provide only one URL, reuse it for both `image` and `ogImage` unless I explicitly give two different URLs.
- If I say there are no images, omit `image`, `ogImage` and `alt`.

## Before writing, ask me ONLY these questions
1) Primary language for drafting: `en` or `es`.
2) Title.
3) Date (YYYY-MM-DD). If I don't provide it, use today's date.
4) One-sentence description (for cards/SEO).
5) Tags (comma-separated). If I'm not sure, propose 2–4 short ones.
6) Slug preference:
   - If I give a slug, use it.
   - If not, propose a kebab-case slug derived from the title.
7) S3 image URLs (optional):
   - cover image URL
   - OG image URL (if missing, reuse cover URL)
8) Alt text for the cover image (only if there is one; if I don't provide it, write a good descriptive one).
9) The post text itself.

## Output requirements
- During drafting: one Markdown file (frontmatter + my verbatim body) for the chosen language only.
- After final approval: TWO files, clearly labeled with their target paths:
  - `content/en/tech/<slug>.md`
  - `content/es/tech/<slug>.md`
```
