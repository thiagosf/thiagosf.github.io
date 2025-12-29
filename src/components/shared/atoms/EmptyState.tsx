import type { ReactNode } from 'react'

interface EmptyStateProps {
  message: string
  className?: string
  children?: ReactNode
}

export function EmptyState({ message, className = '', children }: EmptyStateProps) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-stone-300/70 dark:border-stone-600/70 bg-white/5 dark:bg-white/10 p-12 text-center ${className}`}
      aria-live="polite"
    >
      <p className="text-lg text-stone-500 dark:text-stone-400">{message}</p>
      {children}
    </div>
  )
}
