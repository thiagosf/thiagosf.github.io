import { act, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { PortfolioLoader } from './PortfolioLoader'

const queuedFrames: Array<FrameRequestCallback> = []
let nextFrameId = 0
let frameTime = 0

const canvasContext = {
  clearRect: vi.fn(),
  setTransform: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  closePath: vi.fn(),
} as unknown as CanvasRenderingContext2D

afterEach(() => {
  queuedFrames.length = 0
  nextFrameId = 0
  frameTime = 0
  vi.useRealTimers()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('PortfolioLoader', () => {
  it('fails open when a 2D canvas context is unavailable', () => {
    const onAnimationComplete = vi.fn()
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)

    render(
      <PortfolioLoader progress={1} onAnimationComplete={onAnimationComplete} />,
    )

    expect(onAnimationComplete).toHaveBeenCalledTimes(1)
  })

  it('keeps the parent-mounted loader through the full sequence and settled hold', () => {
    vi.useFakeTimers()
    const onAnimationComplete = vi.fn()
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((callback: FrameRequestCallback) => {
        queuedFrames.push(callback)
        return ++nextFrameId
      }),
    )
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      canvasContext,
    )

    function LoaderGate() {
      const [mounted, setMounted] = useState(true)
      if (!mounted) return null
      return (
        <PortfolioLoader
          progress={1}
          onAnimationComplete={() => {
            onAnimationComplete()
            setMounted(false)
          }}
        />
      )
    }

    render(<LoaderGate />)

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100',
    )
    expect(document.querySelector('.portfolio-loader')).toBeInTheDocument()
    expect(onAnimationComplete).not.toHaveBeenCalled()

    const runNextFrame = () => {
      const callback = queuedFrames.shift()
      if (!callback) throw new Error('Expected the assembly animation to request a frame')
      frameTime += 16
      act(() => callback(frameTime))
    }

    runNextFrame()
    expect(document.querySelector('.portfolio-loader')).toBeInTheDocument()
    expect(onAnimationComplete).not.toHaveBeenCalled()

    for (
      let frame = 0;
      frame < 130 && queuedFrames.length && onAnimationComplete.mock.calls.length === 0;
      frame += 1
    ) {
      runNextFrame()
    }

    expect(document.querySelector('.portfolio-loader')).toBeInTheDocument()
    expect(onAnimationComplete).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(999))
    expect(onAnimationComplete).not.toHaveBeenCalled()
    expect(document.querySelector('.portfolio-loader')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1))
    expect(onAnimationComplete).toHaveBeenCalledTimes(1)
    expect(document.querySelector('.portfolio-loader')).not.toBeInTheDocument()
  })
})
