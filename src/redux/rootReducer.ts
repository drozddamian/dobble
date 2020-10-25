import { combineReducers } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from "react-redux";
import authentication from './authentication'
import players from './players'
import rooms from './rooms'
import notification from './notification'
import gameTable from './gameTable'
import gameRound from './gameRound'

const rootReducer = combineReducers({
  authentication: authentication.reducer,
  players: players.reducer,
  rooms: rooms.reducer,
  notification: notification.reducer,
  gameTable: gameTable.reducer,
  gameRound: gameRound.reducer,
})

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
