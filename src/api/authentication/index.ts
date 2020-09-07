import axios from 'axios'
import { API_METHODS } from '../../constants/api'
import { Player } from '../players'


export interface LoginSuccess {
  player: Player;
  token: string;
}

export interface RegisterSuccess {
  player: Player;
}


const login = async (username: string, password: string) => {
  const { data } = await axios.post<LoginSuccess>(API_METHODS.LOGIN, { username, password })
  return data
}

const register = async (username: string, nick: string, password: string) => {
  const { data } = await axios.post<RegisterSuccess>(API_METHODS.REGISTER, {
    username,
    nick,
    password,
  })
  return data
}

const logout = async () => {
  const { data } = await axios.post<string>(API_METHODS.LOGOUT)
  return data
}


export default {
  login,
  register,
  logout,
}
