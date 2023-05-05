export default class Catalog extends Phaser.GameObjects.Container {
  border
  icon
  text

  constructor(scene) {
    super(scene, 30, 80)
    scene.add.existing(this)

    this.border = new Phaser.GameObjects.Graphics(scene)
    this.border.lineStyle(2, 0x0, 1)
    this.border.strokeRoundedRect(0, 0, 120, 50, 5)

    this.add(this.border)

    this.icon = new Phaser.GameObjects.Image(scene, 30, 25, 'catalog')
    this.add(this.icon)
    this.icon.displayWidth = 30
    this.icon.displayHeight = 30

    this.text = new Phaser.GameObjects.Text(scene, 125, 25, 'Catalog', { color: 'black', fontSize: '14px' })
    this.text.setOrigin(1, 0.5)
    this.text.setPadding(50, 10, 15, 10)
    this.text.setInteractive().on('pointerdown', () => {
      this.scene.scene.pause()
      this.scene.scene.setVisible(false, 'MainScene')
      this.scene.scene.launch('CatalogScene')
    })
    this.add(this.text)
  }
}
