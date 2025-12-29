import { useEffect, useRef, useState } from 'react'

import { EmptyState, Section, SectionTitle } from '../../shared'
import type { ExperienceSectionProps } from '../../../types/experience'
import { ExperienceItem } from './ExperienceItem'
import heroData from '../../../data/hero-data.json'

export function ExperienceSection({
  experiences,
  onItemClick,
  onFilterTech,
}: ExperienceSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTech, setActiveTech] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (!experiences || experiences.length === 0) {
    return (
      <Section
        ref={sectionRef}
        className="text-center bg-transparent dark:bg-transparent"
      >
        <EmptyState message="No experience records found." />
      </Section>
    )
  }

  const background = (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-stone-200/40 dark:via-stone-800/40 to-transparent"
          style={{
            left: `${(i + 1) * 10}%`,
            animation: `fadeInOut ${3 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
            opacity: 0.3,
          }}
        />
      ))}
    </div>
  )

  return (
    <Section
      ref={sectionRef}
      className="bg-transparent dark:bg-transparent relative overflow-hidden"
      background={background}
    >


      <SectionTitle title="Experience" subtitle="Professional Path" isVisible={isVisible} />

        <div className="relative border-l border-stone-200 dark:border-stone-800 ml-1">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={exp.id}
              experience={exp}
              index={index}
              isVisible={isVisible}
              activeTech={activeTech}
              setActiveTech={setActiveTech}
              onItemClick={onItemClick}
              onFilterTech={onFilterTech}
            />
          ))}
        </div>

      <div className="mt-6 ml-6">
        <a
          href={heroData.socialLinks?.linkedin ?? 'https://linkedin.com'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open LinkedIn profile in a new tab"
          className="experience-link inline-flex items-center gap-2 text-sm font-medium transition-colors"
        >
          View full timeline on LinkedIn
        </a>
      </div>

      <style>{`
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0; transform: translateY(-50px); }
                    50% { opacity: 0.3; transform: translateY(50px); }
                }

                /* Link using design token --color-primary and underline animation */
                .experience-link{
                  color: var(--color-primary);
                  text-decoration: none;
                  position: relative;
                }

                .experience-link::after{
                  content: '';
                  position: absolute;
                  left: 0;
                  bottom: -3px;
                  height: 2px;
                  width: 0;
                  background: var(--color-primary);
                  transition: width 250ms ease;
                }

                .experience-link:hover::after{
                  width: 100%;
                }

                .dark .experience-link{
                  color: var(--color-primary);
                }
            `}</style>
    </Section>
  )
}
