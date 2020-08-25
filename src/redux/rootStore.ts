import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'


export const rootStore = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
  devTools: false,
})
