import Bobiz from '../objects/bobiz'
import Container from '../objects/container'
import FpsText from '../objects/fpsText'
import Surface from '../objects/surface'

export default class MainScene extends Phaser.Scene {
  fpsText
  bobizs: any[]
  container
  surface
  waterlevel: number

  constructor() {
    super({ key: 'MainScene' })
  }

  async create() {
    this.container = new Container(this)
    this.waterlevel = 100
    this.surface = new Surface(this, this.waterlevel)
    this.bobizs = Array.from({ length: 10 }).map(
      () =>
        new Bobiz(this, {
          x: this.cameras.main.width / 2 + (Math.random() - 0.5) * (Container.WIDTH - 40),
          y: this.cameras.main.height / 2 + (Math.random() - 0.5) * (Container.HEIGHT - 40),
          variant: Math.ceil(Math.random() * 3)
        })
    )
    this.bobizs.forEach(bobiz => {
      this.physics.add.collider(bobiz, this.container)
    })
    this.fpsText = new FpsText(this)
  }

  async update() {
    this.fpsText.update()

    // update water level
    let newWaterlevel = 100 - this.game.loop.frame / 300
    if (newWaterlevel < 10) newWaterlevel = 10
    this.surface.setWaterlevel(newWaterlevel)

    // update bobiz bonding box
    const newWaterlevelY = (Container.HEIGHT * newWaterlevel) / 100
    this.bobizs.forEach(bobiz => {
      // type check to shut typescript warnings
      if (bobiz.body && 'setBoundsRectangle' in bobiz.body)
        bobiz.body.setBoundsRectangle(
          new Phaser.Geom.Rectangle(
            this.cameras.main.width / 2 - Container.WIDTH / 2 + 5,
            this.cameras.main.height / 2 - newWaterlevelY + Container.HEIGHT / 2,
            Container.WIDTH - 10,
            newWaterlevelY - 5
          )
        )
    })
  }
}
