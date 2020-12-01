import axios from '../../helpers/axios'
import { API_METHODS } from '../../constants/api'
import { Message } from '../../types'
import { PaginatedData } from '../../types'

const getMessages = async (chunkNumber: number): Promise<PaginatedData<Message>> => {
  const url = `${API_METHODS.CHAT_ROOT}?chunkNumber=${chunkNumber}`
  const { data } = await axios.get<PaginatedData<Message>>(url)
  return data
}

export default {
  getMessages,
}