import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { equals } from 'ramda'
import { AppThunk } from '../rootStore'
import { apiRooms } from '../../api'
import { updatePlayerRoomList } from '../players'
import { displayNotification } from '../notification'
import ROUTES from '../../constants/routes'
import history from '../../helpers/history'
import { Room } from '../../api/rooms'
import {
  NotificationType, PaginatedData,
  ResponseError,
} from '../../types'


const { getRooms, getRoomItem, createRoom, deleteRoom, getMostPopularRooms, joinRoom, leaveRoom } = apiRooms

type RoomState = {
  isLoading: boolean;
  error: string | null;
  rooms: Room[] | [];
  currentPaginationChunk: number;
  paginationHasMore: boolean;
  mostPopularRooms: Room[] | [];
  roomItem: Room | null;
}

const initialState: RoomState = {
  isLoading: false,
  error: null,
  rooms: [],
  currentPaginationChunk: 1,
  paginationHasMore: true,
  mostPopularRooms: [],
  roomItem: null,
}

const slice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    roomActionStart(state) {
      state.isLoading = true
      state.error = null
    },
    roomActionFailure(state, action: PayloadAction<ResponseError>) {
      const { message } = action.payload
      state.isLoading = false
      state.error = message
    },
    fetchRoomsSuccess(state, action: PayloadAction<PaginatedData<Room>>) {
      const { data, chunkNumber, howManyChunks } = action.payload
      const currentChunk = chunkNumber + 1
      const paginationHasMore = !equals(chunkNumber, howManyChunks)

      state.rooms = [...state.rooms, ...data]
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
      state.roomItem = action.payload
      state.isLoading = false
      state.error = null
    },
    createNewRoomSuccess(state, action: PayloadAction<Room>) {
      state.rooms = [...state.rooms, action.payload]
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
  createNewRoomSuccess,
} = slice.actions

export const fetchRooms = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(roomActionStart())

    const { rooms: { currentPaginationChunk } } = getState()
    const paginationRequestResult = await getRooms(currentPaginationChunk)

    dispatch(fetchRoomsSuccess(paginationRequestResult))
  } catch(error) {
    const errorData: ResponseError = error.response.data
    dispatch(roomActionFailure(errorData))
  }
}

export const fetchRoomItem = (roomId: string): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    const roomItem = await getRoomItem(roomId)
    dispatch(fetchRoomDetailsSuccess(roomItem))
  } catch(error) {
    const errorData: ResponseError = error.response.data
    dispatch(roomActionFailure(errorData))
  }
}

export const fetchPopularRooms = (): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    const popularRooms = await getMostPopularRooms()
    dispatch(fetchMostPopularRoomsSuccess(popularRooms))
  } catch(error) {
    const errorData: ResponseError = error.response.data
    dispatch(roomActionFailure(errorData))
  }
}

export const deleteRoomItem = (roomId: string): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    await deleteRoom(roomId)
    history.push(ROUTES.MAIN)
    dispatch(displayNotification(NotificationType.SUCCESS, 'Room deleted'))
  } catch(error) {
    const errorData: ResponseError = error.response.data
    const { message } = errorData

    dispatch(displayNotification(NotificationType.ERROR, message))
    dispatch(roomActionFailure(errorData))
  }
}

export const addPlayerToRoom = (roomId: string, playerId: string): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    await joinRoom(roomId, playerId)
    history.go(0)
    dispatch(displayNotification(NotificationType.SUCCESS, 'You have joined the room'))
  } catch(error) {
    const errorData: ResponseError = error.response.data
    const { message } = errorData

    dispatch(displayNotification(NotificationType.ERROR, message))
    dispatch(roomActionFailure(errorData))
  }
}

export const removePlayerFromRoom = (roomId: string, playerId: string): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    await leaveRoom(roomId, playerId)
    history.push(ROUTES.MAIN)
    dispatch(displayNotification(NotificationType.SUCCESS, 'You have left the room'))
  } catch(error) {
    const errorData: ResponseError = error.response.data
    const { message } = errorData

    dispatch(displayNotification(NotificationType.ERROR, message))
    dispatch(roomActionFailure(errorData))
  }
}

export const newRoom =
    (ownerId: string, name: string, availableSeats: number, closeModalCallback: () => void): AppThunk =>
      async (dispatch) => {
        try {
          dispatch(roomActionStart())

          const createdRoom = await createRoom(ownerId, name, availableSeats)
          updatePlayerRoomList(createdRoom)

          await dispatch(createNewRoomSuccess(createdRoom))
          closeModalCallback()
          dispatch(displayNotification(NotificationType.SUCCESS, 'Room successfully created'))
        } catch(error) {
          const errorData: ResponseError = error.response.data
          const { message } = errorData

          closeModalCallback()
          dispatch(displayNotification(NotificationType.ERROR, message))
          dispatch(roomActionFailure(errorData))
        }
      }

export default slice
