import { createSlice } from '@reduxjs/toolkit'

interface BobizProperty {
  variant: number
  absorbed: number
  capacity: number
}

export interface BobizState {
  entities: Record<string, BobizProperty>
  harvested: string[]
  created: string[]
}

const initialState: BobizState = {
  entities: {},
  harvested: [],
  created: []
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
      state.created.push(action.payload.id)
    },
    harvest(state, action) {
      delete state.entities[action.payload]
      state.harvested.push(action.payload)
    },
    resetDelta(state) {
      state.harvested = []
      state.created = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { update, harvest, create, resetDelta } = bobizsSlice.actions

export default bobizsSlice.reducer
