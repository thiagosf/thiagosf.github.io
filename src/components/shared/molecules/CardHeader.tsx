import { CardOverline, Flex, Stack } from '../../shared'
import { CardActions } from './CardActions'
import type { CardItem } from '../organisms/Card'

interface CardHeaderProps {
  item: CardItem
  variant: 'project' | 'playground'
}

export function CardHeader({ item, variant }: CardHeaderProps) {
  const isPlayground = variant === 'playground'

  return (
    <Flex justify="between" align="start" className="mb-6">
      {isPlayground ? (
        <Stack gap={1}>
          <CardOverline>
            {item.year} — {item.type}
          </CardOverline>
          {item.language && (
            <span className="text-[9px] font-medium text-primary-600 dark:text-primary-500/70 uppercase tracking-wider">
              {item.language}
            </span>
          )}
        </Stack>
      ) : (
        <CardOverline>
          {item.year} — {item.type}
        </CardOverline>
      )}

      <CardActions item={item} variant={variant} />
    </Flex>
  )
}
