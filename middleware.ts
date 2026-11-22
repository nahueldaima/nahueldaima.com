import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, LOCALES } from '@/lib/i18n'

function preferredLocale(request: NextRequest) {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value
  if (isLocale(cookie))
    return cookie
  const accepted = (request.headers.get('accept-language') ?? '')
    .split(',')
    .map(part => part.split(';')[0].trim().slice(0, 2).toLowerCase())
  return accepted.find(lang => (LOCALES as readonly string[]).includes(lang)) ?? DEFAULT_LOCALE
}

/** Every page lives under /en or /es; send un-prefixed page URLs ("/", "/about"…) to the visitor's language. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1]
  if (isLocale(first))
    return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale(request)}${pathname === '/'
    ? ''
    : pathname}`
  return NextResponse.redirect(url, 302)
}

export const config = {
  // Skip Next internals and anything that looks like a file (robots.txt, sitemap.xml, rss.xml, images…).
  matcher: ['/((?!_next/|.*\\.[^/]+$).*)'],
}
