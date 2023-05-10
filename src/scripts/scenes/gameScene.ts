import { dispatch, getState } from '../state'
import Container from '../objects/game/container'
import FpsText from '../objects/game/fpsText'
import Seeds from '../objects/game/seeds'
import BobizCoinText from '../objects/shared/bobizCoin'
import Catalog from '../objects/game/catalog'
import Shop from '../objects/game/shop'
import syncGameStatus from '../lib/syncGameStatus'

const debugMode = process.env.DEBUG === 'true'
export default class GameScene extends Phaser.Scene {
  fpsText
  container
  seeds
  bobizCoin
  buySeed
  shop
  catalog

  constructor() {
    super({ key: 'GameScene' })
  }

  async create() {
    this.container = new Container(this)
    this.seeds = new Seeds(this)
    this.bobizCoin = new BobizCoinText(this)
    this.shop = new Shop(this)
    this.catalog = new Catalog(this)

    // initialize timer
    this.time.addEvent({
      // polling every 10 seconds
      delay: 10 * 1000,
      callback: syncGameStatus,
      callbackScope: this,
      loop: true
    })

    // record fps in debug mode
    if (debugMode) this.fpsText = new FpsText(this)
  }

  async update() {
    this.container.update()
    if (debugMode) this.fpsText.update()
  }
}
