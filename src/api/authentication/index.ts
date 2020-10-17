import axios from 'axios'
import { API_METHODS } from '../../constants/api'
import { Player } from '../players'


export interface AuthSuccess {
  player: Player;
  token: string;
}

const login = async (username: string, password: string): Promise<AuthSuccess> => {
  const { data } = await axios.post<AuthSuccess>(API_METHODS.LOGIN, { username, password })
  return data
}

const register = async (username: string, nick: string, password: string): Promise<AuthSuccess> => {
  const { data } = await axios.post<AuthSuccess>(API_METHODS.REGISTER, {
    username,
    nick,
    password,
  })
  return data
}

const logout = async (): Promise<string> => {
  const { data } = await axios.post<string>(API_METHODS.LOGOUT)
  return data
}


export default {
  login,
  register,
  logout,
}
