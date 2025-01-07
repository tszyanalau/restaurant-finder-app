export type Restaurant = {
  id: string
  name: string
  distance: number
  latitude: number
  longitude: number
}

export type Photo = {
  id: string
  url: string
}

export type OpeningHour = {
  day: number
  open: string
  close: string
}

export type RestaurantDetails = {
  name: string
  rating?: number
  totalRating?: number
  pricing?: number
  category: string
  open?: boolean
  location?: string
  latitude: number
  longitude: number
  openingHoursDisplay?: string
  openingHours?: OpeningHour[]
  photos: Photo[]
  tel?: string
  menu?: string
  website?: string
}
