

/**
 * Setup and control base player.
 */
export default class Player extends Phaser.Sprite {
  constructor({game, pIndex, x, y, key, frame}) {
    super(game, x, y, key, frame);
    this.playerIndex = pIndex;

    // Constant members
    this.speed = 10;

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0.5);
    
    // Physics body
    this.game.physics.arcade.enable(this.tankBase);
    this.enableBody = true;
    this.body.collideWorldBounds = true;
    this.body.bounce.set(0.8);
    this.body.allowRotation = true;
    this.body.immovable = true

    this.initKeys();
  }

  initKeys() {
    if (this.playerIndex == 0) {
      this.keys = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
      };
    } else {
      this.keys = game.input.keyboard.createCursorKeys();
    }
  }

  update() {
    this.updateInput();
  }


  updateInput() {
    if (this.keys.left.isDown) {
      this.x -= this.speed;
    }
    if (this.keys.right.isDown) {
      this.x +=  this.speed;
    }
    if (this.keys.up.isDown) {
      this.y -=  this.speed;
    }
    if (this.keys.down.isDown) {
      this.y += this.speed;
    } 
  }

  
}
