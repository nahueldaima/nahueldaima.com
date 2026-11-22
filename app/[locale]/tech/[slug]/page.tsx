import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import { ArticleHeader } from '@/components/blog/ArticleHeader'
import { Toc } from '@/components/blog/Toc'
import { getPost, getPostMeta, getPosts } from '@/lib/content'
import { getMessages, LOCALES, toLocale } from '@/lib/i18n'
import { imageUrl } from '@/lib/images'
import { pageMetadata } from '@/lib/seo'
import { SITE_NAME } from '@/lib/site'

interface Props { params: Promise<{ locale: string, slug: string }> }

export const dynamicParams = false

export function generateStaticParams({ params }: { params: { locale: string } }) {
  return getPosts(toLocale(params.locale)).map(post => ({ slug: post.slug }))
}

function availableLocales(slug: string): Locale[] {
  return LOCALES.filter(l => getPostMeta(l, slug) !== null)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale = toLocale(raw)
  const post = getPostMeta(locale, slug)
  if (!post)
    return {}
  return pageMetadata({
    locale,
    path: `/tech/${slug}`,
    absoluteTitle: `${post.title} - ${SITE_NAME}`,
    ogTitle: post.title,
    description: post.description,
    locales: availableLocales(slug),
    image: imageUrl(post.ogImage ?? post.image) ?? null,
    type: 'article',
  })
}

export default async function PostPage({ params }: Props) {
  const { locale: raw, slug } = await params
  const locale = toLocale(raw)
  const post = await getPost(locale, slug)
  if (!post)
    notFound()

  return (
    <div className="py-5 px-7 sm:px-1">
      <div className="container mx-auto max-w-3xl mt-9 px-8">
        <ArticleHeader title={post.title} date={post.date} description={post.description} locale={locale} />
      </div>
      <div>
        <Toc links={post.toc} label={getMessages(locale).articles.tableOfContents} />
      </div>
      <div className="container mx-auto max-w-4xl mt-9">
        <div
          className="font-content text-lg text-left prose prose-zinc dark:text-white dark:prose-invert prose-h1:no-underline prose-h2:no-underline prose-h3:no-underline prose-h4:no-underline prose-a:text-zinc-600 dark:prose-a:text-zinc-200 prose-h1:font-heading prose-h2:font-heading prose-h3:font-heading prose-h4:font-heading prose-h1:font-normal prose !max-w-none"
          // Rendered at build time from the repo's own Markdown files.
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  )
}
