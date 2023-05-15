import { createSlice } from '@reduxjs/toolkit'

export interface SeedsState {
  amount: number
}

const initialState: SeedsState = {
  amount: 0
}

export const seedsSlice = createSlice({
  name: 'seeds',
  initialState,
  reducers: {
    update(state, action) {
      state.amount = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { update } = seedsSlice.actions

export default seedsSlice.reducer
