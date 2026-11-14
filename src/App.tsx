import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

import { AppShell } from './components/shell'
import { LandingPage } from './pages'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function App() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils
          .toArray<HTMLElement>('.studio main > section')
          .forEach((section) => {
            const heading = section.querySelector<HTMLElement>('h1, h2')
            if (!heading) return
            heading.dataset.motionBound = 'true'
            gsap.fromTo(
              heading,
              { autoAlpha: 0, y: 18, filter: 'blur(5px)' },
              {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.72,
                ease: 'expo.out',
                immediateRender: false,
                onStart: () => {
                  heading.dataset.motionArrivals = String(
                    Number(heading.dataset.motionArrivals ?? 0) + 1,
                  )
                  heading.dataset.motionState = 'arriving'
                },
                onComplete: () => {
                  heading.dataset.motionState = 'arrived'
                },
                onInterrupt: () => {
                  if (heading.dataset.motionState === 'arriving') {
                    heading.dataset.motionState = 'interrupted'
                  }
                },
                scrollTrigger: {
                  trigger: heading,
                  start: 'top 88%',
                  once: true,
                },
              },
            )
          })
      })
      const refresh = () => ScrollTrigger.refresh()
      document.addEventListener('toggle', refresh, true)
      document.fonts?.ready.then(refresh)
      return () => {
        document.removeEventListener('toggle', refresh, true)
        media.revert()
      }
    },
    { scope: root },
  )

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
    <div ref={root}>
      <AppShell>
        <LandingPage />
      </AppShell>
    </div>
  )
}

export default App
