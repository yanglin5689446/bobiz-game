import Container from '../objects/container'
import FpsText from '../objects/fpsText'
import Seeds from '../objects/seeds'
import BobizCoinText from '../objects/bobizCoin'
import { getState } from '../state'

export default class MainScene extends Phaser.Scene {
  fpsText
  container
  seeds
  bobizCoin
  buySeed

  constructor() {
    super({ key: 'MainScene' })
  }

  async create() {
    this.container = new Container(this)
    this.seeds = new Seeds(this)
    this.bobizCoin = new BobizCoinText(this)

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
