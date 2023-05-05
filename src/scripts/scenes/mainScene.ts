import Container from '../objects/main/container'
import FpsText from '../objects/main/fpsText'
import Seeds from '../objects/main/seeds'
import BobizCoinText from '../objects/main/bobizCoin'
import { getState } from '../state'
import Shop from '../objects/main/shop'
import Catalog from '../objects/main/catalog'

export default class MainScene extends Phaser.Scene {
  fpsText
  container
  seeds
  bobizCoin
  buySeed
  shop
  catalog

  constructor() {
    super({ key: 'MainScene' })
  }

  async create() {
    this.container = new Container(this)
    this.seeds = new Seeds(this)
    this.bobizCoin = new BobizCoinText(this)
    this.shop = new Shop(this)
    this.catalog = new Catalog(this)

    // initial fetch
    this.fetchAndUpdate()
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

  fetchAndUpdate() {
    const state = getState()
    // dispatch(seedsActions.update(state.seeds.amount))
    // dispatch(containerActions.updateVolume(state.container.volume))
  }

  async update() {
    this.fpsText.update()
    this.container.update()
  }
}
