import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SiteIcon } from './SiteIcon'

describe('SiteIcon', () => {
  it.each(['arrow-up-right', 'arrow-up', 'star', 'asterisk', 'plus'] as const)(
    'renders the %s variant as a decorative SVG',
    (name) => {
      const { container } = render(<SiteIcon name={name} />)
      const icon = container.querySelector('svg')

      expect(icon).toHaveAttribute('aria-hidden', 'true')
      expect(icon).toHaveAttribute('focusable', 'false')
      expect(icon).toHaveAttribute('viewBox', name === 'asterisk' ? '0 0 48 48' : '0 0 24 24')
      expect(icon).toHaveAttribute('stroke', 'currentColor')
    },
  )

  it('uses a consistent default size and honors a supplied size', () => {
    const { container, rerender } = render(<SiteIcon name="plus" />)
    expect(container.querySelector('svg')).toHaveAttribute('width', '16')
    expect(container.querySelector('svg')).toHaveAttribute('height', '16')

    rerender(<SiteIcon name="plus" size={32} />)
    expect(container.querySelector('svg')).toHaveAttribute('width', '32')
    expect(container.querySelector('svg')).toHaveAttribute('height', '32')
  })

  it('allows inherited currentColor styling and stays outside the accessibility tree', () => {
    render(
      <button aria-label="Expand details">
        <SiteIcon name="plus" />
      </button>,
    )

    expect(screen.getByRole('button', { name: 'Expand details' })).toBeInTheDocument()
    expect(document.querySelector('svg')).toHaveAttribute('stroke', 'currentColor')
    expect(document.querySelector('svg')).not.toHaveAttribute('tabindex')
  })
})
