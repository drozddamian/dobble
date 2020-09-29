import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { equals } from 'ramda'
import { RouteComponentProps } from 'react-router-dom'
import { AppThunk } from '../rootStore'
import { apiRooms } from '../../api'
import { updatePlayerRoomList } from '../players'
import { displayNotification } from '../notification'
import ROUTES from '../../constants/routes'
import {
  NotificationType,
  ResponseError,
} from '../../types'
import {
  FetchRoomsSuccess,
  Room,
} from '../../api/rooms'


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
    dispatch(roomActionFailure(error))
  }
}

export const fetchRoomItem = (roomId: string): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    const roomItem = await getRoomItem(roomId)
    dispatch(fetchRoomDetailsSuccess(roomItem))
  } catch(error) {
    dispatch(roomActionFailure(error))
  }
}

export const fetchPopularRooms = (): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    const popularRooms = await getMostPopularRooms()
    dispatch(fetchMostPopularRoomsSuccess(popularRooms))
  } catch(error) {
    dispatch(roomActionFailure(error))
  }
}

export const deleteRoomItem = (roomId: string, history: RouteComponentProps): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    await deleteRoom(roomId)
    history.push(ROUTES.MAIN)
    dispatch(displayNotification(NotificationType.SUCCESS, 'Room deleted'))
  } catch(error) {
    const { message } = error as ResponseError
    dispatch(displayNotification(NotificationType.ERROR, message))
    dispatch(roomActionFailure(error))
  }
}

export const addPlayerToRoom = (roomId: string, playerId: string, history?: RouteComponentProps): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    await joinRoom(roomId, playerId)
    history.push(`/room/${roomId}`)
    dispatch(displayNotification(NotificationType.SUCCESS, 'You have joined the room'))
  } catch(error) {
    const { message } = error as ResponseError
    dispatch(displayNotification(NotificationType.ERROR, message))
    dispatch(roomActionFailure(error))
  }
}

export const removePlayerFromRoom = (roomId: string, playerId: string, history?: RouteComponentProps): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    await leaveRoom(roomId, playerId)
    history.push(ROUTES.MAIN)
    dispatch(displayNotification(NotificationType.SUCCESS, 'You have left the room'))
  } catch(error) {
    const { message } = error as ResponseError
    dispatch(displayNotification(NotificationType.ERROR, message))
    dispatch(roomActionFailure(error))
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
          const { message } = error as ResponseError
          closeModalCallback()
          dispatch(displayNotification(NotificationType.ERROR, message))
          dispatch(roomActionFailure(error))
        }
      }

export default slice
