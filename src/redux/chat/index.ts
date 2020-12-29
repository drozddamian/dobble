import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Message, NotificationType, PaginatedData, ResponseError } from '../../types'
import { AppThunk } from '../rootStore'
import { apiChat } from '../../api'
import { displayNotification } from '../notification'
import {equals} from "ramda";

const { getMessages } = apiChat

type ChatState = {
  messages: Message[];
  currentPaginationChunk: number;
  paginationHasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  currentPaginationChunk: 1,
  paginationHasMore: true,
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    chatActionStart(state) {
      state.isLoading = true
      state.error = null
    },
    catActionFailure(state, action: PayloadAction<ResponseError>) {
      const { message } = action.payload
      state.isLoading = false
      state.error = message
    },
    chatLoadSuccess(state, action: PayloadAction<PaginatedData<Message>>) {
      const { data, chunkNumber, howManyChunks } = action.payload
      const currentChunk = chunkNumber + 1
      const paginationHasMore = !equals(chunkNumber, howManyChunks)

      state.messages = chunkNumber === 1
        ? [...state.messages, ...data].reverse()
        : [...data.reverse(), ...state.messages]
      state.currentPaginationChunk = currentChunk
      state.paginationHasMore = paginationHasMore
      state.isLoading = false
      state.error = null
    },
    addNewMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload)
    }
  },
})

export const {
  chatActionStart,
  catActionFailure,
  chatLoadSuccess,
  addNewMessage,
} = slice.actions

export const fetchMessages = (chunkNumber: number): AppThunk => async (dispatch) => {
  try {
    dispatch(chatActionStart())
    const messages = await getMessages(chunkNumber)
    dispatch(chatLoadSuccess(messages))
  } catch(error) {
    const errorData: ResponseError = error.response?.data
    dispatch(catActionFailure(errorData))
    dispatch(displayNotification(NotificationType.ERROR, "Unable to load chat messages."))
  }
}

export default slice