/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_KEY: string
  readonly VITE_API_TIMEOUT: number
  readonly VITE_API_LATITUDE: string
  readonly VITE_API_LONGITUDE: string
  readonly VITE_API_RADIUS: number
  readonly VITE_API_CATEGORIES: string
  readonly VITE_API_LIMIT: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
