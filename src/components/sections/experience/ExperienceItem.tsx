import {
  CardDescription,
  CardMetadata,
  CardOverline,
  CardTitle,
  TechChip,
  TimelineNode,
} from '../../shared'
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
      className={`relative pl-8 pb-16 md:pl-16 md:pb-24 last:pb-0 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onClick={() => onItemClick?.(experience.id)}
    >
      <TimelineNode
        isCurrent={experience.isCurrent}
        isHighlighted={!!isHighlighted}
      />

      <div className="space-y-3">
        {/* Period */}
        <CardOverline>{experience.period}</CardOverline>

        {/* Role & Company */}
        <div className="space-y-1">
          <CardTitle>{experience.role}</CardTitle>
          <CardMetadata>
            <span className="text-primary-500 dark:text-primary-400">
              {experience.company}
            </span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="text-stone-400 dark:text-stone-500">
              {experience.location}
            </span>
          </CardMetadata>
        </div>

        {/* Description */}
        <CardDescription className="max-w-2xl">
          {experience.description}
        </CardDescription>

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
