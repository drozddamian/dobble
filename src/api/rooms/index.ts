import axios from '../../helpers/axios'
import { API_METHODS } from '../../constants/api'
import { Player } from '../players'

export interface Room {
  name: string;
  players: string[] | Player[];
  createdAt: string;
  _id: string;
  owner: Player;
  gameTable: string;
  availableSeats: 2 | 3 | 4 | 5 | 6;
  howManyPlayers: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface FetchRoomsSuccess {
  rooms: Room[];
  chunkNumber: number;
  howManyChunks: number;
}

const getRooms = async (chunkNumber: number): Promise<FetchRoomsSuccess> => {
  const url = `${API_METHODS.ROOMS_ROOT}?chunkNumber=${chunkNumber}`
  const { data } = await axios.get<FetchRoomsSuccess>(url)
  return data
}

const getRoomItem = async (roomId: string): Promise<Room> => {
  const url = `${API_METHODS.ROOMS_ROOT}/${roomId}`
  const { data } = await axios.get<Room>(url)
  return data
}

const createRoom = async (ownerId: string, name: string, availableSeats: number): Promise<Room> => {
  const { data } = await axios.post<Room>(API_METHODS.ROOMS_ROOT, {
    ownerId,
    name,
    availableSeats,
  })
  return data
}

const deleteRoom = async (roomId: string): Promise<Room> => {
  const url = `${API_METHODS.ROOMS_ROOT}/${roomId}`
  const { data } = await axios.delete<Room>(url)
  return data
}

const getMostPopularRooms = async (): Promise<Room[]> => {
  const { data } = await axios.get<Room[]>(API_METHODS.GET_MOST_POPULAR_ROOMS)
  return data
}

const joinRoom = async (roomId: string, playerId: string): Promise<Player> => {
  const { data } = await axios.post<Player>(API_METHODS.JOIN_ROOM, {
    roomId,
    playerId,
  })
  return data
}

const leaveRoom = async (roomId: string, playerId: string): Promise<Player> => {
  const { data } = await axios.post<Player>(API_METHODS.LEAVE_ROOM, {
    roomId,
    playerId,
  })
  return data
}


export default {
  getRooms,
  getRoomItem,
  createRoom,
  deleteRoom,
  getMostPopularRooms,
  joinRoom,
  leaveRoom,
}
