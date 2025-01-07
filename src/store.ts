import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { restaurantApi } from './service/api/restaurant'
import globalReducer from './reducers/global'

const rootReducer = {
  [restaurantApi.reducerPath]: restaurantApi.reducer,
  global: globalReducer,
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(restaurantApi.middleware),
})

setupListeners(store.dispatch)

export default store
