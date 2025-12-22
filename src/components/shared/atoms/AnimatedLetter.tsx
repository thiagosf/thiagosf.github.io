import { useEffect, useState } from 'react'

interface AnimatedLetterProps {
  targetLetter: string
  isActive: boolean
  delay: number
  cyclingDuration?: number
  intervalMs?: number
  spaceWidth?: string
  doneClassName?: string
  cyclingClassName?: string
  waitingClassName?: string
}

export function AnimatedLetter({
  targetLetter,
  isActive,
  delay,
  cyclingDuration = 300,
  intervalMs = 40,
  spaceWidth = 'w-4',
  doneClassName = 'text-stone-900 dark:text-stone-100',
  cyclingClassName = 'text-lime-500 dark:text-lime-400',
  waitingClassName = 'opacity-0',
}: AnimatedLetterProps) {
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
      }, cyclingDuration)
      return () => clearTimeout(endTimer)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [isActive, delay, targetLetter, cyclingDuration])

  useEffect(() => {
    if (status !== 'cycling' || isSpace) return
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * alphabet.length)
      setCurrentLetter(alphabet[randomIndex])
    }, intervalMs)
    return () => clearInterval(interval)
  }, [status, isSpace, intervalMs])

  if (isSpace) return <span className={`inline-block ${spaceWidth}`} />

  return (
    <span
      className={`inline-block transition-colors duration-300 ${
        status === 'done'
          ? doneClassName
          : status === 'cycling'
            ? cyclingClassName
            : waitingClassName
      }`}
    >
      {status === 'done' ? targetLetter : currentLetter}
    </span>
  )
}
