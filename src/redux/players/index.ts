import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isNil } from 'ramda'
import { AppThunk } from '../rootStore'
import { apiPlayers } from '../../api'
import { Player, GetPlayerSuccess } from '../../api/players'
import { Room } from '../../api/rooms'
import { ResponseError } from '../../types'

const { getPlayer, getTopPlayers } = apiPlayers

type AccountState = {
  isLoading: boolean;
  error: string | null;
  player: Player | null;
  topPlayers: Player[];
}

const initialState: AccountState = {
  isLoading: false,
  error: null,
  player: null,
  topPlayers: [],
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
    getTopPlayersSuccess(state, action: PayloadAction<Player[]>) {
      state.topPlayers = action.payload
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
  getTopPlayersSuccess,
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

export const fetchTopPlayers = (): AppThunk => async dispatch => {
  try {
    dispatch(playerActionStart())
    const topPlayers = await getTopPlayers()
    dispatch(getTopPlayersSuccess(topPlayers))
  } catch (error) {
    const errorData: ResponseError = error.response.data
    dispatch(playerActionFailure(errorData))
  }
}


export default slice
