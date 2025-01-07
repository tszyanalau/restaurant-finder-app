import { render } from '@testing-library/react'
import Rating from './index'

const assertStars = (container: HTMLElement, filledStarNum: number, halfStarNum: number, emptyStarNum: number) => {
  const filledStars = container.querySelectorAll('i.bi.bi-star-fill')
  const halfStars = container.querySelectorAll('i.bi.bi-star-half')
  const emptyStars = container.querySelectorAll('i.bi.bi-star')

  expect(filledStars).toHaveLength(filledStarNum)
  expect(halfStars).toHaveLength(halfStarNum)
  expect(emptyStars).toHaveLength(emptyStarNum)
}

describe('Rating Component', () => {
  it('renders the correct number of filled stars', () => {
    const { container } = render(<Rating value={4} />)
    assertStars(container, 4, 0, 1)
  })

  it('renders half stars correctly', () => {
    const { container } = render(<Rating value={2.5} />)
    assertStars(container, 2, 1, 2)
  })

  it('renders no stars for zero value', () => {
    const { container } = render(<Rating value={0} />)
    assertStars(container, 0, 0, 5)
  })

  it('normalizes the value when max is specified', () => {
    const { container } = render(<Rating value={7.5} max={10} />)
    assertStars(container, 4, 0, 1)
  })

  it('handles rounding correctly', () => {
    const { container } = render(<Rating value={3.3} />)
    assertStars(container, 3, 1, 1)
  })
})
