import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Restaurant, RestaurantDetails } from '../../types/restaurant'
import { PlaceApiResponse, PlaceDetailsApiResponse } from '../../types/apiResponse'
import { transformPlace, transformPlaceDetails } from '../transformers'

const baseUrl = import.meta.env.VITE_API_BASE_URL
const center = `${import.meta.env.VITE_API_LATITUDE},${import.meta.env.VITE_API_LONGITUDE}`
const radius = import.meta.env.VITE_API_RADIUS.toString()
const limit = import.meta.env.VITE_API_LIMIT.toString()
const categories = import.meta.env.VITE_API_CATEGORIES // Category ids for restaurant
const restaurantMapFields = 'fsq_id,name,geocodes,distance'
const restaurantDetails = 'name,geocodes,location,categories,tel,website,hours,rating,price,menu,photos,stats'

export const restaurantApi = createApi({
  reducerPath: 'restaurantApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Authorization', import.meta.env.VITE_FS_API_KEY)
      return headers
    },
    timeout: import.meta.env.VITE_API_TIMEOUT,
  }),
  endpoints: (builder) => ({
    pickRestaurant: builder.query<Restaurant | null, void>({
      query: () => {
        const params = new URLSearchParams({
          ll: center,
          radius,
          categories,
          limit,
          fields: restaurantMapFields,
        })
        return `/places/search?${params.toString()}`
      },
      transformResponse: (response: PlaceApiResponse): Restaurant | null => {
        if (response.results?.length === 0) return null
        const randomIndex = Math.floor(Math.random() * response.results?.length)
        const selectRestaurant = response.results[randomIndex]
        return transformPlace(selectRestaurant)
      },
    }),
    searchRestaurants: builder.query<Restaurant[], string>({
      query: (query) => {
        const params = new URLSearchParams({
          ll: center,
          radius,
          categories,
          limit,
          query,
          fields: restaurantMapFields,
        })
        return `/places/search?${params.toString()}`
      },
      transformResponse: (response: PlaceApiResponse): Restaurant[] => {
        return response.results.map((restaurant) => transformPlace(restaurant))
      },
    }),
    getRestaurantDetails: builder.query<RestaurantDetails, string>({
      query: (id) => {
        const params = new URLSearchParams({
          fields: restaurantDetails,
        })
        return `/places/${id}?${params.toString()}`
      },
      transformResponse: (response: PlaceDetailsApiResponse): RestaurantDetails => {
        return transformPlaceDetails(response)
      },
    }),
  }),
})

export const { usePickRestaurantQuery, useSearchRestaurantsQuery, useGetRestaurantDetailsQuery } = restaurantApi
