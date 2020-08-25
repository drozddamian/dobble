import { createSlice } from '@reduxjs/toolkit'


type AccountState = {
  userInfo?: number;
}

const initialState: AccountState = {
  userInfo: 1,
}

const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountData(state, action): AccountState {
      return {
        ...initialState,
        ...action.payload,
      }
    },
  },
})

export const {
  setAccountData,
} = slice.actions

export default slice
