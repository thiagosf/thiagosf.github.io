import { useEffect, useRef } from 'react'

import { Signature } from './Signature'
import {
  getParticleMorph,
  hashParticle,
  traceParticleMorph,
} from './particleMorph'
import { sampleSignatureParticles } from './particleSampling'
import './turbulent-shear-logo.css'

interface Particle {
  homeX: number
  homeY: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  seed: number
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value))
const hash = hashParticle

/** The turbulent shear field from the motion specimen sheet. */
export function TurbulentShearLogo() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    // The hidden vector supplies geometry; only the particle canvas is displayed.
    const paths = [...root.querySelectorAll('path')]
    if (
      !paths.every(
        (path) =>
          typeof path.getScreenCTM === 'function' &&
          typeof path.getTotalLength === 'function' &&
          typeof path.getPointAtLength === 'function',
      )
    )
      return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let width = 0,
      height = 0,
      frame = 0,
      lastFrame = 0
    let active = false,
      visible = true,
      progress = 0,
      direction = 0
    let pointer = { x: 0, y: 0 },
      velocity = 0,
      velocityAt = 0
    let lastPointerAt = 0
    let touchPointerId: number | null = null
    let touchOrigin: { x: number; y: number } | null = null

    function draw(time: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = getComputedStyle(root!).color
      for (const p of particles) {
        const distance = Math.hypot(p.x - pointer.x, p.y - pointer.y)
        const influenceRadius = Math.min(
          112,
          Math.max(78, Math.min(width, height) * 0.62),
        )
        const edge = clamp(
          (distance - influenceRadius * 0.28) / (influenceRadius * 0.72),
        )
        const intensity =
          active && !reduced.matches ? 1 - edge * edge * (3 - 2 * edge) : 0
        if (intensity < 0.01) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fill()
          continue
        }
        const morph = getParticleMorph(p.seed, time / 1000)
        const size =
          1 +
          0.16 *
            Math.sin(
              (time / 1000) * (0.7 + 0.4 * hash(p.seed, 15)) * Math.PI * 2 +
                p.seed * Math.PI * 2 +
                hash(p.seed, 16) * Math.PI * 2,
            ) *
            intensity
        traceParticleMorph(
          ctx,
          p.x,
          p.y,
          p.radius * size,
          morph.from,
          morph.to,
          morph.blend,
          intensity,
        )
      }
    }

    function tick(time: number) {
      frame = 0
      if (!visible || document.hidden || reduced.matches) return
      const dt = Math.min((time - (lastFrame || time - 16)) / 1000, 0.033)
      lastFrame = time
      progress += ((active ? 1 : 0) - progress) * (1 - Math.exp(-10 * dt))
      const speed =
        velocity * Math.exp(-Math.max(0, time - velocityAt - 40) / 180)
      const motionScale = width < 520 ? 0.72 : 1
      let moving = false
      for (const p of particles) {
        const dx = p.homeX - pointer.x,
          dy = p.homeY - pointer.y
        const edge = 1 - clamp(Math.hypot(dx, dy) / 126)
        const influence = Math.pow(edge * edge * (3 - 2 * edge), 1.7)
        const cross = -Math.sin(direction) * dx + Math.cos(direction) * dy
        const turbulence =
          influence *
          progress *
          speed *
          Math.sin(cross * 0.085 + p.seed * 7 + time * 0.006)
        const targetX =
          p.homeX +
          Math.cos(direction) * influence * progress * 18 * motionScale +
          Math.cos(direction + Math.PI / 2) * turbulence * 58 * motionScale
        const targetY =
          p.homeY +
          Math.sin(direction) * influence * progress * 18 * motionScale +
          Math.sin(direction + Math.PI / 2) * turbulence * 58 * motionScale
        const damping = Math.exp(-10 * dt)
        p.vx =
          (p.vx + clamp((targetX - p.x) * 62, -10500, 10500) * dt) * damping
        p.vy =
          (p.vy + clamp((targetY - p.y) * 62, -10500, 10500) * dt) * damping
        const magnitude = Math.hypot(p.vx, p.vy)
        if (magnitude > 720) {
          p.vx *= 720 / magnitude
          p.vy *= 720 / magnitude
        }
        p.x += p.vx * dt
        p.y += p.vy * dt
        moving ||= Math.hypot(p.x - p.homeX, p.y - p.homeY) > 0.05
      }
      draw(time)
      if (active || moving || progress > 0.001) start()
      else reset()
    }
    function start() {
      if (!frame && visible && !document.hidden && !reduced.matches)
        frame = requestAnimationFrame(tick)
    }
    function reset() {
      cancelAnimationFrame(frame)
      frame = 0
      lastFrame = 0
      progress = 0
      particles.forEach((p) => {
        p.x = p.homeX
        p.y = p.homeY
        p.vx = 0
        p.vy = 0
      })
      draw(0)
    }
    function measure() {
      reset()
      const box = root!.getBoundingClientRect()
      width = box.width
      height = box.height
      if (!width || !height) return
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.round(width * ratio)
      canvas!.height = Math.round(height * ratio)
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0)
      particles = sampleSignatureParticles(paths, box).map((sample) => ({
        ...sample,
        x: sample.homeX,
        y: sample.homeY,
        vx: 0,
        vy: 0,
      }))
      root!.dataset.ready = String(particles.length > 0)
      root!.dataset.particleCount = String(particles.length)
      pointer = { x: width / 2, y: height / 2 }
      draw(0)
      if (active) start()
    }
    function move(event: globalThis.PointerEvent) {
      if (event.pointerType === 'touch' && event.pointerId !== touchPointerId)
        return
      const box = root!.getBoundingClientRect(),
        time = performance.now()
      const next = { x: event.clientX - box.left, y: event.clientY - box.top }
      const dx = next.x - pointer.x,
        dy = next.y - pointer.y
      const dt = Math.max(8, time - lastPointerAt)
      if (Math.hypot(dx, dy) > 1.2) {
        velocity = Math.min(
          1,
          Math.hypot(
            clamp((dx * 16) / dt, -28, 28),
            clamp((dy * 16) / dt, -28, 28),
          ) / 22,
        )
        direction = Math.atan2(dy, dx)
        velocityAt = time
      }
      lastPointerAt = time
      pointer = next
      active =
        event.pointerType !== 'touch' ||
        (event.pointerId === touchPointerId &&
          touchOrigin !== null &&
          Math.hypot(next.x - touchOrigin.x, next.y - touchOrigin.y) > 4)
      start()
    }
    function pointerDown(event: globalThis.PointerEvent) {
      if (
        event.pointerType !== 'touch' ||
        !event.isPrimary ||
        touchPointerId !== null
      )
        return
      touchPointerId = event.pointerId
      const box = root!.getBoundingClientRect()
      touchOrigin = {
        x: event.clientX - box.left,
        y: event.clientY - box.top,
      }
      pointer = touchOrigin
      lastPointerAt = performance.now()
      velocity = 0
      active = false
    }
    function releaseTouch(event: globalThis.PointerEvent) {
      if (event.pointerId !== touchPointerId) return
      touchPointerId = null
      touchOrigin = null
      active = false
      start()
    }
    function leave(event?: globalThis.PointerEvent) {
      if (event?.pointerType === 'touch' && event.pointerId === touchPointerId)
        return
      active = false
      touchPointerId = null
      touchOrigin = null
      start()
    }
    function moveOutsideTouch(event: globalThis.PointerEvent) {
      if (touchPointerId !== null && !root!.contains(event.target as Node))
        move(event)
    }
    function motionChange() {
      active = false
      touchPointerId = null
      touchOrigin = null
      reset()
    }
    function visibilityChange() {
      if (document.hidden) {
        active = false
        touchPointerId = null
        touchOrigin = null
        reset()
      } else start()
    }
    measure()
    const themeObserver = new MutationObserver(() => draw(performance.now()))
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    observer?.observe(root)
    const intersection =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver((entries) => {
            visible = entries[0].isIntersecting
            if (visible) {
              lastFrame = 0
              start()
            } else {
              active = false
              touchPointerId = null
              touchOrigin = null
              cancelAnimationFrame(frame)
              frame = 0
              reset()
            }
          })
    intersection?.observe(root)
    root.addEventListener('pointermove', move)
    root.addEventListener('pointerdown', pointerDown)
    root.addEventListener('pointerleave', leave)
    window.addEventListener('pointermove', moveOutsideTouch)
    window.addEventListener('pointerup', releaseTouch)
    window.addEventListener('pointercancel', releaseTouch)
    window.addEventListener('resize', measure)
    document.addEventListener('visibilitychange', visibilityChange)
    reduced.addEventListener('change', motionChange)
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      themeObserver.disconnect()
      intersection?.disconnect()
      root.removeEventListener('pointermove', move)
      root.removeEventListener('pointerdown', pointerDown)
      root.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointermove', moveOutsideTouch)
      window.removeEventListener('pointerup', releaseTouch)
      window.removeEventListener('pointercancel', releaseTouch)
      window.removeEventListener('resize', measure)
      document.removeEventListener('visibilitychange', visibilityChange)
      reduced.removeEventListener('change', motionChange)
      delete root.dataset.ready
      delete root.dataset.particleCount
    }
  }, [])

  return (
    <div
      ref={rootRef}
      role="img"
      className="signature-art turbulent-shear-logo"
      aria-label="Thiago Silva Ferreira’s signature. Hover on desktop or drag on touch to move the particles."
    >
      <Signature />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  )
}
