import { useState } from 'react'

import heroData from '../../../data/hero-data.json'
import type { ExperienceSectionProps } from '../../../types/experience'
import { ExperienceItem } from './ExperienceItem'

export function ExperienceSection({
  experiences,
  onItemClick,
  onFilterTech,
}: ExperienceSectionProps) {
  const [activeTech, setActiveTech] = useState<string | null>(null)
  return (
    <section id="experience" className="experience-section page-width">
      <div className="section-intro">
        <p className="eyebrow">01 / Experience</p>
        <h2>
          Good interfaces.
          <br />
          Solid foundations.
        </h2>
        <p>
          I work across the stack, with a soft spot for the frontend. From early
          ideas to established products, I care about how things work and how
          they feel.
        </p>
        <a
          className="text-link"
          href={heroData.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          Full timeline on LinkedIn ↗
        </a>
      </div>
      <div className="experience-list">
        {!experiences?.length ? (
          <p>No experience records found.</p>
        ) : (
          experiences.map((experience, index) => (
            <ExperienceItem
              key={experience.id}
              experience={experience}
              index={index}
              isVisible
              activeTech={activeTech}
              setActiveTech={setActiveTech}
              onItemClick={onItemClick}
              onFilterTech={onFilterTech}
            />
          ))
        )}
      </div>
    </section>
  )
}
