import type { Locale } from '@/lib/i18n'
import Link from 'next/link'
import { GradientArt } from '@/components/archive/GradientArt'
import { formatDate } from '@/lib/i18n'

export interface CardPost {
  path: string
  title: string
  date: string
  tags?: string[]
}

function label(tag: string) {
  const words = tag.replace(/-/g, ' ')
  return tag.length <= 3
    ? words.toUpperCase()
    : words.charAt(0).toUpperCase() + words.slice(1)
}

/** A post card: generated gradient artwork, then the title and a tag + date line underneath. */
export function ArchiveCard({ post, locale }: { post: CardPost, locale: Locale }) {
  const tag = post.tags?.[0]
  return (
    <article className="group">
      <Link href={post.path} className="block">
        <GradientArt seed={post.path.replace(/^\/(en|es)/, '')} className="aspect-square w-full rounded-lg" />
        <h3 className="mt-5 font-content text-xl leading-snug text-black dark:text-white group-hover:underline decoration-1 underline-offset-4">
          {post.title}
        </h3>
        <p className="mt-3 font-content text-sm flex gap-4">
          {tag && <span className="text-black dark:text-white">{label(tag)}</span>}
          <time dateTime={post.date} className="text-zinc-500 dark:text-zinc-400">{formatDate(post.date, locale)}</time>
        </p>
      </Link>
    </article>
  )
}

export function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">{children}</div>
}
