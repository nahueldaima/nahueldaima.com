import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { SiteShell } from '@/components/layout/SiteShell'
import { LOCALES, toLocale } from '@/lib/i18n'
import { SITE_METADATA } from '@/lib/seo'
import '../globals.css'

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

export const metadata: Metadata = SITE_METADATA

export default async function LocaleLayout({ children, params }: { children: ReactNode, params: Promise<{ locale: string }> }) {
  return <SiteShell locale={toLocale((await params).locale)}>{children}</SiteShell>
}
