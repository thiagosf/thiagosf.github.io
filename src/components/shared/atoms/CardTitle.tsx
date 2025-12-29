import type { ReactNode, ElementType } from 'react'

interface CardTitleProps {
  children: ReactNode
  as?: ElementType
  className?: string
}

export function CardTitle({
  children,
  as: Component = 'h3',
  className = '',
}: CardTitleProps) {
  return (
    <Component
      className={`text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight ${className}`}
    >
      {children}
    </Component>
  )
}
