import type { ReactNode } from 'react'

interface FlexProps {
  children: ReactNode
  className?: string
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  gap?: 2 | 3 | 4 | 6 | 8
  wrap?: boolean
}

export function Flex({
  children,
  className = '',
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  gap,
  wrap = false,
}: FlexProps) {
  const directions = {
    row: 'flex-row',
    col: 'flex-col',
  }

  const aligns = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  }

  const justifies = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }

  const gaps = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  }

  return (
    <div
      className={`flex ${directions[direction]} ${aligns[align]} ${justifies[justify]} ${
        wrap ? 'flex-wrap' : 'flex-nowrap'
      } ${gap ? gaps[gap] : ''} ${className}`}
    >
      {children}
    </div>
  )
}
