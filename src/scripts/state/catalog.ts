import { createSlice } from '@reduxjs/toolkit'

export interface CatalogState {
  records?: boolean[]
}

const initialState: CatalogState = {
  records: []
}

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    update(state, action) {
      state.records = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { update } = catalogSlice.actions

export default catalogSlice.reducer
