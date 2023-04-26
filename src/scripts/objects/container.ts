export default class Container extends Phaser.Physics.Arcade.Image {
  static WIDTH = 300
  static HEIGHT = 500
  constructor(scene, { onClick }) {
    super(scene, scene.cameras.main.width / 2, scene.cameras.main.height / 2, 'container')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.displayWidth = Container.WIDTH
    this.displayHeight = Container.HEIGHT

    this.setInteractive().on('pointerdown', onClick)

    this.setBounce(20, 20)
    this.setImmovable(true)
  }
}
