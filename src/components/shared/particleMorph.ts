export type ParticleShape = 'circle' | 'square' | 'triangle' | 'rectangle'

export interface ParticleMorph {
  from: number
  to: number
  blend: number
}

const shapes: ParticleShape[] = ['circle', 'square', 'triangle', 'rectangle']
const rays = Array.from({ length: 16 }, (_, index) => (index / 16) * Math.PI * 2)
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

export function hashParticle(seed: number, salt: number) {
  const value =
    Math.sin((seed + 1) * 127.1 + (salt + 1) * 311.7) * 43758.5453123
  return value - Math.floor(value)
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value))

export function getParticleMorph(seed: number, time: number): ParticleMorph {
  const duration = 0.48 + 0.28 * hashParticle(seed, 12)
  const cycle = duration + 0.15 + 0.45 * hashParticle(seed, 13)
  const clock = time + 0.38 * hashParticle(seed, 11)
  const index = Math.floor(clock / cycle)
  const blend = clamp((clock - index * cycle) / duration)
  const ease = blend * blend * (3 - 2 * blend)
  const step = hashParticle(seed, 14) < 0.5 ? 1 : 3
  const from = ((((index - 1) * step) % 4) + 4) % 4
  const to = (index * step) % 4
  return { from, to, blend: ease }
}

export function traceParticleMorph(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  from: number,
  to: number,
  blend: number,
  intensity = 1,
) {
  context.beginPath()
  rays.forEach((angle, vertex) => {
    const animated =
      radii[from][vertex] +
      (radii[to][vertex] - radii[from][vertex]) * blend
    const pointRadius = radius * (1 + (animated - 1) * intensity)
    const pointX = x + Math.cos(angle) * pointRadius
    const pointY = y + Math.sin(angle) * pointRadius
    if (vertex === 0) context.moveTo(pointX, pointY)
    else context.lineTo(pointX, pointY)
  })
  context.closePath()
  context.fill()
}
