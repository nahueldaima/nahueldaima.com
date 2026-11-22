import type { Messages } from '@/messages/en'
import en from '@/messages/en'
import es from '@/messages/es'

export const LOCALES = ['en', 'es'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

/** Cookie the Nuxt i18n module used to remember the visitor's language; kept for continuity. */
export const LOCALE_COOKIE = 'i18n_redirected'

export const LOCALE_INFO: Record<Locale, { name: string, htmlLang: string, ogLocale: string }> = {
  en: { name: 'English', htmlLang: 'en-GB', ogLocale: 'en_GB' },
  es: { name: 'Español', htmlLang: 'es-ES', ogLocale: 'es_ES' },
}

const MESSAGES: Record<Locale, Messages> = { en, es }

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

/** Falls back to the default locale so an invalid segment still renders a (404) page. */
export function toLocale(value: unknown): Locale {
  return isLocale(value)
    ? value
    : DEFAULT_LOCALE
}

export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale]
}

/** Same output as vue-i18n's `$d()` on the old site: en → 5/25/2019, es → 25/5/2019. */
export function formatDate(date: string, locale: Locale): string {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime()))
    return date
  return new Intl.DateTimeFormat(locale, { timeZone: 'UTC' }).format(parsed)
}

/** `/en/tech` → `/es/tech`; any path is re-prefixed with the target locale. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split('/').filter(Boolean)
  if (isLocale(segments[0]))
    segments.shift()
  return `/${[target, ...segments].join('/')}`
}
