import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_SERVER = process.env.API_SERVER

export const buy = createAsyncThunk<number, number>('seeds/buy', async (amount, { getState }) => {
  const state: any = getState()
  return fetch(`${API_SERVER}/users/${state.user.addr}/seeds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount
    })
  })
    .then(response => response.json())
    .then(res => Promise.resolve(res.data))
})

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
  },
  extraReducers: builder => {
    builder.addCase(buy.fulfilled, (state, action) => {
      state.amount = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { update } = seedsSlice.actions

export default seedsSlice.reducer
