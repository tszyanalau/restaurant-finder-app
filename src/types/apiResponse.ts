type Geocodes = {
  main: {
    latitude: number
    longitude: number
  }
}

export type Place = {
  fsq_id: string
  name: string
  distance: number
  geocodes: Geocodes
}

export type PlaceApiResponse = {
  results: Place[]
}

type PlacePhoto = {
  id: string
  prefix: string
  suffix: string
  width: number
  height: number
}

export type PlaceDetailsApiResponse = {
  categories: {
    short_name: string
  }[]
  hours?: {
    display: string
    open_now: boolean
    regular: {
      close: string
      day: number
      open: string
    }[]
  }
  location?: {
    formatted_address?: string
  }
  name: string
  geocodes: Geocodes
  photos?: PlacePhoto[]
  price?: number
  rating?: number
  tel?: string
  menu?: string
  website?: string
  stats?: {
    total_ratings: number
  }
}
