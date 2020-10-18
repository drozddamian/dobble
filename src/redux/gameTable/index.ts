import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppThunk} from '../rootStore'
import {apiGame} from '../../api'
import {displayNotification} from '../notification'
import {Player} from '../../api/players'
import history from '../../helpers/history'
import {GameTableStatus, NotificationType, ResponseError,} from '../../types'

const { joinGameTableApi } = apiGame
const { Joining, Waiting, Countdown, Processing } = GameTableStatus

type GameState = {
  isLoading: boolean;
  error: string | null;
  gameStatus: GameTableStatus;
  roundStartCountdown: 0 | 1 | 2 | 3;
  playerList: Player[];
}

const initialState: GameState = {
  isLoading: false,
  error: null,
  gameStatus: Joining,
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
    tableActionFailure(state, action: PayloadAction<ResponseError>) {
      const { message } = action.payload
      state.isLoading = false
      state.error = message
    },
    tableActionSuccess(state) {
      state.isLoading = false
      state.error = null
    },
    updateTable(state, action) {
      const { gameStatus, roundStartCountdown, players } = action.payload
      state.gameStatus = gameStatus
      state.roundStartCountdown = roundStartCountdown
      state.playerList = players
    },
    resetTable(state) {
      state.gameStatus = Joining
      state.roundStartCountdown = 3
    },
  },
})

export const {
  tableActionStart,
  tableActionFailure,
  tableActionSuccess,
  updateTable,
  resetTable,
} = slice.actions

export const joinGameTable = (tableId: string, playerId: string): AppThunk => async (dispatch) => {
  const gameTableUrl = `/game/${tableId}`

  try {
    dispatch(tableActionStart())
    await joinGameTableApi(tableId, playerId)
    dispatch(tableActionSuccess())
  } catch(error) {
    const errorData: ResponseError = error.response.data
    const { statusCode, message } = errorData

    if (statusCode === 409) {
      dispatch(displayNotification(NotificationType.INFO, 'Welcome back!'))
    } else {
      dispatch(displayNotification(NotificationType.ERROR, message))
    }
    dispatch(tableActionFailure(error))
  } finally {
    history.push(gameTableUrl)
  }
}

export default slice
