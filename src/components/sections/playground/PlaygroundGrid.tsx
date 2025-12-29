import { Grid } from '../../shared'
import { PlaygroundCard } from './PlaygroundCard'
import type { PlaygroundItem } from './types'

interface PlaygroundGridProps {
  items: PlaygroundItem[]
  isVisible: boolean
}

export function PlaygroundGrid({ items, isVisible }: PlaygroundGridProps) {
  return (
    <Grid cols={2} gap={8}>
      {items.map((item, index) => (
        <PlaygroundCard
          key={item.id}
          item={item}
          index={index}
          isVisible={isVisible}
        />
      ))}
    </Grid>
  )
}
