import { useEffect, useState } from 'react'
import { Container, Button, Stack, Form, Badge } from 'react-bootstrap'
import { APIProvider, Map, AdvancedMarker, InfoWindow, MapCameraChangedEvent } from '@vis.gl/react-google-maps'
import { usePickRestaurantQuery, useSearchRestaurantsQuery } from '../../service/api/restaurant'
import { Restaurant } from '../../types/restaurant'
import Icon from '../../components/Icon'
import AdvancedMarkerWithRef from './AdvancedMarkerWithRef'
import Marker from './Marker'
import useNotification from '../../hooks/useNotification'

const defaultCenter = {
  lat: parseFloat(import.meta.env.VITE_API_LATITUDE),
  lng: parseFloat(import.meta.env.VITE_API_LONGITUDE),
}

const defaultZoom = 15

const RestaurantMap = () => {
  const [input, setInput] = useState<string>('')
  const [query, setQuery] = useState<string>()
  const [selectedMarker, setSelectedMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [center, setCenter] = useState(defaultCenter)
  const [zoom, setZoom] = useState(defaultZoom)

  const { data: pickedRestaurant, isFetching, error: pickError, refetch: pick } = usePickRestaurantQuery()
  const {
    data: restaurants,
    isFetching: isSearching,
    error: searchError,
  } = useSearchRestaurantsQuery(query || '', { skip: !query })

  const { triggerNotification } = useNotification()

  useEffect(() => {
    if (!isSearching) {
      if (searchError) {
        console.error(searchError)
        triggerNotification('Error occured when searching restaurants.', 'error')
      } else if (restaurants?.length === 0) {
        triggerNotification('No search results.', 'info')
      }
    }
  }, [isSearching, searchError])

  useEffect(() => {
    if (!isFetching) {
      if (pickError) {
        console.error(pickError)
        triggerNotification('Error occured when picking restaurant.', 'error')
      } else if (!pickedRestaurant) {
        triggerNotification('No restaurant is picked.', 'info')
      }
    }
  }, [isFetching, pickError])

  const resetInfoWindow = () => {
    if (showInfoWindow) setShowInfoWindow(false)
    if (selectedMarker) setSelectedMarker(null)
    if (selectedRestaurant) setSelectedRestaurant(null)
  }

  const resetMap = () => {
    setCenter(defaultCenter)
    setZoom(defaultZoom)
  }

  return (
    <Stack as={Container} gap={2} className="page-container">
      <Stack gap={2}>
        <h3 className="mb-0">{import.meta.env.VITE_APP_NAME}</h3>
        <Stack direction="horizontal" className="flex-column flex-md-row">
          <div>{`Random selection of a restaurant within ${import.meta.env.VITE_API_RADIUS / 1000}km of the Cogent Labs Office. `}</div>
          <Button
            variant="link"
            onClick={() => {
              resetInfoWindow()
              resetMap()
              pick()
            }}
            disabled={isFetching}
          >
            {isFetching ? 'Picking...' : 'Pick again'}
          </Button>
        </Stack>
      </Stack>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <Map
          className="map restaurant-map"
          mapId="restaurant-map"
          defaultCenter={center}
          center={center}
          defaultZoom={defaultZoom}
          zoom={zoom}
          disableDefaultUI
          zoomControl
          onZoomChanged={(event: MapCameraChangedEvent) => {
            setZoom(event.detail.zoom)
          }}
          onCenterChanged={(event: MapCameraChangedEvent) => {
            setCenter(event.detail.center)
          }}
          onDragend={() => {
            resetInfoWindow()
          }}
        >
          <AdvancedMarker position={defaultCenter}>
            <Badge pill bg="success" className="fs-5">
              <Icon type="building" />
            </Badge>
          </AdvancedMarker>
          {pickedRestaurant && (
            <AdvancedMarkerWithRef
              zIndex={restaurants?.length || 0 + 1}
              position={{
                lat: pickedRestaurant.latitude,
                lng: pickedRestaurant.longitude,
              }}
              onMarkerClick={(marker: google.maps.marker.AdvancedMarkerElement) => {
                if (marker) {
                  setSelectedMarker(marker)
                }
                setSelectedRestaurant(pickedRestaurant)
                setShowInfoWindow((show) => !show)
              }}
            >
              <Marker variant="primary" />
            </AdvancedMarkerWithRef>
          )}
          {restaurants &&
            restaurants.map((restaurant) => (
              <AdvancedMarkerWithRef
                key={restaurant.id}
                position={{
                  lat: restaurant.latitude,
                  lng: restaurant.longitude,
                }}
                onMarkerClick={(marker: google.maps.marker.AdvancedMarkerElement) => {
                  if (marker) {
                    setSelectedMarker(marker)
                  }
                  if (restaurant.id === selectedRestaurant?.id) {
                    setShowInfoWindow((show) => !show)
                  } else {
                    setSelectedRestaurant(restaurant)
                    setShowInfoWindow(true)
                  }
                }}
              >
                <Marker variant="info" />
              </AdvancedMarkerWithRef>
            ))}
        </Map>
        {showInfoWindow && selectedMarker && selectedRestaurant && (
          <InfoWindow anchor={selectedMarker} pixelOffset={[0, -2]} headerContent={<b>{selectedRestaurant.name}</b>}>
            <p>
              <Icon type="geo-fill" className="me-1" />
              {selectedRestaurant.distance}m away from office
            </p>
            <a href={`/restaurant/${selectedRestaurant.id}`} target="_blank" rel="noreferrer">
              View Details
            </a>
          </InfoWindow>
        )}
      </APIProvider>
      <b>Search up to {import.meta.env.VITE_API_LIMIT} restaurant(s) nearby the office: </b>
      <Stack direction="horizontal" gap={2}>
        <Form.Control
          type="text"
          placeholder="Enter keyword"
          value={input}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (showInfoWindow) setShowInfoWindow(false)
            setInput(event.target.value)
          }}
          disabled={isSearching}
        />
        <Button
          variant="info"
          onClick={() => {
            setQuery(input)
            resetInfoWindow()
            resetMap()
          }}
          disabled={!input || isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </Stack>
    </Stack>
  )
}

export default RestaurantMap
