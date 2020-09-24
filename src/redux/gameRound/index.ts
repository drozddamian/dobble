import { isNil } from 'ramda'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Card, MappedGameRound } from '../../types'
import { SESSION_USER_ID } from '../../constants'


type GameRoundState = {
  isGameRoundInProcess: boolean;
  spotterId: string | null;
  centerCard: Card | null;
  playerCard: Card | null;
  experienceForSpotter: number;
}

const initialState: GameRoundState = {
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
        isGameRoundInProcess,
        spotterId,
        centerCard,
        experienceForSpotter,
        cardsByPlayerId,
      } = action.payload

      const playerId = sessionStorage.getItem(SESSION_USER_ID)
      const currentPlayerCards = !isNil(playerId) ? cardsByPlayerId[playerId] : null

      state.isGameRoundInProcess = isGameRoundInProcess
      state.spotterId = spotterId
      state.centerCard = centerCard
      state.experienceForSpotter = experienceForSpotter
      state.playerCard = currentPlayerCards
    },
  },
})

export const {
  updateGameRound,
} = slice.actions


export default slice
