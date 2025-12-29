import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.stubGlobal('IntersectionObserver', class IntersectionObserver {
  constructor() {}
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
})
