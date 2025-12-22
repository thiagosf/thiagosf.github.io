import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import heroData from '../../../../data/hero-data.json'
import { HeroSection } from '../HeroSection'

describe('HeroSection', () => {
  const normalizeText = (text: string | null | undefined) =>
    text?.replace(/\u00a0/g, ' ').trim()

  it('renders the introduction text', async () => {
    render(<HeroSection data={heroData} />)

    await waitFor(() => {
      const headings = screen.getAllByRole('heading')
      const h1 = headings.find((h) => h.tagName === 'H1')
      const h2s = headings.filter((h) => h.tagName === 'H2')

      expect(normalizeText(h1?.textContent)).toBe('Thiago')

      const lastName = h2s.find((h) =>
        h.textContent?.replace(/\u00a0/g, ' ').includes('Silva'),
      )
      expect(normalizeText(lastName?.textContent)).toBe('Silva Ferreira')
    })

    expect(screen.getByText(heroData.introduction.title)).toBeInTheDocument()

    // Check description (split into spans with non-breaking spaces)
    const descriptionElement = screen.getByText((content, element) => {
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
