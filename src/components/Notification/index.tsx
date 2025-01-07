import { Toast, ToastProps } from 'react-bootstrap'
import { Variant } from 'react-bootstrap/esm/types'

type NotificationProps = ToastProps & {
  title?: string
  message: string
  type?: Variant
}

const Notification = ({ show, onClose, title = '', message, type = 'white' }: NotificationProps) => {
  return (
    <Toast show={show} onClose={onClose} bg={type}>
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  )
}

export default Notification
