import { useEffect, useRef, useState } from 'react'

import { AnimatedLetter } from '../../shared'
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

  const title = 'Projects'
  const titleLetters = title.split('')

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-24 px-8 sm:px-12 md:px-24 bg-transparent dark:bg-transparent relative overflow-hidden"
    >
      {/* Design elements similar to ExperienceSection */}
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

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8 lg:mb-16 2xl:mb-32">
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-500 dark:text-stone-600 mb-6 ml-1">
            Selected Works
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-none h-[1.1em] overflow-hidden">
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

        {!projects || projects.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-stone-500 dark:text-stone-400 italic">
              No projects to display at the moment.
            </p>
          </div>
        ) : (
          <ProjectGrid projects={projects} isVisible={isVisible} />
        )}
      </div>

      <style>{`
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0; transform: translateY(-50px); }
                    50% { opacity: 0.3; transform: translateY(50px); }
                }
            `}</style>
    </section>
  )
}
