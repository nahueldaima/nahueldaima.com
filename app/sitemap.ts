import type { MetadataRoute } from 'next'
import type { Locale } from '@/lib/i18n'
import { getPostMeta, getPosts } from '@/lib/content'
import { LOCALES } from '@/lib/i18n'
import { SITE_URL } from '@/lib/site'

// Generated at build time from the pages and the published posts (replaces the hand-maintained sitemap.xml).
const PAGES = ['', '/tech', '/about', '/cv']

function languages(path: string, locales: readonly Locale[]) {
  return Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}${path}`]))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const path of PAGES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        changeFrequency: 'monthly',
        priority: path === ''
          ? 1
          : 0.8,
        alternates: {
          languages: languages(path, LOCALES),
        },
      })
    }
  }

  for (const locale of LOCALES) {
    for (const post of getPosts(locale)) {
      const available = LOCALES.filter(l => getPostMeta(l, post.slug) !== null)
      entries.push({
        url: `${SITE_URL}${post.path}`,
        lastModified: post.date,
        changeFrequency: 'yearly',
        priority: 0.9,
        alternates: {
          languages: languages(`/tech/${post.slug}`, available),
        },
      })
    }
  }

  return entries
}
