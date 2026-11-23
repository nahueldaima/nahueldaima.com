import type { Metadata } from 'next'
import { ArchiveHero } from '@/components/archive/ArchiveHero'
import { ArticleList } from '@/components/blog/ArticleList'
import { getPosts } from '@/lib/content'
import { getMessages, toLocale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  const t = getMessages(locale).tech
  return pageMetadata({
    locale,
    path: '/tech',
    title: t.title,
    description: t.metaContent,
  })
}

export default async function TechPage({ params }: Props) {
  const locale = toLocale((await params).locale)
  const t = getMessages(locale)
  const posts = getPosts(locale).map(post => ({
    path: post.path,
    title: post.title,
    date: post.date,
    tags: post.tags,
  }))

  return (
    <div>
      <ArchiveHero title={t.tech.title} description={t.tech.metaDescription} />
      <ArticleList posts={posts} locale={locale} searchPlaceholder={t.articles.search} noResults={t.articles.noResults} />
    </div>
  )
}
