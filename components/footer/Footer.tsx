import type { Locale } from '@/lib/i18n'
import Link from 'next/link'
import { Button } from '@/components/general/Button'
import { Icon } from '@/components/general/Icon'
import { getMessages } from '@/lib/i18n'
import { LINKS } from '@/lib/site'

const SOCIAL = 'p-2 text-gray-800 rounded-md dark:text-[#F1F2F4]'

export function Footer({ locale }: { locale: Locale }) {
  const t = getMessages(locale)
  return (
    <div className="py-5 border-t dark:border-gray-800 text-zinc-700 dark:text-white">
      <div className="px-6 container max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col items-center sm:items-start">
            <img src="/nahuel-daima-caricature.jpg" alt="Nahuel Daima" width={80} height={80} className="rounded-full" loading="lazy" />
            <p className="py-2 dark:text-white">{t.footerData.aboutAuthor}</p>
            <div className="my-1 pb-3">
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="py-2 pr-2 text-gray-800 rounded-md dark:text-[#F1F2F4]" aria-label="Github">
                <Icon name="fa:github" />
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={SOCIAL} aria-label="LinkedIn">
                <Icon name="fa:linkedin-square" />
              </a>
              <a href={LINKS.x} target="_blank" rel="noopener noreferrer" className={SOCIAL} aria-label="X">
                <Icon name="fa:twitter-square" />
              </a>
              <a href="/rss.xml" target="_blank" className={SOCIAL} aria-label="RSS">
                <Icon name="fa:rss" />
              </a>
            </div>
          </div>

          <div className="flex flex-col dark:text-white my-5 items-center sm:items-start">
            <p className="text-black dark:text-white text-base font-semibold mb-4">{t.footerData.quickLink}</p>
            <Link href={`/${locale}`} className="hover:underline">{t.homePage.link}</Link>
            <Link href={`/${locale}/cv`} className="hover:underline">{t.mycv.link}</Link>
            <Link href={`/${locale}/about`} className="hover:underline">{t.aboutPage.link}</Link>
          </div>

          <div className="my-5 flex flex-col items-center sm:items-start text-center sm:text-left">
            <p className="text-black dark:text-white text-base font-semibold">{t.footerData.connect}</p>
            <p className="dark:text-white">{t.footerData.authorInterest}</p>
            <div className="mt-4">
              <a href={LINKS.bioSite} target="_blank" rel="noopener noreferrer" aria-label="Bio Site">
                <Button asSpan>{t.footerData.connect}</Button>
              </a>
            </div>
          </div>
        </div>

        <div className="text-xs font-light dark:border-gray-800 mt-5 text-center p-2">
          {t.footerData.copyRight}
        </div>
      </div>
    </div>
  )
}
