import { dispatch, getState, store } from '../state'
import * as bobizCoinActions from '../state/bobizCoin'
import * as seedsActions from '../state/seeds'

export default class BobizCoin extends Phaser.GameObjects.Container {
  amount: number
  unsubscribe: () => void
  border
  icon
  text

  constructor(scene) {
    super(scene, scene.cameras.main.width - 150, 80)
    scene.add.existing(this)

    this.border = new Phaser.GameObjects.Graphics(scene)
    this.border.lineStyle(2, 0x0, 1)
    this.border.strokeRoundedRect(0, 0, 120, 50, 5)

    this.add(this.border)

    this.icon = new Phaser.GameObjects.Image(scene, 30, 25, 'coin')
    this.add(this.icon)
    this.icon.displayWidth = 30
    this.icon.displayHeight = 30

    this.text = new Phaser.GameObjects.Text(scene, 105, 25, '0', { color: 'black', fontSize: '28px' })
    this.text.setOrigin(1, 0.5)
    this.add(this.text)

    const updater = () => {
      const state = store.getState()
      this.amount = state.bobizCoin.amount
      this.text.setText(Math.floor(this.amount))
    }

    // initialize state
    updater()
    // subscribe to redux
    this.unsubscribe = store.subscribe(updater)
  }

  public destroy() {
    this.unsubscribe()
  }
}
