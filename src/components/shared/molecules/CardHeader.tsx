import { CardActions } from './CardActions'
import type { CardItem } from '../organisms/Card'

interface CardHeaderProps {
  item: CardItem
  variant: 'project' | 'playground'
}

export function CardHeader({ item, variant }: CardHeaderProps) {
  const isPlayground = variant === 'playground'

  return (
    <div className="flex justify-between items-start mb-6">
      {isPlayground ? (
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
            {item.year} — {item.type}
          </span>
          {item.language && (
            <span className="text-[9px] font-medium text-lime-600 dark:text-lime-500/70 uppercase tracking-wider">
              {item.language}
            </span>
          )}
        </div>
      ) : (
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
          {item.year} — {item.type}
        </span>
      )}

      <CardActions item={item} variant={variant} />
    </div>
  )
}
