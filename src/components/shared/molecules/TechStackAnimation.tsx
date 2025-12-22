import { useEffect, useState } from 'react'

import { AnimatedSkillDisplay } from './AnimatedSkillDisplay'

interface TechStackAnimationProps {
  frontend: Array<{ name: string; category: string }>
  backend: Array<{ name: string; category: string }>
  tools: Array<{ name: string; category: string }>
  isVisible: boolean
}

export function TechStackAnimation({
  frontend,
  backend,
  tools,
  isVisible,
}: TechStackAnimationProps) {
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
        if (frontend.length > 0)
          setFrontendIndex((prev) => (prev + 1) % frontend.length)
        if (backend.length > 0)
          setBackendIndex((prev) => (prev + 1) % backend.length)
        if (tools.length > 0) setToolsIndex((prev) => (prev + 1) % tools.length)

        setCycleActive(true) // Restart
      }, 50)
    }, totalCycleTime)

    return () => clearTimeout(cycleTimer)
  }, [
    cycleActive,
    frontendIndex,
    backendIndex,
    toolsIndex,
    frontend,
    backend,
    tools,
  ])

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
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
