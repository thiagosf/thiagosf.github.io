import { useEffect, useRef } from 'react'

import {
  getParticleMorph,
  hashParticle,
  traceParticleMorph,
} from './particleMorph'
import {
  createWindParticleLaunch,
  getRelativeParticleRadiusScale,
  getWindParticlePosition,
  sampleSignatureParticles,
} from './particleSampling'
import { SignatureArtwork, SIGNATURE_VIEW_BOX } from './SignatureArtwork'

interface PortfolioLoaderProps {
  progress: number
  onAnimationComplete: () => void
}

const ANIMATION_DURATION = 1.75
const SETTLED_HOLD_MS = 1000
const FAIL_OPEN_MS = 4500
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
    let particles: ReturnType<typeof createWindParticleLaunch>[] = []
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
      for (const particle of particles) {
        const position = getWindParticlePosition(particle, progressValue)
        if (progressValue >= 1) {
          context.beginPath()
          context.arc(particle.homeX, particle.homeY, particle.radius, 0, Math.PI * 2)
          context.fill()
          continue
        }

        const morph = getParticleMorph(particle.seed, timeSeconds)
        const morphIntensity = Math.sin(position.progress * Math.PI)
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
          position.x,
          position.y,
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
      window.cancelAnimationFrame(frame)
      frame = 0
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
      if (completed || document.hidden || reducedMotion.matches) return

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
        if (readinessCap >= 1 && !settledHold) {
          settledHold = window.setTimeout(finish, SETTLED_HOLD_MS)
        }
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
          window.cancelAnimationFrame(frame)
          frame = 0
          elapsed = ANIMATION_DURATION
          draw(1, performance.now() / 1000)
          settledHold = window.setTimeout(finish, SETTLED_HOLD_MS)
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

      const referenceSignature = document.querySelector<SVGSVGElement>(
        '.turbulent-shear-logo > .signature',
      )
      const radiusScale = referenceSignature
        ? getRelativeParticleRadiusScale(
            geometry.clientWidth,
            referenceSignature.clientWidth,
          )
        : 1
      particles = sampleSignatureParticles(
        [...geometry.querySelectorAll('path')],
        box,
        { radiusScale },
      ).map((sample) => createWindParticleLaunch(sample, width, height))
      root.dataset.particleCount = String(particles.length)
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
      delete root.dataset.particleCount
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
