import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { BackgroundEffect } from './BackgroundEffect'

const context = {
  beginPath: vi.fn(),
  bezierCurveTo: vi.fn(),
  clearRect: vi.fn(),
  closePath: vi.fn(),
  createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  fill: vi.fn(),
  lineTo: vi.fn(),
  moveTo: vi.fn(),
  setTransform: vi.fn(),
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('BackgroundEffect', () => {
  it('draws a static wash for reduced motion and resumes when the preference changes', () => {
    let reducedMotion = true
    const listeners = new Set<(event: MediaQueryListEvent) => void>()
    const mediaQuery = {
      get matches() {
        return reducedMotion
      },
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener: vi.fn((_, listener) => listeners.add(listener)),
      removeEventListener: vi.fn((_, listener) => listeners.delete(listener)),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }
    const pendingFrames = new Map<number, FrameRequestCallback>()
    let nextFrameId = 0
    const requestFrame = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        const frameId = ++nextFrameId
        pendingFrames.set(frameId, callback)
        return frameId
      })
    const cancelFrame = vi
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation((frameId) => {
        pendingFrames.delete(frameId)
      })
    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      context as unknown as CanvasRenderingContext2D,
    )

    const { container, unmount } = render(<BackgroundEffect />)
    expect(container.querySelector('canvas')?.getAttribute('aria-hidden')).toBe(
      'true',
    )
    expect(context.fill).toHaveBeenCalledTimes(3)
    expect(requestFrame).not.toHaveBeenCalled()

    reducedMotion = false
    listeners.forEach((listener) =>
      listener({ matches: false } as MediaQueryListEvent),
    )
    expect(requestFrame).toHaveBeenCalledTimes(1)
    expect(pendingFrames.size).toBe(1)

    window.dispatchEvent(new Event('resize'))
    window.dispatchEvent(new Event('resize'))
    window.dispatchEvent(new Event('resize'))
    expect(pendingFrames.size).toBe(1)

    unmount()
    expect(pendingFrames.size).toBe(0)
    expect(cancelFrame).toHaveBeenCalledWith(nextFrameId)
    expect(mediaQuery.removeEventListener).toHaveBeenCalledTimes(1)
  })
})
