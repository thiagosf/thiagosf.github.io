import { useEffect, useRef, useState } from 'react'

import { Section, SectionTitle } from '../../shared'
import { ContactLinkCard } from './ContactLinkCard'
import type { ContactSectionProps } from './types'

export function ContactSection({
  contactLinks,
  onLinkClick,
}: ContactSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const linksCount = contactLinks?.length ?? 0

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
            animation: `fadeInOutVertical ${3 + (i % 3)}s ease-in-out infinite`,
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


      <SectionTitle title="Contact" subtitle="Connect with me" isVisible={isVisible} />

        {linksCount > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactLinks.map((link, index) => (
              <ContactLinkCard
                key={link.id}
                link={link}
                index={index}
                isVisible={isVisible}
                onLinkClick={onLinkClick}
              />
            ))}
          </div>
        ) : (
          <div
            className="rounded-2xl border border-dashed border-stone-300/70 dark:border-stone-600/70 bg-white/5 dark:bg-white/10 p-12 text-center"
            aria-live="polite"
          >
            <p className="text-lg text-stone-500 dark:text-stone-400">
              No contact information provided.
            </p>
          </div>
        )}

      <style>{`
                @keyframes fadeInOutVertical {
                    0%, 100% { opacity: 0; transform: translateY(-50px); }
                    50% { opacity: 0.3; transform: translateY(50px); }
                }
            `}</style>
    </Section>
  )
}
