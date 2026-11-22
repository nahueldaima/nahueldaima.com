'use client'

import type { Locale } from '@/lib/i18n'
import { useEffect, useRef } from 'react'
import { CONVERTKIT_UID } from '@/lib/site'

/** Loads the ConvertKit newsletter form script for the current language. */
export function ConvertKit({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = containerRef.current
    if (!host)
      return
    const uid = CONVERTKIT_UID[locale]
    const script = document.createElement('script')
    script.src = `https://nahueldaima.ck.page/${uid}/index.js`
    script.async = true
    script.dataset.uid = uid
    host.appendChild(script)
    return () => {
      script.remove()
      while (host.firstChild)
        host.removeChild(host.firstChild)
    }
  }, [locale])

  return <div ref={containerRef} />
}
