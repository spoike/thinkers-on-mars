
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
    this.updateRotation();
  }

  updateInput() {
    if (this.keys.left.isDown) {
      this.x -= this.speed;
    }
    if (this.keys.right.isDown) {
      this.x += this.speed;
    }
    if (this.keys.up.isDown) {
      this.y -= this.speed;
    }
    if (this.keys.down.isDown) {
      this.y += this.speed;
    } 
  }

  updateRotation() {
    if (false) { // Is in range of one or more zombie

    } else { // No zombie close
      var velocity = new Phaser.Point(-10, 1);
      this.rotation = Phaser.Point.angle(velocity, game.Zero);
      
    }
  }

  
}
