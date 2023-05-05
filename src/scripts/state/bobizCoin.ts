import { createSlice } from '@reduxjs/toolkit'

export interface BobizCoinState {
  amount: number
}

const initialState: BobizCoinState = {
  amount: 100
}

export const bobizCoinSlice = createSlice({
  name: 'bobizCoin',
  initialState,
  reducers: {
    update(state, action) {
      state.amount = action.payload
    },
    add(state, action) {
      state.amount += action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { update, add } = bobizCoinSlice.actions

export default bobizCoinSlice.reducer
