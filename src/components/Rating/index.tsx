import { Stack } from 'react-bootstrap'
import Icon from '../Icon'

type RatingProps = {
  value: number
  max?: number
}

const Rating = ({ value, max = 5 }: RatingProps) => {
  const normalizedValue = (value / max) * 5
  const roundedValue = Math.round(normalizedValue * 2) / 2 // Round to nearest 0.5
  return (
    <Stack direction="horizontal" gap={1} className="text-primary">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1
        if (roundedValue >= starValue) {
          return <Icon key={index} type="star-fill" />
        }
        if (roundedValue + 0.5 >= starValue) {
          return <Icon key={index} type="star-half" />
        }
        return <Icon key={index} type="star" />
      })}
    </Stack>
  )
}

export default Rating
