import { useEffect, useRef, useState } from 'react'

import type { ExperienceSectionProps } from '../../../types/experience'
import { ExperienceItem } from './ExperienceItem'

function AnimatedLetter({
  targetLetter,
  isActive,
  delay,
}: {
  targetLetter: string
  isActive: boolean
  delay: number
}) {
  const [currentLetter, setCurrentLetter] = useState('a')
  const [status, setStatus] = useState<'waiting' | 'cycling' | 'done'>(
    'waiting',
  )
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const isSpace = targetLetter === ' '

  useEffect(() => {
    if (!isActive) {
      setStatus('waiting')
      return
    }

    const startTimer = setTimeout(() => {
      setStatus('cycling')
      const endTimer = setTimeout(() => {
        setStatus('done')
        setCurrentLetter(targetLetter)
      }, 300)
      return () => clearTimeout(endTimer)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [isActive, delay, targetLetter])

  useEffect(() => {
    if (status !== 'cycling' || isSpace) return
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * alphabet.length)
      setCurrentLetter(alphabet[randomIndex])
    }, 40)
    return () => clearInterval(interval)
  }, [status, isSpace])

  if (isSpace) return <span className="inline-block w-4" />

  return (
    <span
      className={`inline-block transition-colors duration-300 ${
        status === 'done'
          ? 'text-stone-900 dark:text-stone-100'
          : status === 'cycling'
            ? 'text-lime-500 dark:text-lime-400'
            : 'opacity-0'
      }`}
    >
      {status === 'done' ? targetLetter : currentLetter}
    </span>
  )
}

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
      <section
        ref={sectionRef}
        className="py-24 px-8 text-center bg-transparent dark:bg-transparent"
      >
        <p className="text-stone-500 dark:text-stone-400">
          No experience records found.
        </p>
      </section>
    )
  }

  const title = 'Experience'
  const titleLetters = title.split('')

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-24 px-8 sm:px-12 md:px-24 bg-transparent dark:bg-transparent relative overflow-hidden"
    >
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

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-8 lg:mb-16 2xl:mb-32">
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-500 dark:text-stone-600 mb-6 ml-1">
            Professional Path
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
