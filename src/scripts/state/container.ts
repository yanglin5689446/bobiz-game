import { createSlice } from '@reduxjs/toolkit'

export interface ContainerState {
  capacity: number
  volume: number
}

const initialState: ContainerState = {
  capacity: 100,
  volume: 100
}

export const containerSlice = createSlice({
  name: 'container',
  initialState,
  reducers: {
    updateVolume(state, action) {
      state.volume = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateVolume } = containerSlice.actions

export default containerSlice.reducer
