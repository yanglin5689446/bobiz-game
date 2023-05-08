import { dispatch, getState } from '../state'
import Container from '../objects/game/container'
import FpsText from '../objects/game/fpsText'
import Seeds from '../objects/game/seeds'
import BobizCoinText from '../objects/shared/bobizCoin'
import Catalog from '../objects/game/catalog'
import Shop from '../objects/game/shop'
import * as bobizCoinActions from '../state/bobizCoin'
import * as bobizsActions from '../state/bobizs'
import * as seedsActions from '../state/seeds'

const API_SERVER = process.env.API_SERVER

export default class GameScene extends Phaser.Scene {
  fpsText
  container
  seeds
  bobizCoin
  buySeed
  shop
  catalog
  initialized: boolean

  constructor() {
    super({ key: 'GameScene' })
  }

  async create() {
    this.container = new Container(this)
    this.seeds = new Seeds(this)
    this.bobizCoin = new BobizCoinText(this)
    this.shop = new Shop(this)
    this.catalog = new Catalog(this)

    // initialization
    await this.fetchAndUpdate()

    // initialize timer
    this.time.addEvent({
      // polling every 5 seconds
      delay: 5 * 1000,
      callback: this.fetchAndUpdate,
      callbackScope: this,
      loop: true
    })

    // record fps in debug mode
    this.fpsText = new FpsText(this)
  }

  async fetchAndUpdate() {
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
    // dispatch(containerActions.updateVolume(state.container.volume))

    this.initialized = true
  }

  async update() {
    if (!this.initialized) return
    this.fpsText.update()
    this.container.update()
  }
}
