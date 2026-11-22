import type { Metadata } from 'next'
import { NotFoundIllustration } from '@/components/general/NotFoundIllustration'
import { SiteShell } from '@/components/layout/SiteShell'
import { DEFAULT_LOCALE } from '@/lib/i18n'
import { SITE_METADATA } from '@/lib/seo'
import { SITE_NAME } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  ...SITE_METADATA,
  title: `${SITE_NAME} - 404`,
  robots: { index: false },
}

/** Every unknown URL (including /en/… and /es/… paths that don't exist) renders this, with a real 404 status. */
export default function GlobalNotFound() {
  return (
    <SiteShell locale={DEFAULT_LOCALE}>
      <NotFoundIllustration />
    </SiteShell>
  )
}
