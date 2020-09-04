import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../rootStore'
import { apiRoom } from '../../api'
import { FetchRoomsSuccess, Room } from '../../api/room'
import { displayNotification } from '../notification'
import { NotificationType } from '../../types'
import ROUTES from '../../constants/routes'
import { RouteComponentProps } from 'react-router-dom'
import { createNewRoomSuccess } from '../account'
import {equals} from "ramda";

const { getRooms, getMostPopularRooms, getRoomDetails, deleteRoomById, joinRoom, removePlayerFromRoom, addRoom } = apiRoom

type RoomState = {
  isLoading: boolean;
  error: string | null;
  rooms: Room[] | [];
  currentPaginationChunk: number;
  paginationHasMore: boolean;
  mostPopularRooms: Room[] | [];
  roomDetails: Room | null;
}

const initialState: RoomState = {
  isLoading: false,
  error: null,
  rooms: [],
  currentPaginationChunk: 1,
  paginationHasMore: true,
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
    fetchRoomsSuccess(state, action: PayloadAction<FetchRoomsSuccess>) {
      const { rooms, chunkNumber, howManyChunks } = action.payload
      const currentChunk = chunkNumber + 1
      const paginationHasMore = !equals(chunkNumber, howManyChunks)

      state.rooms = [...state.rooms, ...rooms]
      state.currentPaginationChunk = currentChunk
      state.paginationHasMore = paginationHasMore
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
    },
  },
})

export const {
  roomActionStart,
  roomActionFailure,
  fetchRoomsSuccess,
  fetchMostPopularRoomsSuccess,
  fetchRoomDetailsSuccess,
} = slice.actions

export const fetchRooms = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(roomActionStart())

    const { room: { currentPaginationChunk } } = getState()
    const paginationRequestResult = await getRooms(currentPaginationChunk)

    dispatch(fetchRoomsSuccess(paginationRequestResult))
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

export const createRoom = (ownerId: string, name: string, availableSeats: number, closeModalCallback: () => void): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    const createdRoom = await addRoom(ownerId, name, availableSeats)
    await dispatch(createNewRoomSuccess(createdRoom))
    closeModalCallback()
    dispatch(displayNotification(NotificationType.SUCCESS, 'Room successfully created'))
  } catch(error) {
    const { data } = error.response
    closeModalCallback()
    dispatch(displayNotification(NotificationType.ERROR, data))
    dispatch(roomActionFailure(data))
  }
}

export default slice
