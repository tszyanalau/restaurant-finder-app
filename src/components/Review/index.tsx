import { Stack, Alert } from 'react-bootstrap'
import { formatDateTime } from '../../utils'

type ReviewProps = {
  createdAt: string
  description: string
}

const Review = ({ createdAt, description }: ReviewProps) => {
  return (
    <Stack as={Alert}>
      <div className="quoted-text">{description}</div>
      <small className="text-muted">{formatDateTime(createdAt)}</small>
    </Stack>
  )
}

export default Review
