export default class Back extends Phaser.GameObjects.Container {
  border
  icon
  text

  constructor(scene) {
    super(scene, 30, 20)
    scene.add.existing(this)

    this.border = new Phaser.GameObjects.Graphics(scene)
    this.border.lineStyle(2, 0x0, 1)
    this.border.strokeRoundedRect(0, 0, 120, 50, 5)

    this.add(this.border)

    this.icon = new Phaser.GameObjects.Image(scene, 30, 25, 'back')
    this.add(this.icon)
    this.icon.displayWidth = 30
    this.icon.displayHeight = 30

    this.text = new Phaser.GameObjects.Text(scene, 120, 25, 'Back', { color: 'black', fontSize: '20px' })
    this.text.setOrigin(1, 0.5)
    this.text.setPadding(60, 10, 15, 10)
    this.text.setInteractive().on('pointerdown', () => {
      this.scene.scene.stop()
      this.scene.scene.setVisible(true, 'GameScene')
      this.scene.scene.resume('GameScene')
    })
    this.add(this.text)
  }
}
