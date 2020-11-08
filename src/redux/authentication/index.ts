import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../rootStore'
import { apiAuthentication } from '../../api'
import { Player } from "../../api/players";
import { useCurrentAccount } from '../../hooks'
import { displayNotification } from '../notification'
import { setCurrentPlayer } from '../players'
import {
  NotificationType,
  ResponseError,
} from '../../types'


const { setUserData, destroyUserSession } = useCurrentAccount()
const { login, register, logout } = apiAuthentication

type AccountState = {
  userId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  userId: null,
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
    authenticationActionFailure(state, action: PayloadAction<ResponseError>) {
      const { message } = action.payload
      state.isLoading = false
      state.error = message
    },
    authSuccess(state, action: PayloadAction<Player>) {
      const { _id } = action.payload
      state.userId = _id
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  authenticationActionStart,
  authenticationActionFailure,
  authSuccess,
} = slice.actions


export const loginAccount =
    (username: string, password: string): AppThunk => async (dispatch) => {
      try {
        dispatch(authenticationActionStart())

        const loginResult = await login(username, password)
        const { player, token } = loginResult

        dispatch(setCurrentPlayer(player))
        setUserData(token, player._id)

        dispatch(authSuccess(player))
        window.location.reload()
        dispatch(displayNotification(NotificationType.SUCCESS, 'Logged in successfully'))
      } catch(error) {
        const errorData: ResponseError = error.response.data
        dispatch(authenticationActionFailure(errorData))
      }
    }

export const registerAccount =
    (username: string, nick: string, password: string): AppThunk => async (dispatch) => {
      try {
        dispatch(authenticationActionStart())

        const registerResult = await register(username, nick, password)
        const { player, token } = registerResult

        dispatch(setCurrentPlayer(player))
        setUserData(token, player._id)

        dispatch(authSuccess(player))
        window.location.reload()
        dispatch(displayNotification(NotificationType.SUCCESS, "You've been registered successfully!"))
      } catch(error) {
        const errorData: ResponseError = error.response.data
        dispatch(authenticationActionFailure(errorData))
      }
    }

export const logoutAccount = (): AppThunk => async dispatch => {
  try {
    dispatch(authenticationActionStart())
    await logout()
    destroyUserSession()
    window.location.reload()
    dispatch(displayNotification(NotificationType.SUCCESS, "You've been logged out"))
  } catch(error) {
    const errorData: ResponseError = error.response.data
    dispatch(authenticationActionFailure(errorData))
    dispatch(displayNotification(NotificationType.ERROR, "Logging out failed."))
  }
}

export default slice
