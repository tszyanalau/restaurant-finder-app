import { Pin } from '@vis.gl/react-google-maps'
import { Variant } from 'react-bootstrap/esm/types'

type MarkerProps = {
  variant: Variant
}

const Marker = ({ variant }: MarkerProps) => {
  return (
    <Pin
      background={`var(--bs-${variant})`}
      borderColor={`var(--bs-${variant}-text-emphasis)`}
      glyphColor={`var(--bs-${variant}-text-emphasis)`}
    />
  )
}

export default Marker
