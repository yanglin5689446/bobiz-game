import { dispatch, getState, store } from '../../state'
import * as bobizCoinActions from '../../state/bobizCoin'
import * as seedsActions from '../../state/seeds'

export default class Seeds10x extends Phaser.GameObjects.Container {
  unsubscribe: () => void
  border
  icon
  text
  hint
  buyButton
  buyButtonText

  constructor(scene) {
    super(scene, 30, 350)
    scene.add.existing(this)

    this.border = new Phaser.GameObjects.Graphics(scene)
    this.border.lineStyle(2, 0x0, 1)
    this.border.strokeRoundedRect(0, 0, scene.cameras.main.width - 60, 80, 5)
    this.add(this.border)

    this.icon = new Phaser.GameObjects.Image(scene, 40, 40, 'seed-bag')
    this.icon.displayWidth = 30
    this.icon.displayHeight = 30
    this.add(this.icon)

    this.text = new Phaser.GameObjects.Text(scene, 70, 30, 'Seeds x10', { color: 'black', fontSize: '28px' })
    this.text.setOrigin(0, 0.5)
    this.text.setPadding(5, 10, 5, 10)
    this.text.setInteractive().on('pointerdown', () => {
      const state = getState()
      if (state.bobizCoin.amount < 5) return

      dispatch(seedsActions.update(state.seeds.amount + 1))
      dispatch(bobizCoinActions.add(-5))
    })
    this.add(this.text)

    this.hint = new Phaser.GameObjects.Text(scene, 75, 55, 'You have: 0', { color: 'black', fontSize: '14px' })
    this.hint.setOrigin(0, 0.5)
    this.add(this.hint)

    this.buyButton = new Phaser.GameObjects.Graphics(scene)
    this.buyButton.fillStyle(0xffffff, 1)
    this.buyButton.strokeRoundedRect(scene.cameras.main.width - 150, 20, 60, 40, 5)
    this.add(this.buyButton)

    this.buyButtonText = new Phaser.GameObjects.Text(scene, scene.cameras.main.width - 120, 40, '$ 50', {
      color: 'black',
      fontSize: '16px'
    })
    this.buyButtonText.setOrigin(0.5)
    this.buyButtonText.setPadding(20, 10, 20, 10)
    this.buyButtonText.setInteractive().on('pointerdown', () => {
      const state = getState()
      if (state.bobizCoin.amount < 50) return

      dispatch(seedsActions.update(state.seeds.amount + 10))
      dispatch(bobizCoinActions.add(-50))
    })
    this.add(this.buyButtonText)

    const updater = () => {
      const state = store.getState()
      this.hint.setText(`You have: ${state.seeds.amount}`)
    }

    // initialize state
    updater()
    // subscribe to redux
    this.unsubscribe = store.subscribe(updater)
    this.on('destroy', () => this.unsubscribe())
  }
}
