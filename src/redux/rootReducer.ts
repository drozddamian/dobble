import { combineReducers } from '@reduxjs/toolkit'
import account from './account'
import room from './room'


const rootReducer = combineReducers({
  account: account.reducer,
  room: room.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
