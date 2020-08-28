import axios from 'axios'
import { API_METHODS } from '../../constants/api'

export interface Account {
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

const getAccountDetails = async (username: string) => {
  const url = `${API_METHODS.GET_PLAYER}${username}`
  const { data } = await axios.get<Account>(url)
  return data
}

export default {
  login,
  register,
  getAccountDetails,
}
