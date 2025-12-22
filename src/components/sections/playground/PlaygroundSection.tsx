import { useEffect, useRef, useState } from 'react'

import { AnimatedLetter, Section } from '../../shared'
import { PlaygroundGrid } from './PlaygroundGrid'
import type { PlaygroundSectionProps } from './types'

export function PlaygroundSection({ items }: PlaygroundSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const title = 'Playground'
  const titleLetters = title.split('')

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
      id="playground"
      className="bg-transparent dark:bg-transparent relative overflow-hidden"
      background={background}
    >

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-8 lg:mb-16 2xl:mb-32">
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-500 dark:text-stone-600 mb-6 ml-1">
            Experiments & Open Source
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

        {items.length > 0 ? (
          <PlaygroundGrid items={items} isVisible={isVisible} />
        ) : (
          <div className="py-20 text-center border border-dashed border-stone-200 dark:border-stone-800 rounded-lg">
            <p className="text-stone-500 dark:text-stone-400 font-medium">
              No experiments found. Check back soon for new laboratory
              creations.
            </p>
          </div>
        )}
      </div>

      <style>{`
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0; transform: translateY(-50px); }
                    50% { opacity: 0.3; transform: translateY(50px); }
                }
            `}</style>
    </Section>
  )
}
