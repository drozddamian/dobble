import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RouteComponentProps } from 'react-router-dom'
import { AppThunk } from '../rootStore'
import { GameSession } from '../../api/game'
import { apiGame } from '../../api'
import { displayNotification } from '../notification'
import { NotificationType } from '../../types'
import {Player} from "../../api/players";

const { getGameSession, joinGameSessionApi } = apiGame

type GameState = {
  isLoading: boolean;
  error: string | null;
  currentGameSession: GameSession | null;
  isGameInProcess: boolean;
  playerList: Player[];
}

const initialState: GameState = {
  isLoading: false,
  error: null,
  currentGameSession: null,
  isGameInProcess: false,
  playerList: [],
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
    fetchGameSessionSuccess(state, action: PayloadAction<GameSession>) {
      state.currentGameSession = action.payload
      state.playerList = action.payload.players
      state.isLoading = false
      state.error = null
    },
    updateGameSession(state, action: PayloadAction<GameSession>) {
      state.currentGameSession = action.payload
    },
    updatePlayerList(state, action: PayloadAction<Player[]>) {
      state.playerList = action.payload
    },
    setGameInProcess(state) {
      state.isGameInProcess = true
    },
  },
})

export const {
  gameActionStart,
  gameActionFailure,
  fetchGameSessionSuccess,
  updateGameSession,
  updatePlayerList,
  setGameInProcess,
} = slice.actions

export const joinGameSession = (sessionId: string, playerId: string, history: RouteComponentProps): AppThunk => async (dispatch) => {
  const gameSessionUrl = `/game/${sessionId}`

  try {
    dispatch(gameActionStart())

    const joinedGameSession = await joinGameSessionApi(sessionId, playerId)
    dispatch(fetchGameSessionSuccess(joinedGameSession))

    //TODO: change to routes
  } catch(error) {
    const { data } = error.response
    dispatch(displayNotification(NotificationType.ERROR, data))
    dispatch(gameActionFailure(data))
  } finally {
    history.push(gameSessionUrl)
  }
}

export const fetchGameSession = (sessionId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(gameActionStart())
    const currentGameSession = await getGameSession(sessionId)
    dispatch(fetchGameSessionSuccess(currentGameSession))
  } catch(error) {
    const { data } = error.response
    dispatch(displayNotification(NotificationType.ERROR, data))
    dispatch(gameActionFailure(data))
  }
}

export default slice
