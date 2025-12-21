import React from 'react'

/**
 * BackgroundEffect Component
 *
 * Renders the animated horizontal line effect originally designed for the Hero section.
 * Designed to be used as a persistent background in the AppShell.
 */
export function BackgroundEffect() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Horizontal lines with effects - 20 lines with different durations */}
            {[...Array(20)].map((_, i) => {
                // Calculate duration: 2s to 6s, distributed across 20 lines
                const duration = 2 + (i % 5) * 0.8 + Math.floor(i / 5) * 0.2
                // Distribute lines evenly across the viewport height
                const topPosition = (i * 100) / 20

                return (
                    <div
                        key={i}
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300/30 dark:via-stone-600/30 to-transparent"
                        style={{
                            top: `${topPosition}%`,
                            animation: `fadeInOut ${duration}s ease-in-out infinite`,
                            animationDelay: `${i * 0.1}s`,
                            opacity: 0.9,
                        }}
                    />
                )
            })}

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.3; }
        }
      `}} />
        </div>
    )
}
