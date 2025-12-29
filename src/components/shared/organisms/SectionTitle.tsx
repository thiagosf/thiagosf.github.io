import { AnimatedLetter } from '../atoms'

interface SectionTitleProps {
  title: string
  subtitle: string
  isVisible: boolean
}

export function SectionTitle({ title, subtitle, isVisible }: SectionTitleProps) {
  const titleLetters = title.split('')

  return (
    <div className="mb-8 lg:mb-16 2xl:mb-32">
      <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-500 dark:text-stone-600 mb-6 ml-1">
        {subtitle}
      </div>
      <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-none h-[1.1em] overflow-hidden">
        {titleLetters.map((char, index) => (
          <AnimatedLetter
            key={`${char}-${index}`}
            targetLetter={char}
            isActive={isVisible}
            delay={200 + index * 80}
          />
        ))}
      </h2>
    </div>
  )
}
