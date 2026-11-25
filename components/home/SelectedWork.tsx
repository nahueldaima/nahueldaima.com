import type { Locale } from '@/lib/i18n'
import Link from 'next/link'
import { ArchiveCard, CardGrid } from '@/components/archive/ArchiveCard'
import { getPosts } from '@/lib/content'
import { getMessages } from '@/lib/i18n'

export function SelectedWork({ locale }: { locale: Locale }) {
  const posts = getPosts(locale).slice(0, 3)

  return (
    <section className="pt-5 pb-16 px-4">
      <div className="flex items-baseline justify-between pb-10">
        <h2 className="font-content text-2xl text-black dark:text-white">
          Selected Work
        </h2>
        <Link href={`/${locale}/tech`} className="font-content text-sm text-black dark:text-white hover:underline underline-offset-4">
          {getMessages(locale).articles.viewAll}
        </Link>
      </div>
      <CardGrid>
        {posts.map(post => (
          <ArchiveCard
            key={post.path}
            locale={locale}
            post={{
              path: post.path,
              title: post.title,
              date: post.date,
              tags: post.tags,
            }}
          />
        ))}
      </CardGrid>
    </section>
  )
}
