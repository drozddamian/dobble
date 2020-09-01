import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../rootStore'
import { apiAccount } from '../../api'
import { LoginSuccess, RegisterSuccess, Account } from '../../api/account'
import { SESSION_USER_ID } from '../../constants'
import { useCurrentAccount } from '../../hooks'

const { setUserSessionId } = useCurrentAccount()
const { login, register, getAccountDetails } = apiAccount

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
    getAccountSuccess(state, action: PayloadAction<Account>) {
      state.accountData = action.payload
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
} = slice.actions


export const loginAccount = (username: string, password: string): AppThunk => async dispatch => {
  try {
    dispatch(accountActionStart())
    const loginResult = await login(username, password)
    const { player } = loginResult
    setUserSessionId(player.id)
    dispatch(loginSuccess(loginResult))
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
  } catch(error) {
    dispatch(accountActionFailure(error))
  }
}

export const fetchAccount = (username: string): AppThunk => async dispatch => {
  try {
    dispatch(accountActionStart())
    const playerData = await getAccountDetails(username)
    dispatch(getAccountSuccess(playerData))
  } catch (error) {
    dispatch(accountActionFailure(error))
  }
}


export default slice
