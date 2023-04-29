export default class Bobiz extends Phaser.Physics.Arcade.Image {
  static MAX_CAPACITY = 1000
  static AMOUNT_PER_STAGE = 250

  capacity: number
  variant: number
  constructor(scene, { x, y, variant, capacity }) {
    const stage = Math.ceil(capacity / Bobiz.AMOUNT_PER_STAGE)
    super(scene, x, y, `bobiz-${stage === 4 ? variant : `stage-${stage}`}`)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.capacity = capacity
    this.variant = variant

    this.setCollideWorldBounds(true).setBounce(1)

    this.setVelocity((Math.random() - 0.5) * (5 + 45 * Math.random()), (Math.random() - 0.5) * (5 + 45 * Math.random()))
    this.setAngularVelocity((Math.random() - 0.5) * 100)
  }

  feed(amount) {
    this.capacity += amount
    if (this.capacity >= Bobiz.MAX_CAPACITY) this.capacity = Bobiz.MAX_CAPACITY
    const stage = Math.ceil(this.capacity / Bobiz.AMOUNT_PER_STAGE)
    this.setTexture(`bobiz-${stage === 4 ? this.variant : `stage-${stage}`}`)
    this.setSize(8 * (stage + 1), 8 * (stage + 1))
    this.setDisplaySize(8 * (stage + 1), 8 * (stage + 1))
  }
}
