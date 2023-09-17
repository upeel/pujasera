import { createSelector, createSlice } from '@reduxjs/toolkit'
import { ActionStatusAuth, InitialState } from './authSlice.type'

const initialState:InitialState = {
  statusAuth: 'not_signin'
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStatusAuth: (state, action:ActionStatusAuth) => {
      state.statusAuth = action.payload
    }
  }
})

export const getStatusAuthState = createSelector(
  (state:InitialState) => state.statusAuth,
  (statusAuth) => {
    return statusAuth
  }
)

// Action creators are generated for each case reducer function
export const { setStatusAuth } = authSlice.actions

export default authSlice.reducer
