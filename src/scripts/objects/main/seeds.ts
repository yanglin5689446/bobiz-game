import { dispatch, getState, store } from '../../state'
import * as bobizCoinActions from '../../state/bobizCoin'
import * as seedsActions from '../../state/seeds'

export default class Seeds extends Phaser.GameObjects.Container {
  amount: number
  unsubscribe: () => void
  border
  icon
  text
  buyButton
  buyButtonText

  constructor(scene) {
    super(scene, scene.cameras.main.width - 150, 20)
    scene.add.existing(this)

    this.border = new Phaser.GameObjects.Graphics(scene)
    this.border.lineStyle(2, 0x0, 1)
    this.border.strokeRoundedRect(0, 0, 120, 50, 5)
    this.add(this.border)

    this.icon = new Phaser.GameObjects.Image(scene, 30, 25, 'seed-bag')
    this.icon.displayWidth = 30
    this.icon.displayHeight = 30
    this.add(this.icon)

    this.text = new Phaser.GameObjects.Text(scene, 105, 25, '0', { color: 'black', fontSize: '28px' })
    this.text.setOrigin(1, 0.5)
    this.add(this.text)

    this.buyButton = new Phaser.GameObjects.Graphics(scene)
    this.buyButton.fillStyle(0xffffff, 1)
    this.buyButton.strokeRoundedRect(100, -10, 30, 25, 5)
    this.buyButton.fillRoundedRect(101, -9, 28, 23, 5)
    this.add(this.buyButton)

    this.buyButtonText = new Phaser.GameObjects.Text(scene, 115, 3, '$5', { color: 'black', fontSize: '16px' })
    this.buyButtonText.setOrigin(0.5)
    this.buyButtonText.setPadding(5, 10, 5, 10)
    this.buyButtonText.setInteractive().on('pointerdown', () => {
      const state = getState()
      if (state.bobizCoin.amount < 5) return

      dispatch(seedsActions.update(state.seeds.amount + 1))
      dispatch(bobizCoinActions.add(-5))
    })
    this.add(this.buyButtonText)

    const updater = () => {
      const state = store.getState()
      this.amount = state.seeds.amount
      this.text.setText(`${Math.floor(this.amount)}`)
    }

    // initialize state
    updater()
    // subscribe to redux
    this.unsubscribe = store.subscribe(updater)
    this.on('destory', () => this.unsubscribe())
  }
}
