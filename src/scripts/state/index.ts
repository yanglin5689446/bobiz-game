import { configureStore } from '@reduxjs/toolkit'
import bobizs from './bobizs'
import bobizCoin from './bobizCoin'
import container from './container'
import seeds from './seeds'
import user from './user'

export const store = configureStore({
  reducer: {
    user,
    bobizs,
    bobizCoin,
    container,
    seeds
  }
})

export const getState = (selector = state => state) => selector(store.getState())

export const dispatch = payload => store.dispatch(payload)
