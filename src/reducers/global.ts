import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GlobalState, Notification } from '../types/store'

const initialState: GlobalState = {
  notifications: [],
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    addNotification: (state: GlobalState, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload)
    },
    showNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((notif) => notif.id === action.payload)
      if (notification) {
        notification.show = true
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((notification) => notification.id !== action.payload)
    },
  },
})

export const { addNotification, showNotification, removeNotification } = globalSlice.actions

export default globalSlice.reducer
