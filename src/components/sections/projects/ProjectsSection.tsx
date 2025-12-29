import { useEffect, useRef, useState } from 'react'

import { Section, SectionTitle } from '../../shared'
import type { ProjectsSectionProps } from '../../../types/projects'
import { ProjectGrid } from './ProjectGrid'

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
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
      <SectionTitle title="Projects" subtitle="Selected Works" isVisible={isVisible} />

      {!projects || projects.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-stone-500 dark:text-stone-400 italic">
            No projects to display at the moment.
          </p>
        </div>
      ) : (
        <ProjectGrid projects={projects} isVisible={isVisible} />
      )}

      <style>{`
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0; transform: translateY(-50px); }
                    50% { opacity: 0.3; transform: translateY(50px); }
                }
            `}</style>
    </Section>
  )
}
