import 'phaser'
import MainScene from './scenes/mainScene'
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
  scene: [PreloadScene, MainScene, ShopScene, CatalogScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
