import { Github, Linkedin, Twitter } from 'lucide-react'
import { useEffect, useState } from 'react'

import { SocialIcon, TechStackAnimation, Section } from '../../shared'
import type { HeroSectionProps } from './types'

export function HeroSection({ data }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [nameRevealed, setNameRevealed] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 0)
    const timer = setTimeout(() => setNameRevealed(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // Split name into first name and last names
  const nameParts = data.introduction.name.split(' ')
  const firstName = nameParts[0] // "Thiago"
  const lastName = nameParts.slice(1).join(' ') // "Silva Ferreira"
  const firstNameChars = firstName.split('')
  const taglineWords = data.introduction.tagline.split('•')

  return (
    <Section className="flex items-center justify-center" containerClassName="max-w-7xl w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left column - Main content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Tagline with creative styling */}
            <div
              className={`transition-all duration-700 mt-2 sm:mt-0 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex items-center gap-3 flex-wrap">
                {taglineWords.map((word, index) => (
                  <span
                    key={index}
                    className={`inline-block text-xs sm:text-sm font-medium uppercase tracking-widest text-stone-400 dark:text-stone-500 transition-all duration-500 ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    {word.trim()}
                    {index < taglineWords.length - 1 && (
                      <span className="mx-2 text-primary-500">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile Column Layout for Name and Title */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-8 items-baseline">
              {/* Name split into two lines */}
              <div
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.3s' }}
              >
                {/* First name - Big */}
                <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-none">
                  {firstNameChars.map((char, index) => (
                    <span
                      key={index}
                      className={`inline-block transition-all duration-300 ${
                        nameRevealed
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{
                        animationDelay: `${0.4 + index * 0.03}s`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </h1>
                {/* Last name - Small and light */}
                <h2 className="text-sm sm:text-xl md:text-3xl lg:text-5xl font-light text-stone-400 dark:text-stone-500 tracking-tight leading-tight mt-1">
                  {lastName.split('').map((char, index) => (
                    <span
                      key={index}
                      className={`inline-block transition-all duration-300 ${
                        nameRevealed
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-4'
                      }`}
                      style={{
                        animationDelay: `${0.6 + index * 0.02}s`,
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h2>
              </div>

              {/* Title and subtitle */}
              <div
                className={`transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ animationDelay: '0.7s' }}
              >
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-stone-800 dark:text-stone-200">
                    {data.introduction.title}
                  </h2>
                  <p className="text-xs sm:text-lg text-stone-500 dark:text-stone-400 italic">
                    {data.introduction.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.9s' }}
            >
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl">
                {data.introduction.description.split(' ').map((word, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-500 ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2'
                    }`}
                    style={{
                      animationDelay: `${1.0 + index * 0.03}s`,
                    }}
                  >
                    {word}
                    {index <
                      data.introduction.description.split(' ').length - 1 &&
                      '\u00A0'}
                  </span>
                ))}
              </p>
            </div>

            {/* Social Media Icons */}
            <div
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ animationDelay: '1.2s' }}
            >
              <div className="flex items-center gap-4">
                <SocialIcon
                  href={data.socialLinks.github}
                  icon={Github}
                  label="GitHub"
                />
                <SocialIcon
                  href={data.socialLinks.linkedin}
                  icon={Linkedin}
                  label="LinkedIn"
                />
                <SocialIcon
                  href={data.socialLinks.twitter}
                  icon={Twitter}
                  label="Twitter"
                />
              </div>
            </div>
          </div>

          {/* Right column - Tech Stack with animated letter cycling */}
          <TechStackAnimation
            frontend={data.techStack.frontend}
            backend={data.techStack.backend}
            tools={data.techStack.tools}
            isVisible={isVisible}
          />
        </div>
    </Section>
  )
}
