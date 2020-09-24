import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RouteComponentProps } from 'react-router-dom'
import { AppThunk } from '../rootStore'
import { GameTable } from '../../api/gameTable'
import { apiGame } from '../../api'
import { displayNotification } from '../notification'
import { NotificationType } from '../../types'
import { Player } from '../../api/players'

const { getGameTable, joinGameTableApi } = apiGame

type GameState = {
  isLoading: boolean;
  error: string | null;
  currentGameSession: GameTable | null;
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
    fetchGameSessionSuccess(state, action: PayloadAction<GameTable>) {
      state.currentGameSession = action.payload
      state.playerList = action.payload.players
      state.isLoading = false
      state.error = null
    },
    updateGameSession(state, action: PayloadAction<GameTable>) {
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

export const joinGameTable = (sessionId: string, playerId: string, history: RouteComponentProps): AppThunk => async (dispatch) => {
  const gameTableUrl = `/game/${sessionId}`

  try {
    dispatch(gameActionStart())

    const joinedGameSession = await joinGameTableApi(sessionId, playerId)
    dispatch(fetchGameSessionSuccess(joinedGameSession))

    //TODO: change to routes
  } catch(error) {
    const { message } = error
    dispatch(displayNotification(NotificationType.ERROR, message))
    dispatch(gameActionFailure(message))
  } finally {
    history.push(gameTableUrl)
  }
}

export const fetchGameTable = (gameTableId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(gameActionStart())
    const currentGameSession = await getGameTable(gameTableId)
    dispatch(fetchGameSessionSuccess(currentGameSession))
  } catch(error) {
    const { message } = error
    dispatch(displayNotification(NotificationType.ERROR, message))
    dispatch(gameActionFailure(message))
  }
}

export default slice
