import axios from 'axios'
import Cookies from 'js-cookie'
import { AUTH_HEADER, AUTH_TOKEN } from "../constants";

const instance = axios.create()

instance.interceptors.request.use((config) => {
  const token = Cookies.get(AUTH_TOKEN)

  if (token) {
    config.headers[AUTH_HEADER] =  token
  }
  return config
})

export default instance
