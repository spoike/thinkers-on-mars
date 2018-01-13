
/**
 * Setup and control base player.
 */
export default class Player extends Phaser.Sprite {
  constructor({game, pIndex, x, y}) {
    super(game, x, y, "player", 0);
    this.playerIndex = pIndex;
    this.facing = 'front';
    this.scale.x = 2.0;
    this.scale.y = 2.0;

    // Constant members
    this.speed = 230;

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

    this.health = 100;

    this.initKeys();
    this.initAnimations();
  }

  isDead() {
  	return this.health <= 0;
  }

  initAnimations() {
    this.animations.add('idle_front', [0, 1, 2, 3, 4], 15);
    this.animations.add('idle_back', [5, 6, 7, 8], 15);
    this.animations.add('run_front', [9, 10, 11], 15);
    this.animations.add('run_back', [12, 13, 14], 15);
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

  takeDamage(damage) {
  	this.health -= damage;
  }

  update() {
    this.updateInput();
    this.updateRotation();
    switch (this.facing) {
      case 'back':
        if (this.isMoving) {
          this.animations.play('run_back');
        } else {
          this.animations.play('idle_back');
        }
        break;
      case 'front':
      default:
      if (this.isMoving) {
        this.animations.play('run_front');
      } else {
        this.animations.play('idle_front');
      }
      break;
    }
  }

  updateInput() {
    this.isMoving = false;
    this.body.velocity.x *= 0.9;
    this.body.velocity.y *= 0.9;

    var accAlpha = 0.75;

    if (this.keys.left.isDown) {
      this.isMoving = true;
      this.body.velocity.x = Phaser.Math.linear(this.body.velocity.x, -this.speed, accAlpha);
      this.scale.x = 2.0;
    }
    if (this.keys.right.isDown) {
      this.isMoving = true;
      this.body.velocity.x = Phaser.Math.linear(this.body.velocity.x, this.speed, accAlpha);
      this.scale.x = -2.0;
    }
    if (this.keys.up.isDown) {
      this.isMoving = true;
      this.body.velocity.y= Phaser.Math.linear(this.body.velocity.y, -this.speed, accAlpha);
      this.facing = 'back';
    }
    if (this.keys.down.isDown) {
      this.isMoving = true;
      this.body.velocity.y = Phaser.Math.linear(this.body.velocity.y, this.speed, accAlpha);
      this.facing = 'front';
    } 
  }

  updateRotation() {
    if (false) { // Is in range of one or more zombie

    } else { // No zombie close
      var velocity = this.body.velocity; //new Phaser.Point(-10, 1);
      //const rotation = Phaser.Point.angle(velocity, game.Zero);
    }
  }

  
}
