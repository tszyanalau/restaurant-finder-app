import { useParams } from 'react-router'
import { useEffect } from 'react'
import { Container, Stack, Table } from 'react-bootstrap'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { useGetRestaurantDetailsQuery } from '../../service/api/restaurant'
import ImageCarousel from '../../components/ImageCarousel'
import Rating from '../../components/Rating'
import Pricing from '../../components/Pricing'
import OpeningHours from '../../components/OpeningHours'
import ExternalLink from '../../components/ExternalLink'
import { DEFAULT_PLACEHOLDER } from '../../constants/common'
import useNotification from '../../hooks/useNotification'

const Restaurant = () => {
  const { id } = useParams()
  const { data, error, isLoading } = useGetRestaurantDetailsQuery(id as string)
  const { triggerNotification } = useNotification()

  useEffect(() => {
    if (!isLoading && error) {
      console.error(error)
      triggerNotification('Error occured when retrieving restaurant details.', 'error')
    }
  }, [isLoading, error])

  if (!data) return null

  return (
    <Stack as={Container} gap={3} className="mt-2">
      <Stack>
        <h2>{data.name}</h2>
        <Stack direction="horizontal" gap={2}>
          {data.rating ? (
            <>
              <Rating value={data.rating} />
              <div>{data.rating}</div>
            </>
          ) : (
            'No rating'
          )}
          <div>{data.totalRating ?? 'No'} review(s)</div>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          {data.pricing && <Pricing value={data.pricing} />}
          <div>{data.category}</div>
        </Stack>
        <Stack direction="horizontal" gap={2} className="flex-column flex-md-row align-items-start">
          <div className={data.open ? 'text-success' : 'text-secondary'}>{data.open ? 'Open' : 'Closed'}</div>
          {data.openingHoursDisplay && <div>{data.openingHoursDisplay}</div>}
        </Stack>
      </Stack>
      {data.photos.length > 0 && (
        <Stack>
          <h4>Photos</h4>
          <ImageCarousel photos={data.photos} />
        </Stack>
      )}
      {(data.location || data.openingHours) && (
        <Stack>
          <h4>Location & Hours</h4>
          <Stack direction="horizontal" gap={2} className="flex-column flex-md-row">
            {data.location && (
              <Stack>
                <div>{data.location}</div>
                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
                  <Map
                    className="map restaurant-details-map"
                    defaultCenter={{ lat: data.latitude, lng: data.longitude }}
                    defaultZoom={17}
                    disableDefaultUI
                    draggable={false}
                    clickableIcons={false}
                  >
                    <Marker position={{ lat: data.latitude, lng: data.longitude }} />
                  </Map>
                </APIProvider>
              </Stack>
            )}
            {data.openingHours && <OpeningHours data={data.openingHours} />}
          </Stack>
        </Stack>
      )}
      <Stack>
        <h4>Details</h4>
        <Stack direction="horizontal" gap={2} className="flex-column flex-md-row">
          {data.location && (
            <Stack>
              <Table>
                <tbody>
                  <tr>
                    <th>Phone number</th>
                    <td>{data.tel ?? DEFAULT_PLACEHOLDER}</td>
                  </tr>
                  <tr>
                    <th>Menu</th>
                    <td>{data.menu ? <ExternalLink href={data.menu}>{data.menu}</ExternalLink> : DEFAULT_PLACEHOLDER}</td>
                  </tr>
                  <tr>
                    <th>Website</th>
                    <td>
                      {data.website ? <ExternalLink href={data.website}>{data.website}</ExternalLink> : DEFAULT_PLACEHOLDER}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Restaurant
