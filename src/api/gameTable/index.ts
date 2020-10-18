import axios from '../../helpers/axios'
import { API_METHODS } from '../../constants/api'
import { Room } from '../rooms'
import { Player } from '../players'


export interface GameTable {
  _id: string;
  isGameInProcess: boolean;
  room: Room;
  players: Player[];
}

const getGameTable = async (gameTableId: string): Promise<GameTable> => {
  const URL = `${API_METHODS.GAME_TABLE_ROOT}/${gameTableId}`
  const { data } = await axios.get<GameTable>(URL)
  return data
}

const joinGameTableApi = async (tableId: string, playerId: string): Promise<GameTable> => {
  const { data } = await axios.post<GameTable>(API_METHODS.GAME_TABLE_ROOT, { tableId, playerId })
  return data
}

export default {
  getGameTable,
  joinGameTableApi,
}
