import { ExternalLink, Github, Star } from 'lucide-react'

import { Flex } from '../../shared'
import type { CardItem } from '../organisms/Card'

interface CardActionsProps {
  item: CardItem
  variant: 'project' | 'playground'
}

export function CardActions({ item, variant }: CardActionsProps) {
  const isPlayground = variant === 'playground'

  return (
    <Flex className={isPlayground ? 'items-center gap-4' : 'gap-3'}>
      {item.stars !== undefined && isPlayground && (
        <Flex align="center" gap={1.5} className="text-stone-400 dark:text-stone-500">
          <Star size={12} className="fill-current" />
          <span className="text-[10px] font-bold">{item.stars}</span>
        </Flex>
      )}
      {item.githubUrl && (
        <a
          href={item.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-400 hover:text-primary-500 transition-colors duration-200"
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
          className="text-stone-400 hover:text-primary-500 transition-colors duration-200"
          aria-label="View Demo"
        >
          <ExternalLink size={16} />
        </a>
      )}
    </Flex>
  )
}
