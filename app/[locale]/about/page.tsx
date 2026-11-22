import type { Metadata } from 'next'
import { getMessages, toLocale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  return pageMetadata({ locale, path: '/about', title: getMessages(locale).aboutPage.link })
}

export default async function AboutPage({ params }: Props) {
  const t = getMessages(toLocale((await params).locale)).aboutPage
  return (
    <div className="py-5 px-6">
      <div className="container mx-auto max-w-3xl mt-9">
        <div className="justify-between">
          <div>
            <h1 className="text-4xl sm:text-7xl uppercase pb-2 text-center">
              {t.title}
            </h1>
          </div>
        </div>
        <h3 className="text-base sm:text-3xl text-5xl pb-7 font-content text-center sm:pb-12">
          {t.description}
        </h3>
        {/* Site-owned copy from messages/*.ts (contains <br> tags); now rendered at build time. */}
        <p className="font-content text-justify text-lg" dangerouslySetInnerHTML={{ __html: t.aboutMe }} />
        <div className="hidden sm:block col-span-3" />
      </div>
    </div>
  )
}
