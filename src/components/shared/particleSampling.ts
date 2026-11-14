import { hashParticle } from './particleMorph'

export interface SignatureParticleSample {
  homeX: number
  homeY: number
  radius: number
  seed: number
}

export interface SignatureParticleBounds {
  left: number
  top: number
  width: number
}

export interface SignatureParticleSamplingOptions {
  radiusScale?: number
}

export interface WindParticleLaunch extends SignatureParticleSample {
  startX: number
  startY: number
  arrivalStart: number
  travelDuration: number
  windX: number
  windY: number
}

export interface ParticlePosition {
  x: number
  y: number
  progress: number
}

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.max(minimum, Math.min(maximum, value))

/** Samples the signature with the same spacing and seeded particle styling as the hero. */
export function sampleSignatureParticles(
  paths: readonly SVGPathElement[],
  bounds: SignatureParticleBounds,
  { radiusScale = 1 }: SignatureParticleSamplingOptions = {},
): SignatureParticleSample[] {
  const compact = bounds.width < 520
  const offsets = compact
    ? [-18, -9, 0, 9, 18]
    : [-18, -12, -6, 0, 6, 12, 18]
  const sampleSpacing = compact ? 9 : 7
  let seed = 9143 + 8 * 7919
  const random = () =>
    (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296
  const samples: SignatureParticleSample[] = []

  for (const path of paths) {
    const length = path.getTotalLength()
    const matrix = path.getScreenCTM()
    if (!matrix) continue

    for (const offset of offsets) {
      for (
        let distance = -18.75;
        distance <= length + 18.75;
        distance += sampleSpacing
      ) {
        const at = clamp(distance, 0, length)
        const before = path.getPointAtLength(Math.max(0, at - 1))
        const after = path.getPointAtLength(Math.min(length, at + 1))
        const tangentLength =
          Math.hypot(after.x - before.x, after.y - before.y) || 1
        const tangentX = (after.x - before.x) / tangentLength
        const tangentY = (after.y - before.y) / tangentLength
        const cap =
          distance < 0
            ? distance
            : distance > length
              ? distance - length
              : 0
        if (
          cap &&
          Math.abs(offset) > Math.sqrt(Math.max(0, 18.75 ** 2 - cap ** 2))
        ) {
          continue
        }

        const point = path.getPointAtLength(at)
        const screenPoint = new DOMPoint(
          point.x + tangentX * cap - tangentY * offset,
          point.y + tangentY * cap + tangentX * offset,
        ).matrixTransform(matrix)
        const homeX = screenPoint.x - bounds.left
        const homeY = screenPoint.y - bounds.top
        const radius = (1.25 + random() * 1.05) * radiusScale
        random() // Preserve the hero particle angle in the seeded sequence.
        const particleSeed = random()
        random() // Preserve the hero particle color in the seeded sequence.
        samples.push({ homeX, homeY, radius, seed: particleSeed })
      }
    }
  }

  return samples
}

export function getRelativeParticleRadiusScale(
  renderedMarkWidth: number,
  referenceMarkWidth: number,
) {
  if (renderedMarkWidth <= 0 || referenceMarkWidth <= 0) return 1
  return renderedMarkWidth / referenceMarkWidth
}

export function createWindParticleLaunch(
  sample: SignatureParticleSample,
  width: number,
  height: number,
): WindParticleLaunch {
  return {
    ...sample,
    startX: width + 36 + hashParticle(sample.seed, 20) * width * 0.85,
    startY:
      sample.homeY + (hashParticle(sample.seed, 21) - 0.5) * height * 1.25,
    arrivalStart: 0.02 + hashParticle(sample.seed, 22) * 0.56,
    travelDuration: 0.3 + hashParticle(sample.seed, 23) * 0.1,
    windX: (hashParticle(sample.seed, 24) - 0.5) * height * 0.1,
    windY: (hashParticle(sample.seed, 25) - 0.5) * height * 0.18,
  }
}

export function getWindParticlePosition(
  particle: WindParticleLaunch,
  animationProgress: number,
): ParticlePosition {
  const progress = clamp(
    (animationProgress - particle.arrivalStart) / particle.travelDuration,
  )
  if (progress >= 1) {
    return {
      x: particle.homeX,
      y: particle.homeY,
      progress: 1,
    }
  }
  const eased = 1 - Math.pow(1 - progress, 3)
  const windArc = Math.sin(progress * Math.PI)

  return {
    x:
      particle.startX +
      (particle.homeX - particle.startX) * eased +
      particle.windX * windArc,
    y:
      particle.startY +
      (particle.homeY - particle.startY) * eased +
      particle.windY * windArc,
    progress,
  }
}
