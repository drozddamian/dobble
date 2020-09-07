import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../rootStore'
import { apiAuthentication } from '../../api'
import { LoginSuccess } from '../../api/authentication'
import { useCurrentAccount } from '../../hooks'
import { displayNotification } from '../notification'
import { NotificationType } from '../../types'
import { setCurrentPlayer } from '../players'


const { setUserSessionId, destroyUserSession } = useCurrentAccount()
const { login, register, logout } = apiAuthentication

type AccountState = {
  token: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  token: '',
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authenticationActionStart(state) {
      state.isLoading = true
      state.error = null
    },
    authenticationActionFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    loginSuccess(state, action: PayloadAction<LoginSuccess>) {
      const { token } = action.payload
      state.token = token
      state.isLoading = false
      state.error = null
    },
    registerSuccess(state) {
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  authenticationActionStart,
  authenticationActionFailure,
  loginSuccess,
  registerSuccess,
} = slice.actions


export const loginAccount =
    (username: string, password: string): AppThunk => async (dispatch) => {
      try {
        dispatch(authenticationActionStart())

        const loginResult = await login(username, password)
        const { player } = loginResult

        dispatch(setCurrentPlayer(player))
        setUserSessionId(player._id)

        dispatch(loginSuccess(loginResult))
        window.location.reload()
        dispatch(displayNotification(NotificationType.SUCCESS, 'Logged in successfully'))
      } catch(error) {
        const { data } = error.response
        dispatch(authenticationActionFailure(data))
      }
    }

export const registerAccount =
    (username: string, nick: string, password: string): AppThunk => async (dispatch) => {
      try {
        dispatch(authenticationActionStart())

        const registerResult = await register(username, nick, password)
        const { player } = registerResult

        dispatch(setCurrentPlayer(player))
        setUserSessionId(player._id)

        dispatch(registerSuccess())
        window.location.reload()
        dispatch(displayNotification(NotificationType.SUCCESS, "You've been registered successfully!"))
      } catch(error) {
        dispatch(authenticationActionFailure(error))
      }
    }

export const logoutAccount = (): AppThunk => async dispatch => {
  try {
    dispatch(authenticationActionStart())
    await logout()
    destroyUserSession()
    dispatch(displayNotification(NotificationType.SUCCESS, "You've been logged out"))
  } catch(error) {
    dispatch(authenticationActionFailure(error))
  }
}

export default slice
