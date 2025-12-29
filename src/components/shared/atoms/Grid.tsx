import type { ReactNode } from 'react'

interface GridProps {
  children: ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4
  gap?: 2 | 4 | 6 | 8 | 10 | 12
}

export function Grid({ children, className = '', cols = 1, gap = 8 }: GridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  const gapSize = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
  }

  return (
    <div className={`grid ${gridCols[cols]} ${gapSize[gap]} ${className}`}>
      {children}
    </div>
  )
}
