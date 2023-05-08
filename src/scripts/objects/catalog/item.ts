import { store } from '../../state'

export default class Item extends Phaser.GameObjects.Container {
  border
  image
  text
  unsubscribe: () => void

  constructor(scene, { revealed, variant }) {
    super(scene)
    scene.add.existing(this)

    this.border = new Phaser.GameObjects.Graphics(scene)
    this.border.lineStyle(2, 0x0, 1)
    this.border.strokeRoundedRect(0, 0, 80, 80, 5)

    this.add(this.border)

    this.image = new Phaser.GameObjects.Image(scene, 40, 35, revealed ? `bobiz-${variant}` : `bobiz-unknown`)
    this.add(this.image)
    this.image.displayWidth = 40
    this.image.displayHeight = 40

    this.text = new Phaser.GameObjects.Text(scene, 40, 65, revealed ? `Bobiz #${variant}` : '???', {
      color: 'black',
      fontSize: '12px'
    })
    this.text.setOrigin(0.5)
    this.add(this.text)

    const updater = () => {
      const state = store.getState()
    }

    // initialize state
    updater()
    // subscribe to redux
    this.unsubscribe = store.subscribe(updater)

    this.on('destroy', () => this.unsubscribe())
  }
}
