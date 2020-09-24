import { combineReducers } from '@reduxjs/toolkit'
import authentication from './authentication'
import players from './players'
import rooms from './rooms'
import notification from './notification'
import game from './gameTable'

const rootReducer = combineReducers({
  authentication: authentication.reducer,
  players: players.reducer,
  rooms: rooms.reducer,
  notification: notification.reducer,
  game: game.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
