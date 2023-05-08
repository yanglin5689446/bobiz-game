import { dispatch, getState, store } from '../../state'
import * as seedsActions from '../../state/seeds'
import * as bobizsActions from '../../state/bobizs'
import Bobiz from './bobiz'

export default class Container extends Phaser.GameObjects.Container {
  static WIDTH = 300
  static HEIGHT = 500
  surface
  containerBody
  capacity: number
  volume: number
  bobizCreationBuffer?: { x: number; y: number }
  bobizs: Record<string, any>

  unsubscribe

  constructor(scene) {
    super(
      scene,
      (scene.cameras.main.width - Container.WIDTH) / 2,
      (scene.cameras.main.height - Container.HEIGHT + 200) / 2
    )
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setSize(Container.WIDTH, Container.HEIGHT)

    this.bobizs = {}

    // initialize container body
    this.containerBody = new Phaser.Physics.Arcade.Image(scene, 0, 0, 'container')
    this.add(this.containerBody)
    scene.physics.add.existing(this.containerBody)
    this.containerBody.setOrigin(0, 0)
    this.containerBody.setBounce(20, 20)
    this.containerBody.setImmovable(true)

    this.containerBody.setInteractive().on('pointerdown', pointer => {
      const state = getState()
      if (state.seeds.amount < 1) return

      this.bobizCreationBuffer = { x: pointer.x, y: pointer.y }

      dispatch(bobizsActions.create())
      dispatch(seedsActions.update(state.seeds.amount - 1))
    })

    // initialize surface body
    this.surface = new Phaser.Physics.Arcade.Image(scene, 5, 0, 'surface')
    this.add(this.surface)
    scene.physics.add.existing(this.surface)
    this.surface.setOrigin(0, 0)
    this.surface.displayWidth = Container.WIDTH - 10
    this.surface.setImmovable(true)

    const updater = () => {
      const state = store.getState()
      this.capacity = state.container.capacity
      this.volume = state.container.volume
      // destroy non-existed bobiz entities
      Object.keys(this.bobizs).map(id => {
        if (!state.bobizs.entities[id]) {
          this.bobizs[id].destroy()
          delete this.bobizs[id]
        }
      })
      // create new bobiz entities & update existing entities
      Object.entries(state.bobizs.entities).forEach(([id, value]) => {
        if (!this.bobizs[id]) {
          const x = this.bobizCreationBuffer ? this.bobizCreationBuffer.x - this.x : Math.random() * Container.WIDTH
          const y = this.bobizCreationBuffer ? this.bobizCreationBuffer.y - this.y : Math.random() * Container.HEIGHT
          this.bobizs[id] = new Bobiz(this.scene, {
            ...value,
            id,
            x,
            y
          })
          this.add(this.bobizs[id])
          this.scene.physics.add.existing(this.bobizs[id])

          this.bobizCreationBuffer = undefined
        } else {
          this.bobizs[id].update(state.bobizs.entities[id].absorbed)
        }
      })
    }

    // initialize state
    updater()
    // subscribe to redux
    this.unsubscribe = store.subscribe(updater)
    this.on('destroy', () => this.unsubscribe())
  }

  setCapacity(capacity) {
    this.capacity = capacity
  }

  updateVolume() {
    const y = ((this.capacity - this.volume) / this.capacity) * Container.HEIGHT
    this.surface.setPosition(this.surface.x, y)
  }

  update(): void {
    this.updateVolume()
    // update bobiz bounding box
    Object.values(this.bobizs).forEach(bobiz => {
      // type check to shut typescript warnings
      if (bobiz.body && 'setBoundsRectangle' in bobiz.body)
        bobiz.body.setBoundsRectangle(
          new Phaser.Geom.Rectangle(
            this.x + 5,
            this.y + Container.HEIGHT * (1 - this.volume / this.capacity) + 25,
            Container.WIDTH - 10,
            Container.HEIGHT * (this.volume / this.capacity) - 105
          )
        )
    })
  }
}
