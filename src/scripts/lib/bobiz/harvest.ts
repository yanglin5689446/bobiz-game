import { dispatch, store } from '../../state'
import { remove } from '../../state/bobizs'
import syncGameStatus from '../syncGameStatus'

const API_SERVER = process.env.API_SERVER

export default function harvest(id) {
  const state: any = store.getState()
  dispatch(remove(id))
  fetch(`${API_SERVER}/users/${state.user.addr}/bobizs/${id}/harvest`, {
    method: 'POST'
  })
    .then(response => response.json())
    .then(() => {
      syncGameStatus()
    })
}
