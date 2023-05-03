import * as bobizsActions from '../state/bobizs'
import * as bobizCoinActions from '../state/bobizCoin'
import { dispatch } from '../state'

export default class Bobiz extends Phaser.Physics.Arcade.Image {
  static MAX_CAPACITY = 1000
  static AMOUNT_PER_STAGE = 250

  id
  absorbed: number
  variant: number
  constructor(scene, { id, x, y, variant, absorbed }) {
    const stage = Math.ceil(absorbed / Bobiz.AMOUNT_PER_STAGE)
    super(scene, x, y, `bobiz-${stage === 4 ? variant : `stage-${stage}`}`)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.id = id
    this.absorbed = absorbed
    this.variant = variant

    this.setCollideWorldBounds(true).setBounce(1)

    this.setVelocity((Math.random() - 0.5) * (5 + 45 * Math.random()), (Math.random() - 0.5) * (5 + 45 * Math.random()))
    this.setAngularVelocity((Math.random() - 0.5) * 100)

    this.setInteractive().on('pointerup', () => {
      const stage = Math.ceil(this.absorbed / Bobiz.AMOUNT_PER_STAGE)
      if (stage === 4) {
        dispatch(bobizsActions.harvest(id))
        dispatch(bobizCoinActions.add(10))
      }
    })
  }

  feed(amount) {
    this.absorbed += amount
    if (this.absorbed >= Bobiz.MAX_CAPACITY) this.absorbed = Bobiz.MAX_CAPACITY
    const stage = Math.ceil(this.absorbed / Bobiz.AMOUNT_PER_STAGE)
    this.setTexture(`bobiz-${stage === 4 ? this.variant : `stage-${stage}`}`)
    this.setSize(8 * (stage + 1), 8 * (stage + 1))
    this.setDisplaySize(8 * (stage + 1), 8 * (stage + 1))
  }
}
