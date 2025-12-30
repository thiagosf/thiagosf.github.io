import { Code2 } from 'lucide-react'

import { CardDescription, CardTitle, Flex, Stack } from '../../shared'
import type { CardItem } from '../organisms/Card'

interface CardContentProps {
  item: CardItem
  variant: 'project' | 'playground'
}

export function CardContent({ item, variant }: CardContentProps) {
  const isPlayground = variant === 'playground'
  const minHeight = isPlayground ? 'min-h-16' : 'min-h-[4.5rem]'

  return (
    <Stack gap={4}>
      {isPlayground ? (
        <Flex
          align="center"
          gap={2}
          className="group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300"
        >
          <Code2
            size={18}
            className="text-stone-300 dark:text-stone-700 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300"
          />
          <CardTitle className="text-xl">{item.title}</CardTitle>
        </Flex>
      ) : (
        <CardTitle>{item.title}</CardTitle>
      )}

      <CardDescription
        className={`${isPlayground ? 'text-sm' : ''} ${minHeight}`}
      >
        {item.description}
      </CardDescription>
    </Stack>
  )
}
