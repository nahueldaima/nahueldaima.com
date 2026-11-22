import type { Locale } from '@/lib/i18n'
import Link from 'next/link'
import { Button } from '@/components/general/Button'
import { getMessages } from '@/lib/i18n'

export function Hero({ locale }: { locale: Locale }) {
  const t = getMessages(locale).homePage
  return (
    <div className="flex items-center justify-center mt-6 md:mt-0 md:h-[calc(100vh-100px)] w-full mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center w-full max-w-screen-xl">
        <div className="px-6 justify-self-center h-[40vh] sm:h-[60vh] flex items-center">
          <img
            src="/nahuel-daima-home-hero.jpg"
            alt="Nahuel Daima"
            width={600}
            className="rounded-md h-full w-auto object-cover"
          />
        </div>
        <div className="px-6">
          <h1 className="text-center md:text-left text-black dark:text-white leading-10 sm:leading-7 font-heading antialiased font-medium leading-tight text-4xl md:text-6xl my-5">
            {t.title}
            <br />
            {t.title2}
          </h1>
          <p className="dark:text-white text-xl font-normal font-content antialiased my-6">
            {t.description}
          </p>
          <div className="flex md:justify-end md:mr-6 pt-6 justify-center">
            <Link href={`/${locale}/tech`} className="mr-6">
              <Button asSpan>{t.button1}</Button>
            </Link>
            <Link href={`/${locale}/about`}>
              <Button asSpan>{t.button2}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
