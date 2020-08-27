import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../rootStore'
import { apiRoom } from '../../api'
import { Room } from '../../api/room'

const { getRooms, getMostPopularRooms } = apiRoom

type RoomState = {
  isLoading: boolean;
  error: string | null;
  rooms: Room[] | [];
  mostPopularRooms: Room[] | [];
}

const initialState: RoomState = {
  isLoading: false,
  error: null,
  rooms: [],
  mostPopularRooms: [],
}

const slice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    roomActionStart(state) {
      state.isLoading = true
      state.error = null
    },
    roomActionFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    fetchRoomsSuccess(state, action: PayloadAction<Room[]>) {
      state.rooms = action.payload
      state.isLoading = false
      state.error = null
    },
    fetchMostPopularRoomsSuccess(state, action: PayloadAction<Room[]>) {
      state.mostPopularRooms = action.payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  roomActionStart,
  roomActionFailure,
  fetchRoomsSuccess,
  fetchMostPopularRoomsSuccess,
} = slice.actions

export const fetchRooms = (): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    const rooms = await getRooms()
    dispatch(fetchRoomsSuccess(rooms))
  } catch(error) {
    const { data } = error.response
    dispatch(roomActionFailure(data))
  }
}

export const fetchPopularRooms = (): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    const popularRooms = await getMostPopularRooms()
    dispatch(fetchMostPopularRoomsSuccess(popularRooms))
  } catch(error) {
    const { data } = error.response
    dispatch(roomActionFailure(data))
  }
}

export default slice
