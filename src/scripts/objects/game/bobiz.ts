import { dispatch } from '../../state'
import { harvest } from '../../state/bobizs'

export default class Bobiz extends Phaser.Physics.Arcade.Image {
  id
  absorbed: number
  variant: number
  capacity: number
  amountRequiredPerStage: number

  static getAmountRequiredPerStage(capacity) {
    return capacity / 4
  }

  constructor(scene, { id, x, y, variant, capacity, absorbed }) {
    const amountRequiredPerStage = Bobiz.getAmountRequiredPerStage(capacity)
    const stage = Math.ceil(absorbed / amountRequiredPerStage)
    super(scene, x, y, `bobiz-${stage === 4 ? variant : `stage-${stage}`}`)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.id = id
    this.absorbed = absorbed
    this.variant = variant
    this.capacity = capacity

    this.setCollideWorldBounds(true).setBounce(1)

    this.setVelocity((Math.random() - 0.5) * (5 + 45 * Math.random()), (Math.random() - 0.5) * (5 + 45 * Math.random()))
    this.setAngularVelocity((Math.random() - 0.5) * 100)

    this.setInteractive().on('pointerup', () => {
      const stage = Math.ceil(this.absorbed / Bobiz.getAmountRequiredPerStage(this.capacity))
      if (stage === 4) {
        dispatch(harvest(id))
      }
    })
  }

  update({ absorbed, variant, capacity }) {
    this.capacity = capacity
    this.variant = variant
    this.absorbed = absorbed
    const amountRequiredPerStage = Bobiz.getAmountRequiredPerStage(capacity)

    if (this.absorbed >= this.capacity) this.absorbed = this.capacity
    const stage = Math.ceil(this.absorbed / amountRequiredPerStage)
    this.setTexture(`bobiz-${stage === 4 ? this.variant : `stage-${stage}`}`)
    this.setSize(8 * (stage + 1), 8 * (stage + 1))
    this.setDisplaySize(8 * (stage + 1), 8 * (stage + 1))
  }
}
