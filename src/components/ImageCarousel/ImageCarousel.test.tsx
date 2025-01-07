import { render, screen } from '@testing-library/react'
import ImageCarousel from './index'
import { Photo } from '../../types/restaurant'

describe('ImageCarousel Component', () => {
  const samplePhotos: Photo[] = [
    { id: '1', url: 'https://example.com/photo1.jpg' },
    { id: '2', url: 'https://example.com/photo2.jpg' },
    { id: '3', url: 'https://example.com/photo3.jpg' },
  ]

  it('renders the Carousel with the correct number of slides', () => {
    render(<ImageCarousel photos={samplePhotos} />)

    // Assert the correct number of slides are rendered
    const carouselItems = screen.getAllByRole('img')
    expect(carouselItems).toHaveLength(samplePhotos.length)
  })

  it('renders each photo with the correct URL and alt text', () => {
    render(<ImageCarousel photos={samplePhotos} />)

    // Assert each image is rendered with the correct attributes
    samplePhotos.forEach((photo) => {
      const imgElement = screen.getByAltText(`Slide ${photo.id}`)
      expect(imgElement).toBeInTheDocument()
      expect(imgElement).toHaveAttribute('src', photo.url)
    })
  })

  it('renders an empty Carousel if no photos are provided', () => {
    render(<ImageCarousel photos={[]} />)

    // Assert that no slides are rendered
    const carouselItems = screen.queryAllByRole('img')
    expect(carouselItems).toHaveLength(0)
  })
})
