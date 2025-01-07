import { render } from '@testing-library/react'
import Pricing from './index'

describe('Pricing Component', () => {
  it('renders the correct number of currency icons based on value', () => {
    const { container } = render(<Pricing value={3} />)
    const currencyIcons = container.querySelectorAll('i.bi.bi-currency-yen')
    // Assert that the number of icons matches the value
    expect(currencyIcons).toHaveLength(3)
  })
})
