import { Carousel, Stack } from 'react-bootstrap'
import { Photo } from '../../types/restaurant'

import './imageCarousel.scss'

type ImageCarouselProps = {
  photos: Photo[]
}

const ImageCarousel = ({ photos }: ImageCarouselProps) => {
  return (
    <Carousel className="image-carousel">
      {photos.map(({ id, url }) => (
        <Carousel.Item key={id}>
          <Stack>
            <img className="image-carousel-item" src={url} alt={`Slide ${id}`} />
          </Stack>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ImageCarousel
