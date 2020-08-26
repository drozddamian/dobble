import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../rootStore'
import { apiAccount } from '../../api'
import { Account } from '../../api/account'

const { getAccountDetails } = apiAccount

type AccountState = {
  isLoading: boolean;
  error: string | null;
  userInfo: Account | null;
}

const initialState: AccountState = {
  isLoading: false,
  error: null,
  userInfo: null,
}

const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    getAccountStart(state) {
      state.isLoading = true
      state.error = null
    },
    getAccountSuccess(state, action: PayloadAction<Account>) {
      state.userInfo = action.payload
      state.isLoading = false
      state.error = null
    },
    getAccountFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    }
  },
})

export const {
  getAccountStart,
  getAccountSuccess,
  getAccountFailure,
} = slice.actions


export const fetchAccount = (username: string): AppThunk => async dispatch => {
  try {
    dispatch(getAccountStart())
    const userData = await getAccountDetails(username)
    dispatch(getAccountSuccess(userData))
  } catch (error) {
    dispatch(getAccountFailure(error))
  }
}


export default slice
