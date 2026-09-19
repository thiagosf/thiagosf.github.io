import { PlaygroundCard } from './PlaygroundCard'
import type { PlaygroundItem } from './types'

export function PlaygroundGrid({
  items,
  isVisible,
}: {
  items: PlaygroundItem[]
  isVisible: boolean
}) {
  return (
    <div className="playground-list">
      {items.map((item, index) => (
        <PlaygroundCard
          key={item.id}
          item={item}
          index={index}
          isVisible={isVisible}
        />
      ))}
    </div>
  )
}
