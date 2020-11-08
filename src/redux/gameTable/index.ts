import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppThunk} from '../rootStore'
import {apiGame} from '../../api'
import {displayNotification} from '../notification'
import {Player} from '../../api/players'
import history from '../../helpers/history'
import {GameTableStatus, NotificationType, ResponseError, TableChangeData,} from '../../types'

const { joinGameTableApi } = apiGame
const { Joining, Waiting, Countdown, Processing } = GameTableStatus


type TableState = {
  isLoading: boolean;
  error: string | null;
  gameStatus: GameTableStatus;
  roundStartCountdown: 0 | 1 | 2 | 3;
  playerList: Player[];
}

type TableFailureActionPayload = {
  error: ResponseError;
  tableId: string;
}
type UpdateTableActionPayload = {
  gameTableId: string;
  tableData: TableChangeData;
}

const initialState: { [id: string]: TableState } = {}

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    tableActionStart(state, action: PayloadAction<string>) {
      const tableId = action.payload
      state[tableId] = { ...state[tableId], isLoading: true, error: null }
    },

    tableActionFailure(state, action: PayloadAction<TableFailureActionPayload>) {
      const { error, tableId } = action.payload
      state[tableId] = { ...state[tableId], isLoading: false, error: error.message }
    },

    tableActionSuccess(state, action: PayloadAction<string>) {
      const tableId = action.payload
      state[tableId] = { ...state[tableId], isLoading: false, error: null }
    },

    updateTable(state, action: PayloadAction<UpdateTableActionPayload> ) {
      const { gameTableId, tableData } = action.payload
      const { gameStatus, roundStartCountdown, players } = tableData

      state[gameTableId] = {
        ...state[gameTableId],
        playerList: players,
        gameStatus,
        roundStartCountdown,
      }
    },

    resetTable(state, action: PayloadAction<string>) {
      const tableId = action.payload

      state[tableId] = {
        ...state[tableId],
        isLoading: false,
        error: null,
        gameStatus: Joining,
        roundStartCountdown: 3,
      }
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
    dispatch(tableActionStart(tableId))
    const { _id, players, gameStatus, roundStartCountdown } = await joinGameTableApi(tableId, playerId)

    const updateTableData = {
      gameTableId: _id,
      tableData: { players, gameStatus, roundStartCountdown }
    }

    dispatch(updateTable(updateTableData))
    dispatch(tableActionSuccess(tableId))

  } catch(error) {
    const errorData: ResponseError = error.response.data
    const { statusCode, message } = errorData

    if (statusCode === 409) {
      dispatch(displayNotification(NotificationType.INFO, 'Welcome back!'))
    } else {
      dispatch(displayNotification(NotificationType.ERROR, message))
    }
    dispatch(tableActionFailure({ tableId, error }))
  } finally {
    history.push(gameTableUrl)
  }
}

export default slice
