import { useEffect, useRef } from 'react'

import {
  getParticleMorph,
  hashParticle,
  traceParticleMorph,
} from './particleMorph'
import { SignatureArtwork, SIGNATURE_VIEW_BOX } from './SignatureArtwork'

interface Particle {
  homeX: number
  homeY: number
  startX: number
  startY: number
  radius: number
  seed: number
  delay: number
}

interface PortfolioLoaderProps {
  progress: number
  onAnimationComplete: () => void
}

const ANIMATION_DURATION = 1.75
const SETTLED_HOLD_MS = 400
const FAIL_OPEN_MS = 3200
const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.max(minimum, Math.min(maximum, value))

export function PortfolioLoader({
  progress,
  onAnimationComplete,
}: PortfolioLoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const geometryRef = useRef<SVGSVGElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const readyProgressRef = useRef(progress)
  const animationStartRef = useRef<() => void>(() => {})
  const onCompleteRef = useRef(onAnimationComplete)

  useEffect(() => {
    readyProgressRef.current = progress
    onCompleteRef.current = onAnimationComplete
  }, [progress, onAnimationComplete])

  useEffect(() => {
    const root = rootRef.current
    const geometry = geometryRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!root || !geometry || !canvas || !context) {
      onCompleteRef.current()
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let ratio = 1
    let frame = 0
    let elapsed = 0
    let lastFrame = 0
    let completed = false
    let completionScheduled = false
    let failOpen = 0
    let settledHold = 0
    const completionFrames: number[] = []

    const draw = (progressValue: number, timeSeconds: number) => {
      context.clearRect(0, 0, width, height)
      context.fillStyle = getComputedStyle(root).color
      const finalFrame = progressValue >= 1

      for (const particle of particles) {
        const localProgress = clamp(
          (progressValue - particle.delay * 0.18) /
            (1 - particle.delay * 0.18),
        )
        const eased = 1 - Math.pow(1 - localProgress, 3)
        const arc = Math.sin(localProgress * Math.PI)
        const x =
          particle.startX +
          (particle.homeX - particle.startX) * eased
        const y =
          particle.startY +
          (particle.homeY - particle.startY) * eased +
          Math.sin(localProgress * Math.PI + particle.seed * 4) *
            height *
            0.065 *
            arc

        if (finalFrame) {
          context.beginPath()
          context.arc(x, y, particle.radius, 0, Math.PI * 2)
          context.fill()
          continue
        }

        const morph = getParticleMorph(particle.seed, timeSeconds)
        const morphIntensity = Math.sin(localProgress * Math.PI)
        const size =
          1 +
          0.16 *
            Math.sin(
              timeSeconds * (0.7 + 0.4 * hashParticle(particle.seed, 15)) *
                Math.PI *
                2 +
                particle.seed * Math.PI * 2 +
                hashParticle(particle.seed, 16) * Math.PI * 2,
            ) *
            morphIntensity

        traceParticleMorph(
          context,
          x,
          y,
          particle.radius * size,
          morph.from,
          morph.to,
          morph.blend,
          morphIntensity,
        )
      }
    }

    const finish = () => {
      if (completed) return
      completed = true
      window.clearTimeout(failOpen)
      window.clearTimeout(settledHold)
      onCompleteRef.current()
    }

    const finishAfterSettledFrames = () => {
      if (completionScheduled || completed) return
      completionScheduled = true
      const secondFrame = () => {
        settledHold = window.setTimeout(finish, SETTLED_HOLD_MS)
      }
      completionFrames.push(window.requestAnimationFrame(secondFrame))
    }

    const tick = (time: number) => {
      frame = 0
      if (document.hidden || reducedMotion.matches) return

      const delta = Math.min(
        (time - (lastFrame || time - 16)) / 1000,
        0.033,
      )
      lastFrame = time
      const readinessCap = readyProgressRef.current
      if (elapsed / ANIMATION_DURATION < readinessCap) {
        elapsed = Math.min(
          ANIMATION_DURATION * readinessCap,
          elapsed + delta,
        )
      }
      const animationProgress = clamp(elapsed / ANIMATION_DURATION)
      draw(animationProgress, time / 1000)

      if (animationProgress >= 1) {
        finishAfterSettledFrames()
      } else if (animationProgress < readinessCap) {
        frame = window.requestAnimationFrame(tick)
      }
    }

    const start = () => {
      if (completed) return
      const readinessCap = readyProgressRef.current
      if (reducedMotion.matches) {
        elapsed = ANIMATION_DURATION * readinessCap
        draw(readinessCap, performance.now() / 1000)
        if (readinessCap >= 1) finish()
        return
      }
      if (document.hidden) {
        if (readinessCap >= 1) {
          elapsed = ANIMATION_DURATION
          draw(1, performance.now() / 1000)
          finish()
        }
        return
      }
      if (readinessCap >= 1 && !failOpen) {
        failOpen = window.setTimeout(() => {
          elapsed = ANIMATION_DURATION
          draw(1, performance.now() / 1000)
          finish()
        }, FAIL_OPEN_MS)
      }
      if (frame) return
      if (elapsed / ANIMATION_DURATION < readinessCap) {
        frame = window.requestAnimationFrame(tick)
      }
    }

    const measure = () => {
      const box = root.getBoundingClientRect()
      width = box.width
      height = box.height
      if (!width || !height) return

      ratio = Math.min(window.devicePixelRatio || 1, width < 520 ? 1.5 : 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const compact = width < 520
      const offsets = compact
        ? [-18.75, -9.375, 0, 9.375, 18.75]
        : [-18.75, -12.5, -6.25, 0, 6.25, 12.5, 18.75]
      const sampleSpacing = compact ? 24 : 21
      let seed = 9143 + 11 * 7919
      const random = () =>
        (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296
      particles = []

      for (const path of geometry.querySelectorAll('path')) {
        const pathLength = path.getTotalLength()
        const matrix = path.getScreenCTM()
        if (!matrix) continue

        for (const offset of offsets) {
          for (
            let distance = -18.75;
            distance <= pathLength + 18.75;
            distance += sampleSpacing
          ) {
            const at = clamp(distance, 0, pathLength)
            const before = path.getPointAtLength(Math.max(0, at - 1))
            const after = path.getPointAtLength(Math.min(pathLength, at + 1))
            const tangentLength =
              Math.hypot(after.x - before.x, after.y - before.y) || 1
            const tangentX = (after.x - before.x) / tangentLength
            const tangentY = (after.y - before.y) / tangentLength
            const cap =
              distance < 0
                ? distance
                : distance > pathLength
                  ? distance - pathLength
                  : 0
            if (
              cap &&
              Math.abs(offset) >
                Math.sqrt(Math.max(0, 18.75 ** 2 - cap ** 2))
            ) {
              continue
            }
            const point = path.getPointAtLength(at)
            const screenPoint = new DOMPoint(
              point.x + tangentX * cap - tangentY * offset,
              point.y + tangentY * cap + tangentX * offset,
            ).matrixTransform(matrix)
            const homeX = screenPoint.x - box.left
            const homeY = screenPoint.y - box.top
            const particleSeed = random()
            particles.push({
              homeX,
              homeY,
              startX: width + 36 + random() * width * 0.38,
              startY: homeY + (random() - 0.5) * height * 0.58,
              radius: 1.25 + random() * 1.05,
              seed: particleSeed,
              delay: random() * 0.22,
            })
          }
        }
      }
      draw(elapsed / ANIMATION_DURATION, performance.now() / 1000)
      start()
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame)
        frame = 0
        lastFrame = 0
        if (readyProgressRef.current >= 1) {
          elapsed = ANIMATION_DURATION
          draw(1, performance.now() / 1000)
          finish()
        }
      } else {
        start()
      }
    }
    const onPreferenceChange = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
      lastFrame = 0
      start()
    }

    animationStartRef.current = start
    measure()
    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    observer?.observe(root)
    window.addEventListener('resize', measure)
    document.addEventListener('visibilitychange', onVisibilityChange)
    reducedMotion.addEventListener('change', onPreferenceChange)
    return () => {
      window.cancelAnimationFrame(frame)
      completionFrames.forEach((frameId) =>
        window.cancelAnimationFrame(frameId),
      )
      window.clearTimeout(failOpen)
      window.clearTimeout(settledHold)
      observer?.disconnect()
      window.removeEventListener('resize', measure)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      reducedMotion.removeEventListener('change', onPreferenceChange)
      animationStartRef.current = () => {}
      context.clearRect(0, 0, width, height)
    }
  }, [])

  useEffect(() => {
    animationStartRef.current()
  }, [progress])

  return (
    <div ref={rootRef} className="portfolio-loader">
      <canvas
        ref={canvasRef}
        className="portfolio-loader__particles"
        aria-hidden="true"
      />
      <svg
        ref={geometryRef}
        className="portfolio-loader__geometry"
        viewBox={SIGNATURE_VIEW_BOX}
        aria-hidden="true"
      >
        <SignatureArtwork />
      </svg>
      <span className="portfolio-loader__sr-only" role="status">
        Loading portfolio
      </span>
      <span
        className="portfolio-loader__sr-only"
        role="progressbar"
        aria-label="Loading portfolio"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      />
    </div>
  )
}
