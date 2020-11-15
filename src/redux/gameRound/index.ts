import { isNil } from 'ramda'
import { AppThunk } from '../rootStore'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Card, MappedGameRound } from '../../types'
import { SESSION_USER_ID } from '../../constants'
import { resetTable } from '../gameTable'


type GameRoundState = {
  roundId: string | null;
  tableId: string;
  roundWinner?: string | null;
  isGameRoundInProcess: boolean;
  spotterId: string | null;
  centerCard: Card | null;
  playerCard: Card | null;
  experienceForSpotter: number;
}

const initialState: { [tableId: string]: GameRoundState } = {}

type FinishGameRoundActionPayload = {
  tableId: string;
  winner: string;
}

const slice = createSlice({
  name: 'gameRound',
  initialState,
  reducers: {
    updateGameRound(state, action: PayloadAction<MappedGameRound>) {
      const {
        id,
        tableId,
        isGameRoundInProcess,
        spotterId,
        centerCard,
        experienceForSpotter,
        cardsByPlayerId,
      } = action.payload

      const playerId = sessionStorage.getItem(SESSION_USER_ID)
      const currentPlayerCards = !isNil(playerId) ? cardsByPlayerId[playerId] : null

      state[tableId] = {
        roundId: id,
        tableId,
        isGameRoundInProcess,
        spotterId,
        centerCard,
        experienceForSpotter,
        playerCard: currentPlayerCards,
      }
    },
    finishGameRound(state, action: PayloadAction<FinishGameRoundActionPayload>) {
      const { winner, tableId } = action.payload

      state[tableId] = {
        ...state[tableId],
        roundWinner: winner,
        isGameRoundInProcess: false,
        spotterId: null,
        centerCard: null,
        playerCard: null,
        experienceForSpotter: 0,
      }
    },
    eraseRoundWinner(state, action: PayloadAction<{ tableId: string }>) {
      const { tableId } = action.payload
      state[tableId].roundWinner = null
    }
  },
})

export const {
  updateGameRound,
  finishGameRound,
  eraseRoundWinner,
} = slice.actions


export const finishGameAndShowResult = (tableId: string, winner: string): AppThunk => (dispatch) => {
  dispatch(finishGameRound({ tableId, winner }))

  setTimeout(() => {
    dispatch(eraseRoundWinner({ tableId }))
    dispatch(resetTable({ tableId }))
  }, 4000)
}

export default slice
