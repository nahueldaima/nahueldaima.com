import type { Locale } from '@/lib/i18n'
import { formatDate } from '@/lib/i18n'

export function ArticleHeader({ title, date, description, locale }: { title: string, date: string, description: string, locale: Locale }) {
  return (
    <header>
      <div className="mb-10">
        <div className="flex justify-between">
          <div>
            <p className="text-center mb-2 font-thin dark:text-white">
              {formatDate(date, locale)}
            </p>
            <h1 className="text-4xl sm:text-6xl uppercase pb-2 text-center dark:text-white">
              {title}
            </h1>
          </div>
        </div>
        <h3 className="font-content text-md sm:text-xl pb-7 text-center sm:pb-1 dark:text-white">
          {description}
        </h3>
      </div>
    </header>
  )
}
