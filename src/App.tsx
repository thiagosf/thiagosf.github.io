import { useEffect } from 'react'

import { AppShell } from './components/shell'
import { LandingPage } from './pages'

function App() {
  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const anchor = target.closest('a')

      if (anchor && anchor.href) {
        const url = anchor.href
        const isExternal =
          !url.startsWith(window.location.origin) && !url.startsWith('/')

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'click', {
            event_category: isExternal ? 'outbound_link' : 'internal_link',
            event_label: url,
            link_text:
              anchor.innerText.trim() ||
              anchor.getAttribute('aria-label') ||
              'no-text',
            transport_type: 'beacon',
          })
        }
      }
    }

    document.addEventListener('click', handleLinkClick)
    return () => document.removeEventListener('click', handleLinkClick)
  }, [])

  return (
    <AppShell>
      <LandingPage />
    </AppShell>
  )
}

export default App
