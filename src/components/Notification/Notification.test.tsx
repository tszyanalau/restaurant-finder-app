import { render, screen } from '@testing-library/react'
import Notification from './index'

describe('Notification Component', () => {
  it('renders the title and message', () => {
    render(<Notification show title="Test Title" message="Test Message" type="primary" />)

    // Assert title and message are rendered
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Message')).toBeInTheDocument()
  })

  it('applies the correct background variant', () => {
    render(<Notification show title="Test Title" message="Test Message" type="success" />)

    // Assert the Toast has the correct background class
    const toastElement = screen.getByRole('alert')
    expect(toastElement).toHaveClass('bg-success')
  })

  it('renders with a default background if none is provided', () => {
    render(<Notification show title="Test Title" message="Test Message" />)

    // Assert the Toast has the correct background class
    const toastElement = screen.getByRole('alert')
    expect(toastElement).toHaveClass('bg-white')
  })

  it('does not render when `show` is false', () => {
    render(<Notification show={false} title="Hidden" message="This message should not appear" />)

    // Assert that the Toast is not rendered
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
    expect(screen.queryByText('This message should not appear')).not.toBeInTheDocument()
  })
})
