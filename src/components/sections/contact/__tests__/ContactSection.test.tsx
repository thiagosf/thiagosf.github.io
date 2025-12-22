import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import contactData from '../../../../data/contact.json'
import { ContactSection } from '../ContactSection'
import type { ContactLink } from '../types'

describe('ContactSection', () => {
  const { contactLinks } = contactData

  it('renders contact links with platform and label text', () => {
    render(<ContactSection contactLinks={contactLinks} />)

    expect(screen.getByText(/github.com\/thiagosf/i)).toBeInTheDocument()
    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument()
    expect(screen.getByText(/hello@thiago\.me/i)).toBeInTheDocument()
  })

  it('calls onLinkClick when a link is clicked', async () => {
    const handleLinkClick = vi.fn()
    const user = userEvent.setup()
    render(
      <ContactSection
        contactLinks={contactLinks}
        onLinkClick={handleLinkClick}
      />,
    )

    const githubLink = screen.getByRole('link', {
      name: /github\.com\/thiagosf/i,
    })
    await user.click(githubLink)

    expect(handleLinkClick).toHaveBeenCalledWith(
      contactLinks[0].id,
      contactLinks[0].url,
    )
  })

  it('displays an empty state when no links are provided', () => {
    render(<ContactSection contactLinks={[]} />)

    expect(
      screen.getByText(/no contact information provided/i),
    ).toBeInTheDocument()
  })

  it('falls back to the globe icon when an unknown icon identifier is set', () => {
    const unknownLink: ContactLink = {
      id: 'cl-unknown',
      platform: 'Signal',
      label: 'signal.me/thiago',
      url: 'https://signal.me/thiago',
      icon: 'unknown',
      type: 'other',
    }

    render(<ContactSection contactLinks={[unknownLink]} />)

    expect(screen.getByTestId('contact-link-icon-cl-unknown')).toHaveAttribute(
      'data-icon-name',
      'globe',
    )
  })
})
