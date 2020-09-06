import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isNil } from 'ramda'
import { AppThunk } from '../rootStore'
import { apiAuthentication, apiPlayers } from '../../api'
import { Room } from '../../api/rooms'
import { LoginSuccess, RegisterSuccess } from '../../api/authentication'
import { Player, GetPlayerSuccess } from '../../api/players'
import { useCurrentAccount } from '../../hooks'
import { displayNotification } from '../notification'
import { NotificationType } from '../../types'


const { setUserSessionId, destroyUserSession } = useCurrentAccount()
const { getPlayer } = apiPlayers
const { login, register, logout } = apiAuthentication

type AccountState = {
  token: string;
  isLoading: boolean;
  error: string | null;
  player: Player | null;
}

const initialState: AccountState = {
  token: '',
  isLoading: false,
  error: null,
  player: null,
}

const slice = createSlice({
  name: 'players',
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
      state.player = player
      state.isLoading = false
      state.error = null
    },
    registerSuccess(state, action: PayloadAction<RegisterSuccess>) {
      const { player } = action.payload
      state.player = player
      state.isLoading = false
      state.error = null
    },
    getAccountSuccess(state, action: PayloadAction<GetPlayerSuccess>) {
      const { player } = action.payload
      state.player = player
      state.isLoading = false
      state.error = null
    },
    createNewRoomSuccess(state, action: PayloadAction<Room>) {
      if (isNil(state.player)) {
        return
      }
      const owningRooms = state.player.owningRooms
      state.player.owningRooms = [...owningRooms, action.payload]
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
    setUserSessionId(player._id)
    dispatch(loginSuccess(loginResult))
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
    setUserSessionId(player._id)
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
    const playerData = await getPlayer(id)
    dispatch(getAccountSuccess(playerData))
  } catch (error) {
    dispatch(accountActionFailure(error))
  }
}


export default slice
