import { Flex } from '../../shared'
import { TechChip } from '../atoms/TechChip'
import type { CardItem } from '../organisms/Card'

interface CardFooterProps {
  item: CardItem
  variant: 'project' | 'playground'
}

export function CardFooter({ item, variant }: CardFooterProps) {
  const isPlayground = variant === 'playground'

  return (
    <Flex
      wrap
      className="gap-x-4 gap-y-1 pt-3 mt-3 border-t border-stone-100 dark:border-stone-800/50"
    >
      {item.techStack.map((tech) => (
        <TechChip key={tech} tech={tech} uppercase={!isPlayground} />
      ))}
    </Flex>
  )
}
