
/**
 * Setup and control base player.
 */
export default class Player extends Phaser.Sprite {
  constructor({game, pIndex, x, y, key, frame}) {
    super(game, x, y, key, frame);
    this.playerIndex = pIndex;

    // Constant members
    this.speed = 200;

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0.5);
    
    // Physics body
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.body.collideWorldBounds = true;
    //this.body.bounce.set(0.8);
    //this.body.immovable = true;
    //this.body.allowRotation = true;

    this.initKeys();
    this.initAnimations(game);
  }

  initAnimations(game) {
    this.idleSprite = new Phaser.Sprite(game, -32.0/2, -32.0/2, 'player_idle', 0);
    this.idleSprite.animations.add('player_idle', [
      'player_idle 0.ase',
      'player_idle 1.ase',
      'player_idle 2.ase',
      'player_idle 3.ase',
      'player_idle 4.ase'
    ], 10);
    this.addChild(this.idleSprite);
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
    this.idleSprite.animations.play('player_idle');
  }

  updateInput() {
    var isMoving = false;
    this.body.velocity.x *= 0.9;
    this.body.velocity.y *= 0.9;

    var accAlpha = 0.2;

    if (this.keys.left.isDown) {
      isMoving = true;
      this.body.velocity.x = Phaser.Math.linear(this.body.velocity.x, -this.speed, accAlpha);
    }
    if (this.keys.right.isDown) {
      isMoving = true;
      this.body.velocity.x = Phaser.Math.linear(this.body.velocity.x, this.speed, accAlpha);
    }
    if (this.keys.up.isDown) {
      isMoving = true;
      this.body.velocity.y= Phaser.Math.linear(this.body.velocity.y, -this.speed, accAlpha);
    }
    if (this.keys.down.isDown) {
      isMoving = true;
      this.body.velocity.y = Phaser.Math.linear(this.body.velocity.y, this.speed, accAlpha);
    } 
  
  }

  updateRotation() {
    if (false) { // Is in range of one or more zombie

    } else { // No zombie close
      var velocity = this.body.velocity; //new Phaser.Point(-10, 1);
      this.rotation = Phaser.Point.angle(velocity, game.Zero);
      
    }
  }

  
}
