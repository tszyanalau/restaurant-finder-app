export type NotificationType = 'info' | 'error'

export type Notification = {
  id: string
  show: boolean
  title?: string
  message: string
  type: NotificationType
}

export type GlobalState = {
  notifications: Notification[]
}

export type StoreState = {
  global: GlobalState
}
