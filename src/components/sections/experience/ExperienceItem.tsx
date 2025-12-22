import { TechChip } from '../../shared'
import type { Experience } from '../../../types/experience'

interface ExperienceItemProps {
  experience: Experience
  index: number
  isVisible: boolean
  activeTech: string | null
  setActiveTech: (tech: string | null) => void
  onItemClick?: (id: string) => void
  onFilterTech?: (tech: string) => void
}

export function ExperienceItem({
  experience,
  index,
  isVisible,
  activeTech,
  setActiveTech,
  onItemClick,
  onFilterTech,
}: ExperienceItemProps) {
  const isHighlighted =
    activeTech && experience.technologies.includes(activeTech)

  return (
    <div
      className={`relative pl-16 pb-24 last:pb-0 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onClick={() => onItemClick?.(experience.id)}
    >
      {/* Timeline Node - centered with period text */}
      <div
        className={`absolute left-[-5px] top-[3px] w-2.5 h-2.5 transition-all duration-500 ${
          experience.isCurrent
            ? 'bg-lime-500 border-lime-500 dark:bg-lime-500 dark:border-lime-500'
            : 'bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700'
        } ${isHighlighted ? 'border-lime-500 dark:border-lime-500 scale-125' : ''}`}
      />

      <div className="space-y-3">
        {/* Period */}
        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
          {experience.period}
        </span>

        {/* Role & Company */}
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            {experience.role}
          </h3>
          <div className="flex items-center gap-2 text-sm sm:text-base font-medium">
            <span className="text-lime-500 dark:text-lime-400">
              {experience.company}
            </span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="text-stone-400 dark:text-stone-500">
              {experience.location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="max-w-2xl text-stone-600 dark:text-stone-400 leading-relaxed text-sm sm:text-base">
          {experience.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 pt-2">
          {experience.technologies.map((tech: string) => (
            <TechChip
              key={tech}
              tech={tech}
              onHover={setActiveTech}
              onClick={onFilterTech}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
