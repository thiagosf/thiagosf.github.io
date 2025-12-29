import type { ReactNode } from 'react'

interface StackProps {
  children: ReactNode
  className?: string
  gap?: 2 | 4 | 6 | 8 | 10 | 12
}

export function Stack({ children, className = '', gap = 6 }: StackProps) {
  const gaps = {
    2: 'space-y-2',
    4: 'space-y-4',
    6: 'space-y-6',
    8: 'space-y-8',
    10: 'space-y-10',
    12: 'space-y-12',
  }

  return <div className={`${gaps[gap]} ${className}`}>{children}</div>
}
