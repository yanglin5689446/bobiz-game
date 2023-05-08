import * as fcl from '@onflow/fcl'

export default class ConnectWalletScene extends Phaser.Scene {
  logo
  button
  buttonText

  constructor() {
    super({ key: 'ConnectWalletScene' })
  }

  async create() {
    this.logo = new Phaser.GameObjects.Image(this, this.cameras.main.width / 2, 400, 'bobiz-2')
    this.logo.displayHeight = 80
    this.logo.displayWidth = 80
    this.add.existing(this.logo)

    this.button = new Phaser.GameObjects.Graphics(this)
    this.button.lineStyle(2, 0x0, 1)
    this.button.strokeRoundedRect(this.cameras.main.width / 2 - 100, 500, 200, 50, 5)

    this.add.existing(this.button)

    this.buttonText = new Phaser.GameObjects.Text(this, this.cameras.main.width / 2, 525, 'Connect Wallet', {
      color: 'black',
      fontSize: '20px'
    })
    this.buttonText.setOrigin(0.5)
    this.buttonText.setPadding(15, 10, 15, 10)

    this.buttonText.setInteractive().on('pointerup', () => fcl.authenticate())
    this.add.existing(this.buttonText)
  }
  async update() {}
}
