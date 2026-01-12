# AGENTS

This file contains copy/paste instructions for LLM agents used with this repo/workflow.

## Blog post agent (Nuxt Content) — create post, translate, update sitemap

```text
You are writing a new blog post for a Nuxt Content blog repo.

## Repo rules (MUST follow)
- Content lives in `content/<locale>/<section>/<slug>.md`
  - locale: `en` or `es`
  - section: `tech` or `travel`
- The URL is the same as the path:
  - `content/en/tech/my-post.md` => `/en/tech/my-post`
  - `content/es/travel/my-post.md` => `/es/travel/my-post`
- Keep EN+ES paired by using the SAME filename/slug in both languages.
- Frontmatter fields MUST exist:
  - `title` (string)
  - `date` (string, ISO `YYYY-MM-DD`)
  - `description` (string, short summary for cards/SEO)
  - `image` (string, S3 URL I will provide)
  - `alt` (string, image alt text)
  - `ogImage` (string, S3 URL I will provide)
  - `tags` (array of strings)
  - `published` (boolean)
  - `equivalent` (string; optional metadata)
- Headings: avoid starting the body with `#` (title is already used elsewhere). Start with `##`.

## Workflow (IMPORTANT)
- Draft in ONE language first (whichever I choose).
- Iterate with me until I confirm the post is final.
- ONLY after it’s final: translate and create the other language version as a second file (same slug, same images, natural translation).

## Images (S3 rule)
- I will provide full S3 URLs.
- Set BOTH `image` and `ogImage` to the exact S3 URL(s) I provide.
- Do not invent filenames or local `/...` paths.
- If I provide only one URL, reuse it for both `image` and `ogImage` unless I explicitly give two different URLs.

## Sitemap (MUST do)
- After the final post(s) are ready, update `public/sitemap.xml` by adding:
  - the new EN URL and its `xhtml:link` alternate to ES
  - the new ES URL and its `xhtml:link` alternate to EN
  - update `lastmod` for the new entries to match the post `date`
- Do not change existing URLs unless necessary; only append new `<url>` entries.

## Before writing, ask me ONLY these questions
1) Primary language for drafting: `en` or `es`.
2) Section: `tech` or `travel`.
3) Title.
4) Date (YYYY-MM-DD). If I don’t provide it, use today’s date.
5) One-sentence description (for cards/SEO).
6) Tags (comma-separated).
7) Slug preference:
   - If I give a slug, use it.
   - If not, propose a kebab-case slug derived from the title.
8) S3 image URLs:
   - cover image URL (required)
   - OG image URL (optional; if missing, reuse cover URL)
9) Alt text for the cover image (if I don’t provide it, write a good descriptive one).
10) Any required links/CTAs + target audience + approximate length.

## Output requirements
- During drafting: output a single Markdown file content (frontmatter + body) for the chosen language only.
- After final approval: output TWO final files, clearly labeled with their target paths:
  - `content/en/<section>/<slug>.md`
  - `content/es/<section>/<slug>.md`
  And update `public/sitemap.xml` accordingly.

## Quality bar
- Clear structure with `##` / `###` headings.
- Practical, specific content (examples, steps, checklists when relevant).
- No broken links; if unsure, leave placeholders like `TODO_LINK`.
- Keep description short; don’t repeat it verbatim in the first paragraph.
```
