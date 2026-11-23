'use client'

import type { CardPost } from '@/components/archive/ArchiveCard'
import type { Locale } from '@/lib/i18n'
import { useState } from 'react'
import { ArchiveCard, CardGrid } from '@/components/archive/ArchiveCard'

interface Props {
  posts: CardPost[]
  locale: Locale
  searchPlaceholder: string
  noResults: string
}

/** The post list is server-rendered (crawlable); the search box filters it in the browser. */
export function ArticleList({ posts, locale, searchPlaceholder, noResults }: Props) {
  const [query, setQuery] = useState('')
  const needle = query.trim().toLocaleLowerCase()
  const visible = needle
    ? posts.filter(post => post.title.toLocaleLowerCase().includes(needle))
    : posts

  return (
    <div className="container mx-auto mt-9 px-4 pb-16">
      <div className="max-w-xl mx-auto mb-14">
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          type="text"
          className="text-lg border-b-2 border-b border-0 border-slate-100 dark:border-slate-500 block w-full dark:placeholder-white text-black dark:text-white dark:bg-transparent placeholder:text-black border-gray-300 focus:border-none focus:ring focus:ring-transparent dark:focus:ring-transparent"
        />
      </div>
      {visible.length > 0
        ? <CardGrid>{visible.map(post => <ArchiveCard key={post.path} post={post} locale={locale} />)}</CardGrid>
        : <p className="font-content text-center text-zinc-500 dark:text-zinc-400 py-20">{noResults}</p>}
    </div>
  )
}
