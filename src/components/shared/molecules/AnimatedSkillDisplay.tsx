import { AnimatedLetter } from '../atoms/AnimatedLetter'

interface AnimatedSkillDisplayProps {
  skills: Array<{ name: string; category: string }>
  category: string
  isVisible: boolean
  currentIndex: number
}

export function AnimatedSkillDisplay({
  skills,
  category,
  isVisible,
  currentIndex,
}: AnimatedSkillDisplayProps) {
  if (skills.length === 0) return null

  const currentSkill = skills[currentIndex]
  // Always convert skill name to lowercase for display
  const skillNameLowercase = currentSkill.name.toLowerCase()
  const skillLetters = skillNameLowercase.split('')

  return (
    <div className="space-y-4">
      <h3
        className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
          isVisible
            ? 'text-stone-800 dark:text-stone-200'
            : 'text-stone-400 dark:text-stone-600'
        }`}
      >
        {category}
      </h3>
      <div className="text-left min-h-[4rem] flex items-center">
        <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          {skillLetters.map((letter, index) => (
            <AnimatedLetter
              key={`${currentSkill.name}-${index}-${isVisible}`}
              targetLetter={letter}
              isActive={isVisible}
              delay={index * 200} // Sequential: 0ms, 200ms, 400ms...
              cyclingDuration={200}
              intervalMs={30}
              spaceWidth="w-2"
              doneClassName="text-primary-500 dark:text-primary-400 opacity-100"
              cyclingClassName="text-white/50 dark:text-white/50 opacity-100"
              waitingClassName="opacity-0"
            />
          ))}
        </div>
      </div>
      <p
        className={`text-sm mt-2 transition-opacity duration-300 ${
          isVisible
            ? 'opacity-100 text-stone-500 dark:text-stone-400'
            : 'opacity-0'
        }`}
      >
        {currentSkill.category}
      </p>
    </div>
  )
}
