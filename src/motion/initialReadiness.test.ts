import { afterEach, describe, expect, it, vi } from 'vitest'

import { monitorInitialReadiness } from './initialReadiness'

const flushPromises = async () => {
  await Promise.resolve()
  await Promise.resolve()
  await Promise.resolve()
}

const readyStateDescriptor = Object.getOwnPropertyDescriptor(
  document,
  'readyState',
)
const fontsDescriptor = Object.getOwnPropertyDescriptor(document, 'fonts')

afterEach(() => {
  if (readyStateDescriptor) {
    Object.defineProperty(document, 'readyState', readyStateDescriptor)
  } else Reflect.deleteProperty(document, 'readyState')
  if (fontsDescriptor) {
    Object.defineProperty(document, 'fonts', fontsDescriptor)
  } else Reflect.deleteProperty(document, 'fonts')
  document.body.replaceChildren()
  vi.useRealTimers()
})

describe('monitorInitialReadiness', () => {
  it('reports real readiness milestones in order before releasing the page', async () => {
    vi.useFakeTimers()
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      value: 'loading',
    })

    let resolveFonts!: () => void
    let resolveImage!: () => void
    const fontsReady = new Promise<void>((resolve) => {
      resolveFonts = resolve
    })
    const imageReady = new Promise<void>((resolve) => {
      resolveImage = resolve
    })
    Object.defineProperty(document, 'fonts', {
      configurable: true,
      value: { ready: fontsReady },
    })
    const image = document.createElement('img')
    Object.defineProperty(image, 'getBoundingClientRect', {
      value: () => ({ top: -2, bottom: 80 }),
    })
    Object.defineProperty(image, 'decode', {
      value: () => imageReady,
    })
    document.body.append(image)

    const progress: number[] = []
    const readiness = monitorInitialReadiness({
      document,
      window,
      onProgress: (value) => progress.push(value),
      timeoutMs: 1000,
    })
    expect(progress).toEqual([0.16])

    resolveFonts()
    await flushPromises()
    expect(progress).toContain(0.16 + 0.76 / 3)

    window.dispatchEvent(new Event('load'))
    await flushPromises()
    expect(progress).toContain(0.16 + (0.76 * 2) / 3)

    resolveImage()
    await expect(readiness.done).resolves.toBe('ready')
    expect(progress.at(-1)).toBe(1)
    expect(progress).toEqual([...progress].sort((a, b) => a - b))
  })

  it('fails open at its bound if a resource never settles', async () => {
    vi.useFakeTimers()
    const neverReady = new Promise<void>(() => {})
    Object.defineProperty(document, 'fonts', {
      configurable: true,
      value: { ready: neverReady },
    })

    const progress: number[] = []
    const readiness = monitorInitialReadiness({
      document,
      window,
      onProgress: (value) => progress.push(value),
      timeoutMs: 1200,
    })
    await vi.advanceTimersByTimeAsync(1200)

    await expect(readiness.done).resolves.toBe('timeout')
    expect(progress.at(-1)).toBe(1)
  })

  it('cancels the fail-open timer and resolves when its owner unmounts', async () => {
    vi.useFakeTimers()
    Object.defineProperty(document, 'fonts', {
      configurable: true,
      value: { ready: new Promise<void>(() => {}) },
    })
    const readiness = monitorInitialReadiness({
      document,
      window,
      onProgress: () => {},
      timeoutMs: 1200,
    })

    readiness.cancel()
    await expect(readiness.done).resolves.toBe('cancelled')
    await vi.advanceTimersByTimeAsync(1200)
    expect(vi.getTimerCount()).toBe(0)
  })
})
