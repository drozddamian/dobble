import axios from '../../helpers/axios'
import { API_METHODS } from '../../constants/api'
import { Message } from '../../types'

export type GetMessagesSuccess = {
  messages: Message[]
}

const getMessages = async (): Promise<GetMessagesSuccess> => {
  const url = `${API_METHODS.CHAT_ROOT}`
  const { data } = await axios.get<GetMessagesSuccess>(url)
  return data
}

export default {
  getMessages,
}