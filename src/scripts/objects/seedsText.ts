export default class SeedsText extends Phaser.GameObjects.Text {
  amount: number
  constructor(scene, amount) {
    super(scene, scene.cameras.main.width / 2 - 100, 50, '', { color: 'black', fontSize: '20px' })
    scene.add.existing(this)
    this.setOrigin(0.5)
    this.amount = amount
  }

  public update(amount) {
    this.amount += amount
    this.setText(`Seeds: ${Math.floor(this.amount)}`)
  }
}
