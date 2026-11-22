import type { Locale } from '@/lib/i18n'
import Link from 'next/link'
import { formatDate } from '@/lib/i18n'

export interface CardPost {
  path: string
  title: string
  date: string
  /** Full image URL; posts without one get a gradient instead. */
  image?: string
  alt?: string
}

export function ArchiveCard({ post, locale }: { post: CardPost, locale: Locale }) {
  return (
    <article className="relative group m-2 my-10 rounded-md overflow-hidden text-white">
      <Link href={post.path} className="block h-full w-full">
        <div className="relative h-96 w-full">
          {post.image
            ? (
                <img
                  className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-[1.10]"
                  src={post.image}
                  alt={post.alt ?? post.title}
                  loading="lazy"
                />
              )
            : <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-zinc-700 to-zinc-900 transition-all duration-500 group-hover:scale-[1.10]" />}
          <div className="absolute top-4 left-4 text-white">
            <div className="px-2 py-1 rounded text-sm font-thin bg-black bg-opacity-50">
              {formatDate(post.date, locale)}
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl bg-black bg-opacity-50 rounded px-2">
              {post.title}
            </h2>
          </div>
        </div>
      </Link>
    </article>
  )
}
