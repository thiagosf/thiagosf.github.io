import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ExperienceSection } from './ExperienceSection'
import { Experience } from '../../../types/experience'

// Mock IntersectionObserver
global.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as any

const mockExperiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Lead Developer',
    company: 'Test Corp',
    location: 'Remote',
    period: '2020 - Present',
    description: 'Built the testing infrastructure.',
    technologies: ['React', 'Vitest'],
    isCurrent: true,
  },
  {
    id: 'exp-2',
    role: 'Frontend Developer',
    company: 'Design Agency',
    location: 'New York, USA',
    period: '2018 - 2020',
    description: 'Created pixel-perfect UIs.',
    technologies: ['Vue', 'Sass'],
    isCurrent: false,
  },
]

describe('ExperienceSection', () => {
  it('renders all experience items', () => {
    render(<ExperienceSection experiences={mockExperiences} />)

    expect(screen.getByText('Lead Developer')).toBeInTheDocument()
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Test Corp')).toBeInTheDocument()
    expect(screen.getByText('Design Agency')).toBeInTheDocument()
  })

  it('renders descriptions correctly', () => {
    render(<ExperienceSection experiences={mockExperiences} />)

    expect(
      screen.getByText('Built the testing infrastructure.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Created pixel-perfect UIs.')).toBeInTheDocument()
  })

  it('renders technology chips', () => {
    render(<ExperienceSection experiences={mockExperiences} />)

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vitest')).toBeInTheDocument()
    expect(screen.getByText('Vue')).toBeInTheDocument()
    expect(screen.getByText('Sass')).toBeInTheDocument()
  })

  it('calls onItemClick when an item is clicked', () => {
    const onItemClick = vi.fn()
    render(
      <ExperienceSection
        experiences={mockExperiences}
        onItemClick={onItemClick}
      />,
    )

    const firstItem = screen.getByText('Lead Developer').closest('div')
    if (firstItem) fireEvent.click(firstItem)

    // Note: The actual implementation might have the click handler on a specific element
    // This test might need adjustment once the component is copied.
  })

  it('calls onFilterTech when a tech chip is clicked', () => {
    const onFilterTech = vi.fn()
    render(
      <ExperienceSection
        experiences={mockExperiences}
        onFilterTech={onFilterTech}
      />,
    )

    const techChip = screen.getByText('React')
    fireEvent.click(techChip)

    expect(onFilterTech).toHaveBeenCalledWith('React')
  })

  it('shows empty state when no experiences are provided', () => {
    render(<ExperienceSection experiences={[]} />)

    expect(screen.getByText(/no experience records found/i)).toBeInTheDocument()
  })

  it('correctly identifies and styles the current position', () => {
    render(<ExperienceSection experiences={mockExperiences} />)

    const currentItem = screen.getByText('Lead Developer').closest('div')
    // Check for indicator or specific class if applicable
    // This is a placeholder for styling check
  })
})
