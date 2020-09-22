import axios from 'axios'
import { API_METHODS } from '../../constants/api'
import { Room } from '../rooms'
import { Player } from '../players'


export interface GameSession {
  _id: string;
  isGameInProcess: boolean;
  room: Room;
  players: Player[];
}

const getGameSession = async (sessionId: string) => {
  const URL = `${API_METHODS.GAME_SESSIONS_ROOT}/${sessionId}`
  const { data } = await axios.get<GameSession>(URL)
  return data
}

const joinGameSessionApi = async (sessionId: string, playerId: string) => {
  const { data } = await axios.post<GameSession>(API_METHODS.GAME_SESSIONS_ROOT, { sessionId, playerId })
  return data
}

export default {
  getGameSession,
  joinGameSessionApi,
}
