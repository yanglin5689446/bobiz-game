import { dispatch } from '../state'
import Container from '../objects/main/container'
import FpsText from '../objects/main/fpsText'
import Seeds from '../objects/main/seeds'
import BobizCoinText from '../objects/shared/bobizCoin'
import Catalog from '../objects/main/catalog'
import Shop from '../objects/main/shop'
import * as bobizCoinActions from '../state/bobizCoin'
import * as bobizsActions from '../state/bobizs'
import * as seedsActions from '../state/seeds'

const API_SERVER = process.env.API_SERVER

export default class MainScene extends Phaser.Scene {
  fpsText
  container
  seeds
  bobizCoin
  buySeed
  shop
  catalog
  initialized: boolean

  constructor() {
    super({ key: 'MainScene' })
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
    let user = await fetch(`${API_SERVER}/users/0xe28cf314a7908411`).then(response => response.json())
    if (!user?.data)
      user = await fetch(`${API_SERVER}/users/0xe28cf314a7908411`, { method: 'POST' }).then(response => response.json())
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
