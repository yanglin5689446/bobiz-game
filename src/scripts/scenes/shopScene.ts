import BackToGame from '../objects/shared/backToGame'

export default class ShopScene extends Phaser.Scene {
  back

  constructor() {
    super({ key: 'ShopScene' })
  }

  async create() {
    this.back = new BackToGame(this)
  }
  async update() {}
}
