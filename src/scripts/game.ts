import 'phaser'
import * as fcl from '@onflow/fcl'
import ConnectWalletScene from './scenes/connectWalletScene'
import GameScene from './scenes/gameScene'
import ShopScene from './scenes/shopScene'
import PreloadScene from './scenes/preloadScene'
import CatalogScene from './scenes/catalogScene'

const DEFAULT_WIDTH = 440
const DEFAULT_HEIGHT = 800

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, ConnectWalletScene, GameScene, ShopScene, CatalogScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  }
}

window.addEventListener('load', () => {
  fcl
    .config()
    .put('accessNode.api', 'https://access-testnet.onflow.org')
    .put('challenge.handshake', 'https://flow-wallet-testnet.blocto.app/authn')
  const game = new Phaser.Game(config)
  window.addEventListener('error', error => alert(JSON.stringify(error)))
})
