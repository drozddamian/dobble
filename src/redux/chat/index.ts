import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Message, NotificationType, ResponseError } from '../../types'
import { AppThunk } from '../rootStore'
import { apiChat } from '../../api'
import { GetMessagesSuccess } from '../../api/chat'
import { displayNotification } from '../notification'

const { getMessages } = apiChat

type ChatState = {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
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
    chatLoadAllSuccess(state, action: PayloadAction<GetMessagesSuccess>) {
      state.messages = action.payload.messages
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
  chatLoadAllSuccess,
  addNewMessage,
} = slice.actions

export const fetchMessages = (): AppThunk => async (dispatch) => {
  try {
    dispatch(chatActionStart())
    const messages = await getMessages()
    dispatch(chatLoadAllSuccess(messages))
  } catch(error) {
    const errorData: ResponseError = error.response?.data
    dispatch(catActionFailure(errorData))
    dispatch(displayNotification(NotificationType.ERROR, "Unable to load chat messages."))
  }
}

export default slice