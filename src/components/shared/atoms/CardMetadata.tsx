import type { ReactNode } from 'react'

interface CardMetadataProps {
  children: ReactNode
  className?: string
}

export function CardMetadata({ children, className = '' }: CardMetadataProps) {
  return (
    <div
      className={`flex items-center gap-2 text-sm sm:text-base font-medium ${className}`}
    >
      {children}
    </div>
  )
}
