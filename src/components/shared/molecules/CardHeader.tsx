import { ExternalLink, Github, Star } from 'lucide-react'

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

interface CardActionsProps {
  item: CardItem
  variant: 'project' | 'playground'
}

function CardActions({ item, variant }: CardActionsProps) {
  const isPlayground = variant === 'playground'

  return (
    <div className={`flex ${isPlayground ? 'items-center gap-4' : 'gap-3'}`}>
      {item.stars !== undefined && isPlayground && (
        <div className="flex items-center gap-1.5 text-stone-400 dark:text-stone-500">
          <Star size={12} className="fill-current" />
          <span className="text-[10px] font-bold">{item.stars}</span>
        </div>
      )}
      {item.githubUrl && (
        <a
          href={item.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200"
          aria-label="View Source"
        >
          <Github size={16} />
        </a>
      )}
      {item.demoUrl && (
        <a
          href={item.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-400 hover:text-lime-500 transition-colors duration-200"
          aria-label="View Demo"
        >
          <ExternalLink size={16} />
        </a>
      )}
    </div>
  )
}
