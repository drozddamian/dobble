import { combineReducers } from '@reduxjs/toolkit'
import account from './account'


const rootReducer = combineReducers({
  account: account.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
