import axios from 'axios'
import { API_METHODS } from '../../constants/api'

export interface Account {
  id: string;
  username: string;
  password: string;
  nick: string;
  owningRooms: any[];
  joinedRooms: any[];
}

export interface LoginSuccess {
  player: Account;
  token: string;
}

export interface RegisterSuccess {
  player: Account;
}

export interface GetPlayerSuccess {
  player: Account;
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

const getAccountDetails = async (id: string) => {
  const url = `${API_METHODS.GET_PLAYER}${id}`
  const { data } = await axios.get<GetPlayerSuccess>(url)
  return data
}

export default {
  login,
  register,
  logout,
  getAccountDetails,
}
