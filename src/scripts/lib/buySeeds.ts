import { dispatch, getState } from '../state'
import * as bobizCoinActions from '../state/bobizCoin'
import * as seedsActions from '../state/seeds'

const API_SERVER = process.env.API_SERVER

export default function buySeeds(amount) {
  const state: any = getState()

  if (state.bobizCoin.amount < amount * 5) return

  dispatch(seedsActions.update(state.seeds.amount + amount))
  dispatch(bobizCoinActions.add(amount * -5))

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
}
