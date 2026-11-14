import Lenis from 'lenis'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import 'lenis/dist/lenis.css'

import { AppShell } from './components/shell'
import { PortfolioLoader } from './components/shared/PortfolioLoader'
import { LandingPage } from './pages'
import { monitorInitialReadiness } from './motion/initialReadiness'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const MOTION_TARGETS = [
  '.site-header > .brand',
  '.site-header > nav',
  '.hero-topline > *',
  '.hero-copy > *',
  '.signature-stage',
  '.hero-bottom > *',
  '.experience-section .section-intro',
  '.experience-item',
  '.projects-section .section-heading',
  '.project-card',
  '.playground-section .section-intro',
  '.playground-item',
  '.contact-section > .eyebrow',
  '.contact-heading',
  '.contact-bottom > p',
  '.contact-link',
  '.site-footer > *',
].join(',')

function App() {
  const root = useRef<HTMLDivElement>(null)
  const resourcesReadyRef = useRef(false)
  const preparedEntranceRef = useRef<HTMLElement[]>([])
  const [progress, setProgress] = useState(0)
  const [assetsReady, setAssetsReady] = useState(false)

  useEffect(() => {
    let active = true
    let releaseFrame = 0
    let releaseFallback = 0
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    const readiness = monitorInitialReadiness({
      document,
      window,
      onProgress: setProgress,
    })
    const prepareInitialEntrance = () => {
      if (
        preparedEntranceRef.current.length ||
        !window.matchMedia('(prefers-reduced-motion: no-preference)').matches ||
        document.visibilityState !== 'visible' ||
        !root.current
      ) {
        return
      }
      preparedEntranceRef.current = Array.from(
        root.current.querySelectorAll<HTMLElement>(MOTION_TARGETS),
      ).filter((target) => {
        const bounds = target.getBoundingClientRect()
        return bounds.bottom > 0 && bounds.top < window.innerHeight
      })
      gsap.set(preparedEntranceRef.current, {
        autoAlpha: 0,
        y: 10,
        scale: 0.98,
        transformOrigin: 'center center',
      })
    }
    const completeLoader = () => {
      if (!active || !resourcesReadyRef.current) return
      if (releaseFrame) window.cancelAnimationFrame(releaseFrame)
      if (releaseFallback) window.clearTimeout(releaseFallback)
      releaseFrame = 0
      releaseFallback = 0
      prepareInitialEntrance()
      setAssetsReady(true)
    }
    const onPreferenceChange = () => {
      if (reducedMotion.matches) {
        gsap.set(preparedEntranceRef.current, {
          clearProps: 'opacity,visibility,transform',
        })
        preparedEntranceRef.current = []
        completeLoader()
      }
    }
    reducedMotion.addEventListener('change', onPreferenceChange)

    void readiness.done.then((result) => {
      if (!active || result === 'cancelled') return
      resourcesReadyRef.current = true
      setProgress(1)
      releaseFrame = window.requestAnimationFrame(() => {
        prepareInitialEntrance()
        releaseFrame = window.requestAnimationFrame(completeLoader)
      })
      releaseFallback = window.setTimeout(completeLoader, 1200)
    })

    return () => {
      active = false
      if (releaseFrame) window.cancelAnimationFrame(releaseFrame)
      if (releaseFallback) window.clearTimeout(releaseFallback)
      readiness.cancel()
      reducedMotion.removeEventListener('change', onPreferenceChange)
    }
  }, [])

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const anchor = target.closest('a')
      if (!anchor?.href) return

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

    document.addEventListener('click', handleLinkClick)
    return () => document.removeEventListener('click', handleLinkClick)
  }, [])

  useGSAP(
    () => {
      if (!assetsReady || !root.current) return
      const media = gsap.matchMedia()
      const targets = Array.from(
        root.current.querySelectorAll<HTMLElement>(MOTION_TARGETS),
      )
      let revealFallback = 0

      const setupScrollArrivals = () => {
        const visible = targets.filter((target) => {
          const bounds = target.getBoundingClientRect()
          return bounds.bottom > 0 && bounds.top < window.innerHeight
        })
        const belowViewport = targets.filter(
          (target) => target.getBoundingClientRect().top >= window.innerHeight,
        )

        belowViewport.forEach((target) => {
          gsap.fromTo(
            target,
            { y: 10, scale: 0.98 },
            {
              y: 0,
              scale: 1,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: target,
                start: 'top 90%',
                end: 'top 62%',
                scrub: 0.35,
                invalidateOnRefresh: true,
              },
            },
          )
        })

        const entranceTargets = preparedEntranceRef.current.length
          ? preparedEntranceRef.current
          : visible
        const shouldAnimateEntrance =
          document.visibilityState === 'visible' && visible.length > 0
        const entrance = shouldAnimateEntrance
          ? gsap.fromTo(
              entranceTargets,
              { autoAlpha: 0, y: 10, scale: 0.98 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.62,
                stagger: 0.055,
                ease: 'power3.out',
                immediateRender: false,
                clearProps: 'opacity,visibility,transform',
                onComplete: () => {
                  window.clearTimeout(revealFallback)
                  preparedEntranceRef.current = []
                },
              },
            )
          : undefined
        if (shouldAnimateEntrance) {
          revealFallback = window.setTimeout(() => {
            entrance?.kill()
            gsap.set(entranceTargets, {
              clearProps: 'opacity,visibility,transform',
            })
            preparedEntranceRef.current = []
          }, 1200)
        }

        const refresh = () => ScrollTrigger.refresh()
        const handleVisibilityChange = () => {
          if (document.visibilityState !== 'hidden') return
          entrance?.kill()
          window.clearTimeout(revealFallback)
          gsap.set(entranceTargets, {
            clearProps: 'opacity,visibility,transform',
          })
          preparedEntranceRef.current = []
        }
        document.addEventListener('toggle', refresh, true)
        document.addEventListener('visibilitychange', handleVisibilityChange)
        document.fonts?.ready.then(refresh)
        return () => {
          window.clearTimeout(revealFallback)
          entrance?.kill()
          document.removeEventListener('toggle', refresh, true)
          document.removeEventListener('visibilitychange', handleVisibilityChange)
          gsap.set(entranceTargets, {
            clearProps: 'opacity,visibility,transform',
          })
          preparedEntranceRef.current = []
        }
      }

      const setupReducedMotion = () => {
        gsap.set(targets, { clearProps: 'opacity,visibility,transform' })
      }

      media.add(
        '(prefers-reduced-motion: no-preference)',
        setupScrollArrivals,
      )
      media.add('(prefers-reduced-motion: reduce)', setupReducedMotion)
      if (
        !window.matchMedia('(prefers-reduced-motion: no-preference)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        setupReducedMotion()
      }

      return () => {
        window.clearTimeout(revealFallback)
        media.revert()
      }
    },
    { scope: root, dependencies: [assetsReady], revertOnUpdate: true },
  )

  useEffect(() => {
    if (!assetsReady) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    let lenis: Lenis | undefined
    let removeScrollListener = () => {}
    const startSmoothScroll = () => {
      if (reducedMotion.matches || lenis) return
      lenis = new Lenis({
        autoRaf: true,
        anchors: true,
        lerp: 0.12,
        respectReducedMotion: true,
        smoothWheel: true,
        syncTouch: false,
      })
      removeScrollListener = lenis.on('scroll', () => ScrollTrigger.update())
    }
    const stopSmoothScroll = () => {
      removeScrollListener()
      removeScrollListener = () => {}
      lenis?.destroy()
      lenis = undefined
    }
    const onPreferenceChange = () => {
      if (reducedMotion.matches) stopSmoothScroll()
      else startSmoothScroll()
    }

    startSmoothScroll()
    reducedMotion.addEventListener('change', onPreferenceChange)
    return () => {
      reducedMotion.removeEventListener('change', onPreferenceChange)
      stopSmoothScroll()
    }
  }, [assetsReady])

  return (
    <div ref={root}>
      <AppShell busy={!assetsReady}>
        <LandingPage />
      </AppShell>
      {!assetsReady && (
        <PortfolioLoader
          progress={progress}
        />
      )}
    </div>
  )
}

export default App
