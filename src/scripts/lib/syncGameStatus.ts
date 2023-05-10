import { dispatch, getState } from '../state'
import * as bobizCoinActions from '../state/bobizCoin'
import * as bobizsActions from '../state/bobizs'
import * as seedsActions from '../state/seeds'
import * as catalogActions from '../state/catalog'

const API_SERVER = process.env.API_SERVER

export default async function () {
  const state = getState()
  let user = await fetch(`${API_SERVER}/users/${state.user.addr}`).then(response => response.json())
  if (!user?.data)
    user = await fetch(`${API_SERVER}/users/${state.user.addr}`, { method: 'POST' }).then(response => response.json())
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
  // dispatch(containerActions.updateVolume(state.container.volume))
}
