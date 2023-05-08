import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_SERVER = process.env.API_SERVER

export const create = createAsyncThunk('bobiz/create', async (_, { getState }) => {
  const state: any = getState()
  return fetch(`${API_SERVER}/users/${state.user.addr}/bobizs`, {
    method: 'POST'
  })
    .then(response => response.json())
    .then(res => Promise.resolve(res.data))
})

export const harvest = createAsyncThunk<string | undefined, string>('bobiz/harvest', async (id, { getState }) => {
  const state: any = getState()
  try {
    await fetch(`${API_SERVER}/users/${state.user.addr}/bobizs/${id}`, {
      method: 'POST'
    }).then(response => response.json())
  } catch (e) {
    return undefined
  }
  return id
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
      state.entities = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(create.fulfilled, (state, action) => {
      state.entities[action.payload.id] = {
        ...action.payload
      }
    })
    builder.addCase(harvest.fulfilled, (state, action) => {
      if (action.payload) delete state.entities[action.payload]
    })
  }
})

// Action creators are generated for each case reducer function
export const { update } = bobizsSlice.actions

export default bobizsSlice.reducer
