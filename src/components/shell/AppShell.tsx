import React from 'react'
import { BackgroundEffect } from './BackgroundEffect'

/**
 * AppShell Component - Landing Page Pattern
 *
 * A minimal wrapper that provides the layout structure for a landing page.
 * Includes a persistent animated background effect.
 */

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-lime-500/30 relative">
      <BackgroundEffect />

      {/* Main Content Area - above background */}
      <main className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </main>
    </div>
  )
}
