import { Card, type CardItem } from '../../shared/Card'
import type { PlaygroundItem } from './types'

interface PlaygroundCardProps {
    item: PlaygroundItem
    index: number
    isVisible: boolean
}

export function PlaygroundCard({
    item,
    index,
    isVisible
}: PlaygroundCardProps) {
    const cardItem: CardItem = {
        id: item.id,
        title: item.title,
        description: item.description,
        year: item.year,
        type: item.type,
        techStack: item.techStack,
        githubUrl: item.githubUrl,
        demoUrl: item.demoUrl,
        language: item.language,
        stars: item.stars,
    }

    return (
        <Card
            item={cardItem}
            index={index}
            isVisible={isVisible}
            variant="playground"
        />
    )
}
