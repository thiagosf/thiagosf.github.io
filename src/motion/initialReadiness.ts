type ReadinessResult = 'ready' | 'timeout' | 'cancelled'

interface InitialReadinessOptions {
  document: Document
  window: Window
  onProgress: (progress: number) => void
  timeoutMs?: number
}

export function monitorInitialReadiness({
  document,
  window,
  onProgress,
  timeoutMs = 6000,
}: InitialReadinessOptions) {
  let cancelled = false
  let lastProgress = 0
  let timeoutId = 0
  let removePageLoadListener = () => {}
  let resolveDone!: (result: ReadinessResult) => void
  const done = new Promise<ReadinessResult>((resolve) => {
    resolveDone = resolve
  })
  const report = (progress: number) => {
    if (cancelled || progress <= lastProgress) return
    lastProgress = progress
    onProgress(progress)
  }

  const pageReady = new Promise<void>((resolve) => {
    if (document.readyState === 'complete') {
      resolve()
      return
    }
    const onLoad = () => {
      removePageLoadListener()
      resolve()
    }
    removePageLoadListener = () => window.removeEventListener('load', onLoad)
    window.addEventListener('load', onLoad, { once: true })
  })
  const fontsReady = document.fonts?.ready.then(
    () => undefined,
    () => undefined,
  ) ?? Promise.resolve()

  const visibleImages = Array.from(document.images).filter((image) => {
    const bounds = image.getBoundingClientRect()
    return bounds.bottom > 0 && bounds.top < window.innerHeight
  })
  const imagesReady = Promise.all(
    visibleImages.map((image) =>
      typeof image.decode === 'function'
        ? image.decode().catch(() => undefined)
        : image.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              image.addEventListener('load', () => resolve(), { once: true })
              image.addEventListener('error', () => resolve(), { once: true })
            }),
    ),
  )

  report(0.16)
  const readinessTasks = [fontsReady, pageReady, imagesReady]
  let completedTasks = 0
  readinessTasks.forEach((task) => {
    void task.then(() => {
      completedTasks += 1
      report(0.16 + (0.76 * completedTasks) / readinessTasks.length)
    })
  })

  const finish = (result: ReadinessResult) => {
    if (cancelled) return
    window.clearTimeout(timeoutId)
    report(1)
    resolveDone(result)
  }

  timeoutId = window.setTimeout(() => finish('timeout'), timeoutMs)
  void Promise.allSettled(readinessTasks).then(() =>
    finish('ready'),
  )

  return {
    done,
    cancel() {
      if (cancelled) return
      cancelled = true
      window.clearTimeout(timeoutId)
      removePageLoadListener()
      resolveDone('cancelled')
    },
  }
}
