import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import heroData from '../../../../data/hero-data.json'
import { HeroSection } from '../HeroSection'

describe('HeroSection', () => {
  const normalizeText = (text: string | null | undefined) =>
    text?.replace(/\u00a0/g, ' ').trim()

  it('renders the decorative signature marker as an SVG instead of a font glyph', () => {
    const { container } = render(<HeroSection data={heroData} />)
    const marker = container.querySelector('.stage-top > span[aria-hidden="true"]')
    const icon = marker?.querySelector('svg')

    expect(marker).not.toHaveTextContent('↙')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
    expect(icon).toHaveAttribute('focusable', 'false')
    expect(icon).toHaveAttribute('width', '1em')
    expect(icon).toHaveAttribute('height', '1em')
    expect(icon?.querySelector('path')).toHaveAttribute('d', 'M17 7 7 17')
  })

  it('exposes the logo as an image without a replay button', () => {
    render(<HeroSection data={heroData} />)

    const logo = screen.getByRole('img', {
      name: /Thiago Silva Ferreira.*Hover on desktop or drag on touch/i,
    })
    expect(logo.querySelectorAll('path')).toHaveLength(2)
    expect(logo.querySelector('canvas')).toHaveAttribute('aria-hidden', 'true')
    expect(logo.querySelector('.signature-animated')).not.toBeInTheDocument()

    expect(logo.querySelector('svg')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /logo|signature|replay|outline/i }),
    ).not.toBeInTheDocument()
  })

  it('renders the introduction text', async () => {
    render(<HeroSection data={heroData} />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Code with character.',
      )
      expect(screen.getByText('Hello, I’m Thiago.')).toBeInTheDocument()
    })

    expect(screen.getByText(heroData.introduction.title)).toBeInTheDocument()

    // Check description (split into spans with non-breaking spaces)
    const descriptionElement = screen.getByText((_, element) => {
      const hasText = (node: Element | null) =>
        normalizeText(node?.textContent) === heroData.introduction.description
      const nodeHasText = hasText(element)
      const childrenDontHaveText = Array.from(element?.children || []).every(
        (child) => !hasText(child),
      )
      return nodeHasText && childrenDontHaveText
    })
    expect(descriptionElement).toBeInTheDocument()
  })

  it('renders social links with correct hrefs', () => {
    render(<HeroSection data={heroData} />)

    const githubLink = screen.getByLabelText(/GitHub/i)
    expect(githubLink).toHaveAttribute('href', heroData.socialLinks.github)
    expect(githubLink).toHaveAttribute('target', '_blank')

    const linkedinLink = screen.getByLabelText(/LinkedIn/i)
    expect(linkedinLink).toHaveAttribute('href', heroData.socialLinks.linkedin)

    const twitterLink = screen.getByLabelText(/Twitter/i)
    expect(twitterLink).toHaveAttribute('href', heroData.socialLinks.twitter)
  })

  it('shows the initial tech stack category', async () => {
    render(<HeroSection data={heroData} />)

    await waitFor(
      () => {
        expect(screen.getByText(/Frontend/i)).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })
})
