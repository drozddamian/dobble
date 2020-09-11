import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { equals } from 'ramda'
import { AppThunk } from '../rootStore'
import { apiRooms } from '../../api'
import { FetchRoomsSuccess, Room } from '../../api/rooms'
import { updatePlayerRoomList } from '../players'
import { displayNotification } from '../notification'
import { NotificationType } from '../../types'
import { RouteComponentProps } from 'react-router-dom'
import ROUTES from '../../constants/routes'


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
    const { data } = error.response
    dispatch(roomActionFailure(data))
  }
}

export const fetchRoomItem = (roomId: string): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    const roomItem = await getRoomItem(roomId)
    dispatch(fetchRoomDetailsSuccess(roomItem[0]))
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

export const deleteRoomItem = (roomId: string, history: RouteComponentProps): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    await deleteRoom(roomId)
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

export const removePlayerFromRoom = (roomId: string, playerId: string, history: RouteComponentProps): AppThunk => async dispatch => {
  try {
    dispatch(roomActionStart())
    await leaveRoom(roomId, playerId)
    history.push(ROUTES.MAIN)
    dispatch(displayNotification(NotificationType.SUCCESS, 'You have left the room'))
  } catch(error) {
    const { data } = error.response
    dispatch(displayNotification(NotificationType.ERROR, data))
    dispatch(roomActionFailure(data))
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
          const { data } = error.response
          closeModalCallback()
          dispatch(displayNotification(NotificationType.ERROR, data))
          dispatch(roomActionFailure(data))
        }
      }

export default slice
