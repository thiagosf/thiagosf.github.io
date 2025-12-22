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
  const delayMs = isPlayground ? index * 150 : index * 100
  const durationMs = isPlayground ? 1000 : 700
  const translateY = isPlayground ? 'translate-y-12' : 'translate-y-8'

  const transitionStyle = {
    transition: `opacity ${durationMs}ms ease ${delayMs}ms, transform ${durationMs}ms ease ${delayMs}ms, border-color 200ms ease 0ms`,
  }

  return (
    <div
      className={`group relative border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-8 transition-opacity transition-transform hover:border-lime-500/50 dark:hover:border-lime-400/50 ${
        isVisible ? 'opacity-100 translate-y-0' : `opacity-0 ${translateY}`
      }`}
      style={transitionStyle}
    >
      <CardHeader item={item} variant={variant} />

      <CardContent item={item} variant={variant} />

      <CardFooter item={item} variant={variant} />

      {/* Subtle interactive accent */}
      <div className="absolute bottom-0 right-0 w-1 h-1 bg-lime-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}
