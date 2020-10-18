import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isNil } from 'ramda'
import { AppThunk } from '../rootStore'
import { apiPlayers } from '../../api'
import { Player, GetPlayerSuccess } from '../../api/players'
import { Room } from '../../api/rooms'
import { ResponseError } from '../../types'

const { getPlayer } = apiPlayers

type AccountState = {
  isLoading: boolean;
  error: string | null;
  player: Player | null;
}

const initialState: AccountState = {
  isLoading: false,
  error: null,
  player: null,
}

const slice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    playerActionStart(state) {
      state.isLoading = true
      state.error = null
    },
    playerActionFailure(state, action: PayloadAction<ResponseError>) {
      const { message } = action.payload
      state.isLoading = false
      state.error = message
    },
    getAccountSuccess(state, action: PayloadAction<GetPlayerSuccess>) {
      const { player } = action.payload
      state.player = player
      state.isLoading = false
      state.error = null
    },
    setCurrentPlayer(state, action: PayloadAction<Player>) {
      state.player = action.payload
    },
    updatePlayerRoomList(state, action: PayloadAction<Room>) {
      if (isNil(state.player)) {
        return
      }
      const owningRooms = state.player.owningRooms
      state.player.owningRooms = [...owningRooms, action.payload]
    }
  },
})

export const {
  playerActionStart,
  playerActionFailure,
  getAccountSuccess,
  setCurrentPlayer,
  updatePlayerRoomList,
} = slice.actions

export const fetchPlayer = (id: string): AppThunk => async dispatch => {
  try {
    dispatch(playerActionStart())
    const playerData = await getPlayer(id)
    dispatch(getAccountSuccess(playerData))
  } catch (error) {
    const errorData: ResponseError = error.response.data
    dispatch(playerActionFailure(errorData))
  }
}


export default slice
