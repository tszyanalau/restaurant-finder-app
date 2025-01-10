import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { addNotification, showNotification } from '../reducers/global'
import { NotificationType } from '../types/store'

const useNotification = () => {
  const dispatch = useDispatch()

  const triggerNotification = (message: string, type: NotificationType) => {
    const id = nanoid()
    dispatch(addNotification({ id, show: false, message, type }))
    setTimeout(() => {
      dispatch(showNotification(id))
    }, 100)
  }

  return { triggerNotification }
}

export default useNotification
