import type { PlaygroundItem } from './types'
import { PlaygroundCard } from './PlaygroundCard'

interface PlaygroundGridProps {
    items: PlaygroundItem[]
    isVisible: boolean
    onItemClick?: (id: string) => void
}

export function PlaygroundGrid({
    items,
    isVisible,
    onItemClick
}: PlaygroundGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item, index) => (
                <PlaygroundCard
                    key={item.id}
                    item={item}
                    index={index}
                    isVisible={isVisible}
                    onClick={onItemClick}
                />
            ))}
        </div>
    )
}
