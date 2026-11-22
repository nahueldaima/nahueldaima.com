import type { Locale } from '@/lib/i18n'
import { ArchiveCard } from '@/components/archive/ArchiveCard'
import { Icon } from '@/components/general/Icon'
import { getPostMeta } from '@/lib/content'
import { imageUrl } from '@/lib/images'
import { CASE_STUDIES } from '@/lib/site'

export function SelectedWork({ locale }: { locale: Locale }) {
  const posts = CASE_STUDIES
    .map(slug => getPostMeta(locale, slug))
    .filter(post => post !== null)

  return (
    <div className="pb-10 px-4">
      <div className="flex flex-row items-center space-x-3 pt-5 pb-3">
        <Icon name="mdi:star-three-points-outline" size="2em" className="text-black dark:text-white" />
        <h2 className="text-4xl font-semibold text-black dark:text-white">
          Selected Work
        </h2>
      </div>
      <div className="grid grid-cols-1">
        {posts.map(post => (
          <ArchiveCard
            key={post.path}
            locale={locale}
            post={{
              path: post.path,
              title: post.title,
              date: post.date,
              description: post.description,
              tags: post.tags,
              image: imageUrl(post.image),
              alt: post.alt,
            }}
          />
        ))}
      </div>
    </div>
  )
}
