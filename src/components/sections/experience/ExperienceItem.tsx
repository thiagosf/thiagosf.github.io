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
  activeTech,
  setActiveTech,
  onItemClick,
  onFilterTech,
}: ExperienceItemProps) {
  return (
    <details
      className={`experience-item ${activeTech && experience.technologies.includes(activeTech) ? 'tech-highlight' : ''}`}
      open={index === 0}
    >
      <summary onClick={() => onItemClick?.(experience.id)}>
        <span className="experience-heading">
          <span className="experience-company">
            {experience.company}
            {experience.isCurrent && (
              <span className="current-label">Current</span>
            )}
          </span>
          <span className="experience-role">{experience.role}</span>
        </span>
        <span className="experience-period">{experience.period}</span>
        <span className="expand-symbol" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="experience-detail">
        <p className="experience-location">{experience.location}</p>
        <p>{experience.description}</p>
        <div className="tech-list">
          {experience.technologies.map((tech) => (
            <button
              key={tech}
              onMouseEnter={() => setActiveTech(tech)}
              onMouseLeave={() => setActiveTech(null)}
              onFocus={() => setActiveTech(tech)}
              onBlur={() => setActiveTech(null)}
              onClick={() => onFilterTech?.(tech)}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
    </details>
  )
}
