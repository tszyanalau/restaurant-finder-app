import { render, screen } from '@testing-library/react'
import ExternalLink from './index'

describe('ExternalLink Component', () => {
  it('renders an anchor tag with the correct href', () => {
    const testHref = 'https://example.com'
    render(<ExternalLink href={testHref}>Visit Example</ExternalLink>)

    const anchorElement = screen.getByRole('link', { name: /visit example/i })
    expect(anchorElement).toHaveAttribute('href', testHref)
  })

  it('includes target="_blank" and rel="noreferrer" for external links', () => {
    render(<ExternalLink href="https://example.com">External Link</ExternalLink>)

    const anchorElement = screen.getByRole('link', { name: /external link/i })
    expect(anchorElement).toHaveAttribute('target', '_blank')
    expect(anchorElement).toHaveAttribute('rel', 'noreferrer')
  })

  it('renders additional classes passed via className', () => {
    render(
      <ExternalLink href="https://example.com" className="custom-class">
        Custom Link
      </ExternalLink>
    )

    const anchorElement = screen.getByRole('link', { name: /custom link/i })
    expect(anchorElement).toHaveClass('custom-class', 'text-decoration-none')
  })

  it('renders an icon at the end of the link', () => {
    const { container } = render(<ExternalLink href="https://example.com">With Icon</ExternalLink>)
    const iconElement = container.querySelector('i.bi.bi-box-arrow-up-right')
    expect(iconElement).not.toBeNull()
  })

  it('renders children correctly', () => {
    render(<ExternalLink href="https://example.com">Click Me</ExternalLink>)

    const anchorElement = screen.getByRole('link', { name: /click me/i })
    expect(anchorElement).toBeInTheDocument()
  })
})
