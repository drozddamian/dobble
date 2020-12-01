import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { equals } from 'ramda'
import { Player } from '../../api/players'
import { GameTableStatus, ResponseError, TableChangeData } from '../../types'

const { Joining } = GameTableStatus


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
    tableActionStart(state, action: PayloadAction<{ tableId: string }>) {
      const { tableId } = action.payload

      state[tableId] = {
        ...state[tableId],
        isLoading: true,
        error: null,
      }
    },

    tableActionFailure(state, action: PayloadAction<TableFailureActionPayload>) {
      const { error, tableId } = action.payload
      state[tableId] = {
        ...state[tableId],
        isLoading: false,
        error: error.message,
      }
    },

    tableActionSuccess(state, action: PayloadAction<{ tableId: string }>) {
      const { tableId } = action.payload

      state[tableId] = {
        ...state[tableId],
        isLoading: false,
        error: null,
      }
    },

    updateTable(state, action: PayloadAction<UpdateTableActionPayload> ) {
      const { gameTableId, tableData } = action.payload
      const { gameStatus, roundStartCountdown, players } = tableData

      if (!gameTableId) {
        return
      }

      if (!state[gameTableId]) {
        state[gameTableId] = { ...state[gameTableId] }
      }
      state[gameTableId].roundStartCountdown = roundStartCountdown

      if (!equals(state[gameTableId].gameStatus, gameStatus)) {
        state[gameTableId].gameStatus = gameStatus
      }

      if (!equals(state[gameTableId].playerList, players)) {
        state[gameTableId].playerList = players
      }
    },

    resetTable(state, action: PayloadAction<{ tableId: string }>) {
      const { tableId } = action.payload

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
  updateTable,
  resetTable,
} = slice.actions

export default slice
