import * as bobizsActions from '../../state/bobizs'
import * as bobizCoinActions from '../../state/bobizCoin'
import { dispatch } from '../../state'

export default class Bobiz extends Phaser.Physics.Arcade.Image {
  id
  absorbed: number
  variant: number
  capacity: number
  amountRequiredPerStage: number

  constructor(scene, { id, x, y, variant, capacity, absorbed }) {
    const amountRequiredPerStage = capacity / 4
    const stage = Math.ceil(absorbed / amountRequiredPerStage)
    super(scene, x, y, `bobiz-${stage === 4 ? variant : `stage-${stage}`}`)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.amountRequiredPerStage = amountRequiredPerStage
    this.id = id
    this.absorbed = absorbed
    this.variant = variant
    this.capacity = capacity

    this.setCollideWorldBounds(true).setBounce(1)

    this.setVelocity((Math.random() - 0.5) * (5 + 45 * Math.random()), (Math.random() - 0.5) * (5 + 45 * Math.random()))
    this.setAngularVelocity((Math.random() - 0.5) * 100)

    this.setInteractive().on('pointerup', () => {
      const stage = Math.ceil(this.absorbed / amountRequiredPerStage)
      if (stage === 4) {
        dispatch(bobizsActions.harvest(id))
      }
    })
  }

  update(amount) {
    this.absorbed = amount
    if (this.absorbed >= this.capacity) this.absorbed = this.capacity
    const stage = Math.ceil(this.absorbed / this.amountRequiredPerStage)
    this.setTexture(`bobiz-${stage === 4 ? this.variant : `stage-${stage}`}`)
  }
}
