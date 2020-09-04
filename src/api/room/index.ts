import axios from 'axios'
import { API_METHODS } from '../../constants/api'

export interface Room {
  name: string;
  players: string[] | Account[];
  createdAt: string;
  _id: string;
  owner: Account;
  availableSeats: 2 | 3 | 4 | 5 | 6;
  howManyPlayers: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface FetchRoomsSuccess {
  rooms: Room[];
  chunkNumber: number;
  howManyChunks: number;
}

const getRooms = async (chunkNumber: number) => {
  const url = `${API_METHODS.GET_ROOMS}?chunkNumber=${chunkNumber}`
  const { data } = await axios.get<FetchRoomsSuccess>(url)
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

const deleteRoomById = async (roomId: string) => {
  const url = `${API_METHODS.DELETE_ROOM}${roomId}`
  return await axios.delete(url)
}

const joinRoom = async (roomId: string, playerId: string) => {
  const { data } = await axios.post<string>(API_METHODS.JOIN_ROOM, {
    roomId,
    playerId,
  })
  return data
}

const removePlayerFromRoom = async (roomId: string, playerId: string) => {
  const { data } = await axios.post<string>(API_METHODS.LEAVE_ROOM, {
    roomId,
    playerId,
  })
  return data
}

const addRoom = async (ownerId: string, name: string, availableSeats: number) => {
  const { data } = await axios.post<Room>(API_METHODS.CREATE_ROOM, {
    ownerId,
    name,
    availableSeats,
  })
  return data
}

export default {
  getRooms,
  getRoomDetails,
  getMostPopularRooms,
  deleteRoomById,
  joinRoom,
  removePlayerFromRoom,
  addRoom,
}
