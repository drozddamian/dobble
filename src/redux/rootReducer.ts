import { combineReducers } from '@reduxjs/toolkit'
import account from './account'
import room from './room'
import notification from './notification'

const rootReducer = combineReducers({
  account: account.reducer,
  room: room.reducer,
  notification: notification.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
