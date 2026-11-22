import type { ReactNode } from 'react'

const CLASSES = 'text-white hover:bg-zinc-900 hover:scale-110 border-2 border-black dark:border-white bg-black dark:bg-transparent pr-5 py-2 hover:cursor-pointer transition-all ease-out px-5'

/** The site's black bordered button. Rendered as a <span> when it sits inside a link. */
export function Button({ children, onClick, asSpan = false }: { children: ReactNode, onClick?: () => void, asSpan?: boolean }) {
  const label = <span className="text-lg">{children}</span>
  if (asSpan)
    return <span className={`inline-block ${CLASSES}`}>{label}</span>
  return (
    <button type="button" className={CLASSES} onClick={onClick}>
      {label}
    </button>
  )
}
