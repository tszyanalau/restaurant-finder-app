import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Review from './index'

vi.mock('../../utils', () => ({
  formatDateTime: vi.fn(() => 'Mock Date'),
}))

describe('Review Component', () => {
  const mockCreatedAt = '2023-07-22T08:35:00.000Z'
  const mockDescription = 'This is a test review'

  it('should render the review description correctly', () => {
    render(<Review createdAt={mockCreatedAt} description={mockDescription} />)
  })

  it('should render the formatted date correctly', () => {
    render(<Review createdAt={mockCreatedAt} description={mockDescription} />)
    expect(screen.getByText('Mock Date')).toBeInTheDocument()
  })

  it('should apply the correct classes for styling', () => {
    render(<Review createdAt={mockCreatedAt} description={mockDescription} />)
    expect(screen.getByText(mockDescription)).toHaveClass('quoted-text')
    expect(screen.getByText('Mock Date')).toHaveClass('text-muted')
  })
})
