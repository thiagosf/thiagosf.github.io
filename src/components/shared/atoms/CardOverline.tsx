import type { ReactNode } from 'react'

interface CardOverlineProps {
  children: ReactNode
  className?: string
}

export function CardOverline({ children, className = '' }: CardOverlineProps) {
  return (
    <span
      className={`block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 ${className}`}
    >
      {children}
    </span>
  )
}
