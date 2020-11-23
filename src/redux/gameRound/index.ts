import { equals } from 'ramda'
import { AppThunk } from '../rootStore'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {Card, CardsByPlayerId, MappedGameRound, StyledCard} from '../../types'
import { SESSION_USER_ID } from '../../constants'
import { resetTable } from '../gameTable'
import {Player} from "../../api/players";
import {prepareStyledCard} from "../../utils/cards";


type GameRoundState = {
  roundId: string | null;
  tableId: string;
  roundWinner?: string | null;
  isGameRoundInProcess: boolean;
  cardsByPlayerId: CardsByPlayerId | null;
  spotterId: string | null;
  centerCard: Card | null;
  playerCard: Card | null;
  styledCenterCard: StyledCard | null;
  styledPlayerCard: StyledCard | null;
  players: Player[];
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
        players,
      } = action.payload

      const playerId = sessionStorage.getItem(SESSION_USER_ID)
      const newPlayerCards = (playerId && Object.keys(cardsByPlayerId).includes(playerId))
        ? cardsByPlayerId[playerId].card
        : null

      if (!state[tableId]) {
        state[tableId] = {
          roundId: id,
          tableId,
          isGameRoundInProcess,
          spotterId,
          experienceForSpotter,
          cardsByPlayerId,
          players,
          centerCard,
          styledCenterCard: prepareStyledCard(centerCard),
          playerCard: newPlayerCards,
          styledPlayerCard: prepareStyledCard(newPlayerCards),
        }
        return
      }

      const currentCenterCard = state[tableId]?.centerCard

      if (playerId) {
        const currentPlayerCard = state[tableId].playerCard

        if (!equals(newPlayerCards, currentPlayerCard)) {
          state[tableId].playerCard = newPlayerCards
          state[tableId].styledPlayerCard = prepareStyledCard(newPlayerCards)
        }
      }

      if (!equals(centerCard, currentCenterCard)) {
        state[tableId].centerCard = centerCard
        state[tableId].styledCenterCard = prepareStyledCard(centerCard)
      }

      state[tableId].roundId = id
      state[tableId].spotterId = spotterId
      state[tableId].tableId = tableId
      state[tableId].isGameRoundInProcess = isGameRoundInProcess
      state[tableId].experienceForSpotter = experienceForSpotter
      state[tableId].cardsByPlayerId = cardsByPlayerId
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
  }, 5000)
}

export default slice
