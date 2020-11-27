import axios from '../../helpers/axios'
import { API_METHODS } from '../../constants/api'
import { Room } from '../rooms'
import { WinGame } from '../../types'


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
  winGames: WinGame[];
}

export interface GetPlayerSuccess {
  player: Player;
}

const getPlayer = async (id: string): Promise<GetPlayerSuccess> => {
  const url = `${API_METHODS.PLAYERS_ROOT}/${id}`
  const { data } = await axios.get<GetPlayerSuccess>(url)
  return data
}

const getTopPlayers = async (): Promise<Player[]> => {
  const url = `${API_METHODS.GET_TOP_PLAYERS}`
  const { data } = await axios.get<Player[]>(url)
  return data
}

export default {
  getPlayer,
  getTopPlayers,
}
