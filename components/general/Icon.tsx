import type { IconName } from '@/lib/icons.generated'
import { ICONS } from '@/lib/icons.generated'

interface Props {
  name: IconName
  /** Pixel number or CSS length, like nuxt-icon's `size` (default 1em). */
  size?: number | string
  className?: string
}

export function Icon({ name, size = '1em', className }: Props) {
  const icon = ICONS[name]
  const dimension = typeof size === 'number'
    ? `${size}px`
    : size
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon.viewBox}
      width={dimension}
      height={dimension}
      aria-hidden="true"
      className={['inline-block', className].filter(Boolean).join(' ')}
      // Icon bodies are static SVG markup extracted from Iconify at build time.
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  )
}
