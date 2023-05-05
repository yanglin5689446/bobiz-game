import BackToGame from '../objects/shared/backToGame'

export default class CatalogScene extends Phaser.Scene {
  back

  constructor() {
    super({ key: 'CatalogScene' })
  }

  async create() {
    this.back = new BackToGame(this)
  }
  async update() {}
}
