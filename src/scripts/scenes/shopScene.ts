import BackToGame from '../objects/shared/backToGame'
import BobizCoin from '../objects/shared/bobizCoin'
import Seed from '../objects/shop/seed'
import Seeds5x from '../objects/shop/seeds5x'
import Seeds10x from '../objects/shop/seeds10x'

export default class ShopScene extends Phaser.Scene {
  back
  seed
  seeds5x
  seeds10x
  bobizCoin

  constructor() {
    super({ key: 'ShopScene' })
  }

  async create() {
    this.back = new BackToGame(this)
    this.seed = new Seed(this)
    this.seeds5x = new Seeds5x(this)
    this.seeds10x = new Seeds10x(this)
    this.bobizCoin = new BobizCoin(this)
  }
  async update() {}
}
