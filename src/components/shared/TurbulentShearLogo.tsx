import { useEffect, useRef } from 'react'

import { Signature } from './Signature'
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
const hash = (seed: number, salt: number) => {
  const value =
    Math.sin((seed + 1) * 127.1 + (salt + 1) * 311.7) * 43758.5453123
  return value - Math.floor(value)
}
const shapes = ['circle', 'square', 'triangle', 'rectangle'] as const
const rays = Array.from({ length: 16 }, (_, i) => (i / 16) * Math.PI * 2)
const radii = shapes.map((shape) =>
  rays.map((angle) => {
    if (shape === 'circle') return 1
    if (shape === 'rectangle') {
      return (
        Math.min(
          1 / Math.max(0.0001, Math.abs(Math.cos(angle))),
          0.68 / Math.max(0.0001, Math.abs(Math.sin(angle))),
        ) / Math.hypot(1, 0.68)
      )
    }
    const sides = shape === 'square' ? 4 : 3
    const sector = (Math.PI * 2) / sides
    const normal = shape === 'square' ? 0 : -Math.PI / 6
    const offset =
      ((((angle - normal + sector / 2) % sector) + sector) % sector) -
      sector / 2
    return Math.cos(Math.PI / sides) / Math.cos(offset)
  }),
)

/** The turbulent shear field from the motion specimen sheet. */
export function TurbulentShearLogo() {
  const rootRef = useRef<HTMLButtonElement>(null)
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
    let lastPointerAt = 0,
      previewUntil = 0
    let touchActive = false

    function draw(time: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = getComputedStyle(root!).color
      for (const p of particles) {
        const distance = Math.hypot(p.x - pointer.x, p.y - pointer.y)
        const radius = Math.min(
          112,
          Math.max(78, Math.min(width, height) * 0.62),
        )
        const edge = clamp((distance - radius * 0.28) / (radius * 0.72))
        const intensity =
          active && !reduced.matches ? 1 - edge * edge * (3 - 2 * edge) : 0
        if (intensity < 0.01) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fill()
          continue
        }
        const duration = 0.48 + 0.28 * hash(p.seed, 12)
        const cycle = duration + 0.15 + 0.45 * hash(p.seed, 13)
        const clock = time / 1000 + 0.38 * hash(p.seed, 11)
        const index = Math.floor(clock / cycle)
        const blend = clamp((clock - index * cycle) / duration)
        const ease = blend * blend * (3 - 2 * blend)
        const step = hash(p.seed, 14) < 0.5 ? 1 : 3
        const from = ((((index - 1) * step) % 4) + 4) % 4
        const to = (index * step) % 4
        const size =
          1 +
          0.16 *
            Math.sin(
              (time / 1000) * (0.7 + 0.4 * hash(p.seed, 15)) * Math.PI * 2 +
                p.seed * Math.PI * 2 +
                hash(p.seed, 16) * Math.PI * 2,
            ) *
            intensity
        ctx.beginPath()
        rays.forEach((angle, vertex) => {
          const animated =
            radii[from][vertex] +
            (radii[to][vertex] - radii[from][vertex]) * ease
          const r = p.radius * size * (1 + (animated - 1) * intensity)
          const x = p.x + Math.cos(angle) * r,
            y = p.y + Math.sin(angle) * r
          if (vertex === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.closePath()
        ctx.fill()
      }
    }

    function tick(time: number) {
      frame = 0
      if (!visible || document.hidden || reduced.matches) return
      const dt = Math.min((time - (lastFrame || time - 16)) / 1000, 0.033)
      lastFrame = time
      if (previewUntil) {
        active = time < previewUntil
        if (active) {
          pointer = {
            x: width * (0.25 + 0.5 * (1 - (previewUntil - time) / 900)),
            y: height * 0.5,
          }
          direction = 0
          velocity = 1
          velocityAt = time
        } else previewUntil = 0
      }
      progress += ((active ? 1 : 0) - progress) * (1 - Math.exp(-10 * dt))
      const speed =
        velocity * Math.exp(-Math.max(0, time - velocityAt - 40) / 180)
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
          Math.cos(direction) * influence * progress * 18 +
          Math.cos(direction + Math.PI / 2) * turbulence * 58
        const targetY =
          p.homeY +
          Math.sin(direction) * influence * progress * 18 +
          Math.sin(direction + Math.PI / 2) * turbulence * 58
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
      let seed = 9143 + 8 * 7919
      const random = () =>
        (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296
      particles = []
      for (const path of paths) {
        const length = path.getTotalLength(),
          matrix = path.getScreenCTM()
        if (!matrix) continue
        for (const offset of [-18, -12, -6, 0, 6, 12, 18]) {
          for (
            let distance = -18.75;
            distance <= length + 18.75;
            distance += 7
          ) {
            const at = clamp(distance, 0, length)
            const before = path.getPointAtLength(Math.max(0, at - 1))
            const after = path.getPointAtLength(Math.min(length, at + 1))
            const tangentLength =
              Math.hypot(after.x - before.x, after.y - before.y) || 1
            const tx = (after.x - before.x) / tangentLength,
              ty = (after.y - before.y) / tangentLength
            const cap =
              distance < 0
                ? distance
                : distance > length
                  ? distance - length
                  : 0
            if (
              cap &&
              Math.abs(offset) > Math.sqrt(Math.max(0, 18.75 ** 2 - cap ** 2))
            )
              continue
            const point = path.getPointAtLength(at)
            const screen = new DOMPoint(
              point.x + tx * cap - ty * offset,
              point.y + ty * cap + tx * offset,
            ).matrixTransform(matrix)
            const x = screen.x - box.left,
              y = screen.y - box.top
            const radius = 1.25 + random() * 1.05
            random() // Original particle angle.
            const particleSeed = random()
            random() // Original color selection.
            particles.push({
              homeX: x,
              homeY: y,
              x,
              y,
              vx: 0,
              vy: 0,
              radius,
              seed: particleSeed,
            })
          }
        }
      }
      root!.dataset.ready = String(particles.length > 0)
      pointer = { x: width / 2, y: height / 2 }
      draw(0)
      if (active) start()
    }
    function move(event: globalThis.PointerEvent) {
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
      previewUntil = 0
      active = event.pointerType !== 'touch' || touchActive
      start()
    }
    function leave() {
      active = false
      touchActive = false
      previewUntil = 0
      start()
    }
    function preview() {
      previewUntil = performance.now() + 900
      active = true
      start()
    }
    function click(event: MouseEvent) {
      if ((event as globalThis.PointerEvent).pointerType === 'touch') {
        touchActive = !touchActive
        active = touchActive
        start()
      } else preview()
    }
    function motionChange() {
      active = false
      previewUntil = 0
      reset()
    }
    function visibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(frame)
        frame = 0
        lastFrame = 0
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
              cancelAnimationFrame(frame)
              frame = 0
            }
          })
    intersection?.observe(root)
    root.addEventListener('pointermove', move)
    root.addEventListener('pointerleave', leave)
    root.addEventListener('blur', leave)
    root.addEventListener('click', click)
    window.addEventListener('resize', measure)
    document.addEventListener('visibilitychange', visibilityChange)
    reduced.addEventListener('change', motionChange)
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      themeObserver.disconnect()
      intersection?.disconnect()
      root.removeEventListener('pointermove', move)
      root.removeEventListener('pointerleave', leave)
      root.removeEventListener('blur', leave)
      root.removeEventListener('click', click)
      window.removeEventListener('resize', measure)
      document.removeEventListener('visibilitychange', visibilityChange)
      reduced.removeEventListener('change', motionChange)
      delete root.dataset.ready
    }
  }, [])

  return (
    <button
      ref={rootRef}
      type="button"
      className="signature-art turbulent-shear-logo"
      aria-label="Turbulent shear logo: move to scatter particles, or activate to replay"
    >
      <Signature />
      <canvas ref={canvasRef} aria-hidden="true" />
    </button>
  )
}
