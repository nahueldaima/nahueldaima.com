'use client'

import type { Locale } from '@/lib/i18n'
import Link from 'next/link'
import { useState } from 'react'
import { Icon } from '@/components/general/Icon'
import { LangSwitcher } from '@/components/layout/LangSwitcher'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

const LINK_SPAN = 'hover:scale-110 transition-all ease-out hover:cursor-pointer flex items-center'

interface Props {
  locale: Locale
  labels: { tech: string, about: string }
}

export function Header({ locale, labels }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(open => !open)

  return (
    <div className="py-5">
      <div className="flex px-6 container justify-between mx-auto items-baseline hidden sm:flex">
        <ul className="flex items-baseline space-x-5">
          <li className="text-base sm:text-xl font-light dark:text-white">
            <Link href={`/${locale}`}>
              <span className={LINK_SPAN}>NAHUEL DAIMA</span>
            </Link>
          </li>
        </ul>
        <ul className="flex items-center space-x-3 sm:space-x-6 text-sm sm:text-lg dark:text-white">
          <li>
            <Link href={`/${locale}/tech`}>
              <span className={LINK_SPAN}>{labels.tech}</span>
            </Link>
          </li>
          <li title="About Me">
            <Link href={`/${locale}/about`} aria-label="About me">
              <span className={LINK_SPAN}>{labels.about}</span>
            </Link>
          </li>
          <li>
            <LangSwitcher locale={locale} />
          </li>
          <li className="flex items-center">
            <ThemeToggle />
          </li>
        </ul>
      </div>

      <div className="flex px-6 container justify-between mx-auto items-center sm:hidden">
        <div>
          <Link href={`/${locale}`}>
            <span className={`${LINK_SPAN} text-base sm:text-xl font-light dark:text-white`}>NAHUEL DAIMA</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button type="button" aria-label="Menu" className={LINK_SPAN} onClick={toggleMenu}>
            <Icon name="material-symbols:menu-rounded" size={24} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 right-0 bg-white dark:bg-black shadow-lg rounded-lg p-4 z-50 min-w-48">
          <ul className="flex flex-col space-y-4 dark:text-white">
            <li>
              <Link href={`/${locale}/tech`} onClick={toggleMenu}>
                <span className={LINK_SPAN}>{labels.tech}</span>
              </Link>
            </li>
            <li title="About Me">
              <Link href={`/${locale}/about`} aria-label="About me" onClick={toggleMenu}>
                <span className={LINK_SPAN}>{labels.about}</span>
              </Link>
            </li>
            <li>
              <LangSwitcher locale={locale} />
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
