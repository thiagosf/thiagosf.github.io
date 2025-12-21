import { useEffect, useState } from 'react'
import { Github, Linkedin, Twitter } from 'lucide-react'
import type { HeroSectionProps } from './types'

// Animated letter component that cycles through alphabet
function SocialIcon({
    href,
    icon: Icon,
    label
}: {
    href: string
    icon: any
    label: string
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="p-3 rounded-none border border-white/20 text-stone-400 hover:border-primary-500 hover:text-primary-500 transition-all duration-300 hover:scale-105"
        >
            <Icon size={20} fill="currentColor" strokeWidth={0} />
        </a>
    )
}

function AnimatedLetter({
    targetLetter,
    isActive,
    delay
}: {
    targetLetter: string
    isActive: boolean
    delay: number
}) {
    const [currentLetter, setCurrentLetter] = useState('a')
    const [status, setStatus] = useState<'waiting' | 'cycling' | 'done'>('waiting')
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    const isSpace = targetLetter === ' '

    useEffect(() => {
        if (!isActive) {
            setStatus('waiting')
            return
        }

        // Reset to waiting when active state changes (restart)
        setStatus('waiting')

        // Start cycling after delay
        const startTimer = setTimeout(() => {
            setStatus('cycling')

            // Stop cycling after 200ms
            const endTimer = setTimeout(() => {
                setStatus('done')
                setCurrentLetter(targetLetter)
            }, 200)

            return () => clearTimeout(endTimer)
        }, delay)

        return () => clearTimeout(startTimer)
    }, [isActive, delay, targetLetter])

    // Random letter cycling effect
    useEffect(() => {
        if (status !== 'cycling' || isSpace) return

        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * alphabet.length)
            setCurrentLetter(alphabet[randomIndex])
        }, 30) // Fast cycling

        return () => clearInterval(interval)
    }, [status, isSpace])

    if (isSpace) {
        return <span className="inline-block w-2" />
    }

    return (
        <span className={`inline-block transition-colors duration-300 ${status === 'done'
            ? 'text-primary-500 dark:text-primary-400 opacity-100'
            : status === 'cycling'
                ? 'text-white/50 dark:text-white/50 opacity-100'
                : 'opacity-0'
            }`}>
            {status === 'done' ? targetLetter : currentLetter}
        </span>
    )
}

// Animated skill display component
function AnimatedSkillDisplay({
    skills,
    category,
    isVisible,
    currentIndex
}: {
    skills: Array<{ name: string; category: string }>
    category: string
    isVisible: boolean
    currentIndex: number
}) {
    if (skills.length === 0) return null

    const currentSkill = skills[currentIndex]
    // Always convert skill name to lowercase for display
    const skillNameLowercase = currentSkill.name.toLowerCase()
    const skillLetters = skillNameLowercase.split('')

    return (
        <div className="space-y-4">
            <h3 className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${isVisible
                ? 'text-stone-800 dark:text-stone-200'
                : 'text-stone-400 dark:text-stone-600'
                }`}>
                {category}
            </h3>
            <div className="text-left min-h-[4rem] flex items-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                    {skillLetters.map((letter, index) => (
                        <AnimatedLetter
                            key={`${currentSkill.name}-${index}-${isVisible}`}
                            targetLetter={letter}
                            isActive={isVisible}
                            delay={index * 200} // Sequential: 0ms, 200ms, 400ms...
                        />
                    ))}
                </div>
            </div>
            <p className={`text-sm mt-2 transition-opacity duration-300 ${isVisible ? 'opacity-100 text-stone-500 dark:text-stone-400' : 'opacity-0'
                }`}>
                {currentSkill.category}
            </p>
        </div>
    )
}

// Coordinated tech stack animation component
function TechStackAnimation({
    frontend,
    backend,
    tools,
    isVisible
}: {
    frontend: Array<{ name: string; category: string }>
    backend: Array<{ name: string; category: string }>
    tools: Array<{ name: string; category: string }>
    isVisible: boolean
}) {
    const [frontendIndex, setFrontendIndex] = useState(0)
    const [backendIndex, setBackendIndex] = useState(0)
    const [toolsIndex, setToolsIndex] = useState(0)

    const [cycleActive, setCycleActive] = useState(false)

    // Start the cycle when component becomes visible
    useEffect(() => {
        if (isVisible) {
            // Allow a small mounting delay effectively
            const timer = setTimeout(() => {
                setCycleActive(true)
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [isVisible])

    // Manage the 5s pause and cycling
    useEffect(() => {
        if (!cycleActive) return

        // 1. Calculate how long the current words take to finish
        // Each takes length * 200ms
        const fWord = frontend[frontendIndex]?.name || ''
        const bWord = backend[backendIndex]?.name || ''
        const tWord = tools[toolsIndex]?.name || ''

        // Total animation time is simply the max word length * 200ms
        const maxLen = Math.max(fWord.length, bWord.length, tWord.length)
        const animationDuration = maxLen * 200

        // 2. Schedule the pause + restart
        // Wait for animation to finish AND then wait 5 seconds
        const totalCycleTime = animationDuration + 5000

        const cycleTimer = setTimeout(() => {
            // 3. Cycle to next words
            setCycleActive(false) // Briefly set false to reset animations

            // Update indices (in a timeout to ensure 'false' state propagates)
            setTimeout(() => {
                if (frontend.length > 0) setFrontendIndex(prev => (prev + 1) % frontend.length)
                if (backend.length > 0) setBackendIndex(prev => (prev + 1) % backend.length)
                if (tools.length > 0) setToolsIndex(prev => (prev + 1) % tools.length)

                setCycleActive(true) // Restart
            }, 50)

        }, totalCycleTime)

        return () => clearTimeout(cycleTimer)
    }, [cycleActive, frontendIndex, backendIndex, toolsIndex, frontend, backend, tools])

    return (
        <div
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
            style={{ animationDelay: '1.4s' }}
        >
            <div className="space-y-8">
                {/* Frontend */}
                <AnimatedSkillDisplay
                    skills={frontend}
                    category="Frontend"
                    isVisible={cycleActive}
                    currentIndex={frontendIndex}
                />

                {/* Backend */}
                <AnimatedSkillDisplay
                    skills={backend}
                    category="Backend"
                    isVisible={cycleActive}
                    currentIndex={backendIndex}
                />

                {/* Tools */}
                <AnimatedSkillDisplay
                    skills={tools}
                    category="Tools & DevOps"
                    isVisible={cycleActive}
                    currentIndex={toolsIndex}
                />
            </div>
        </div>
    )
}

export function HeroSection({ data }: HeroSectionProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [nameRevealed, setNameRevealed] = useState(false)

    useEffect(() => {
        setIsVisible(true)
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
        <div className="min-h-screen flex items-center justify-center px-8 sm:px-6 md:px-12 relative overflow-hidden bg-gradient-to-br from-stone-50 via-white to-stone-100 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
            <div className="max-w-7xl w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center py-8 md:py-12">
                    {/* Left column - Main content */}
                    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                        {/* Tagline with creative styling */}
                        <div
                            className={`transition-all duration-700 mt-2 sm:mt-0 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                                }`}
                            style={{ animationDelay: '0.1s' }}
                        >
                            <div className="flex items-center gap-3 flex-wrap">
                                {taglineWords.map((word, index) => (
                                    <span
                                        key={index}
                                        className={`inline-block text-xs sm:text-sm font-medium uppercase tracking-widest text-stone-400 dark:text-stone-500 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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
                                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: '0.3s' }}
                            >
                                {/* First name - Big */}
                                <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-none">
                                    {firstNameChars.map((char, index) => (
                                        <span
                                            key={index}
                                            className={`inline-block transition-all duration-300 ${nameRevealed
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
                                            className={`inline-block transition-all duration-300 ${nameRevealed
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
                                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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
                            className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
                                }`}
                            style={{ animationDelay: '0.9s' }}
                        >
                            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl">
                                {data.introduction.description.split(' ').map((word, index) => (
                                    <span
                                        key={index}
                                        className={`inline-block transition-all duration-500 ${isVisible
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-2'
                                            }`}
                                        style={{
                                            animationDelay: `${1.0 + index * 0.03}s`,
                                        }}
                                    >
                                        {word}
                                        {index < data.introduction.description.split(' ').length - 1 && '\u00A0'}
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
                                <SocialIcon href={data.socialLinks.github} icon={Github} label="GitHub" />
                                <SocialIcon href={data.socialLinks.linkedin} icon={Linkedin} label="LinkedIn" />
                                <SocialIcon href={data.socialLinks.twitter} icon={Twitter} label="Twitter" />
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
            </div>
        </div>
    )
}
