import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../rootStore'
import { GameSession } from '../../api/game'
import { apiGame } from '../../api'
import { displayNotification } from '../notification'
import { NotificationType } from '../../types'


const { joinGameSessionApi } = apiGame

type GameState = {
  isLoading: boolean;
  error: string | null;
  currentGameSession: GameSession | null;
}

const initialState: GameState = {
  isLoading: false,
  error: null,
  currentGameSession: null,
}

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    gameActionStart(state) {
      state.isLoading = true
      state.error = null
    },
    gameActionFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    joinGameSessionSuccess(state, action: PayloadAction<GameSession>) {
      state.currentGameSession = action.payload
      state.isLoading = false
      state.error = null
    }
  },
})

export const {
  gameActionStart,
  gameActionFailure,
  joinGameSessionSuccess,
} = slice.actions

export const joinGameSession = (sessionId: string, playerId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(gameActionStart())

    const joinedGameSession = await joinGameSessionApi(sessionId, playerId)

    dispatch(joinGameSessionSuccess(joinedGameSession))
  } catch(error) {
    const { data } = error.response
    dispatch(displayNotification(NotificationType.ERROR, data))
    dispatch(gameActionFailure(data))
  }
}

export default slice
