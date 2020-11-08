import { isNil } from 'ramda'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from "../redux/rootReducer";
import { NotificationType } from '../types'
import { displayNotification } from '../redux/notification'


interface HookResult {
  isNotificationVisible: boolean;
  notificationText: string | null;
  notificationType: NotificationType | null;
  addNotification: (type: NotificationType, text: string) => void;
}

export const useNotification = (): HookResult => {
  const dispatch = useDispatch()

  const { notification } = useTypedSelector(state => state.notification)
  const isNotificationVisible = !isNil(notification)
  const notificationText = notification?.text || null
  const notificationType = notification?.type || null

  const addNotification = (type: NotificationType, text: string) => {
    dispatch(displayNotification(type, text))
  }

  return {
    isNotificationVisible,
    notificationText,
    notificationType,
    addNotification,
  }
}
