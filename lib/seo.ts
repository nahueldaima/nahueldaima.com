import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { LOCALE_INFO, LOCALES } from '@/lib/i18n'
import { SEO, SITE_NAME, SITE_URL, TWITTER_HANDLE } from '@/lib/site'

/** Site-wide defaults: base URL for relative links, default title/description, favicons, RSS. */
export const SITE_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SEO.description,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/nahueldaima-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    types: { 'application/rss+xml': '/rss.xml' },
  },
}

interface PageSeo {
  locale: Locale
  /** Path after the locale prefix: '' for home, '/tech', '/tech/my-post'… */
  path: string
  /** Page title; rendered through the "Nahuel Daima - %s" template unless `absoluteTitle`. */
  title?: string
  absoluteTitle?: string
  /** Title for og:/twitter: tags when it should differ from the document title. */
  ogTitle?: string
  description?: string
  /** Locales that have this page (posts may exist in only one language). Defaults to all. */
  locales?: readonly Locale[]
  /** Full image URL for og:image / twitter:image. `null` = no image (e.g. a post without one). */
  image?: string | null
  type?: 'website' | 'article'
}

export function pageMetadata({ locale, path, title, absoluteTitle, ogTitle, description, locales = LOCALES, image, type = 'website' }: PageSeo): Metadata {
  const url = `${SITE_URL}/${locale}${path}`
  const languages: Record<string, string> = {}
  for (const l of locales)
    languages[l] = `/${l}${path}`
  if (locales.includes('en'))
    languages['x-default'] = `/en${path}`

  const resolvedTitle = absoluteTitle ?? (title
    ? `${SITE_NAME} - ${title}`
    : SITE_NAME)
  const resolvedDescription = description ?? SEO.description
  const ogImage = image === undefined
    ? SEO.image
    : image
  const socialTitle = ogTitle ?? (title || absoluteTitle
    ? resolvedTitle
    : SEO.ogTitle)

  return {
    title: { absolute: resolvedTitle },
    description: resolvedDescription,
    alternates: { canonical: url, languages },
    openGraph: {
      siteName: SITE_NAME,
      type,
      url,
      title: socialTitle,
      description: resolvedDescription,
      locale: LOCALE_INFO[locale].ogLocale,
      alternateLocale: locales.filter(l => l !== locale).map(l => LOCALE_INFO[l].ogLocale),
      ...(ogImage
        ? {
            images: [ogImage],
          }
        : {}),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: socialTitle,
      description: resolvedDescription,
      ...(ogImage
        ? {
            images: [ogImage],
          }
        : {}),
    },
  }
}
