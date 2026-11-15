import type { Experience } from '../../../types/experience'
import { SiteIcon } from '../../shared/atoms/SiteIcon'

interface ExperienceItemProps {
  experience: Experience
  index: number
  onItemClick?: (id: string) => void
}
export function ExperienceItem({
  experience,
  index,
  onItemClick,
}: ExperienceItemProps) {
  return (
    <details className="experience-item" open={index === 0}>
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
        <span className="expand-symbol">
          <SiteIcon name="plus" size={22} />
        </span>
      </summary>
      <div className="experience-detail">
        <p className="experience-location">{experience.location}</p>
        <p>{experience.description}</p>
        <div className="tech-list">
          {experience.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </details>
  )
}
