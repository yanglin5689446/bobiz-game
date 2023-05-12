import { dispatch, getState } from '../state'
import * as bobizCoinActions from '../state/bobizCoin'
import * as bobizsActions from '../state/bobizs'
import * as seedsActions from '../state/seeds'
import * as catalogActions from '../state/catalog'

const API_SERVER = process.env.API_SERVER

export default async function () {
  const state = getState()
  const { created, harvested } = state.bobizs
  const user = await fetch(`${API_SERVER}/users/${state.user.addr}/status`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ bobizs: { harvested, created } })
  }).then(response => response.json())

  dispatch(bobizsActions.resetDelta())
  dispatch(
    bobizsActions.update(
      user.data.bobizs.reduce((result, current) => {
        result[current.id] = current
        return result
      }, {})
    )
  )
  dispatch(seedsActions.update(user.data.seeds))
  dispatch(bobizCoinActions.update(user.data.bobizCoin))
  dispatch(catalogActions.update(user.data.harvested))
  // @todo: update container status
  // dispatch(containerActions.updateVolume(state.container.volume))
}
