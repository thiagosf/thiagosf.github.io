import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PlaygroundSection } from '../PlaygroundSection'
import type { PlaygroundItem } from '../types'

// Mock IntersectionObserver
;(global as any).IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as any

const mockItems: PlaygroundItem[] = [
  {
    id: 'pg-1',
    title: 'Test experiment',
    description: 'Exploring new testing patterns.',
    year: '2024',
    type: 'Research',
    techStack: ['React'],
    githubUrl: 'https://github.com/test',
    stars: 10,
    language: 'TypeScript',
  },
  {
    id: 'pg-2',
    title: 'Another one',
    description: 'Description 2',
    year: '2023',
    type: 'Utility',
    techStack: ['Node'],
    githubUrl: 'https://github.com/test2',
  },
]

describe('PlaygroundSection', () => {
  it('renders all playground cards', () => {
    render(<PlaygroundSection items={mockItems} />)

    expect(screen.getByText('Test experiment')).toBeInTheDocument()
    expect(screen.getByText('Another one')).toBeInTheDocument()
    expect(screen.getByText('2024 — Research')).toBeInTheDocument()
    expect(screen.getByText('2023 — Utility')).toBeInTheDocument()
  })

  it('renders repository metadata correctly', () => {
    render(<PlaygroundSection items={mockItems} />)

    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('handles missing stars or language gracefully', () => {
    render(<PlaygroundSection items={[mockItems[1]]} />)

    // Stars and language shouldn't be present for mockItems[1]
    expect(screen.queryByText('10')).not.toBeInTheDocument()
  })

  it('renders GitHub links correctly', () => {
    render(<PlaygroundSection items={mockItems} />)

    const links = screen.getAllByLabelText('View Source')
    expect(links[0]).toHaveAttribute('href', 'https://github.com/test')
  })

  it('shows empty state when no items are provided', () => {
    render(<PlaygroundSection items={[]} />)

    expect(screen.getByText(/no experiments found/i)).toBeInTheDocument()
  })
})
