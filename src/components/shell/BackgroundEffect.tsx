import React from 'react'

/**
 * BackgroundEffect Component
 *
 * Renders the animated horizontal line effect.
 * - Grid of 64px spacing
 * - Fades in to 0.5 opacity over 2s
 * - Lines animate left to right, incrementally showing, then looping
 * - Glowing effect
 */
export function BackgroundEffect() {
  const lineSpacing = 64
  const lineCount = window.innerHeight / lineSpacing
  // Generate lines with random delays once
  const lines = React.useMemo(
    () =>
      Array.from({ length: lineCount }).map((_, i) => ({
        key: i,
        top: (i + 1) * lineSpacing,
        // Random duration between 5s and 10s for natural flow
        // eslint-disable-next-line react-hooks/purity
        duration: 1 + Math.random() * 2,
      })),
    [lineCount],
  )

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid lines - 64px spacing */}
      {lines.map((line) => (
        <div
          key={line.key}
          className="absolute left-0 right-0 h-px"
          style={{
            top: `${line.top}px`,
          }}
        >
          <div
            className="absolute top-0 bottom-0 bg-primary-400"
            style={{
              left: 0,
              width: '0%',
              animation: `passThrough ${line.duration}s ease-out infinite`,
            }}
          />
        </div>
      ))}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        :root {
          --bg-effect-opacity: 0.5;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --bg-effect-opacity: 0.1;
          }
        }

        @keyframes passThrough {
          0% { left: 0; width: 0%; opacity: var(--bg-effect-opacity); }
          50% { left: 0; width: 100%; }
          100% { left: 100%; width: 0%; opacity: 0 }
        }
      `,
        }}
      />
    </div>
  )
}
