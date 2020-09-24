import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RouteComponentProps } from 'react-router-dom'
import { AppThunk } from '../rootStore'
import { GameTable } from '../../api/gameTable'
import { apiGame } from '../../api'
import { displayNotification } from '../notification'
import { NotificationType } from '../../types'
import { Player } from '../../api/players'

const { joinGameTableApi } = apiGame

type GameState = {
  isLoading: boolean;
  error: string | null;
  isGameInProcess: boolean;
  roundStartCountdown: 0 | 1 | 2 | 3;
  playerList: Player[];
}

const initialState: GameState = {
  isLoading: false,
  error: null,
  isGameInProcess: false,
  roundStartCountdown: 3,
  playerList: [],
}

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    tableActionStart(state) {
      state.isLoading = true
      state.error = null
    },
    tableActionFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    tableActionSuccess(state) {
      state.isLoading = false
      state.error = null
    },
    updateTable(state, action) {
      const { isGameInProcess, roundStartCountdown, players } = action.payload
      state.isGameInProcess = isGameInProcess
      state.roundStartCountdown = roundStartCountdown
      state.playerList = players
    }
  },
})

export const {
  tableActionStart,
  tableActionFailure,
  tableActionSuccess,
  updateTable,
} = slice.actions

export const joinGameTable = (tableId: string, playerId: string, history: RouteComponentProps): AppThunk => async (dispatch) => {
  const gameTableUrl = `/game/${tableId}`

  try {
    dispatch(tableActionStart())
    await joinGameTableApi(tableId, playerId)
    dispatch(tableActionSuccess())
  } catch(error) {
    const { message } = error
    dispatch(displayNotification(NotificationType.ERROR, message))
    dispatch(tableActionFailure(message))
  } finally {
    history.push(gameTableUrl)
  }
}

export default slice
