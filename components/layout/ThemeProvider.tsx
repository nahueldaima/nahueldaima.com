'use client'

import type { ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

/** Dark by default, like @nuxtjs/color-mode with `preference: 'dark'`; the visitor's choice is remembered. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="nuxt-color-mode" disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  )
}
