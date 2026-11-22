'use client'

import type { CardPost } from '@/components/archive/ArchiveCard'
import type { Locale } from '@/lib/i18n'
import { useState } from 'react'
import { ArchiveCard } from '@/components/archive/ArchiveCard'

interface Props {
  posts: CardPost[]
  locale: Locale
  searchPlaceholder: string
}

/** The post list is server-rendered (crawlable); the search box filters it in the browser. */
export function ArticleList({ posts, locale, searchPlaceholder }: Props) {
  const [query, setQuery] = useState('')
  const needle = query.trim().toLocaleLowerCase()
  const visible = needle
    ? posts.filter(post => post.title.toLocaleLowerCase().includes(needle))
    : posts

  return (
    <div className="container mx-auto max-w-4xl mt-9">
      <div className="px-6 max-w-xl mx-auto mb-10">
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          type="text"
          className="text-lg border-b-2 border-b border-0 border-slate-100 dark:border-slate-500 block w-full dark:placeholder-white text-black dark:text-white dark:bg-transparent placeholder:text-black border-gray-300 focus:border-none focus:ring focus:ring-transparent dark:focus:ring-transparent"
        />
      </div>
      <div className="space-y-5 my-5 px-4">
        {visible.map(post => <ArchiveCard key={post.path} post={post} locale={locale} />)}
        {visible.length === 0 && (
          <ArchiveCard
            post={{
              path: `/${locale}/tech`,
              title: 'No Post Found',
              date: '',
              image: '/not-found.jpg',
            }}
            locale={locale}
          />
        )}
      </div>
    </div>
  )
}
