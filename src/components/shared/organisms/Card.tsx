import { CardContent } from '../molecules/CardContent'
import { CardFooter } from '../molecules/CardFooter'
import { CardHeader } from '../molecules/CardHeader'

export interface CardItem {
  id: string
  title: string
  description: string
  year: string
  type: string
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
  // Playground-specific fields
  language?: string
  stars?: number
}

interface CardProps {
  item: CardItem
  index: number
  isVisible: boolean
  variant: 'project' | 'playground'
}

export function Card({ item, index, isVisible, variant }: CardProps) {
  const isPlayground = variant === 'playground'
  const translateY = isPlayground ? 'translate-y-12' : 'translate-y-8'

  const transitionStyle = {
    transitionDelay: `${400 + index * 100}ms`,
  }

  return (
    <div
      className={`transition-all duration-700 group relative bg-white/20 dark:bg-black/20 ${
        isVisible ? 'opacity-100 translate-y-0' : `opacity-0 ${translateY}`
      }`}
      style={transitionStyle}
    >
      <div className="flex flex-col p-8 min-h-full border border-stone-200 dark:border-stone-800">
        <CardHeader item={item} variant={variant} />

        <div className="grow">
          <CardContent item={item} variant={variant} />
        </div>

        <CardFooter item={item} variant={variant} />
      </div>
    </div>
  )
}
