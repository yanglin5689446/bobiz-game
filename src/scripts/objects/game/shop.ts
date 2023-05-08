export default class Shop extends Phaser.GameObjects.Container {
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

    this.icon = new Phaser.GameObjects.Image(scene, 30, 25, 'shop')
    this.add(this.icon)
    this.icon.displayWidth = 40
    this.icon.displayHeight = 40

    this.text = new Phaser.GameObjects.Text(scene, 120, 25, 'Shop', { color: 'black', fontSize: '20px' })
    this.text.setOrigin(1, 0.5)
    this.text.setPadding(60, 10, 15, 10)

    this.text.setInteractive().on('pointerdown', () => {
      this.scene.scene.pause()
      this.scene.scene.setVisible(false, 'GameScene')
      this.scene.scene.launch('ShopScene')
    })
    this.add(this.text)
  }
}
