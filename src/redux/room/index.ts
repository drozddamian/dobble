import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../rootStore'
import { apiRoom } from '../../api'
import { Room } from '../../api/room'
import { displayNotification } from '../notification'
import { NotificationType } from '../../types'
import ROUTES from '../../constants/routes'
import { RouteComponentProps } from 'react-router-dom'

const { getRooms, getMostPopularRooms, getRoomDetails, deleteRoomById, joinRoom, removePlayerFromRoom, addRoom } = apiRoom

type RoomState = {
  isLoading: boolean;
  error: string | null;
  rooms: Room[] | [];
  mostPopularRooms: Room[] | [];
  roomDetails: Room | null;
}

const initialState: RoomState = {
  isLoading: false,
  error: null,
  rooms: [],
  mostPopularRooms: [],
  roomDetails: null,
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
    fetchRoomDetailsSuccess(state, action: PayloadAction<Room>) {
      state.roomDetails = action.payload
      state.isLoading = false
      state.error = null
    }
  },
})

export const {
  roomActionStart,
  roomActionFailure,
  fetchRoomsSuccess,
  fetchMostPopularRoomsSuccess,
  fetchRoomDetailsSuccess,
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

export const fetchRoomDetails = (roomId: string): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    const roomDetails = await getRoomDetails(roomId)
    dispatch(fetchRoomDetailsSuccess(roomDetails[0]))
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

export const deleteRoom = (roomId: string, history: RouteComponentProps): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    await deleteRoomById(roomId)
    history.push(ROUTES.MAIN)
    dispatch(displayNotification(NotificationType.SUCCESS, 'Room deleted'))
  } catch(error) {
    const { data } = error.response
    dispatch(displayNotification(NotificationType.ERROR, "Sorry, we couldn't remove the room"))
    dispatch(roomActionFailure(data))
  }
}

export const addPlayerToRoom = (roomId: string, playerId: string, history: RouteComponentProps): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    await joinRoom(roomId, playerId)
    history.push(`/room/${roomId}`)
    dispatch(displayNotification(NotificationType.SUCCESS, 'You have joined the room'))
  } catch(error) {
    const { data } = error.response
    dispatch(displayNotification(NotificationType.ERROR, data))
    dispatch(roomActionFailure(data))
  }
}

export const leaveRoom = (roomId: string, playerId: string, history: RouteComponentProps): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    await removePlayerFromRoom(roomId, playerId)
    history.push(ROUTES.MAIN)
    dispatch(displayNotification(NotificationType.SUCCESS, 'You have left the room'))
  } catch(error) {
    const { data } = error.response
    dispatch(displayNotification(NotificationType.ERROR, data))
    dispatch(roomActionFailure(data))
  }
}

export const createRoom = (ownerId: string, name: string, avaiableSeats: number): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    await addRoom(ownerId, name, avaiableSeats)
    dispatch(displayNotification(NotificationType.SUCCESS, 'Room successfully created'))
  } catch(error) {
    const { data } = error.response
    dispatch(displayNotification(NotificationType.ERROR, data))
    dispatch(roomActionFailure(data))
  }
}

export default slice
