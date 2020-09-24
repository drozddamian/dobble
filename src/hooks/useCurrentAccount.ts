import { SESSION_USER_ID } from '../constants'

interface HookResult {
  currentUserId: string;
  setUserSessionId: (id: string) => void;
  destroyUserSession: () => void;
}

export const useCurrentAccount = (): HookResult => {
  const currentUserId = sessionStorage.getItem(SESSION_USER_ID) || ''

  const setUserSessionId = (id: string): void => {
    sessionStorage.setItem(SESSION_USER_ID, id)
  }

  const destroyUserSession = (): void => {
    sessionStorage.removeItem(SESSION_USER_ID)
  }

  return {
    currentUserId,
    setUserSessionId,
    destroyUserSession,
  }
}
