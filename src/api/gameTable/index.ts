import axios from 'axios'
import { API_METHODS } from '../../constants/api'
import { Room } from '../rooms'
import { Player } from '../players'


export interface GameTable {
  _id: string;
  isGameInProcess: boolean;
  room: Room;
  players: Player[];
}

const getGameTable = async (gameTableId: string) => {
  const URL = `${API_METHODS.GAME_TABLE_ROOT}/${gameTableId}`
  const { data } = await axios.get<GameTable>(URL)
  return data
}

const joinGameTableApi = async (sessionId: string, playerId: string) => {
  const { data } = await axios.post<GameTable>(API_METHODS.GAME_TABLE_ROOT, { sessionId, playerId })
  return data
}

export default {
  getGameTable,
  joinGameTableApi,
}
