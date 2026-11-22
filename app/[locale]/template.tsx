import type { ReactNode } from 'react'

/** Re-mounts on every navigation: the fade-in blur the Nuxt page transition had. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>
}
