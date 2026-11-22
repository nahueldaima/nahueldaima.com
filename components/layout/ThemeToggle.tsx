'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Icon } from '@/components/general/Icon'

const BUTTON = 'hover:scale-110 transition-all ease-out hover:cursor-pointer flex items-center'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // The theme is only known in the browser; show a spinner while rendering on the server.
  if (!mounted)
    return <Icon name="svg-spinners:180-ring" size={20} className="flex items-center" />

  if (resolvedTheme === 'light') {
    return (
      <button type="button" name="light-mode" title="Light" className={BUTTON} onClick={() => setTheme('dark')}>
        <Icon name="material-symbols:dark-mode-rounded" size={18} />
      </button>
    )
  }
  return (
    <button type="button" name="dark-mode" title="Dark" className={BUTTON} onClick={() => setTheme('light')}>
      <Icon name="material-symbols:light-mode-rounded" size={18} />
    </button>
  )
}
