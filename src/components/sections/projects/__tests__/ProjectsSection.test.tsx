import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { Project } from '../../../../types/projects'

// Mock IntersectionObserver
import { ProjectsSection } from '../ProjectsSection'

globalThis.IntersectionObserver = class IntersectionObserver {
  root: Element | null = null
  rootMargin: string = ''
  thresholds: ReadonlyArray<number> = []
  scrollMargin: string = ''
  constructor() {}
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])
}

const mockProjects: Project[] = [
  {
    id: 'p-1',
    title: 'Project Alpha',
    description: 'A cutting edge project.',
    year: '2024',
    type: 'Web App',
    techStack: ['React', 'TypeScript'],
    previewUrl: 'https://example.com/p1.png',
    demoUrl: 'https://p1.demo',
    githubUrl: 'https://github.com/p1',
  },
  {
    id: 'p-2',
    title: 'Project Beta',
    description: 'An experimental tool.',
    year: '2023',
    type: 'CLI',
    techStack: ['Go', 'Cobra'],
    previewUrl: 'https://example.com/p2.png',
    githubUrl: 'https://github.com/p2',
  },
]

describe('ProjectsSection', () => {
  it('renders all project cards', () => {
    render(<ProjectsSection projects={mockProjects} />)

    expect(screen.getByText('Project Alpha')).toBeInTheDocument()
    expect(screen.getByText('Project Beta')).toBeInTheDocument()
    expect(screen.getByText('2024 — Web App')).toBeInTheDocument()
    expect(screen.getByText('2023 — CLI')).toBeInTheDocument()
  })

  it('renders project descriptions', () => {
    render(<ProjectsSection projects={mockProjects} />)

    expect(screen.getByText('A cutting edge project.')).toBeInTheDocument()
    expect(screen.getByText('An experimental tool.')).toBeInTheDocument()
  })

  it('renders tech stack tags', () => {
    render(<ProjectsSection projects={mockProjects} />)

    expect(screen.getByText('REACT')).toBeInTheDocument()
    expect(screen.getByText('TYPESCRIPT')).toBeInTheDocument()
    expect(screen.getByText('GO')).toBeInTheDocument()
    expect(screen.getByText('COBRA')).toBeInTheDocument()
  })

  it('renders demo and source links with correct URLs', () => {
    render(<ProjectsSection projects={mockProjects} />)

    const demoLink = screen.getByLabelText('View Demo')
    const sourceLinks = screen.getAllByLabelText('View Source')

    expect(demoLink).toHaveAttribute('href', 'https://p1.demo')
    expect(sourceLinks[0]).toHaveAttribute('href', 'https://github.com/p1')
    expect(sourceLinks[1]).toHaveAttribute('href', 'https://github.com/p2')
  })

  it('hides demo/source links when URLs are missing', () => {
    render(<ProjectsSection projects={mockProjects} />)

    // Project Beta has no demoUrl
    const demoLinks = screen.queryAllByLabelText('View Demo')
    expect(demoLinks).toHaveLength(1) // Only one project has demoUrl
  })

  it('shows empty state when no projects are provided', () => {
    render(<ProjectsSection projects={[]} />)

    expect(screen.getByText(/no projects to display/i)).toBeInTheDocument()
  })
})
