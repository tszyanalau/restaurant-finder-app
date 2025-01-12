import { nanoid } from '@reduxjs/toolkit'
import { Place, PlaceDetailsApiResponse } from '../types/apiResponse'
import { Restaurant, RestaurantDetails } from '../types/restaurant'

export const transformPlace = (restaurant: Place): Restaurant => {
  return {
    id: restaurant.fsq_id,
    name: restaurant.name,
    distance: restaurant.distance,
    latitude: restaurant.geocodes.main.latitude,
    longitude: restaurant.geocodes.main.longitude,
  }
}

export const transformPlaceDetails = (response: PlaceDetailsApiResponse): RestaurantDetails => {
  return {
    name: response.name,
    latitude: response.geocodes.main.latitude,
    longitude: response.geocodes.main.longitude,
    rating: response.rating ? Math.round((response.rating / 2) * 10) / 10 : undefined,
    totalReviews: response.stats?.total_tips,
    pricing: response.price,
    category: response.categories.map(({ short_name }) => short_name).join(', '),
    open: response.hours?.open_now,
    openingHoursDisplay: response.hours?.display,
    openingHours: response.hours?.regular,
    location: response.location?.formatted_address,
    photos:
      response.photos?.map(({ id, prefix, suffix, width, height }) => ({
        id,
        url: `${prefix}${width}x${height}${suffix}`,
      })) || [],
    tel: response.tel,
    menu: response.menu,
    website: response.website,
    reviews:
      response.tips?.map(({ created_at, text }) => ({
        id: nanoid(),
        createdAt: created_at,
        description: text,
      })) || [],
  }
}
