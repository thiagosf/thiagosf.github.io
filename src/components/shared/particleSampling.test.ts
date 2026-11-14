import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  createWindParticleLaunch,
  getRelativeParticleRadiusScale,
  getWindParticlePosition,
  sampleSignatureParticles,
} from './particleSampling'

class TestDOMPoint {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  matrixTransform() {
    return this
  }
}

function createStraightSignaturePath(length: number) {
  return {
    getTotalLength: () => length,
    getScreenCTM: () => ({}),
    getPointAtLength: (distance: number) => ({ x: distance, y: 40 }),
  } as unknown as SVGPathElement
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('signature particle sampling and assembly', () => {
  it('repeats the hero sampling seed, radii, and point layout deterministically', () => {
    vi.stubGlobal('DOMPoint', TestDOMPoint)
    const path = createStraightSignaturePath(360)
    const bounds = { left: 0, top: 0, width: 800 }

    const first = sampleSignatureParticles([path], bounds)
    const second = sampleSignatureParticles([path], bounds)

    expect(first.length).toBeGreaterThan(100)
    expect(second).toEqual(first)
    expect(first.every(({ radius }) => radius >= 1.25 && radius < 2.3)).toBe(true)
    expect(first.some(({ seed }) => seed !== first[0].seed)).toBe(true)
  })

  it('normalizes particle radius to the preloader signature footprint', () => {
    vi.stubGlobal('DOMPoint', TestDOMPoint)
    const paths = [createStraightSignaturePath(360)]
    const bounds = { left: 0, top: 0, width: 800 }
    const heroSamples = sampleSignatureParticles(paths, bounds)
    const preloaderScale = getRelativeParticleRadiusScale(300, 600)
    const preloaderSamples = sampleSignatureParticles(paths, bounds, {
      radiusScale: preloaderScale,
    })

    expect(preloaderScale).toBe(0.5)
    expect(preloaderSamples.map(({ radius }) => radius)).toEqual(
      heroSamples.map(({ radius }) => radius * preloaderScale),
    )
  })

  it('staggers launches while early particles settle and later particles remain in flight', () => {
    const samples = Array.from({ length: 240 }, (_, index) => ({
      homeX: index,
      homeY: index / 2,
      radius: 1.5,
      seed: index / 240,
    }))
    const launches = samples.map((sample) =>
      createWindParticleLaunch(sample, 390, 844),
    )
    const settledTimes = launches.map(
      ({ arrivalStart, travelDuration }) => arrivalStart + travelDuration,
    )
    const midFlight = launches.map((launch) =>
      getWindParticlePosition(launch, 0.56),
    )

    expect(Math.min(...settledTimes)).toBeLessThan(0.6)
    expect(Math.max(...settledTimes)).toBeGreaterThan(0.85)
    expect(midFlight.some(({ progress }) => progress === 1)).toBe(true)
    expect(midFlight.some(({ progress }) => progress > 0 && progress < 1)).toBe(
      true,
    )
    expect(launches.every(({ startX }) => startX > 390)).toBe(true)
    expect(new Set(launches.map(({ startY }) => startY)).size).toBeGreaterThan(
      200,
    )
    expect(getWindParticlePosition(launches[0], 1)).toMatchObject({
      x: launches[0].homeX,
      y: launches[0].homeY,
      progress: 1,
    })
  })
})
