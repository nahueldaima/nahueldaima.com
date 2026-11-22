import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/general/Button'
import { formatDate, getMessages, toLocale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'
import { LINKS } from '@/lib/site'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  return pageMetadata({ locale, path: '/cv', title: getMessages(locale).mycv.link })
}

const H3 = 'text-base sm:text-3xl text-4xl uppercase pb-4 text-black dark:text-white sm:text-left text-center'
const H4_LEAD = 'text-base sm:text-xl text-4xl uppercase pb-2 text-black text-zinc-600 dark:text-white sm:text-left text-center'
const H4 = 'text-base sm:text-xl text-3xl uppercase pb-2 text-black text-zinc-600 dark:text-white sm:text-left text-center'
const BODY = 'dark:text-white text-xl text-center sm:text-justify font-normal font-content antialiased my-6'
const LOGO = 'rounded-md h-full w-auto object-cover'

/** CV copy comes from messages/*.ts and contains inline HTML (<b>, <br>). */
function Html({ html }: { html: string }) {
  return <p className={BODY} dangerouslySetInnerHTML={{ __html: html }} />
}

function Company({ logo, logoAlt, company, title, from, to, description, className }: {
  logo: string
  logoAlt: string
  company: string
  title: string
  from: string
  to: string
  description: string
  className: string
}) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-5 items-center mt-4">
        <div className="px-6 justify-self-center flex items-center">
          <img src={logo} alt={logoAlt} loading="lazy" className={LOGO} />
        </div>
        <div className="px-6 col-span-4">
          <h3 className={H3}>{company}</h3>
          <h4 className={H4_LEAD}>{title}</h4>
          <p className="sm:text-left text-center">
            {from}
            {' '}
            -
            {' '}
            {to}
          </p>
          <Html html={description} />
        </div>
      </div>
    </div>
  )
}

export default async function CvPage({ params }: Props) {
  const locale: Locale = toLocale((await params).locale)
  const t = getMessages(locale).mycv
  const d = (date: string) => formatDate(date, locale)

  return (
    <div className="pt-5">
      <div className="container mx-auto max-w-3xl mt-9">
        <h1 className="text-5xl sm:text-7xl uppercase pb-2 text-center dark:text-white">
          {t.title}
        </h1>
        <p className="text-base text-4xl sm:text-2xl pb-7 text-center sm:pb-12 font-normal text-zinc-500">
          {t.subtitle}
        </p>
      </div>

      <div className="container mx-auto max-w-5xl sm:mt-9 mb-20 ">
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center">
          <div className="px-6 sm:hidden justify-self-center h-[30vh] flex items-center mt-5 mb-10">
            <img src="/nahuel-daima-profile-cv.jpg" loading="lazy" alt="Nahuel Daima Profile CV" className={LOGO} />
          </div>
          <div className="px-6 col-span-2">
            <h2 className="text-base sm:text-5xl text-5xl uppercase pb-4 sm:pb-6 text-black sm:text-left text-center dark:text-white">
              Bio
            </h2>
            <Html html={t.bio} />
          </div>
          <div className="hidden sm:block px-6 justify-self-center h-[40vh] flex items-center">
            <img src="/nahuel-daima-profile-cv.jpg" alt="Nahuel Daima Profile CV" loading="lazy" className={LOGO} />
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl items-center min-h-screen content-center">
        <div className="px-6">
          <h2 className="text-base sm:text-5xl text-5xl uppercase pb-5 sm:pb-8 text-black dark:text-white sm:text-left text-center">
            {t.highlights}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 items-center mt-4">
          <div className="px-6 justify-self-center flex items-center">
            <img src="/nahuel-daima-tookane-vtlab.png" alt="Nahuel Daima Tookane CTO" loading="lazy" className={LOGO} />
          </div>
          <div className="px-6 col-span-4">
            <h3 className={H3}>{t.latestCompany}</h3>
            <h4 className={H4_LEAD}>{t.latestPositionTitle}</h4>
            <p className="sm:text-left text-center">
              {d('2019-05-25')}
              {' '}
              -
              {' '}
              {t.now}
            </p>
            <Html html={t.latestPositionDescription} />
          </div>
        </div>
        <div className="px-6 grid grid-cols-1 sm:grid-cols-5 items-center mt-8">
          <div className="px-2 col-start-2 col-span-4">
            <h4 className={H4}>{t.previousPositionTitle}</h4>
            <p className="sm:text-left text-center">
              {d('2021-03-21')}
              {' '}
              -
              {' '}
              {d('2022-10-21')}
            </p>
            <Html html={t.previousPositionDescription} />
          </div>
        </div>
        <div className="px-6 grid grid-cols-1 sm:grid-cols-5 items-center mt-8">
          <div className="px-2 col-start-2 col-span-4">
            <h4 className={H4}>{t.previousPositionTitle2}</h4>
            <p className="sm:text-left text-center">
              {d('2019-05-25')}
              {' '}
              -
              {' '}
              {d('2021-03-21')}
            </p>
            <Html html={t.previousPositionDescription2} />
          </div>
        </div>
      </div>

      <Company
        className="container mx-auto max-w-5xl items-center content-center"
        logo="/nahuel-daima-ycombinator.png"
        logoAlt="Nahuel Daima Ycombinator"
        company={t.previousCompany}
        title={t.previousCompanyPositionTitle}
        from={d('2016-10-01')}
        to={d('2017-01-31')}
        description={t.previousCompanyPositionDescription}
      />
      <Company
        className="container mx-auto max-w-5xl items-center content-center mt-12"
        logo="/nahuel-daima-waleeto.png"
        logoAlt="Nahuel Daima Waleeto"
        company={t.previousCompany2}
        title={t.previousCompanyPositionTitle2}
        from={d('2023-02-10')}
        to={t.now}
        description={t.previousCompanyPositionDescription2}
      />
      <Company
        className="container mx-auto max-w-5xl items-center content-center mt-12"
        logo="/nahuel-daima-shift-metrics.png"
        logoAlt="Nahuel Daima Shift metrics"
        company={t.previousCompany3}
        title={t.previousCompanyPositionTitle3}
        from={d('2016-10-01')}
        to={d('2019-01-31')}
        description={t.previousCompanyPositionDescription3}
      />

      <div className="flex items-center justify-center bg-gray-200 dark:bg-transparent h-64 w-full mx-auto mt-12">
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-800 rounded-md dark:text-[#F1F2F4]" aria-label="LinkedIn">
          <Button asSpan>{t.viewFullProfile}</Button>
        </a>
      </div>
    </div>
  )
}
