import Cookies from 'js-cookie'
import {
  AUTH_TOKEN,
  SESSION_USER_ID,
} from '../constants'

interface HookResult {
  currentUserId: string;
  setUserData: (token: string, id: string) => void;
  destroyUserSession: () => void;
}

export const useCurrentAccount = (): HookResult => {
  const currentUserId = sessionStorage.getItem(SESSION_USER_ID) || ''

  const setUserData = (token: string, id: string): void => {
    sessionStorage.setItem(SESSION_USER_ID, id)

    if (token) {
      Cookies.set(AUTH_TOKEN, token)
    }
  }

  const destroyUserSession = (): void => {
    Cookies.remove(AUTH_TOKEN)
    sessionStorage.removeItem(SESSION_USER_ID)
  }

  return {
    currentUserId,
    setUserData,
    destroyUserSession,
  }
}
