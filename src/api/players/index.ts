import axios from 'axios'
import { API_METHODS } from '../../constants/api'
import { Room } from '../rooms'


export interface Player {
  _id: string;
  username: string;
  password: string;
  nick: string;
  owningRooms: Room[];
  joinedRooms: Room[];
}

export interface GetPlayerSuccess {
  player: Player;
}

const getPlayer = async (id: string) => {
  const url = `${API_METHODS.PLAYERS_ROOT}/${id}`
  const { data } = await axios.get<GetPlayerSuccess>(url)
  return data
}

export default {
  getPlayer,
}
