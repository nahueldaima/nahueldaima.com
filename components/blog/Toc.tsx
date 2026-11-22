'use client'

import type { TocLink } from '@/lib/content'
import { useState } from 'react'
import { Icon } from '@/components/general/Icon'

export function Toc({ links, label }: { links: TocLink[], label: string }) {
  const [isOpen, setIsOpen] = useState(false)
  if (!links.length)
    return null

  return (
    <div className="flex justify-center items-center">
      <div className="p-1">
        <h3
          className="mb-3 pb-2 cursor-pointer font-content text-sm sm:text-xs text-center sm:pb-1 dark:text-white"
          onClick={() => setIsOpen(open => !open)}
        >
          {label}
          <Icon name="mdi:chevron-down" size={20} className={isOpen ? 'rotate-180' : undefined} />
        </h3>
        {isOpen && (
          <div className="mt-2">
            {links.map(link => (
              <a key={link.id} href={`#${link.id}`} className="sm:text-lg text-xl block text-center text-sm mb-5 sm:mb-2 hover:underline">
                {link.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
