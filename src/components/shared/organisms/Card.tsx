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
  const transitionDelay = isPlayground ? `${index * 150}ms` : `${index * 100}ms`
  const transitionDuration = isPlayground ? 'duration-1000' : 'duration-700'
  const translateY = isPlayground ? 'translate-y-12' : 'translate-y-8'

  return (
    <div
      className={`group relative border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-8 transition-all ${transitionDuration} hover:border-lime-500/50 dark:hover:border-lime-400/50 ${
        isVisible ? 'opacity-100 translate-y-0' : `opacity-0 ${translateY}`
      }`}
      style={{ transitionDelay }}
    >
      <CardHeader item={item} variant={variant} />

      <CardContent item={item} variant={variant} />

      <CardFooter item={item} variant={variant} />

      {/* Subtle interactive accent */}
      <div className="absolute bottom-0 right-0 w-1 h-1 bg-lime-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}
