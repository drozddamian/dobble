import { isNil } from 'ramda'
import { AppThunk } from '../rootStore'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Card, MappedGameRound } from '../../types'
import { SESSION_USER_ID } from '../../constants'
import { resetTable } from '../gameTable'


type GameRoundState = {
  roundId: string | null;
  roundWinner: string | null;
  isGameRoundInProcess: boolean;
  spotterId: string | null;
  centerCard: Card | null;
  playerCard: Card | null;
  experienceForSpotter: number;
}

const initialState: GameRoundState = {
  roundId: null,
  roundWinner: null,
  isGameRoundInProcess: false,
  spotterId: null,
  centerCard: null,
  experienceForSpotter: 0,
  playerCard: null,
}

const slice = createSlice({
  name: 'gameRound',
  initialState,
  reducers: {
    updateGameRound(state, action: PayloadAction<MappedGameRound>) {
      const {
        id,
        isGameRoundInProcess,
        spotterId,
        centerCard,
        experienceForSpotter,
        cardsByPlayerId,
      } = action.payload

      const playerId = sessionStorage.getItem(SESSION_USER_ID)
      const currentPlayerCards = !isNil(playerId) ? cardsByPlayerId[playerId] : null

      state.roundId = id
      state.isGameRoundInProcess = isGameRoundInProcess
      state.spotterId = spotterId
      state.centerCard = centerCard
      state.experienceForSpotter = experienceForSpotter
      state.playerCard = currentPlayerCards
    },
    finishGameRound(state, action: PayloadAction<string>) {
      state.roundWinner = action.payload
      state.roundId = null
      state.isGameRoundInProcess = false
      state.spotterId = null
      state.centerCard = null
      state.experienceForSpotter = 0
      state.playerCard = null
    },
    eraseRoundWinner(state) {
      state.roundWinner = null
    }
  },
})

export const {
  updateGameRound,
  finishGameRound,
  eraseRoundWinner,
} = slice.actions


export const finishGameAndShowResult = (gameTableId: string, winner: string): AppThunk => (dispatch) => {
  dispatch(finishGameRound(winner))

  setTimeout(() => {
    dispatch(eraseRoundWinner())
    dispatch(resetTable(gameTableId))
  }, 4000)
}

export default slice
