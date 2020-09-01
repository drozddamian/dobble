import { SESSION_USER_ID } from '../constants'

interface HookResult {
  currentUserId: string | null;
  setUserSessionId: (id: string) => void;
}

export const useCurrentAccount = (): HookResult => {
  const currentUserId = sessionStorage.getItem(SESSION_USER_ID)

  const setUserSessionId = (id: string): void => {
    sessionStorage.setItem(SESSION_USER_ID, id)
  }

  return {
    currentUserId,
    setUserSessionId,
  }
}
