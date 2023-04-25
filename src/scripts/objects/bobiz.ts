export default class Bobiz extends Phaser.Physics.Arcade.Image {
  constructor(scene, { x, y, variant }) {
    super(scene, x, y, `bobiz-${variant}`)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true).setBounce(1)

    this.setVelocity((Math.random() - 0.5) * (5 + 45 * Math.random()), (Math.random() - 0.5) * (5 + 45 * Math.random()))
    this.setAngularVelocity((Math.random() - 0.5) * 100)
  }
}
