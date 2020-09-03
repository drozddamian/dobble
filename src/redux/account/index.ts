import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../rootStore'
import { apiAccount } from '../../api'
import { LoginSuccess, RegisterSuccess, Account, GetPlayerSuccess } from '../../api/account'
import { useCurrentAccount } from '../../hooks'
import { displayNotification } from '../notification'
import { NotificationType } from '../../types'
import {Room} from "../../api/room";

const { setUserSessionId, destroyUserSession } = useCurrentAccount()
const { login, register, logout, getAccountDetails } = apiAccount

type AccountState = {
  token: string;
  isLoading: boolean;
  error: string | null;
  accountData: Account | null;
}

const initialState: AccountState = {
  token: '',
  isLoading: false,
  error: null,
  accountData: null,
}

const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    accountActionStart(state) {
      state.isLoading = true
      state.error = null
    },
    accountActionFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    loginSuccess(state, action: PayloadAction<LoginSuccess>) {
      const { player, token } = action.payload
      state.token = token
      state.accountData = player
      state.isLoading = false
      state.error = null
    },
    registerSuccess(state, action: PayloadAction<RegisterSuccess>) {
      const { player } = action.payload
      state.accountData = player
      state.isLoading = false
      state.error = null
    },
    getAccountSuccess(state, action: PayloadAction<GetPlayerSuccess>) {
      const { player } = action.payload
      state.accountData = player
      state.isLoading = false
      state.error = null
    },
    createNewRoomSuccess(state, action: PayloadAction<Room>) {
      const owningRooms = state.accountData?.owningRooms
      // @ts-ignore
      state.accountData.owningRooms = [...owningRooms, action.payload]
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  accountActionStart,
  accountActionFailure,
  loginSuccess,
  registerSuccess,
  getAccountSuccess,
  createNewRoomSuccess,
} = slice.actions


export const loginAccount = (username: string, password: string): AppThunk => async dispatch => {
  try {
    dispatch(accountActionStart())
    const loginResult = await login(username, password)
    const { player } = loginResult
    setUserSessionId(player.id)
    dispatch(loginSuccess(loginResult))
    //todo
    window.location.reload()
    dispatch(displayNotification(NotificationType.SUCCESS, 'Logged in successfully'))
  } catch(error) {
    const { data } = error.response
    dispatch(accountActionFailure(data))
  }
}

export const registerAccount = (username: string, nick: string, password: string): AppThunk => async dispatch => {
  try {
    dispatch(accountActionStart())
    const registerResult = await register(username, nick, password)
    const { player } = registerResult
    setUserSessionId(player.id)
    dispatch(registerSuccess(registerResult))
    dispatch(displayNotification(NotificationType.SUCCESS, "You've been registered successfully!"))
  } catch(error) {
    dispatch(accountActionFailure(error))
  }
}

export const logoutAccount = (): AppThunk => async dispatch => {
  try {
    dispatch(accountActionStart())
    await logout()
    destroyUserSession()
    dispatch(displayNotification(NotificationType.SUCCESS, "You've been logged out"))
  } catch(error) {
    dispatch(accountActionFailure(error))
  }
}

export const fetchAccount = (id: string): AppThunk => async dispatch => {
  try {
    dispatch(accountActionStart())
    const playerData = await getAccountDetails(id)
    dispatch(getAccountSuccess(playerData))
  } catch (error) {
    dispatch(accountActionFailure(error))
  }
}


export default slice
