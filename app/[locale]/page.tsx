import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { SelectedWork } from '@/components/home/SelectedWork'
import { getMessages, toLocale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  return pageMetadata({ locale, path: '', title: getMessages(locale).homePage.link })
}

export default async function HomePage({ params }: Props) {
  const locale = toLocale((await params).locale)
  return (
    <div className="md:container md:mx-auto text-zinc-600">
      <Hero locale={locale} />
      <SelectedWork locale={locale} />
    </div>
  )
}
