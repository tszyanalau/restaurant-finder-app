import { render } from '@testing-library/react'
import Icon from './index'

describe('Icon Component', () => {
  it('renders with the correct Bootstrap icon class', () => {
    const { container } = render(<Icon type="star" />)
    const iconElement = container.querySelector('i')

    // Assert that the icon has the correct classes
    expect(iconElement).toHaveClass('bi', 'bi-star')
  })

  it('applies additional className', () => {
    const { container } = render(<Icon type="heart" className="custom-class" />)
    const iconElement = container.querySelector('i')

    // Assert that the custom class is added along with the Bootstrap icon classes
    expect(iconElement).toHaveClass('custom-class', 'bi', 'bi-heart')
  })
})
