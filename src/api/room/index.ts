import axios from 'axios'
import { API_METHODS } from '../../constants/api'
import { Account } from '../account'

export interface Room {
  name: string;
  players: string[] | Account[];
  createdAt: string;
  _id: string;
  owner: Account;
  availableSeats: 2 | 3 | 4 | 5 | 6;
  howManyPlayers: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const getRooms = async () => {
  const { data } = await axios.get<Room[]>(API_METHODS.GET_ROOMS)
  return data
}

const getRoomDetails = async (roomId: string) => {
  const url = `${API_METHODS.GET_ROOM}${roomId}`
  const { data } = await axios.get<Room>(url)
  return data
}

const getMostPopularRooms = async () => {
  const { data } = await axios.get<Room[]>(API_METHODS.GET_MOST_POPULAR_ROOMS)
  return data
}

export default {
  getRooms,
  getRoomDetails,
  getMostPopularRooms,
}
