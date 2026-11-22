'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/general/Button'
import { CONSENT_STORAGE_KEY } from '@/lib/site'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

interface Props {
  gaId?: string
  labels: { title: string, description: string, deny: string, accept: string }
}

function readChoice(): string | null {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY)
  }
  catch {
    return null
  }
}

export function ConsentPopup({ gaId, labels }: Props) {
  const [show, setShow] = useState(false)
  useEffect(() => setShow(!readChoice()), [])

  function choose(choice: 'granted' | 'denied') {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, choice)
    }
    catch {}
    if (gaId)
      window[`ga-disable-${gaId}`] = choice === 'denied'
    window.gtag?.('consent', 'update', {
      ad_user_data: choice,
      ad_personalization: choice,
      ad_storage: choice,
      analytics_storage: choice,
    })
    setShow(false)
  }

  if (!show)
    return null

  return (
    <div className="z-40 w-80 fixed rounded-lg bottom-0 right-0 bg-gray-800 bg-opacity-95 px-6 py-4">
      <div className="mx-auto max-w-lg">
        <h2 className="text-lg font-semibold mb-2 text-white font-heading">{labels.title}</h2>
        <p className="mb-4 text-white font-content text-sm">{labels.description}</p>
        <div className="flex justify-end space-x-4">
          <Button onClick={() => choose('denied')}>{labels.deny}</Button>
          <Button onClick={() => choose('granted')}>{labels.accept}</Button>
        </div>
      </div>
    </div>
  )
}
