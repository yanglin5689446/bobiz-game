import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const create = createAsyncThunk('bobiz/create', async () => {
  // @todo: connect API
  return {
    id: Math.floor(Math.random() * 1e9).toString(),
    variant: Math.ceil(Math.random() * 3),
    absorbed: 0,
    capacity: 1000
  }
})

export const harvest = createAsyncThunk<{ id: string }, string>('bobiz/harvest', async id => {
  // @todo: connect API
  return {
    id
  }
})

interface BobizProperty {
  variant: number
  absorbed: number
  capacity: number
}

export interface BobizState {
  entities: Record<string, BobizProperty>
}

const initialState: BobizState = {
  entities: {}
}

export const bobizsSlice = createSlice({
  name: 'bobizs',
  initialState,
  reducers: {
    update(state, action) {
      return action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(create.fulfilled, (state, action) => {
      state.entities[action.payload.id] = {
        ...action.payload
      }
    })
    builder.addCase(harvest.fulfilled, (state, action) => {
      delete state.entities[action.payload.id]
    })
  }
})

// Action creators are generated for each case reducer function
export const { update } = bobizsSlice.actions

export default bobizsSlice.reducer
