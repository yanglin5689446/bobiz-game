import Bobiz from '../objects/bobiz'
import Container from '../objects/container'
import FpsText from '../objects/fpsText'
import SeedsText from '../objects/seedsText'
import BobizCoinText from '../objects/bobizCoinText'
import Surface from '../objects/surface'

export default class MainScene extends Phaser.Scene {
  fpsText
  bobizs: any[]
  container
  surface
  waterlevel: number
  seeds
  bcoin
  frameCounter: number
  updateGameTimer

  constructor() {
    super({ key: 'MainScene' })
    this.bobizs = []
    this.frameCounter = 0
  }

  async create() {
    this.container = new Container(this, {
      onClick: pointer => {
        if (this.seeds.amount < 1) return

        this.bobizs.push(
          new Bobiz(this, {
            capacity: 0,
            x: pointer.x,
            y: pointer.y,
            variant: Math.ceil(Math.random() * 3)
          })
        )
        this.seeds.update(-1)
      }
    })
    this.waterlevel = 100
    this.surface = new Surface(this, this.waterlevel)

    this.seeds = new SeedsText(this, 10)
    this.bcoin = new BobizCoinText(this, 0)

    // initial fetch
    this.fetchAndUpdate()
    // initialize timer
    this.updateGameTimer = this.time.addEvent({
      // polling every 5 seconds
      delay: 5 * 1000,
      callback: this.fetchAndUpdate,
      callbackScope: this,
      loop: true
    })

    // record fps in debug mode
    this.fpsText = new FpsText(this)
  }

  fetchAndUpdate() {
    this.seeds.update(+1)
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
      bobiz.feed(0.25)
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
