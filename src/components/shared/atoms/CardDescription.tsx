import type { ReactNode } from 'react'

interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function CardDescription({
  children,
  className = '',
}: CardDescriptionProps) {
  return (
    <p
      className={`text-stone-600 dark:text-stone-400 leading-relaxed text-sm sm:text-base ${className}`}
    >
      {children}
    </p>
  )
}
