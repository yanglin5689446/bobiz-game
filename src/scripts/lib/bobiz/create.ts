import uuid from 'react-uuid'
import Bobiz from '../../objects/game/bobiz'
import { dispatch, store } from '../../state'
import { update } from '../../state/seeds'
import { remove, create as createBobiz } from '../../state/bobizs'

const API_SERVER = process.env.API_SERVER

export default function create(container, pointer) {
  const state: any = store.getState()
  dispatch(update(state.seeds.amount - 1))

  const id = uuid()

  // create a 'fake' bobiz for UI, will update later when syncing with backend
  const tempOrbizData = {
    id,
    capacity: 1e9,
    absorbed: 0,
    variant: 0
  }

  container.bobizs[id] = new Bobiz(container.scene, {
    ...tempOrbizData,
    x: pointer.x - container.x,
    y: pointer.y - container.y
  })
  container.add(container.bobizs[id])
  container.scene.physics.add.existing(container.bobizs[id])

  dispatch(createBobiz(tempOrbizData))

  try {
    fetch(`${API_SERVER}/users/${state.user.addr}/bobizs/${id}`, {
      method: 'POST'
    }).then(response => response.json())
  } catch (e) {
    dispatch(remove(id))
  }
}
