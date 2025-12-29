import { Code2 } from 'lucide-react'

import type { CardItem } from '../organisms/Card'

interface CardContentProps {
  item: CardItem
  variant: 'project' | 'playground'
}

export function CardContent({ item, variant }: CardContentProps) {
  const isPlayground = variant === 'playground'
  const minHeight = isPlayground ? 'min-h-16' : 'min-h-[4.5rem]'

  return (
    <div className="space-y-4">
      {isPlayground ? (
        <div className="flex items-center gap-2 group-hover:text-lime-500 dark:group-hover:text-lime-400 transition-colors duration-300">
          <Code2
            size={18}
            className="text-stone-300 dark:text-stone-700 group-hover:text-lime-500 dark:group-hover:text-lime-400 transition-colors duration-300"
          />
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            {item.title}
          </h3>
        </div>
      ) : (
        <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          {item.title}
        </h3>
      )}

      <p
        className={`text-stone-600 dark:text-stone-400 leading-relaxed ${isPlayground ? 'text-sm' : ''} ${minHeight}`}
      >
        {item.description}
      </p>
    </div>
  )
}
