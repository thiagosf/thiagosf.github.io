interface TimelineNodeProps {
  isCurrent: boolean
  isHighlighted: boolean
}

export function TimelineNode({ isCurrent, isHighlighted }: TimelineNodeProps) {
  return (
    <div
      className={`absolute -left-1.25 top-0.75 w-2.5 h-2.5 transition-all duration-500 ${
        isCurrent
          ? 'bg-primary-500 border-primary-500 dark:bg-primary-500 dark:border-primary-500'
          : 'bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700'
      } ${isHighlighted ? 'border-primary-500 dark:border-primary-500 scale-125' : ''}`}
    />
  )
}
