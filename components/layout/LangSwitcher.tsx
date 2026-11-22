'use client'

import type { Locale } from '@/lib/i18n'
import { usePathname, useRouter } from 'next/navigation'
import { LOCALE_COOKIE, LOCALE_INFO, LOCALES, switchLocalePath } from '@/lib/i18n'

export function LangSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter()
  const pathname = usePathname()

  function onChange(target: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`
    router.push(switchLocalePath(pathname, target))
  }

  return (
    <div>
      <select
        aria-label="Language"
        value={locale}
        onChange={event => onChange(event.target.value as Locale)}
        className="border-none dark:text-white focus:ring-0 dark:bg-black hover:cursor-pointer text-black text-sm sm:text-lg bg-white appearance-none"
      >
        {LOCALES.map(code => (
          <option key={code} value={code}>{LOCALE_INFO[code].name}</option>
        ))}
      </select>
    </div>
  )
}
