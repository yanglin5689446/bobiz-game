import * as fcl from '@onflow/fcl'
import { dispatch } from '../state'
import * as userActions from '../state/user'

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
    this.scene.start('ConnectWalletScene')
    fcl.currentUser().subscribe(user => {
      if (!user.addr) return
      dispatch(userActions.set(user))
      this.scene.stop('ConnectWalletScene')
      this.scene.start('GameScene')
    })
  }
}
