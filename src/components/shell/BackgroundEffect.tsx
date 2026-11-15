import { useEffect, useRef } from 'react'

import './BackgroundEffect.css'

const FRAME_INTERVAL = 1000 / 30
const MOBILE_FRAME_INTERVAL = 1000 / 24
const MOBILE_PIXEL_RATIO = 0.5
const DESKTOP_PIXEL_RATIO = 0.7
const CANVAS_OVERSCAN = 140

type Palette = {
  colors: string[]
  opacity: number
}

function readPalette(): Palette {
  const styles = getComputedStyle(document.documentElement)
  const colors = [
    '--color-tide-mint',
    '--color-tide-sky',
    '--color-tide-blush',
    '--color-tide-lemon',
  ].map((token) => styles.getPropertyValue(token).trim())

  return {
    colors,
    opacity: document.documentElement.classList.contains('dark') ? 0.13 : 0.23,
  }
}

function drawTidalWash(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: Palette,
  phase: number,
) {
  context.clearRect(0, 0, width, height)
  context.globalCompositeOperation = 'source-over'
  context.globalAlpha = palette.opacity

  for (let index = 0; index < 3; index += 1) {
    const drift = phase + index * 2.1
    const verticalOffset = Math.sin(drift) * height * 0.055
    const horizontalOffset = Math.sin(drift * 0.5) * width * 0.045
    const gradient = context.createLinearGradient(
      width * (index * 0.12) + horizontalOffset,
      height * 0.2,
      width * (0.78 + index * 0.08) - horizontalOffset,
      height * 0.82,
    )
    gradient.addColorStop(0, palette.colors[index % palette.colors.length])
    gradient.addColorStop(
      0.48,
      palette.colors[(index + 1) % palette.colors.length],
    )
    gradient.addColorStop(1, palette.colors[(index + 2) % palette.colors.length])

    context.fillStyle = gradient
    context.beginPath()
    context.moveTo(-width * 0.18, height * (0.26 + index * 0.19) + verticalOffset)
    context.bezierCurveTo(
      width * 0.12,
      height * (0.02 + index * 0.2) + verticalOffset,
      width * 0.32,
      height * (0.73 - index * 0.08) - verticalOffset,
      width * 0.58,
      height * (0.48 + index * 0.11) + verticalOffset,
    )
    context.bezierCurveTo(
      width * 0.84,
      height * (0.2 + index * 0.16) - verticalOffset,
      width * 0.94,
      height * (0.12 + index * 0.2) + verticalOffset,
      width * 1.18,
      height * (0.32 + index * 0.16) - verticalOffset,
    )
    context.lineTo(width * 1.18, height * (0.52 + index * 0.16) - verticalOffset)
    context.bezierCurveTo(
      width * 0.91,
      height * (0.36 + index * 0.19) + verticalOffset,
      width * 0.8,
      height * (0.83 + index * 0.04) - verticalOffset,
      width * 0.55,
      height * (0.72 + index * 0.12) + verticalOffset,
    )
    context.bezierCurveTo(
      width * 0.31,
      height * (0.62 + index * 0.12) - verticalOffset,
      width * 0.12,
      height * (0.92 - index * 0.06) + verticalOffset,
      -width * 0.18,
      height * (0.57 + index * 0.14) - verticalOffset,
    )
    context.closePath()
    context.fill()
  }

  context.globalAlpha = 1
}

export function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !context) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let lastFrameAt = 0
    let width = 0
    let height = 0
    let palette = readPalette()
    let frameInterval = FRAME_INTERVAL

    const stop = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
    }

    const render = (time: number, animate: boolean) => {
      canvas.dataset.motionState = animate
        ? 'running'
        : document.hidden
          ? 'paused'
          : 'static'
      if (animate && time - lastFrameAt < frameInterval) {
        frame = window.requestAnimationFrame((nextTime) => render(nextTime, true))
        return
      }
      lastFrameAt = time
      const phase = animate ? time * 0.000035 : 0
      drawTidalWash(context, width, height, palette, phase)
      if (animate) {
        frame = window.requestAnimationFrame((nextTime) => render(nextTime, true))
      }
    }

    const resize = () => {
      stop()
      const pixelRatio =
        window.innerWidth < 600 ? MOBILE_PIXEL_RATIO : DESKTOP_PIXEL_RATIO
      frameInterval =
        window.innerWidth < 600 ? MOBILE_FRAME_INTERVAL : FRAME_INTERVAL
      width = window.innerWidth + CANVAS_OVERSCAN * 2
      height = window.innerHeight + CANVAS_OVERSCAN * 2
      canvas.width = Math.max(1, Math.round(width * pixelRatio))
      canvas.height = Math.max(1, Math.round(height * pixelRatio))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      palette = readPalette()
      render(performance.now(), !motionPreference.matches && !document.hidden)
    }

    const start = () => {
      stop()
      palette = readPalette()
      render(performance.now(), !motionPreference.matches && !document.hidden)
    }
    const onVisibilityChange = () => {
      if (document.hidden) {
        stop()
        canvas.dataset.motionState = 'paused'
      } else start()
    }
    const onMotionPreferenceChange = () => start()
    const themeObserver = new MutationObserver(() => {
      palette = readPalette()
      if (motionPreference.matches || document.hidden) {
        render(performance.now(), false)
      }
    })

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    motionPreference.addEventListener('change', onMotionPreferenceChange)
    resize()

    return () => {
      stop()
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      motionPreference.removeEventListener('change', onMotionPreferenceChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="background-effect"
      aria-hidden="true"
      data-background-effect=""
    />
  )
}
