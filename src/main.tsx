import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import store from './store'
import RestaurantMap from './containers/RestaurantMap'
import RestaurantDetails from './containers/RestaurantDetails'
import NotificationHandler from './containers/NotificationHandler'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/styles/global.scss'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route index path="/search" element={<RestaurantMap />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/*" element={<Navigate to="/search" replace />} />
      </Routes>
    </BrowserRouter>
    <NotificationHandler />
  </Provider>
)
