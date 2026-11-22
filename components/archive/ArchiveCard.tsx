import type { Locale } from '@/lib/i18n'
import Link from 'next/link'
import { formatDate } from '@/lib/i18n'

export interface CardPost {
  path: string
  title: string
  date: string
  /** Shown on cards without an image, where the text carries the card. */
  description?: string
  tags?: string[]
  /** Full image URL; posts without one get a typographic card instead. */
  image?: string
  alt?: string
}

function DateBadge({ date, locale }: { date: string, locale: Locale }) {
  return (
    <div className="absolute top-4 left-4 text-white">
      <div className="px-2 py-1 rounded text-sm font-thin bg-black bg-opacity-50">
        {formatDate(date, locale)}
      </div>
    </div>
  )
}

function ImageCard({ post, locale }: { post: CardPost & { image: string }, locale: Locale }) {
  return (
    <div className="relative h-96 w-full">
      <img
        className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-[1.10]"
        src={post.image}
        alt={post.alt ?? post.title}
        loading="lazy"
      />
      <DateBadge date={post.date} locale={locale} />
      <div className="absolute bottom-4 left-4 text-white">
        <h2 className="text-3xl bg-black bg-opacity-50 rounded px-2">
          {post.title}
        </h2>
      </div>
    </div>
  )
}

/** Posts without a cover image: a dark, dot-grid card where the title and description are the visual. */
function TextCard({ post, locale }: { post: CardPost, locale: Locale }) {
  return (
    <div className="relative h-96 w-full bg-zinc-950 ring-1 ring-inset ring-zinc-800">
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-all duration-500 group-hover:scale-[1.10] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.14)_1px,transparent_0)] [background-size:22px_22px]"
      />
      <div aria-hidden="true" className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-zinc-500/20 blur-3xl transition-all duration-500 group-hover:bg-zinc-400/30" />
      <DateBadge date={post.date} locale={locale} />
      <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-8 text-white">
        {post.description && (
          <p className="font-content font-light text-base sm:text-lg text-zinc-300 max-w-2xl mb-4 line-clamp-3">
            {post.description}
          </p>
        )}
        <h2 className="text-3xl sm:text-5xl uppercase leading-tight">
          {post.title}
        </h2>
        {post.tags && post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-4 font-content text-xs uppercase tracking-wider text-zinc-400">
            {post.tags.map(tag => (
              <li key={tag} className="border border-zinc-700 rounded px-2 py-0.5">{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export function ArchiveCard({ post, locale }: { post: CardPost, locale: Locale }) {
  return (
    <article className="relative group m-2 my-10 rounded-md overflow-hidden text-white">
      <Link href={post.path} className="block h-full w-full">
        {post.image
          ? <ImageCard post={{ ...post, image: post.image }} locale={locale} />
          : <TextCard post={post} locale={locale} />}
      </Link>
    </article>
  )
}
