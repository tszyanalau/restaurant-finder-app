import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-bootstrap'
import { StoreState } from '../../types/store'
import { removeNotification } from '../../reducers/global'
import Notification from '../../components/Notification'

const mapTypeToVariant = {
  info: 'white',
  error: 'danger',
}

const mapTypeToTitle = {
  info: 'Info',
  error: 'Error',
}

const NotificationHandler = () => {
  const dispatch = useDispatch()
  const { notifications } = useSelector((state: StoreState) => state.global)
  return (
    <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
      {notifications.map(({ id, show, title, message, type }) => {
        return (
          <Notification
            key={id}
            show={show}
            onClose={() => dispatch(removeNotification(id))}
            title={title ?? mapTypeToTitle[type]}
            message={message}
            type={mapTypeToVariant[type]}
          />
        )
      })}
    </ToastContainer>
  )
}

export default NotificationHandler
