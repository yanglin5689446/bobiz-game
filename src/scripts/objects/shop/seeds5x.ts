import buySeeds from '../../lib/buySeeds'
import { store } from '../../state'

export default class Seeds5x extends Phaser.GameObjects.Container {
  unsubscribe: () => void
  border
  icon
  text
  hint
  buyButton
  buyButtonText

  constructor(scene) {
    super(scene, 30, 250)
    scene.add.existing(this)

    this.border = new Phaser.GameObjects.Graphics(scene)
    this.border.lineStyle(2, 0x0, 1)
    this.border.strokeRoundedRect(0, 0, scene.cameras.main.width - 60, 80, 5)
    this.add(this.border)

    this.icon = new Phaser.GameObjects.Image(scene, 40, 40, 'seed-bag')
    this.icon.displayWidth = 30
    this.icon.displayHeight = 30
    this.add(this.icon)

    this.text = new Phaser.GameObjects.Text(scene, 70, 30, 'Seeds x5', { color: 'black', fontSize: '28px' })
    this.text.setOrigin(0, 0.5)
    this.text.setPadding(5, 10, 5, 10)

    this.add(this.text)

    this.hint = new Phaser.GameObjects.Text(scene, 75, 55, 'You have: 0', { color: 'black', fontSize: '14px' })
    this.hint.setOrigin(0, 0.5)
    this.add(this.hint)

    this.buyButton = new Phaser.GameObjects.Graphics(scene)
    this.buyButton.fillStyle(0xffffff, 1)
    this.buyButton.strokeRoundedRect(scene.cameras.main.width - 150, 20, 60, 40, 5)
    this.add(this.buyButton)

    this.buyButtonText = new Phaser.GameObjects.Text(scene, scene.cameras.main.width - 120, 40, '$ 25', {
      color: 'black',
      fontSize: '16px'
    })
    this.buyButtonText.setOrigin(0.5)
    this.buyButtonText.setPadding(20, 10, 20, 10)
    this.buyButtonText.setInteractive().on('pointerdown', () => buySeeds(5))
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
