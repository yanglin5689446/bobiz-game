import Item from '../objects/catalog/item'
import BackToGame from '../objects/shared/backToGame'
import { getState } from '../state'

export default class CatalogScene extends Phaser.Scene {
  back

  constructor() {
    super({ key: 'CatalogScene' })
  }

  async create() {
    const state = getState()
    this.back = new BackToGame(this)
    state.catalog.records.forEach((revealed, variant) => {
      if (variant === 0) return
      const item = new Item(this, { variant, revealed })
      item.setPosition(30 + (variant - 1) * 90, 100)
    })
  }
}
