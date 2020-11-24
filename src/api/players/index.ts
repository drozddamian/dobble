import axios from '../../helpers/axios'
import { API_METHODS } from '../../constants/api'
import { Room } from '../rooms'


export interface Player {
  token: string;
  _id: string;
  username: string;
  password: string;
  nick: string;
  level: number;
  percentToNextLevel: number;
  experience: number;
  experienceToNextLevel: number;
  owningRooms: Room[];
  joinedRooms: Room[];
  durationsOfWin: string[];
}

export interface GetPlayerSuccess {
  player: Player;
}

const getPlayer = async (id: string): Promise<GetPlayerSuccess> => {
  const url = `${API_METHODS.PLAYERS_ROOT}/${id}`
  const { data } = await axios.get<GetPlayerSuccess>(url)
  return data
}

export default {
  getPlayer,
}
