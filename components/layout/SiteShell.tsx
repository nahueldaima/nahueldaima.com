import type { ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'
import process from 'node:process'
import { Footer } from '@/components/footer/Footer'
import { Analytics } from '@/components/layout/Analytics'
import { ConsentPopup } from '@/components/layout/ConsentPopup'
import { ConvertKit } from '@/components/layout/ConvertKit'
import { Header } from '@/components/layout/Header'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { interFont, oswaldFont } from '@/lib/fonts'
import { getMessages, LOCALE_INFO } from '@/lib/i18n'

/** The full document: <html>, header, footer and site-wide widgets. Used by the locale layout and the 404 page. */
export function SiteShell({ locale, children }: { locale: Locale, children: ReactNode }) {
  const t = getMessages(locale)
  const gaId = process.env.GOOGLE_ANALYTICS_ID || undefined

  return (
    <html lang={LOCALE_INFO[locale].htmlLang} dir="ltr" className={`${interFont.variable} ${oswaldFont.variable}`} suppressHydrationWarning>
      <body className="bg-[#FFFFFF] dark:text-white dark:bg-slate-950">
        <ThemeProvider>
          <ConsentPopup gaId={gaId} labels={t.cookies} />
          <ConvertKit locale={locale} />
          <div className="gd-container font-heading">
            <header className="fixed w-full bg-[#FFFFFF] dark:bg-slate-950 z-10">
              <Header locale={locale} labels={{ tech: t.tech.link, about: t.aboutPage.link }} />
            </header>
            <main>
              <div className="p-9" />
              {children}
            </main>
            <footer>
              <Footer locale={locale} />
            </footer>
          </div>
        </ThemeProvider>
        <Analytics id={gaId} />
      </body>
    </html>
  )
}
