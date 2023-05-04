export default class PreloadScene extends Phaser.Scene {
  unsubscribe
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('container', 'assets/img/container.png')
    this.load.image('surface', 'assets/img/surface.png')
    this.load.image('bobiz-stage-0', 'assets/img/bobiz-stage-0.png')
    this.load.image('bobiz-stage-1', 'assets/img/bobiz-stage-1.png')
    this.load.image('bobiz-stage-2', 'assets/img/bobiz-stage-2.png')
    this.load.image('bobiz-stage-3', 'assets/img/bobiz-stage-3.png')
    this.load.image('bobiz-1', 'assets/img/bobiz-1.png')
    this.load.image('bobiz-2', 'assets/img/bobiz-2.png')
    this.load.image('bobiz-3', 'assets/img/bobiz-3.png')
    this.load.image('coin', 'assets/img/coin.png')
    this.load.image('seed-bag', 'assets/img/seed-bag.png')
    this.load.image('shop', 'assets/img/shop.png')
    this.load.image('catalog', 'assets/img/catalog.png')
    this.load.image('back', 'assets/img/back.png')
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
