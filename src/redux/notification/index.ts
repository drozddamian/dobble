import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../rootStore'
import {
  NotificationProps,
  NotificationType,
} from '../../types'

type NotificationState = {
  notification: NotificationProps | null;
}

const initialState: NotificationState = {
  notification: null,
}

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action: PayloadAction<NotificationProps>) {
      state.notification = action.payload
    },
    expireNotification(state) {
      state.notification = null
    },
  },
})

export const {
  showNotification,
  expireNotification,
} = slice.actions

export const displayNotification = (type: NotificationType, text: string): AppThunk => async dispatch => {
  dispatch(showNotification({ type, text }))

  setTimeout(() => {
    dispatch(expireNotification())
  }, 4000)
}


export default slice
