import { createSlice } from '@reduxjs/toolkit'

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
    },
    create(state, action) {
      state.entities[action.payload.id] = action.payload
    },
    remove(state, action) {
      delete state.entities[action.payload]
    }
  }
})

// Action creators are generated for each case reducer function
export const { update, remove, create } = bobizsSlice.actions

export default bobizsSlice.reducer
