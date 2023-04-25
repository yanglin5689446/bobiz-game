import Container from './container'

export default class Surface extends Phaser.Physics.Arcade.Image {
  constructor(scene, waterlevel) {
    super(scene, scene.cameras.main.width / 2, 0, 'surface')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.displayWidth = Container.WIDTH - 10

    this.setWaterlevel(waterlevel)
    this.setImmovable(true)
  }

  setWaterlevel(waterlevel) {
    const y = this.scene.cameras.main.height / 2 + Container.HEIGHT / 2 - (waterlevel / 100) * Container.HEIGHT
    this.setPosition(this.x, y)
  }
}
