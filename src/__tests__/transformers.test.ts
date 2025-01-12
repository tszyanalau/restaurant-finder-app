import { transformPlace, transformPlaceDetails } from '../service/transformers'
import { Place, PlaceDetailsApiResponse } from '../types/apiResponse'
import { RestaurantDetails } from '../types/restaurant'

vi.mock('@reduxjs/toolkit', () => ({
  nanoid: vi.fn().mockReturnValue('mock_id'),
}))

describe('Transformers', () => {
  describe('transformPlace', () => {
    it('transforms a Place object to a Restaurant object', () => {
      const place: Place = {
        fsq_id: '1',
        name: 'Test Restaurant',
        distance: 100,
        geocodes: { main: { latitude: 10, longitude: 20 } },
      }

      const expected = {
        id: '1',
        name: 'Test Restaurant',
        distance: 100,
        latitude: 10,
        longitude: 20,
      }

      expect(transformPlace(place)).toEqual(expected)
    })
  })

  describe('transformPlaceDetails', () => {
    it('transforms a PlaceDetailsApiResponse object to a RestaurantDetails object', () => {
      const placeDetails: PlaceDetailsApiResponse = {
        name: 'Test Restaurant',
        geocodes: { main: { latitude: 10, longitude: 20 } },
        rating: 8,
        stats: { total_ratings: 100 },
        price: 2,
        categories: [{ short_name: 'Italian' }, { short_name: 'Pizza' }],
        hours: {
          open_now: true,
          display: '10:00 AM - 10:00 PM',
          regular: [{ day: 1, open: '10:00', close: '22:00' }],
        },
        location: { formatted_address: '123 Main St, Cityville' },
        photos: [
          {
            id: 'photo1',
            prefix: 'https://example.com/photo/',
            suffix: '.jpg',
            width: 800,
            height: 600,
          },
        ],
        tel: '123-456-7890',
        menu: 'https://example.com/menu',
        website: 'https://example.com',
        tips: [
          {
            created_at: '2024-06-19T11:16:02.000Z',
            text: 'Review 1',
          },
        ],
      }

      const expected: RestaurantDetails = {
        name: 'Test Restaurant',
        latitude: 10,
        longitude: 20,
        rating: 4.0, // Rounded to half
        totalRating: 100,
        pricing: 2,
        category: 'Italian, Pizza',
        open: true,
        openingHoursDisplay: '10:00 AM - 10:00 PM',
        openingHours: [{ day: 1, open: '10:00', close: '22:00' }],
        location: '123 Main St, Cityville',
        photos: [
          {
            id: 'photo1',
            url: 'https://example.com/photo/800x600.jpg',
          },
        ],
        tel: '123-456-7890',
        menu: 'https://example.com/menu',
        website: 'https://example.com',
        reviews: [
          {
            id: 'mock_id',
            createdAt: '2024-06-19T11:16:02.000Z',
            description: 'Review 1',
          },
        ],
      }

      expect(transformPlaceDetails(placeDetails)).toEqual(expected)
    })

    it('handles missing optional fields gracefully', () => {
      const placeDetails: PlaceDetailsApiResponse = {
        name: 'Test Restaurant',
        geocodes: { main: { latitude: 10, longitude: 20 } },
        rating: 0,
        categories: [],
      }

      const expected: RestaurantDetails = {
        name: 'Test Restaurant',
        latitude: 10,
        longitude: 20,
        rating: undefined,
        totalRating: undefined,
        pricing: undefined,
        category: '',
        open: undefined,
        openingHoursDisplay: undefined,
        openingHours: undefined,
        location: undefined,
        photos: [],
        tel: undefined,
        menu: undefined,
        website: undefined,
        reviews: [],
      }

      expect(transformPlaceDetails(placeDetails)).toEqual(expected)
    })
  })
})
