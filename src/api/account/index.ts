import axios from 'axios'
import { API_METHODS } from '../../constants/api'

export interface Account {
  _id: string;
  username: string;
  nick: string;
  joinedRooms: any[];
  owningRooms: any[];
}

const getAccountDetails = async (username: string) => {
  const url = `${API_METHODS.GET_PLAYER}${username}`
  const { data } = await axios.get<Account>(url)
  return data
}

export default {
  getAccountDetails,
}
