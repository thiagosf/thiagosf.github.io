import Lenis from 'lenis'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCallback, useEffect, useRef, useState } from 'react'
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
  const initialViewportTargetsRef = useRef<HTMLElement[]>([])
  const [progress, setProgress] = useState(0)
  const [resourcesReady, setResourcesReady] = useState(false)
  const [loaderFillComplete, setLoaderFillComplete] = useState(false)
  const assetsReady = resourcesReady && loaderFillComplete

  useEffect(() => {
    let active = true
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
        !window.matchMedia('(prefers-reduced-motion: no-preference)').matches ||
        document.visibilityState !== 'visible' ||
        !root.current
      ) {
        return
      }
      const allTargets = Array.from(
        root.current.querySelectorAll<HTMLElement>(MOTION_TARGETS),
      )
      initialViewportTargetsRef.current = allTargets.filter((target) => {
        const bounds = target.getBoundingClientRect()
        return bounds.bottom > 0 && bounds.top < window.innerHeight
      })
      preparedEntranceRef.current = allTargets
      gsap.set(preparedEntranceRef.current, {
        autoAlpha: 0,
        y: 30,
        scale: 0.98,
        transformOrigin: 'center center',
      })
    }
    const onPreferenceChange = () => {
      if (reducedMotion.matches) {
        gsap.set(preparedEntranceRef.current, {
          clearProps: 'opacity,visibility,transform',
        })
        preparedEntranceRef.current = []
        initialViewportTargetsRef.current = []
        if (resourcesReadyRef.current) setLoaderFillComplete(true)
      }
    }
    reducedMotion.addEventListener('change', onPreferenceChange)

    void readiness.done.then((result) => {
      if (!active || result === 'cancelled') return
      resourcesReadyRef.current = true
      setProgress(1)
      prepareInitialEntrance()
      setResourcesReady(true)
      if (
        reducedMotion.matches ||
        document.visibilityState !== 'visible'
      ) {
        setLoaderFillComplete(true)
      }
    })

    return () => {
      active = false
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
        if (document.visibilityState !== 'visible') {
          gsap.set(targets, { clearProps: 'opacity,visibility,transform' })
          preparedEntranceRef.current = []
          initialViewportTargetsRef.current = []
          return
        }
        const visible = initialViewportTargetsRef.current.length
          ? initialViewportTargetsRef.current
          : targets.filter((target) => {
              const bounds = target.getBoundingClientRect()
              return bounds.bottom > 0 && bounds.top < window.innerHeight
            })
        const visibleSet = new Set(visible)
        const belowViewport = targets.filter((target) => !visibleSet.has(target))

        const scrollTweens = belowViewport.map((target) =>
          gsap.fromTo(
            target,
            { autoAlpha: 0, y: 30, scale: 0.98 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: target,
                start: 'top 90%',
                end: 'top 62%',
                scrub: 0.55,
                invalidateOnRefresh: true,
              },
            },
          ),
        )

        const entranceTargets = visible
        const shouldAnimateEntrance =
          document.visibilityState === 'visible' && visible.length > 0
        const entrance = shouldAnimateEntrance
          ? gsap.fromTo(
              entranceTargets,
              { autoAlpha: 0, y: 30, scale: 0.98 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 1.15,
                stagger: 0.085,
                ease: 'power3.out',
                immediateRender: false,
                clearProps: 'opacity,visibility,transform',
                onComplete: () => {
                  window.clearTimeout(revealFallback)
                  preparedEntranceRef.current = []
                  initialViewportTargetsRef.current = []
                },
              },
            )
          : undefined
        if (shouldAnimateEntrance) {
          revealFallback = window.setTimeout(() => {
            entrance?.kill()
            scrollTweens.forEach((tween) => tween.scrollTrigger?.kill())
            gsap.set(targets, { clearProps: 'opacity,visibility,transform' })
            preparedEntranceRef.current = []
            initialViewportTargetsRef.current = []
          }, 3000)
        }

        const refresh = () => ScrollTrigger.refresh()
        const handleVisibilityChange = () => {
          if (document.visibilityState !== 'hidden') return
          entrance?.kill()
          scrollTweens.forEach((tween) => tween.scrollTrigger?.kill())
          window.clearTimeout(revealFallback)
          gsap.set(targets, { clearProps: 'opacity,visibility,transform' })
          preparedEntranceRef.current = []
          initialViewportTargetsRef.current = []
        }
        document.addEventListener('toggle', refresh, true)
        document.addEventListener('visibilitychange', handleVisibilityChange)
        document.fonts?.ready.then(refresh)
        return () => {
          window.clearTimeout(revealFallback)
          entrance?.kill()
          scrollTweens.forEach((tween) => tween.scrollTrigger?.kill())
          document.removeEventListener('toggle', refresh, true)
          document.removeEventListener('visibilitychange', handleVisibilityChange)
          gsap.set(targets, { clearProps: 'opacity,visibility,transform' })
          preparedEntranceRef.current = []
          initialViewportTargetsRef.current = []
        }
      }

      const setupReducedMotion = () => {
        gsap.set(targets, { clearProps: 'opacity,visibility,transform' })
        preparedEntranceRef.current = []
        initialViewportTargetsRef.current = []
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

  const handleLoaderFillComplete = useCallback(() => {
    setLoaderFillComplete(true)
  }, [])

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
          onAnimationComplete={handleLoaderFillComplete}
        />
      )}
    </div>
  )
}

export default App
