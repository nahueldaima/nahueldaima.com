import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/general/Button'
import { getMessages, toLocale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  return pageMetadata({ locale, path: '/confirm-subscription', title: getMessages(locale).confirmSubscription.title })
}

export default async function ConfirmSubscriptionPage({ params }: Props) {
  const locale = toLocale((await params).locale)
  const t = getMessages(locale).confirmSubscription
  return (
    <div className="md:container md:mx-auto text-zinc-600">
      <div className="dark:text-white text-black flex flex-col items-center justify-center mt-6 md:mt-0 md:h-[calc(100vh-500px)] w-full mb-8">
        <h1 className="text-4xl sm:text-7xl uppercase pb-2 text-center">
          {t.title}
        </h1>
        <p className="font-content text-justify text-lg">
          {t.description}
        </p>
        <div className="mt-4">
          <Link href={`/${locale}`}>
            <Button asSpan>{t.button}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
