import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
  addr?: string
}

const initialState: UserState = {
  addr: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { set } = userSlice.actions

export default userSlice.reducer
