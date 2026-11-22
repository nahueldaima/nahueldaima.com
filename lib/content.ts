// Markdown blog content: content/<locale>/<section>/<slug>.md — the file path is the URL.
// Server-only (reads the filesystem at build time, when every page is prerendered).
import type { Element, Root } from 'hast'
import type { Locale } from '@/lib/i18n'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'
import { toString } from 'hast-util-to-string'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { imageUrl } from '@/lib/images'

const CONTENT_DIR = path.join(process.cwd(), 'content')

/** Only the tech section is published; travel posts stay in the repo but are not built. */
export type Section = 'tech'

export interface PostMeta {
  slug: string
  locale: Locale
  section: Section
  path: string
  title: string
  date: string
  description: string
  image?: string
  ogImage?: string
  alt?: string
  tags: string[]
  published: boolean
}

export interface TocLink {
  id: string
  text: string
}

export interface Post extends PostMeta {
  html: string
  toc: TocLink[]
}

function normalizeDate(value: unknown): string {
  if (value instanceof Date)
    return value.toISOString().slice(0, 10)
  return typeof value === 'string'
    ? value
    : ''
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim()
    ? value.trim()
    : undefined
}

function sectionDir(locale: Locale, section: Section): string {
  return path.join(CONTENT_DIR, locale, section)
}

function readFile(locale: Locale, section: Section, slug: string) {
  const file = path.join(sectionDir(locale, section), `${slug}.md`)
  if (!fs.existsSync(file))
    return null
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  const meta: PostMeta = {
    slug,
    locale,
    section,
    path: `/${locale}/${section}/${slug}`,
    title: String(data.title ?? ''),
    date: normalizeDate(data.date),
    description: String(data.description ?? ''),
    image: optionalString(data.image),
    ogImage: optionalString(data.ogImage),
    alt: optionalString(data.alt),
    tags: Array.isArray(data.tags)
      ? data.tags.map(String)
      : [],
    published: data.published === true,
  }
  return { meta, content }
}

/**
 * Ports the old Prose component overrides:
 * - ProseA: links open in a new tab unless they set a target (e.g. `<ProseA href="..." target="_self">`).
 * - ProseImg: relative image paths resolve against the S3 bucket.
 * Also collects the h2 headings for the table of contents.
 */
function rehypeSite(toc: TocLink[]) {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'prosea')
        node.tagName = 'a'

      if (node.tagName === 'a') {
        const props = node.properties
        if (!props.target)
          props.target = '_blank'
        if (props.target === '_blank')
          props.rel = ['noopener', 'noreferrer']
      }

      if (node.tagName === 'img') {
        const src = typeof node.properties.src === 'string'
          ? node.properties.src
          : undefined
        const resolved = imageUrl(src)
        if (resolved)
          node.properties.src = resolved
        node.properties.loading = 'lazy'
        node.properties.className = [
          'w-full',
          'h-auto',
          'rounded',
          'object-cover',
          'object-center',
        ]
      }

      if (node.tagName === 'h2' && typeof node.properties.id === 'string') {
        toc.push({
          id: node.properties.id,
          text: toString(node),
        })
      }
    })
  }
}

async function renderMarkdown(markdown: string): Promise<{ html: string, toc: TocLink[] }> {
  const toc: TocLink[] = []
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeSite, toc)
    .use(rehypeStringify)
    .process(markdown)
  return {
    html: String(file),
    toc,
  }
}

/** Published posts of a section, newest first. */
export function getPosts(locale: Locale, section: Section = 'tech'): PostMeta[] {
  const dir = sectionDir(locale, section)
  if (!fs.existsSync(dir))
    return []
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.md'))
    .map(file => readFile(locale, section, file.replace(/\.md$/, ''))?.meta)
    .filter((meta): meta is PostMeta => !!meta && meta.published)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostMeta(locale: Locale, slug: string, section: Section = 'tech'): PostMeta | null {
  const meta = readFile(locale, section, slug)?.meta
  return meta?.published ? meta : null
}

export async function getPost(locale: Locale, slug: string, section: Section = 'tech'): Promise<Post | null> {
  const file = readFile(locale, section, slug)
  if (!file?.meta.published)
    return null
  return {
    ...file.meta,
    ...(await renderMarkdown(file.content)),
  }
}
